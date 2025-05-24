
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhyChooseUs: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/5"></div>
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-500/10 filter blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-500/10 filter blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Column: Text Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from- 
             white via-cyan-400 to-blue-500">
              Why You Choose JIS for Complete IT Solutions?
            </h2>
            <p className="text-jis-orange font-semibold mb-6">
              Our Designers, Developers & Marketing team are here to Serve you!
            </p>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              JIS is one of the most trusted offshore development companies today with a focus on 
               delivering high-quality solutions tailored to meet the specific needs of our clients 
                worldwide. We combine technical expertise with creative innovation to solve complex 
                 business challenges.
              <a href="#" className="text-cyan-400 hover:underline ml-1">Read more...</a>
            </p>
            
            <motion.h3 
              className="text-xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Our success is fueled by our commitment to the five core values:
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
              {[
                "Customer First",
                "Innovation & quality",
                "Teamwork",
                "Experienced and Certified Professional...",
                "Dedication",
                "Transparency",
                { text: "One shop solution for all your IT Needs (Development, Design, Mobile App, SEO etc)", span: 2 }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-start ${typeof item === 'object' && item.span === 2 ? 'col-span-1 md:col-span-2' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <div className="p-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mr-2 flex-shrink-0">
                    <div className="bg-black rounded-full p-0.5">
                      <FaCheck className="text-green-400" size={12} />
                    </div>
                  </div>
                  <span className="text-gray-300">
                    {typeof item === 'object' ? item.text : item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column: Graphic */}
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000">
              {/* Circular background */}
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-gray-700"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center rocket icon */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center z-20"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full p-5 shadow-xl shadow-blue-500/30">
                  <svg className="text-white h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Orbit circles with labels */}
              <motion.div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-3 shadow-lg shadow-orange-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white text-xs font-bold">Growth</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 shadow-lg shadow-green-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white text-xs font-bold">Quality</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full p-3 shadow-lg shadow-yellow-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-gray-800 text-xs font-bold">Innovation</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-full p-3 shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white text-xs font-bold">Service</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
