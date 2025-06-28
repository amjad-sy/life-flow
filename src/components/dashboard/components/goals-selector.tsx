"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GoalsSelectorProps {
  value: string
  onChange: (value: string) => void
  pillarId: string
  placeholder?: string
  onAddNew?: () => void
}

export function GoalsSelector({
  value,
  onChange,
  pillarId,
  placeholder = "Select goal",
  onAddNew,
}: GoalsSelectorProps) {
  const [goals, setGoals] = useState<any[]>([])

  useEffect(() => {
    fetchGoals()
  }, [pillarId])

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals")
      const data = await response.json()
      // Filter goals for this specific pillar
      const pillarGoals = data.filter((goal: any) => goal.pillarId === pillarId)
      setGoals(pillarGoals)
    } catch (error) {
      console.error("Failed to fetch goals:", error)
    }
  }

  return (
    <div className="flex gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {goals.map((goal) => (
            <SelectItem key={goal.id} value={goal.name}>
              {goal.name}
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
