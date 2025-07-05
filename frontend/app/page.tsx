"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { ProposalCard } from "@/components/proposal-card";
import { ProposalDialog } from "@/components/proposal-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { fetchProposals } from "@/lib/getProposals";
import { Proposal } from "@/types/types";

export default function CardanoResearchDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProposals() {
      try {
        const result = await fetchProposals();
        setProposals(result.filter((proposal): proposal is Proposal => proposal !== null));
      } catch (err) {
        console.error("❌ Failed to load proposals", err);
      } finally {
        setLoading(false);
      }
    }

    getProposals();
  }, []);

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
        {/* Header */}
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

        {/* Proposals List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading proposals...</p>
          ) : proposals.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No proposals found.</p>
          ) : (
            proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))
          )}
        </div>

        <ProposalDialog
          isOpen={isProposalDialogOpen}
          onClose={() => setIsProposalDialogOpen(false)}
        />
      </main>
    </div>
  );
}
