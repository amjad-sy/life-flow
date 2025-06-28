"use client"

import { motion } from "framer-motion"
import { CheckCircle, Target, Calendar, Filter, Zap } from "lucide-react"

const Demo = () => {
  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Watch life flow in Action</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience the intuitive dashboard that brings all your productivity tools together.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center space-x-2 space-x-reverse mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>

            <div className="bg-white rounded-xl p-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-left">
                  <div className="text-sm text-gray-500">15 ,march 2024</div>
                  <div className="text-lg font-semibold text-gray-900">Tuesday</div>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-gray-900">Good moring , Amjad!</h3>
                  <p className="text-gray-600">Here's an overview of your productivity for the day.</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: Target, label: "Goals", value: "5/3", color: "blue", bg: "from-blue-50 to-blue-100" },
                  {
                    icon: CheckCircle,
                    label: "tasls",
                    value: "15/12",
                    color: "green",
                    bg: "from-green-50 to-green-100",
                  },
                  { icon: Zap, label: "Habits", value: "10/8", color: "orange", bg: "from-orange-50 to-orange-100" },
                  {
                    icon: Calendar,
                    label: "Projects",
                    value: "2 Actives",
                    color: "purple",
                    bg: "from-purple-50 to-purple-100",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={`bg-gradient-to-br ${stat.bg} rounded-xl p-4`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                      <span className={`text-sm font-medium text-${stat.color}-900`}>{stat.label}</span>
                    </div>
                    <div className={`text-2xl font-bold text-${stat.color}-900`}>{stat.value}</div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Today's Tasks */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <select className="text-sm border-none bg-transparent text-gray-600 focus:outline-none">
                        <option>Today</option>
                        <option>Tomorrow</option>
                        <option>This week</option>
                      </select>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Today's tasks</h4>
                  </div>

                  <div className="space-y-3">
                    {[
                      { task: "Project Proposal Review", time: "9:00 am", completed: true, priority: "high" },
                      { task: "Morning team meeting", time: "10:30 am", completed: true, priority: "medium" },
                      { task: "Completing the quarterly report", time: "2:00 pm", completed: false, priority: "high" },
                      { task: "Call with the customer", time: "4:00 pm", completed: false, priority: "low" },
                      { task: "Planning Weekend Activities", time: "6:00 pm", completed: false, priority: "low" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.priority === "high"
                              ? "bg-red-500"
                              : item.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div className="flex-1 text-right">
                          <div className={`text-sm ${item.completed ? "text-gray-500 line-through" : "text-gray-700"}`}>
                            {item.task}
                          </div>
                          <div className="text-xs text-gray-500">{item.time}</div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            item.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-500"
                          } transition-colors cursor-pointer`}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Habit Tracker */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-right">Habit Tracker</h4>
                  <div className="space-y-4">
                    {[
                      {
                        habit: "Morning exercise",
                        streak: 12,
                        completed: [true, true, true, true, true, false, false],
                      },
                      { habit: "30 minute reading", streak: 8, completed: [true, true, false, true, true, true, false] },
                      { habit: "Meditation", streak: 15, completed: [true, true, true, true, true, true, true] },
                      { habit: "drink 8 cups", streak: 5, completed: [true, false, true, true, true, false, false] },
                    ].map((habit, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-500">{habit.streak} days in a row</span>
                          <span className="font-medium text-gray-900">{habit.habit}</span>
                        </div>
                        <div className="flex space-x-1 space-x-reverse justify-end">
                          {habit.completed.map((completed, dayIndex) => (
                            <div
                              key={dayIndex}
                              className={`w-6 h-6 rounded-full ${
                                completed ? "bg-green-500" : "bg-gray-200"
                              } transition-colors`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-right">Weekly progress</h4>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <div className="flex items-end space-x-2 space-x-reverse h-32">
                    {[65, 78, 82, 75, 88, 92, 85].map((height, index) => (
                      <motion.div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                        style={{ height: `${height}%` }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Demo
