// Admin‑controlled fund release

use aiken/crypto.{Blake2b_224, Hash, VerificationKey}
use cardano/script_context.{ScriptContext}

pub type VerificationKeyHash =
  Hash<Blake2b_224, VerificationKey>

pub type TreasuryDatum {
  admin: VerificationKeyHash,
}

pub type TreasuryRedeemer {
  Withdraw(Int, VerificationKeyHash)
}

validator treasury_validator {
  spend(
    d: Option<TreasuryDatum>,
    r: TreasuryRedeemer,
    _ref: _,
    ctx: ScriptContext,
  ) {
    expect Some(td) = d
    let signers = ctx.transaction.extra_signatories
    let Withdraw(_, _) = r
    signers == [td.admin]
  }

  else(_) {
    fail
  }
}
