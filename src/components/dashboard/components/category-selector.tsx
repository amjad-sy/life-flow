"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface CategorySelectorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function CategorySelector({ value, onChange, placeholder = "Select category" }: CategorySelectorProps) {
  const [categories, setCategories] = useState<any[]>([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) return

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      })
      const newCategory = await response.json()
      setCategories([...categories, newCategory])
      onChange(newCategory.name)
      setNewCategoryName("")
      setIsAddingNew(false)
    } catch (error) {
      console.error("Failed to add category:", error)
    }
  }

  if (isAddingNew) {
    return (
      <div className="flex gap-2">
        <Input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter new category"
          onKeyDown={(e) => e.key === "Enter" && handleAddNewCategory()}
        />
        <Button onClick={handleAddNewCategory} size="sm">
          Add
        </Button>
        <Button onClick={() => setIsAddingNew(false)} variant="outline" size="sm">
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={() => setIsAddingNew(true)} variant="outline" size="sm">
        New
      </Button>
    </div>
  )
}
