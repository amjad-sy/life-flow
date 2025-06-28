"use client"

import Navbar from "../src/components/ui/Navbar"
import Hero from "../src/components/ui/Hero"
import Features from "../src/components/ui/Features"
import Demo from "../src/components/ui/Demo"
import Testimonials from "../src/components/ui/Testimonials"
import Footer from "../src/components/ui/Footer"

interface LandingPageProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

const LandingPage = ({ onLoginClick, onRegisterClick }: LandingPageProps) => {
  return (
    <div>
      <Navbar onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />

      <main>
        <Hero onGetStartedClick={onRegisterClick} />
        <Features />
        <Demo />
        <Testimonials />
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
