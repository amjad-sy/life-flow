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
import { CategorySelector } from "./components/category-selector";
import { ObjectivesSelector } from "./components/objectives-selector";


export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [pillars, setPillars] = useState<any[]>([]);
  const [objectives, setObjectives] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "Active" as const,
    category: "",
    pillarId: "",
    objectiveName: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pillarId = searchParams.get("pillarId") || "";
  const creating = searchParams.get("creating") || "";
  const goalName = searchParams.get("goalName") || "";

  useEffect(() => {
    fetchGoals();
    fetchPillars();
    fetchObjectives();
  }, []);

  useEffect(() => {
    if (pillarId && pillars.length > 0) {
      setFormData((prev) => ({
        ...prev,
        pillarId,
        name: goalName ? decodeURIComponent(goalName) : prev.name,
      }));

      // Auto-start creating if coming from pillar creation
      if (creating === "true") {
        setIsCreating(true);
      }
    }
  }, [pillarId, pillars, creating, goalName]);

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
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

  const fetchObjectives = async () => {
    try {
      const response = await fetch("/api/objectives");
      const data = await response.json();
      setObjectives(data);
    } catch (error) {
      console.error("Failed to fetch objectives:", error);
    }
  };

  const getObjectivesCount = (goalId: string) => {
    return objectives.filter((obj) => obj.goalId === goalId).length;
  };

  const getPillarName = (id: string) => {
    return pillars.find((p) => p.id === id)?.name || "Unknown";
  };

  const filteredGoals = pillarId
    ? goals.filter((goal) => goal.pillarId === pillarId)
    : goals;

  const handleCreateClick = () => {
    setIsCreating(true);
    setFormData({
      name: "",
      status: "Active",
      category: "",
      pillarId: pillarId || "",
      objectiveName: "",
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          status: formData.status,
          category: formData.category,
          pillarId: formData.pillarId,
        }),
      });

      if (response.ok) {
        const newGoal = await response.json();
        fetchGoals();
        setIsCreating(false);
        setFormData({
          name: "",
          status: "Active",
          category: "",
          pillarId: pillarId || "",
          objectiveName: "",
        });

        // Navigate to objectives page if objectiveName was provided
        if (formData.objectiveName) {
          navigate(
            `/objectives?goalId=${
              newGoal.id
            }&creating=true&objectiveName=${encodeURIComponent(
              formData.objectiveName
            )}`
          );
        }
      }
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim()) return;

    try {
      const response = await fetch("/api/goals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: formData.name,
          status: formData.status,
          category: formData.category,
          pillarId: formData.pillarId,
        }),
      });

      if (response.ok) {
        fetchGoals();
        setEditingId(null);
        setFormData({
          name: "",
          status: "Active",
          category: "",
          pillarId: pillarId || "",
          objectiveName: "",
        });
      }
    } catch (error) {
      console.error("Failed to update goal:", error);
    }
  };

  const handleEdit = (goal: any) => {
    setEditingId(goal.id);
    const goalObjective = objectives.find((obj) => obj.goalId === goal.id);
    setFormData({
      name: goal.name,
      status: goal.status,
      category: goal.category,
      pillarId: goal.pillarId,
      objectiveName: goalObjective?.name || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await fetch(`/api/goals?id=${id}`, { method: "DELETE" });
        fetchGoals();
      } catch (error) {
        console.error("Failed to delete goal:", error);
      }
    }
  };

  const handleAddObjective = (goalId: string) => {
    navigate(`/objectives?goalId=${goalId}`);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      name: "",
      status: "Active",
      category: "",
      pillarId: pillarId || "",
      objectiveName: "",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/pillars")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pillars
            </Button>
            <CardTitle className="text-2xl font-bold">
              Goals Management
              {pillarId && (
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  for {getPillarName(pillarId)}
                </span>
              )}
            </CardTitle>
          </div>
          <Button onClick={handleCreateClick} disabled={isCreating}>
            <Plus className="w-4 h-4 mr-2" />
            Create Goal
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Pillar</TableHead>
                <TableHead>Objectives</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Creating new goal row */}
              {isCreating && (
                <TableRow className="bg-blue-50">
                  <TableCell>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter goal name"
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
                    <CategorySelector
                      value={formData.category}
                      onChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                      placeholder="Select category"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={formData.pillarId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, pillarId: value })
                      }
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
                    <div className="flex gap-2">
                      <Input
                        value={formData.objectiveName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            objectiveName: e.target.value,
                          })
                        }
                        placeholder="Enter objective name"
                      />
                      <Button variant="outline" size="sm" onClick={handleSave}>
                        New
                      </Button>
                    </div>
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

              {/* Existing goals */}
              {filteredGoals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>
                    {editingId === goal.id ? (
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium">{goal.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === goal.id ? (
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
                          goal.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : goal.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : goal.status === "Next"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {goal.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === goal.id ? (
                      <CategorySelector
                        value={formData.category}
                        onChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      />
                    ) : (
                      goal.category
                    )}
                  </TableCell>
                  <TableCell>{getPillarName(goal.pillarId)}</TableCell>
                  <TableCell>
                    {editingId === goal.id ? (
                      <ObjectivesSelector
                        value={formData.objectiveName}
                        onChange={(value) =>
                          setFormData({ ...formData, objectiveName: value })
                        }
                        goalId={goal.id}
                        onAddNew={() => handleAddObjective(goal.id)}
                      />
                    ) : (
                      (() => {
                        const goalObjectives = objectives.filter(
                          (obj) => obj.goalId === goal.id
                        );

                        if (goalObjectives.length === 0) {
                          return (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAddObjective(goal.id)}
                              className="text-muted-foreground"
                            >
                              No objectives - Click to add
                            </Button>
                          );
                        }

                        return (
                          <Select
                            onValueChange={(objectiveId) => {
                              // You can add navigation or action here if needed
                              console.log("Selected objective:", objectiveId);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select objective..." />
                            </SelectTrigger>
                            <SelectContent>
                              {goalObjectives.map((objective) => (
                                <SelectItem
                                  key={objective.id}
                                  value={objective.id}
                                >
                                  {objective.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      })()
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {editingId === goal.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdate(goal.id)}
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
                            onClick={() => handleEdit(goal)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(goal.id)}
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
