"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sara Ahmed",
      role: "Product Manager",
      company: "Technology Company",
      content:
      "Life Flow has completely changed the way I manage my goals. Connecting my vision to my daily tasks is amazing! I've never been more organized.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      },
      {
      name: "Mohammed Al-Rasheed",
      role: "Entrepreneur",
      company: "Startup",
      content:
      "Finally, a productivity app that understands the big picture. Tracking my habits has never been more consistent, and I can see real progress toward my long-term goals.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      },
      {
      name: "Eman Hassan",
      role: "Designer",
      company: "Creative Studio",
      content:
      "The Hierarchy of Vision The tasks make a lot of sense. I can see how everything connects to my larger goals. It's like having a personal productivity coach.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      },
      {
      name: "Dawood Karim",
      role: "Software Engineer",
      company: "Development Company",
      content:
      "The Weekly Review feature is a game changer. It helps me reflect on what worked and what didn't, making me more intentional with my time and energy.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      },
      {
      name: "Layla Thompson",
      role: "Marketing Manager",
      company: "Growth Company",
      content:
      "I love how Life Flow helps me balance different life categories. Work, health, family—everything has its place, and I can see progress in all areas.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      },
      {
      name: "Alex Johnson",
      role: "Consultant",
      company: "Freelancer",
      content:
      "Smart task filtering saves me a lot of time. I can focus on what's urgent today while maintaining visibility into long-term projects. Essential to my workflow.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Loved by productive people</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          See what our users are saying about transforming their productivity and achieving their goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 left-4 text-blue-100">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 justify-end">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed text-right">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <div>
                  <p className="font-semibold text-gray-900 text-right">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm text-right">
                    {testimonial.role} in {testimonial.company}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          >
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Join thousands of productive people</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
          { number: "+10,000", label: "Active Users" },
          { number: "4.9/5", label: "Average Rating" },
          { number: "99%", label: "Satisfaction Rate" },
          { number: "+50 Million", label: "Task Completed" },
          ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
