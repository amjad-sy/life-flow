"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface ObjectivesSelectorProps {
  value: string
  onChange: (value: string) => void
  goalId: string
  placeholder?: string
  onAddNew?: () => void
}

export function ObjectivesSelector({
  value,
  onChange,
  goalId,
  placeholder = "Select objective",
  onAddNew,
}: ObjectivesSelectorProps) {
  const [objectives, setObjectives] = useState<any[]>([])

  useEffect(() => {
    fetchObjectives()
  }, [goalId])

  const fetchObjectives = async () => {
    try {
      const response = await fetch("/api/objectives")
      const data = await response.json()
      // Filter objectives for this specific goal
      const goalObjectives = data.filter((objective: any) => objective.goalId === goalId)
      setObjectives(goalObjectives)
    } catch (error) {
      console.error("Failed to fetch objectives:", error)
    }
  }

  return (
    <div className="flex gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {objectives.map((objective) => (
            <SelectItem key={objective.id} value={objective.name}>
              {objective.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={onAddNew} variant="outline" size="sm">
        New
      </Button>
    </div>
  )
}
