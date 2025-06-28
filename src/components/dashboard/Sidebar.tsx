"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Eye,
  Target,
  FolderOpen,
  CheckSquare,
  Zap,
  Calendar,
  BarChart3,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const sidebarItems = [
  { id: "actionZone", label: "Action Zone", icon: Eye },
  { id: "pillars", label: "Pillars", icon: Calendar },
  { id: "goals", label: "Goals", icon: Target },
  { id: "objectives", label: "Objectives", icon: Zap },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
];

const containerVariants = {
  open: {
    width: 256,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    width: 80,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    opacity: 0,
    x: -50,
    transition: {
      x: { stiffness: 1000 },
    },
  },
};



const Sidebar = ({
  activeSection,
  setActiveSection,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <motion.aside
        initial={false}
        animate={isCollapsed ? "closed" : "open"}
        variants={containerVariants}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-background border-r border-border shadow-lg overflow-hidden",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-2 border-b border-border">
          <motion.div 
            className="flex items-center gap-2 overflow-hidden"
            initial={false}
            animate={{
              width: isCollapsed ? '0' : 'auto',
              opacity: isCollapsed ? 0 : 1,
              x: isCollapsed ? -20 : 0,
            }}
            transition={{ 
              duration: 0.2,
              delay: isCollapsed ? 0 : 0.1 
            }}
          >
            <Zap className="w-5 h-5 flex-shrink-0 text-primary" />
            <motion.h2 
              className="text-xl font-semibold whitespace-nowrap bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Flow Focus
            </motion.h2>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-accent"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Sidebar Content */}
        <nav className="flex-1 overflow-y-auto py-4">
          <motion.ul
            className="space-y-2 px-2"
            initial={false}
            animate={isCollapsed ? "closed" : "open"}
          >
            <AnimatePresence>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.li
                    key={item.id}
                    variants={!isCollapsed ? itemVariants : {}}
                    whileHover={!isCollapsed ? { scale: 1.02, x: 5 } : { scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex items-center rounded-lg cursor-pointer transition-all",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent/50",
                      isCollapsed ? "justify-center p-3" : "px-4 py-3"
                    )}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (window.innerWidth < 1024) {
                        setIsCollapsed(true);
                      }
                    }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className="flex items-center justify-center w-6 h-6">
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    {!isCollapsed && (
                      <motion.span
                        className="ml-3 text-sm font-medium whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2 border-t border-border">
          <motion.div
            className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}
            initial={false}
            animate={isCollapsed ? "closed" : "open"}
          >
            {!isCollapsed ? (
              <motion.div
                variants={itemVariants}
                className="flex items-center w-full"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-primary" />
                </div>
                <span className="ml-3 text-sm font-medium">Settings</span>
              </motion.div>
            ) : (
              <button
                className="p-2 rounded-full hover:bg-accent/50"
                onClick={() => setActiveSection("settings")}
                title="Settings"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
