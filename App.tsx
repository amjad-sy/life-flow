"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import LandingPage from "./components/LandingPage"
import Dashboard from "./components/Dashboard"
import LoginModal from "./components/LoginModal"
import RegisterModal from "./components/RegisterModal"

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <AnimatePresence>
          {showLogin && (
            <LoginModal
              onClose={() => setShowLogin(false)}
              onSwitchToRegister={() => {
                setShowLogin(false)
                setShowRegister(true)
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRegister && (
            <RegisterModal
              onClose={() => setShowRegister(false)}
              onSwitchToLogin={() => {
                setShowRegister(false)
                setShowLogin(true)
              }}
            />
          )}
        </AnimatePresence>
      </Router>
    </div>
  )
}

export default App
