export type ProposalStatus = "pending" | "approved" | "rejected";

export interface Proposal {
  id: string;
  title: string;
  description: string;
  requestedAmount: number;
  duration: number;
  votingStart: string;
  votingEnd: string;
  milestones: string[];
  totalVotes: number;
  quorum: number;
  status: "pending" | "accepted" | "rejected" | "executed";
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
}
