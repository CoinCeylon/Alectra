// Per‑proposal voting & finalisation

use aiken/collection/list
use aiken/crypto.{Blake2b_224, Hash, VerificationKey}
use aiken/interval.{Finite}
use cardano/address.{VerificationKey as AddressVerificationKey}
use cardano/assets.{Value}
use cardano/script_context.{ScriptContext}

pub type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

const gov_policy: ByteArray =
  #"da16cfb63c702345e3936dbe8e0ed508818e71f7796d80e208928afc"

pub type Vote {
  For
  Against
}

pub type ProposalStatus {
  Pending
  Approved
  Rejected
  Executed
}

pub type VoterRecord {
  voter: VerificationKeyHash,
  weight: Int,
  choice: Vote,
}

pub type ProposalDatum {
  id: Int,
  proposer: VerificationKeyHash,
  allocation: Int,
  created: Int,
  deadline: Int,
  votesFor: Int,
  votesAgainst: Int,
  totalWeight: Int,
  status: ProposalStatus,
  voters: List<VoterRecord>,
  quorum: Int,
  approval: Int,
}

pub type ProposalRedeemer {
  Cast(Vote)
  Finalise
  Execute
}

fn now(ctx: ScriptContext) -> Int {
  // Convert to minutes instead of milliseconds  
  when ctx.transaction.validity_range.lower_bound.bound_type is {
    Finite(t) -> t / 60000
    // Convert milliseconds to minutes
    _ -> 0
  }
}

fn gov_amount(val: Value) -> Int {
  // Count governance NFTs by checking specific asset names
  let nft1 = assets.quantity_of(val, gov_policy, "GOV_NFT_1")
  let nft2 = assets.quantity_of(val, gov_policy, "GOV_NFT_2")
  let nft3 = assets.quantity_of(val, gov_policy, "GOV_NFT_3")
  let nft4 = assets.quantity_of(val, gov_policy, "GOV_NFT_4")
  let nft5 = assets.quantity_of(val, gov_policy, "GOV_NFT_5")
  // Each NFT counts as 1 vote (they should have quantity 1 or 0)
  let count1 =
    if nft1 > 0 {
      1
    } else {
      0
    }
  let count2 =
    if nft2 > 0 {
      1
    } else {
      0
    }
  let count3 =
    if nft3 > 0 {
      1
    } else {
      0
    }
  let count4 =
    if nft4 > 0 {
      1
    } else {
      0
    }
  let count5 =
    if nft5 > 0 {
      1
    } else {
      0
    }
  count1 + count2 + count3 + count4 + count5
}

fn weight_for(ctx: ScriptContext, who: VerificationKeyHash) -> Int {
  let inputs = ctx.transaction.inputs
  let mine =
    list.filter(
      inputs,
      fn(i) {
        i.output.address.payment_credential == AddressVerificationKey(who)
      },
    )
  list.foldl(mine, 0, fn(i, acc) { acc + gov_amount(i.output.value) })
}

fn already(vs: List<VoterRecord>, k: VerificationKeyHash) -> Bool {
  list.any(vs, fn(r) { r.voter == k })
}

validator proposal_validator {
  spend(
    dOpt: Option<ProposalDatum>,
    r: ProposalRedeemer,
    _ref: _,
    ctx: ScriptContext,
  ) {
    expect Some(p) = dOpt
    let signers = ctx.transaction.extra_signatories
    let nowT = now(ctx)

    when r is {
      Cast(_choice) ->
        when signers is {
          [vk] -> {
            let open = p.status == Pending && nowT <= p.deadline
            let fresh = !already(p.voters, vk)
            let w = weight_for(ctx, vk)
            open && fresh && w > 0
          }
          _ -> False
        }

      Finalise -> {
        let ended = nowT > p.deadline && p.status == Pending
        // Low quorum: minimum 2 votes required
        let minimum_votes = 2
        let total_votes = p.votesFor + p.votesAgainst
        let has_minimum = total_votes >= minimum_votes
        let appr =
          if total_votes == 0 {
            0
          } else {
            p.votesFor * 100 / total_votes
          }
        ended && has_minimum && appr >= p.approval
      }

      Execute -> p.status == Approved
    }
  }

  else(_) {
    fail
  }
}
