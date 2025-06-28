import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoalsSelector } from "./components/goals-selector";
import { CategorySelector } from "./components/category-selector";

export default function PillarsPage() {
  const [pillars, setPillars] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    goalName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPillars();
    fetchGoals();
  }, []);

  const fetchPillars = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pillars");
      const data = await res.json();
      setPillars(data);
    } catch (error) {
      console.error("Failed to fetch pillars:", error);
    }
  };

  const fetchGoals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/goals");
      const data = await res.json();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    }
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setFormData({ name: "", category: "", goalName: "" });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    try {
      const res = await fetch("http://localhost:3000/pillars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
        }),
      });

      if (res.ok) {
        const newPillar = await res.json();
        fetchPillars();
        setIsCreating(false);
        setFormData({ name: "", category: "", goalName: "" });

        if (formData.goalName) {
          navigate(
            `/goals?pillarId=${
              newPillar.id
            }&creating=true&goalName=${encodeURIComponent(formData.goalName)}`
          );
        }
      }
    } catch (error) {
      console.error("Failed to save pillar:", error);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim()) return;
    try {
      const res = await fetch("http://localhost:3000/pillars", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id }),
      });

      if (res.ok) {
        fetchPillars();
        setEditingId(null);
        setFormData({ name: "", category: "", goalName: "" });
      }
    } catch (error) {
      console.error("Failed to update pillar:", error);
    }
  };

  const handleEdit = (pillar: any) => {
    setEditingId(pillar.id);
    const pillarGoal = goals.find((g) => g.pillarId === pillar.id);
    setFormData({
      name: pillar.name,
      category: pillar.category,
      goalName: pillarGoal?.name || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this pillar?")) {
      try {
        await fetch(`http://localhost:3000/pillars?id=${id}`, {
          method: "DELETE",
        });
        fetchPillars();
      } catch (error) {
        console.error("Failed to delete pillar:", error);
      }
    }
  };

  const handleAddGoal = (pillarId: string) => {
    navigate(`/goals?pillarId=${pillarId}`);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({ name: "", category: "", goalName: "" });
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Pillars Management
          </CardTitle>
          <Button onClick={handleCreateClick} disabled={isCreating}>
            <Plus className="w-4 h-4 mr-2" />
            Create Pillar
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Goals</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isCreating && (
                <TableRow className="bg-blue-50">
                  <TableCell>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter pillar name"
                      autoFocus
                    />
                  </TableCell>
                  <TableCell>
                    <CategorySelector
                      value={formData.category}
                      onChange={(value:any) =>
                        setFormData({ ...formData, category: value })
                      }
                      placeholder="Select category"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Input
                        value={formData.goalName}
                        onChange={(e) =>
                          setFormData({ ...formData, goalName: e.target.value })
                        }
                        placeholder="Enter goal name"
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

              {pillars.map((pillar) => (
                <TableRow key={pillar.id}>
                  <TableCell>
                    {editingId === pillar.id ? (
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium">{pillar.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === pillar.id ? (
                      <CategorySelector
                        value={formData.category}
                        onChange={(value:any) =>
                          setFormData({ ...formData, category: value })
                        }
                      />
                    ) : (
                      pillar.category
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === pillar.id ? (
                      <GoalsSelector
                        value={formData.goalName}
                        onChange={(value:any) =>
                          setFormData({ ...formData, goalName: value })
                        }
                        pillarId={pillar.id}
                        onAddNew={() => handleAddGoal(pillar.id)}
                      />
                    ) : (
                      (() => {
                        const pillarGoals = goals.filter(
                          (g) => g.pillarId === pillar.id
                        );
                        if (pillarGoals.length === 0) {
                          return (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAddGoal(pillar.id)}
                              className="text-muted-foreground"
                            >
                              No goals - Click to add
                            </Button>
                          );
                        }
                        return (
                          <Select
                            onValueChange={(goalId) =>
                              navigate(`/objectives?goalId=${goalId}`)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select goal..." />
                            </SelectTrigger>
                            <SelectContent>
                              {pillarGoals.map((goal) => (
                                <SelectItem key={goal.id} value={goal.id}>
                                  {goal.name}
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
                      {editingId === pillar.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdate(pillar.id)}
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
                            onClick={() => handleEdit(pillar)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(pillar.id)}
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
