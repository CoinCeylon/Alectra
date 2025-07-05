"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Proposal } from "@/data/mock-proposals"

interface VoteModalData {
  proposal: Proposal
  voteType: "for" | "against" | "abstain"
}

interface VoteConfirmationModalProps {
  voteModal: VoteModalData | null
  onClose: () => void
  onConfirm: () => void
}

export function VoteConfirmationModal({ voteModal, onClose, onConfirm }: VoteConfirmationModalProps) {
  return (
    <Dialog open={!!voteModal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Your Vote</DialogTitle>
          <DialogDescription>Please review your vote before submitting to the blockchain.</DialogDescription>
        </DialogHeader>

        {voteModal && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">{voteModal.proposal.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {voteModal.proposal.description.slice(0, 100)}...
              </p>

              <div className="flex items-center justify-between text-sm">
                <span>Your vote:</span>
                <Badge
                  variant={
                    voteModal.voteType === "for"
                      ? "default"
                      : voteModal.voteType === "against"
                        ? "destructive"
                        : "secondary"
                  }
                  className="capitalize"
                >
                  {voteModal.voteType}
                </Badge>
              </div>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-800 text-xs font-bold">!</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Transaction Fee Required</p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Voting requires a wallet signature and a small ADA transaction fee (~0.17 ADA) to record your vote
                    on the blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm Vote & Sign Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
