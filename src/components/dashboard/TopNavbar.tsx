"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";

// Helper to parse query params
const useQuery = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, Sun, Moon, LogOut, User, Settings, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
interface TopNavbarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const TopNavbar = ({ isCollapsed, setIsCollapsed }: TopNavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Update search input when URL params change
  useEffect(() => {
    const search = query.get('q') || '';
    setSearchQuery(search);
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    
    // Update the URL without causing a full page reload
    const queryString = params.toString();
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ''}`, { replace: true });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm"
    >
      {/* Left side */}
      <div className="flex items-center space-x-4 space-x-reverse">
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Dashboard
        </motion.h1>
      </div>

      {/* Search Bar - Center */}
      <form onSubmit={handleSearch} className="hidden md:flex max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-2 bg-background/60 border-muted focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Escape') {
                setSearchQuery('');
                const params = new URLSearchParams(location.search);
                params.delete('q');
                navigate(`${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
              }
            }}
          />
        </div>
      </form>

      {/* Right side */}
      <div className="flex items-center space-x-4 space-x-reverse">
        {/* Theme Toggle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-2 space-x-reverse bg-background/80 p-1 rounded-full border border-border"
        >
          <Sun className={`w-4 h-4 ${theme === "light" ? "text-yellow-500" : "text-muted-foreground"}`} />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-blue-600"
          />
          <Moon className={`w-4 h-4 ${theme === "dark" ? "text-blue-400" : "text-muted-foreground"}`} />
        </motion.div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full border-2 border-blue-200 dark:border-blue-800 p-0"
            >
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=6366f1&color=fff`
                }
                alt={user?.name || "User"}
                className="h-full w-full rounded-full object-cover"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1 text-right">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  )
}

export default TopNavbar
