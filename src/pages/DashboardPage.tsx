"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import Sidebar from "../components/dashboard/Sidebar"
import TopNavbar from "../components/dashboard/TopNavbar"
import TasksView from "../components/dashboard/TasksView"
import ProjectsOverview from "../components/dashboard/ProjectsOverview"
import { Eye, Target, Zap, BoxIcon as Button, Loader2 } from "lucide-react"
import PillarsPage from "../components/dashboard/PillarsPage"
import GoalsPage from "../components/dashboard/GoalsPage"
import ObjectivesPage from "../components/dashboard/ObjectivesPage"

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("actionZone")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('User not authenticated, redirecting to login...')
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "pillars":
        return <PillarsPage key="pillars" />
      case "actionZone":
        return (
          <motion.div
            key="Action zone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-20 dark:bg-gray-900 z-50"
          >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Action zone
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Action zone is under development. Here you will be able to set your long-term vision and your major goals.
            </p>
            <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600">Explore the feature</Button>
          </motion.div>
        )
      case "goals":
        return <GoalsPage key="goals" />
      case "projects":
        return <ProjectsOverview key="projects" />
      case "tasks":
        return <TasksView key="tasks" />
      case "objectives":
        return <ObjectivesPage key="objectives" />
      default:
        return <TasksView key="tasks" />
    }
  }
  return (
    <div className="min-h-screen bg-background" dir="ltr">
      <div className="flex h-screen">
        {/* Sidebar - Fixed position */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />

        {/* Main Content - Will be pushed by sidebar */}
        <motion.div 
          className="flex-1 flex flex-col overflow-hidden"
          initial={false}
          animate={{
            marginLeft: sidebarCollapsed ? '4rem' : '16rem', // 64px when collapsed, 256px when expanded
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Top Navbar */}
          <TopNavbar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6 bg-background/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
            </div>
          </main>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage
