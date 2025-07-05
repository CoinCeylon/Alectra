import { Data, Constr, fromText } from "lucid-cardano";
import { getLucid } from "./lucid";
import { loadPlutusScript } from "./loadContract";

export async function submitProposal(
  walletName: string,
  formData: {
    title: string;
    description: string;
    requestedAmount: string;
    duration: string;
    milestones: string[];
  }
) {
  const lucid = await getLucid(walletName);
  const script = await loadPlutusScript();

  const scriptAddress = lucid.utils.validatorToAddress(script);

  // 🧠 Construct datum matching Plutus script expectation
  const datum = Data.to(
  new Constr(0, [
    fromText(formData.title),
    fromText(formData.description),
    BigInt(formData.requestedAmount),
    BigInt(formData.duration),
    formData.milestones.map(m => fromText(m)),
  ])
);


  const tx = await lucid
    .newTx()
    .payToContract(
      scriptAddress,
      { inline: datum },
      {
        lovelace: BigInt(formData.requestedAmount) * BigInt(1_000_000) + BigInt(3_000_000),
      }
    )
    .complete();

  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();

  console.log("✅ Proposal submitted with txHash:", txHash);
  return txHash;
}
