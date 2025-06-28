"use client"

import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Hero from "./Hero"
import Features from "./Features"
import Demo from "./Demo"
import Testimonials from "./Testimonials"
import Footer from "./Footer"

const LandingPage = () => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleRegisterClick = () => {
    navigate("/register")
  }

  return (
    <div>
      <Navbar onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />

      <main>
        <Hero onGetStartedClick={handleRegisterClick} />
        <Features />
        <Demo />
        <Testimonials />
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
