"use client"

import type React from "react"

import { useAuth } from "../contexts/AuthContext";

import { Navigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface PublicRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, redirectTo = "/dashboard" }) => {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-blue-600" />
        </motion.div>
      </motion.div>
    )
  }

  // Allow access to landing page even when logged in
  if (user && location.pathname !== "/") {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

export default PublicRoute
