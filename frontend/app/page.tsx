"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { ProposalCard } from "@/components/proposal-card"
import { ProposalDialog } from "@/components/proposal-dialog"
import { VoteConfirmationModal } from "@/components/vote-confirmation-modal"
import { mockProposals, type Proposal } from "@/data/mock-proposals"
import type { VoteModalData } from "@/types/vote-modal-data" // Declare VoteModalData
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CardanoResearchDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals)
  const [voteModal, setVoteModal] = useState<VoteModalData | null>(null)
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false)

  const connectWallet = async () => {
    setTimeout(() => {
      setIsWalletConnected(true)
      setWalletAddress(
        "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a6gtmk4l3aq4s66hrl",
      )
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Cardano wallet",
      })
    }, 1000)
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
    toast({
      title: "Wallet Disconnected",
      description: "Wallet has been disconnected",
    })
  }

  const handleSubmitProposal = (formData: {
    title: string
    description: string
    requestedAmount: string
    duration: string
    milestones: string[]
  }) => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to submit a proposal",
        variant: "destructive",
      })
      return
    }

    const newProposal: Proposal = {
      id: (proposals.length + 1).toString(),
      title: formData.title,
      description: formData.description,
      requestedAmount: Number.parseInt(formData.requestedAmount),
      duration: Number.parseInt(formData.duration),
      milestones: formData.milestones, // Already an array now
      votingStart: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      votingEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      votes: { for: 0, against: 0, abstain: 0 },
      totalVotes: 0,
      quorum: 20000,
      status: "active",
    }

    setProposals([newProposal, ...proposals])
    setIsProposalDialogOpen(false)

    toast({
      title: "Proposal Submitted",
      description: "Your research proposal has been submitted successfully",
    })
  }

  const handleVote = (proposal: Proposal, voteType: "for" | "against" | "abstain") => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      })
      return
    }
    setVoteModal({ proposal, voteType })
  }

  const confirmVote = () => {
    if (!voteModal) return

    const updatedProposals = proposals.map((p) => {
      if (p.id === voteModal.proposal.id) {
        const newVotes = {
          ...p.votes,
          [voteModal.voteType]: p.votes[voteModal.voteType] + 1,
        }
        return {
          ...p,
          votes: newVotes,
          totalVotes: newVotes.for + newVotes.against + newVotes.abstain,
        }
      }
      return p
    })

    setProposals(updatedProposals)
    setVoteModal(null)

    toast({
      title: "Vote Submitted",
      description: `Your ${voteModal.voteType} vote has been recorded`,
    })
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}>
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Proposals</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Current governance proposals across all chains</p>
          </div>
          <Button
            onClick={() => setIsProposalDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!isWalletConnected}
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
              isWalletConnected={isWalletConnected}
              onVote={handleVote}
            />
          ))}
        </div>

        <ProposalDialog
          isOpen={isProposalDialogOpen}
          onClose={() => setIsProposalDialogOpen(false)}
          onSubmit={handleSubmitProposal}
          isWalletConnected={isWalletConnected}
        />

        <VoteConfirmationModal voteModal={voteModal} onClose={() => setVoteModal(null)} onConfirm={confirmVote} />
      </main>
    </div>
  )
}
