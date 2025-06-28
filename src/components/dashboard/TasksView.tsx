"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Plus, Calendar, Clock, Flag, Filter, Search, MoreHorizontal } from "lucide-react"
import { Input } from "../ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate: string
  category: string
}

const TasksView = () => {
  const [filter, setFilter] = useState("today")
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review the new project proposal",
      completed: false,
      priority: "high",
      dueDate: "today",
      category: "work",
    },
    {
      id: "2",
      title: "End the user interface design",
      completed: true,
      priority: "medium",
      dueDate: "today",
      category: "design",
    },
    {
      id: "3",
      title: "Meeting with the development team",
      completed: false,
      priority: "high",
      dueDate: "tomorrow",
      category: "meetings",
    },
    {
      id: "4",
      title: "Write the monthly performance report",
      completed: false,
      priority: "medium",
      dueDate: "this week",
      category: "reports",
    },
    {
      id: "5",
      title: "Review the code",
      completed: true,
      priority: "low",
      dueDate: "today",
      category: "programming",
    },
  ])

  const filters = [
    { id: "today", label: "today", count: 2 },
    { id: "tomorrow", label: "tomorrow", count: 1 },
    { id: "week", label: "this week", count: 4 },
    { id: "completed", label: "completed", count: 2 },
  ]

  const toggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getPriorityBgColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900/30"
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/30"
      case "low":
        return "bg-green-100 dark:bg-green-900/30"
      default:
        return "bg-gray-100 dark:bg-gray-800"
    }
  }

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "today":
        return task.dueDate === "today"
      case "tomorrow":
        return task.dueDate === "tomorrow"
      case "week":
        return ["today", "tomorrow", "this week"].includes(task.dueDate)
      case "completed":
        return task.completed
      default:
        return true
    }
  })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tasks
          </h2>
          <p className="text-muted-foreground">Manage your daily tasks</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for a task..." className="w-full sm:w-64 pr-10" />
          </div>
          <Button className="space-x-2 space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4" />
            <span>New task</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filterItem) => (
              <Button
                key={filterItem.id}
                variant={filter === filterItem.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterItem.id)}
                className={`space-x-2 space-x-reverse ${filter === filterItem.id ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}`}
              >
                <span>{filterItem.label}</span>
                <span
                  className={`${filter === filterItem.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"} px-1.5 py-0.5 rounded-full text-xs`}
                >
                  {filterItem.count}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow border border-border/50 overflow-hidden">
              <div className={`w-1 h-full absolute right-0 ${getPriorityBgColor(task.priority)}`}></div>
              <CardContent className="p-4 pr-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className={`${task.completed ? "bg-blue-600 border-blue-600" : "border-2"}`}
                  />
                  <div className="flex-1 text-right">
                    <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Flag className={`w-3 h-3 ${getPriorityColor(task.priority)}`} />
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority === "high" ? "High" : task.priority === "medium" ? "Medium" : "Low"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full">{task.category}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Change priority</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground">No tasks found in this section yet</p>
          <Button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Add new task
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TasksView
