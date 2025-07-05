"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, ThumbsDown, Minus, Clock, Target, Calendar, Coins } from "lucide-react"
import type { Proposal } from "@/data/mock-proposals"
import { useWallet } from "@meshsdk/react"

interface ProposalCardProps {
  proposal: Proposal
  onVote: (proposal: Proposal, voteType: "for" | "against" | "abstain") => void
}

export function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  const { connected } = useWallet();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "executed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0
  }

  const forPercentage = getVotePercentage(proposal.votes.for, proposal.totalVotes)
  const againstPercentage = getVotePercentage(proposal.votes.against, proposal.totalVotes)
  const abstainPercentage = getVotePercentage(proposal.votes.abstain, proposal.totalVotes)

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
            {proposal.title}
          </CardTitle>
          <Badge
            className={`${getStatusColor(proposal.status)} text-xs font-medium px-2 py-1 rounded-full capitalize ml-4`}
          >
            {proposal.status}
          </Badge>
        </div>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {proposal.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Proposal Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Requested</p>
              <p className="font-semibold">{proposal.requestedAmount.toLocaleString()} ADA</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">{proposal.duration} months</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Voting Ends</p>
              <p className="font-semibold text-xs">{proposal.votingEnd}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Milestones</p>
              <p className="font-semibold">{proposal.milestones.length}</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Milestones:</p>
          <div className="flex flex-wrap gap-2">
            {proposal.milestones.map((milestone, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {milestone}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Voting Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Current Votes</h4>
            <span className="text-sm text-gray-500">{proposal.totalVotes.toLocaleString()} total votes</span>
          </div>

          {/* Vote Progress Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-600 font-medium">For ({proposal.votes.for.toLocaleString()})</span>
                <span className="text-green-600">{forPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={forPercentage} className="h-2 bg-gray-200">
                <div
                  className="h-full bg-green-500 transition-all duration-300 ease-in-out rounded-full"
                  style={{ width: `${forPercentage}%` }}
                />
              </Progress>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-600 font-medium">Against ({proposal.votes.against.toLocaleString()})</span>
                <span className="text-red-600">{againstPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={againstPercentage} className="h-2 bg-gray-200">
                <div
                  className="h-full bg-red-500 transition-all duration-300 ease-in-out rounded-full"
                  style={{ width: `${againstPercentage}%` }}
                />
              </Progress>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Abstain ({proposal.votes.abstain.toLocaleString()})</span>
                <span className="text-gray-600">{abstainPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={abstainPercentage} className="h-2 bg-gray-200">
                <div
                  className="h-full bg-gray-500 transition-all duration-300 ease-in-out rounded-full"
                  style={{ width: `${abstainPercentage}%` }}
                />
              </Progress>
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total: {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} (
            {((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}%)
          </div>

          {/* Timestamps */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Start: {proposal.votingStart}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>End: {proposal.votingEnd}</span>
            </div>
          </div>

          {/* Voting Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => onVote(proposal, "for")}
              variant="ghost"
              size="sm"
              className="flex-1 text-green-600 hover:bg-green-50 border border-green-200 hover:border-green-300"
              disabled={!connected}
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Vote For
            </Button>

            <Button
              onClick={() => onVote(proposal, "against")}
              variant="ghost"
              size="sm"
              className="flex-1 text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300"
              disabled={!connected}
            >
              <ThumbsDown className="w-4 h-4 mr-2" />
              Vote Against
            </Button>

            <Button
              onClick={() => onVote(proposal, "abstain")}
              variant="ghost"
              size="sm"
              className="flex-1 text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
              disabled={!connected}
            >
              <Minus className="w-4 h-4 mr-2" />
              Abstain
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
