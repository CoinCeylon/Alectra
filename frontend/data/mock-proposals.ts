export interface Proposal {
  id: string
  title: string
  description: string
  requestedAmount: number
  duration: number
  milestones: string[]
  votingStart: string
  votingEnd: string
  votes: {
    for: number
    against: number
    abstain: number
  }
  totalVotes: number
  quorum: number
  status: "active" | "executed" | "rejected" | "accepted"
}

export const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Cardano Smart Contract Security Framework",
    description:
      "Proposing to allocate 50,000 ADA from the treasury to fund the development of automated security audit tools for Cardano smart contracts using formal verification methods.",
    requestedAmount: 50000,
    duration: 8,
    milestones: ["Research Phase", "Framework Design", "Implementation", "Testing & Validation"],
    votingStart: "May 15, 2025 16:50",
    votingEnd: "May 15, 2025 16:53",
    votes: { for: 7750, against: 1500, abstain: 250 },
    totalVotes: 9500,
    quorum: 20000,
    status: "executed",
  },
  {
    id: "2",
    title: "Decentralized Identity Solutions",
    description:
      "Research and implementation of privacy-preserving decentralized identity solutions leveraging Cardano's UTXO model for enhanced user privacy.",
    requestedAmount: 75000,
    duration: 12,
    milestones: ["Literature Review", "Protocol Design", "Prototype Development", "Security Analysis", "Documentation"],
    votingStart: "May 15, 2025 16:45",
    votingEnd: "May 15, 2025 16:48",
    votes: { for: 0, against: 0, abstain: 0 },
    totalVotes: 0,
    quorum: 20000,
    status: "rejected",
  },
  {
    id: "3",
    title: "Add Multi-Language Documentation Support",
    description:
      "Proposing to add Spanish and French translations to the Cardano developer documentation to reach a wider international audience and improve accessibility.",
    requestedAmount: 25000,
    duration: 4,
    milestones: ["Translation Phase", "Technical Review", "Community Review", "Publishing"],
    votingStart: "May 14, 2025 22:55",
    votingEnd: "May 14, 2025 22:58",
    votes: { for: 2000, against: 5250, abstain: 180 },
    totalVotes: 7430,
    quorum: 20000,
    status: "rejected",
  },
  {
    id: "4",
    title: "Add Support for New DeFi Protocol Integration",
    description:
      "Proposing to add integration support for the XYZ DeFi Protocol to improve user access and provide additional liquidity options for the ecosystem.",
    requestedAmount: 35000,
    duration: 6,
    milestones: ["Integration Design", "Smart Contract Development", "Security Testing", "Deployment"],
    votingStart: "May 11, 2025 16:41",
    votingEnd: "May 11, 2025 16:44",
    votes: { for: 6250, against: 2750, abstain: 320 },
    totalVotes: 9320,
    quorum: 20000,
    status: "executed",
  },
  {
    id: "5",
    title: "Form Research Working Group for Legal Framework",
    description:
      "Proposing to form a dedicated working group to research legal frameworks for decentralized governance on Cardano and provide guidance for future proposals.",
    requestedAmount: 40000,
    duration: 10,
    milestones: ["Team Formation", "Legal Research", "Framework Draft", "Community Review", "Final Documentation"],
    votingStart: "May 11, 2025 10:30",
    votingEnd: "May 11, 2025 10:40",
    votes: { for: 5750, against: 2750, abstain: 210 },
    totalVotes: 8710,
    quorum: 20000,
    status: "executed",
  },
  {
    id: "6",
    title: "Add Support for Additional Hardware Wallets",
    description:
      "Proposing to add integration support for additional hardware wallet providers to improve user access, security, and adoption across different user preferences.",
    requestedAmount: 30000,
    duration: 5,
    milestones: ["Hardware Integration Research", "Development & Testing", "Security Audit", "Documentation & Release"],
    votingStart: "May 11, 2025 08:54",
    votingEnd: "May 11, 2025 14:54",
    votes: { for: 7500, against: 2250, abstain: 95 },
    totalVotes: 9845,
    quorum: 20000,
    status: "accepted",
  },
  {
    id: "7",
    title: "Community Art Contest Initiative",
    description:
      "Proposing to organize a community art contest to promote Cardano ecosystem creativity and engagement while showcasing the artistic talent within our community.",
    requestedAmount: 10000,
    duration: 3,
    milestones: ["Contest Setup", "Submission Period", "Judging Phase", "Awards Ceremony"],
    votingStart: "May 10, 2025 12:15",
    votingEnd: "May 10, 2025 16:20",
    votes: { for: 6800, against: 1200, abstain: 150 },
    totalVotes: 8150,
    quorum: 20000,
    status: "accepted",
  },
  {
    id: "8",
    title: "Upgrade Smart Contract Infrastructure",
    description:
      "Proposing to upgrade the core smart contract infrastructure to improve performance, reduce transaction costs, and enhance overall user experience on the platform.",
    requestedAmount: 85000,
    duration: 14,
    milestones: ["Architecture Review", "Development Phase", "Testing & QA", "Deployment", "Monitoring"],
    votingStart: "May 9, 2025 09:30",
    votingEnd: "May 9, 2025 15:45",
    votes: { for: 9100, against: 900, abstain: 200 },
    totalVotes: 10200,
    quorum: 20000,
    status: "executed",
  },
]
