import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Edit, Trash2, ArrowLeft, Plus, Check, X } from "lucide-react";

export default function ObjectivesPage() {
  const [objectives, setObjectives] = useState<any[]>([]);
  const [pillars, setPillars] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "Active" as const,
    priority: "Medium" as const,
    pillarId: "",
    goalId: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Parse search params with URLSearchParams
  const searchParams = new URLSearchParams(location.search);
  const goalId = searchParams.get("goalId") || "";
  const creating = searchParams.get("creating");

  useEffect(() => {
    fetchObjectives();
    fetchPillars();
    fetchGoals();
  }, []);

  useEffect(() => {
    if (goalId && goals.length > 0) {
      const goal = goals.find((g) => g.id === goalId);
      if (goal) {
        setFormData((prev) => ({
          ...prev,
          goalId,
          pillarId: goal.pillarId,
        }));

        if (creating === "true") {
          setIsCreating(true);
        }
      }
    }
  }, [goalId, goals, creating]);

  const fetchObjectives = async () => {
    try {
      const response = await fetch("/api/objectives");
      const data = await response.json();
      setObjectives(data);
    } catch (error) {
      console.error("Failed to fetch objectives:", error);
    }
  };

  const fetchPillars = async () => {
    try {
      const response = await fetch("/api/pillars");
      const data = await response.json();
      setPillars(data);
    } catch (error) {
      console.error("Failed to fetch pillars:", error);
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    }
  };

  const getPillarName = (pillarId: string) => {
    return pillars.find((p) => p.id === pillarId)?.name || "Unknown";
  };

  const getGoalName = (goalId: string) => {
    return goals.find((g) => g.id === goalId)?.name || "Unknown";
  };

  const getFilteredGoals = (pillarId: string) => {
    return goals.filter((goal) => goal.pillarId === pillarId);
  };

  const filteredObjectives = goalId
    ? objectives.filter((obj) => obj.goalId === goalId)
    : objectives;

  const handleCreateClick = () => {
    setIsCreating(true);
    const goal = goals.find((g) => g.id === goalId);
    setFormData({
      name: "",
      status: "Active",
      priority: "Medium",
      pillarId: goal?.pillarId || "",
      goalId: goalId || "",
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    try {
      const response = await fetch("/api/objectives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchObjectives();
        setIsCreating(false);
        const goal = goals.find((g) => g.id === goalId);
        setFormData({
          name: "",
          status: "Active",
          priority: "Medium",
          pillarId: goal?.pillarId || "",
          goalId: goalId || "",
        });
      }
    } catch (error) {
      console.error("Failed to save objective:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim()) return;

    try {
      const response = await fetch("/api/objectives", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id }),
      });

      if (response.ok) {
        fetchObjectives();
        setEditingId(null);
        const goal = goals.find((g) => g.id === goalId);
        setFormData({
          name: "",
          status: "Active",
          priority: "Medium",
          pillarId: goal?.pillarId || "",
          goalId: goalId || "",
        });
      }
    } catch (error) {
      console.error("Failed to update objective:", error);
    }
  };

  const handleEdit = (objective: any) => {
    setEditingId(objective.id);
    setFormData({
      name: objective.name,
      status: objective.status,
      priority: objective.priority,
      pillarId: objective.pillarId,
      goalId: objective.goalId,
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this objective?")) {
      try {
        await fetch(`/api/objectives?id=${id}`, { method: "DELETE" });
        fetchObjectives();
      } catch (error) {
        console.error("Failed to delete objective:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    const goal = goals.find((g) => g.id === goalId);
    setFormData({
      name: "",
      status: "Active",
      priority: "Medium",
      pillarId: goal?.pillarId || "",
      goalId: goalId || "",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/goals")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Goals
            </Button>
            <CardTitle className="text-2xl font-bold">
              Objectives Management
              {goalId && (
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  for {getGoalName(goalId)}
                </span>
              )}
            </CardTitle>
          </div>
          <Button onClick={handleCreateClick} disabled={isCreating}>
            <Plus className="w-4 h-4 mr-2" />
            Create Objective
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Pillar</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Creating new objective row */}
              {isCreating && (
                <TableRow className="bg-blue-50">
                  <TableCell>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter objective name"
                      autoFocus
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Next">Next</SelectItem>
                        <SelectItem value="Paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={formData.pillarId}
                      onValueChange={(value) => {
                        setFormData({
                          ...formData,
                          pillarId: value,
                          goalId: "",
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pillar" />
                      </SelectTrigger>
                      <SelectContent>
                        {pillars.map((pillar) => (
                          <SelectItem key={pillar.id} value={pillar.id}>
                            {pillar.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={formData.goalId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, goalId: value })
                      }
                      disabled={!formData.pillarId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {getFilteredGoals(formData.pillarId).map((goal) => (
                          <SelectItem key={goal.id} value={goal.id}>
                            {goal.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Existing objectives */}
              {filteredObjectives.map((objective) => (
                <TableRow key={objective.id}>
                  <TableCell>
                    {editingId === objective.id ? (
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium">{objective.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === objective.id ? (
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Next">Next</SelectItem>
                          <SelectItem value="Paused">Paused</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          objective.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : objective.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : objective.status === "Next"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {objective.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === objective.id ? (
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, priority: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          objective.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : objective.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {objective.priority}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{getPillarName(objective.pillarId)}</TableCell>
                  <TableCell>{getGoalName(objective.goalId)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {editingId === objective.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdate(objective.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancel}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(objective)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(objective.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
