"use client"

import { motion } from "framer-motion"
import {
  FolderOpen,
  Target,
  Filter,
  Zap,
  Calendar,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  BarChart3,
} from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: FolderOpen,
      title: "Life Categories",
      description:
        "Organize your entire life into meaningful areas like Health, Career, Family, and Personal Growth. Keep everything structured and balanced.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      hoverGradient: "from-blue-100 to-cyan-100",
      delay: 0.1,
    },
    {
      icon: Target,
      title: "Vision-to-Task Hierarchy",
      description:
        "Transform your biggest dreams into actionable steps. Connect your long-term vision to daily tasks through goals and projects.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      hoverGradient: "from-purple-100 to-pink-100",
      delay: 0.2,
    },
    {
      icon: Filter,
      title: "Smart Task Manager",
      description:
        "Focus on what matters most with intelligent filtering. View tasks by Today, Tomorrow, This Week, or see what's overdue.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      hoverGradient: "from-green-100 to-emerald-100",
      delay: 0.3,
    },
    {
      icon: Zap,
      title: "Habit Tracker",
      description:
        "Build lasting habits with daily and weekly tracking. Visualize your consistency and maintain momentum with streak counters.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      hoverGradient: "from-orange-100 to-red-100",
      delay: 0.4,
    },
    {
      icon: Calendar,
      title: "Weekly Review",
      description:
        "Reflect on your progress with comprehensive weekly summaries. Track achievements, identify patterns, and plan ahead.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      hoverGradient: "from-indigo-100 to-purple-100",
      delay: 0.5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Succeed</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A comprehensive productivity system that adapts to your life, helping you stay organized, focused, and
            motivated every step of the way.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Background with Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

              <div
                className={`relative bg-gradient-to-br ${feature.bgGradient} group-hover:${feature.hoverGradient} rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm h-full`}
              >
                {/* Icon Container */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <motion.div
                    className="flex items-center text-transparent group-hover:text-blue-600 transition-colors duration-300"
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    <span className="text-sm font-medium mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/10 to-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: CheckCircle2,
              title: "Easy to Use",
              description: "Intuitive interface designed for everyone",
              color: "text-green-600",
            },
            {
              icon: TrendingUp,
              title: "Track Progress",
              description: "Visual insights into your productivity journey",
              color: "text-blue-600",
            },
            {
              icon: Clock,
              title: "Save Time",
              description: "Streamlined workflows that fit your lifestyle",
              color: "text-purple-600",
            },
          ].map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${highlight.color} bg-gray-50 rounded-lg mb-4`}
              >
                <highlight.icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h4>
              <p className="text-gray-600">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Demo Teaser */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full" />
            <div className="absolute top-20 right-20 w-16 h-16 border border-white rounded-full" />
            <div className="absolute bottom-10 left-20 w-12 h-12 border border-white rounded-full" />
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-white rounded-full" />
          </div>

          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <BarChart3 className="w-8 h-8 text-white" />
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Productivity?</h3>

            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already organized their lives and achieved their goals with our
              comprehensive system.
            </p>

            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Try It Free Today</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
