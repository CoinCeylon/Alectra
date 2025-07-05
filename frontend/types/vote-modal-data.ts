import type { Proposal } from "@/data/mock-proposals"

export interface VoteModalData {
  proposal: Proposal
  voteType: "for" | "against" | "abstain"
}
