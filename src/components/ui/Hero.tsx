"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Play, CheckCircle, Target, BarChart3 } from "lucide-react"

interface HeroProps {
  onGetStartedClick: () => void
}

const Hero = ({ onGetStartedClick }: HeroProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Right Content (RTL) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-right order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                ✨ Transform your productivity today
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Organize your life from{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vision to Action
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
            Turn your big dreams into daily actions with this comprehensive productivity system. Organize your life categories, set visions, and divide them into goals, projects, and tasks..
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={onGetStartedClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start your journey</span>
                <ArrowLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center justify-center lg:justify-start space-x-8 space-x-reverse"
            >
              <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">+10,000</div>
            <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">★4.9</div>
            <div className="text-sm text-gray-600">User Rating</div>
            </div>
            <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">99%</div>
            <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
            </motion.div>
          </motion.div>

          {/* Left Visual (RTL) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative order-1 lg:order-2"
          >
            {/* Main Dashboard Mockup */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Today's focus</h3>
                  <span className="text-sm text-gray-500">March 15, 2025</span>
                </div>

                {/* Progress Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Objectives</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">5/3</div>
                    <div className="text-xs text-blue-700">Complete</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Tasks</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">15/12</div>
                    <div className="text-xs text-green-700">Done today</div>
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-2">
                  {[
                    {task: "Review Project Proposal", completed: true },
                    { task: "Morning Team Meeting", completed: true },
                    { task: "Finish Quarterly Report", completed: false },
                    { task: "Plan Weekend Activities", completed: false },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-50"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          item.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                        }`}
                      />
                      <span className={`text-sm ${item.completed ? "text-gray-500 line-through" : "text-gray-700"}`}>
                        {item.task}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3 shadow-lg"
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-3 shadow-lg"
              style={{ animationDelay: "2s" }}
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>

            {/* Background Decorations */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl" />
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
