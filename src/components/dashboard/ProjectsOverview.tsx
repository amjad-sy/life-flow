"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Calendar,
  Users,
  Plus,
  Clock,
  BarChart3,
  Target,
  ArrowRight,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: "active" | "completed" | "paused";
}

const addProjectFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  progress: z.number().min(0).max(100),
  dueDate: z.string(),
  status: z.enum(["active", "completed", "paused"]),
});

type AddProjectFormValues = z.infer<typeof addProjectFormSchema>;

const ProjectsOverview = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Task management app",
      description: "Developing a web application for task and project management",
      progress: 75,
      dueDate: "15 December 2024",
      status: "active",
    },
    {
      id: "2",
      title: "New company website",
      description: "Redesign and development of the company website",
      progress: 45,
      dueDate: "30 January 2025",
      status: "active",
    },
    {
      id: "3",
      title: "Content management system",
      description: "Building a custom content management system",
      progress: 90,
      dueDate: "10 December 2024",
      status: "active",
    },
  ]);

  const [open, setOpen] = useState(false);
  const form = useForm<AddProjectFormValues>({
    resolver: zodResolver(addProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      progress: 0,
      dueDate: "",
      status: "active",
    },
  });

  const onSubmit = (data: AddProjectFormValues) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      progress: data.progress,
      dueDate: data.dueDate,
      status: data.status,
    };

    setProjects((prev) => [...prev, newProject]);
    setOpen(false);
    form.reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case "completed":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
      case "paused":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      case "paused":
        return "Paused";
      default:
        return "Not defined";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 40) return "bg-blue-500";
    return "bg-yellow-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Active Projects
          </h2>
          <p className="text-muted-foreground">Overview of your current projects</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="space-x-2 space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="progress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Progress (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <select
                        {...field}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="paused">Paused</option>
                      </select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Project</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: Target,
            title: "Active Projects",
            value: projects.length.toString(),
            color: "bg-blue-500",
          },
          {
            icon: BarChart3,
            title: "Average Progress",
            value: projects.reduce((acc, p) => acc + p.progress, 0) / projects.length + "%",
            color: "bg-green-500",
          },
          {
            icon: Clock,
            title: "Delayed Projects",
            value: projects.filter(p => p.status === "paused").length.toString(),
            color: "bg-red-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-md overflow-hidden">
              <div className={`h-1 w-full ${stat.color}`}></div>
              <CardContent className="p-8 flex justify-between items-center">
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${stat.color} bg-opacity-20`}
                >
                  <stat.icon
                    className={`w-8 h-8 ${stat.color.replace("bg-", "text-")}`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md overflow-hidden">
              <div
                className={`h-1 w-full ${getProgressColor(project.progress)}`}
              ></div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-right">
                    {project.title}
                  </CardTitle>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {getStatusText(project.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground text-right">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 pb-0">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{project.progress}%</span>
                    <span className="text-muted-foreground">Progress</span>
                  </div>
                  <Progress
                    value={project.progress}
                    className="h-2"
                  />
                </div>

                {/* Project Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{project.dueDate}</span>
                    </div>
                    <span className="text-muted-foreground">
                      Due Date
                    </span>
                  </div>
                </div>
              </CardContent>

              {/* Action Button */}
              <CardFooter className="pt-4">
                <Button
                  variant="outline"
                  className="w-full group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsOverview;
