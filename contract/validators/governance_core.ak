// Global configuration & treasury management

use aiken/crypto.{Blake2b_224, Hash, VerificationKey}
use aiken/interval.{Finite}
use cardano/script_context.{ScriptContext}

pub type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

pub type GovernanceConfig {
  admin: VerificationKeyHash,
  minAllocation: Int,
  maxAllocation: Int,
  votingPeriod: Int,
  quorumPercent: Int,
  approvalPercent: Int,
}

pub type GovernanceCoreDatum {
  config: GovernanceConfig,
  nextId: Int,
  treasury: Int,
}

pub type GovernanceCoreRedeemer {
  UpdateConfig(GovernanceConfig)
  Deposit
  CreateProposal(Int, Int)
}

fn now(ctx: ScriptContext) -> Int {
  // Convert to minutes instead of milliseconds
  when ctx.transaction.validity_range.lower_bound.bound_type is {
    Finite(t) -> t / 60000
    // Convert milliseconds to minutes
    _ -> 0
  }
}

validator governance_core {
  spend(
    dOpt: Option<GovernanceCoreDatum>,
    r: GovernanceCoreRedeemer,
    _ref: _,
    ctx: ScriptContext,
  ) {
    expect Some(d) = dOpt
    let signers = ctx.transaction.extra_signatories
    let admin_only =
      fn() { signers == [d.config.admin] }

    when r is {
      UpdateConfig(_new) -> admin_only()
      Deposit -> True
      CreateProposal(allocation, deadline) ->
        allocation >= d.config.minAllocation && allocation <= d.config.maxAllocation && allocation <= d.treasury && deadline - now(
          ctx,
        ) <= d.config.votingPeriod
    }
  }

  else(_) {
    fail
  }
}
