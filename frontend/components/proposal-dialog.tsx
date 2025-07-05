"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { MilestoneSelector } from "@/components/milestone-selector";
import { useWallet } from "@meshsdk/react";

interface ProposalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    description: string;
    requestedAmount: string;
    duration: string;
    milestones: string[];
  }) => void;
}

export function ProposalDialog({
  isOpen,
  onClose,
  onSubmit,
}: ProposalDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requestedAmount: "",
    duration: "",
  });
  const [selectedMilestones, setSelectedMilestones] = useState<string[]>([]);
  const { connected } = useWallet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      milestones: selectedMilestones,
    });
    setFormData({
      title: "",
      description: "",
      requestedAmount: "",
      duration: "",
    });
    setSelectedMilestones([]);
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      requestedAmount: "",
      duration: "",
    });
    setSelectedMilestones([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Proposal
          </DialogTitle>
          <DialogDescription>
            Submit a research proposal for community funding
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Research proposal title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed description of your research proposal"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount (ADA)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.requestedAmount}
                onChange={(e) =>
                  setFormData({ ...formData, requestedAmount: e.target.value })
                }
                placeholder="50000"
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (months)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="6"
                required
              />
            </div>
          </div>

          <MilestoneSelector
            selectedMilestones={selectedMilestones}
            onMilestonesChange={setSelectedMilestones}
          />

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!connected || selectedMilestones.length === 0}
            >
              {connected ? "Submit Proposal" : "Connect Wallet to Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
