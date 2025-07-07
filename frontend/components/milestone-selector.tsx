"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronDown, Plus, X } from "lucide-react"
import { MILESTONE_OPTIONS } from "@/data/milestone-options"

interface MilestoneSelectorProps {
  selectedMilestones: string[]
  onMilestonesChange: (milestones: string[]) => void
}

export function MilestoneSelector({ selectedMilestones, onMilestonesChange }: MilestoneSelectorProps) {
  const [open, setOpen] = useState(false)
  const [customMilestone, setCustomMilestone] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  const toggleMilestone = (milestone: string) => {
    if (selectedMilestones.includes(milestone)) {
      onMilestonesChange(selectedMilestones.filter((m) => m !== milestone))
    } else {
      onMilestonesChange([...selectedMilestones, milestone])
    }
  }

  const removeMilestone = (milestone: string) => {
    onMilestonesChange(selectedMilestones.filter((m) => m !== milestone))
  }

  const addCustomMilestone = () => {
    if (customMilestone.trim() && !selectedMilestones.includes(customMilestone.trim())) {
      onMilestonesChange([...selectedMilestones, customMilestone.trim()])
      setCustomMilestone("")
      setShowCustomInput(false)
    }
  }

  return (
    <div className="space-y-3">
      <Label>Milestones</Label>

      {/* Selected Milestones */}
      {selectedMilestones.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedMilestones.map((milestone) => (
            <Badge key={milestone} variant="secondary" className="flex items-center gap-1 px-2 py-1">
              {milestone}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeMilestone(milestone)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Milestone Selector */}
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex-1 justify-between bg-transparent"
            >
              Select milestones...
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search milestones..." />
              <CommandList>
                <CommandEmpty>No milestone found.</CommandEmpty>
                <CommandGroup>
                  {MILESTONE_OPTIONS.map((milestone) => (
                    <CommandItem
                      key={milestone}
                      value={milestone}
                      onSelect={() => {
                        toggleMilestone(milestone)
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          selectedMilestones.includes(milestone) ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {milestone}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowCustomInput(!showCustomInput)}
          title="Add custom milestone"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Custom Milestone Input */}
      {showCustomInput && (
        <div className="flex gap-2">
          <Input
            placeholder="Enter custom milestone..."
            value={customMilestone}
            onChange={(e) => setCustomMilestone(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomMilestone()
              }
            }}
          />
          <Button onClick={addCustomMilestone} size="sm">
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowCustomInput(false)
              setCustomMilestone("")
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      <p className="text-sm text-gray-500">
        Select from predefined milestones or add custom ones. Selected: {selectedMilestones.length}
      </p>
    </div>
  )
}
