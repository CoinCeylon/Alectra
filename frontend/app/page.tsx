"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/navbar";
import { ProposalCard } from "@/components/proposal-card";
import { ProposalDialog } from "@/components/proposal-dialog";
import { VoteConfirmationModal } from "@/components/vote-confirmation-modal";
import { mockProposals, type Proposal } from "@/data/mock-proposals";
import type { VoteModalData } from "@/types/vote-modal-data"; // Declare VoteModalData
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useWallet } from "@meshsdk/react";

export default function CardanoResearchDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [voteModal, setVoteModal] = useState<VoteModalData | null>(null);
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const { connected } = useWallet();

  const handleVote = (
    proposal: Proposal,
    voteType: "for" | "against" | "abstain"
  ) => {
    if (!connected) {
      toast.error("Please connect your wallet to vote", {
        description:
          "You need to connect your wallet to participate in voting.",
      });
      return;
    }
    setVoteModal({ proposal, voteType });
  };

  const confirmVote = () => {
    if (!voteModal) return;

    const updatedProposals = proposals.map((p) => {
      if (p.id === voteModal.proposal.id) {
        const newVotes = {
          ...p.votes,
          [voteModal.voteType]: p.votes[voteModal.voteType] + 1,
        };
        return {
          ...p,
          votes: newVotes,
          totalVotes: newVotes.for + newVotes.against + newVotes.abstain,
        };
      }
      return p;
    });

    setProposals(updatedProposals);
    setVoteModal(null);

    toast.success(`Your vote has been recorded as ${voteModal.voteType}`, {
      description: "Thank you for participating in the governance process.",
    });
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Active Proposals
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Current governance proposals across all chains
            </p>
          </div>
          <Button
            onClick={() => setIsProposalDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Proposal
          </Button>
        </div>

        {/* Proposals Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={handleVote}
            />
          ))}
        </div>

        <ProposalDialog
          isOpen={isProposalDialogOpen}
          onClose={() => setIsProposalDialogOpen(false)}
        />

        <VoteConfirmationModal
          voteModal={voteModal}
          onClose={() => setVoteModal(null)}
          onConfirm={confirmVote}
        />
      </main>
    </div>
  );
}
