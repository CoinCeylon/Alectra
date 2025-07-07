import { Data, Constr } from "lucid-cardano";
import { loadPlutusScript } from "./loadContract";
import { getLucid } from "./lucid";
import { Proposal } from "@/types/types";

function hexToString(hex: string): string {
  return decodeURIComponent(
    hex.replace(/\s+/g, "").replace(/(..)/g, "%$1")
  );
}

export async function fetchProposals(): Promise<Proposal[]> {
  const lucid = await getLucid(); // 👈 make sure getLucid() returns a Promise<Lucid>
  const script = await loadPlutusScript();
  const scriptAddress = lucid.utils.validatorToAddress(script);

  const utxos = await lucid.utxosAt(scriptAddress);

  return utxos.map((utxo, index) => {
    const datum = Data.from(utxo.datum as string) as Constr<[string, string, bigint, bigint, unknown[]]>;

    const proposalId = index.toString(); // you may replace this with a hash-based ID
    const title = datum.fields[0];
    const description = datum.fields[1];
    const requestedAmount = datum.fields[2];
    const duration = datum.fields[3];
    const milestones = datum.fields[4];

    // Optional dummy values if not encoded yet
    const votingStart = "2024-01-01";
    const votingEnd = "2024-01-10";
    const quorum = 100;
    const votes = {
      for: 0,
      against: 0,
      abstain: 0,
    };

    return {
      id: proposalId,
      title: hexToString(title.toString()),
      description: hexToString(description.toString()),
      requestedAmount: Number(requestedAmount),
      duration: Number(duration),
      milestones: milestones.map(m => hexToString(m.toString())),
      votingStart,
      votingEnd,
      quorum,
      status: "pending",
      votes,
      totalVotes: 0,
    } satisfies Proposal;
  });
}
