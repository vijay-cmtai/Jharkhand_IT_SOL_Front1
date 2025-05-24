"use client";
import React from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Good Cooperation",
      text: "JIS team delivered our e-commerce project on time and with exceptional quality. Their communication was clear and professional throughout the process.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Rajesh Kumar",
      designation: "CEO, TechStart India",
    },
    {
      quote: "Excellent Results",
      text: "We've been working with JIS for over 3 years now. Their attention to detail and technical expertise has helped us grow our online presence significantly.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Priya Sharma",
      designation: "Marketing Director, GlobalTrade",
    },
    {
      quote: "Reliable Partner",
      text: "What sets JIS apart is their commitment to understanding our business needs before suggesting solutions. They're not just service providers but true partners.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Vikram Singh",
      designation: "CTO, NextGen Solutions",
    },
  ];

  return (
    <div className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500">
            What They Said
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            JIS is one of the most trusted offshore development companies today
          </p>
        </motion.div>

        <div className="flex flex-nowrap overflow-x-auto pb-12 gap-6 scroll-smooth no-scrollbar">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative group bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-6 
               rounded-2xl border border-gray-700 shadow-lg hover:shadow-blue-600/30 transition-all 
                duration-300 min-h-[350px]">
                {/* Glowing background */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 
                 blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-white">
                      {testimonial.quote}
                    </h3>
                    <FaQuoteRight className="text-blue-400 opacity-20 text-3xl" />
                  </div>
                  <p className="text-gray-300 mb-8">{testimonial.text}</p>

                  <div className="flex items-center mt-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-400">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slider controls */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white 
           shadow hover:scale-110 transition-transform">
            <FaArrowLeft />
          </button>
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:scale-110 transition-transform">
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Floating glowing background shapes */}
      <motion.div
        className="absolute w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full top-10 left-10"
        animate={{ y: [0, -20, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10"
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
};

export default Testimonials;
