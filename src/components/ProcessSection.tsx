
import React from 'react';
import { FaPencilAlt, FaDesktop, FaWrench, FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProcessSection: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5"></div>
      <motion.div 
        className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-blue-500/10 filter blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.05, 0.1, 0.05] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to- 
           r from-white via-cyan-400 to-blue-500">
            Our Development Process
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We follow a structured and efficient process to ensure your project is completed on time, 
             within budget, and exceeds your expectations.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-center relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[12%] right-[12%] h-1 bg-gradient-to-r 
           from-blue-600 via-purple-600 to-cyan-600 rounded-full z-0"></div>
          
          {/* Step 1: Planning */}
          <motion.div 
            className="process-step mb-10 md:mb-0 w-full md:w-1/4 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="process-step-icon bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
              <FaPencilAlt className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Planning</h3>
            <p className="text-gray-300 text-center px-4">
              We begin with thorough research and planning to understand your business needs and 
               objectives.
            </p>
          </motion.div>
          
          {/* Step 2: Designing */}
          <motion.div 
            className="process-step mb-10 md:mb-0 w-full md:w-1/4 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="process-step-icon bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg 
             shadow-purple-500/30">
              <FaDesktop className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Designing</h3>
            <p className="text-gray-300 text-center px-4">
              Our creative designers craft visually appealing and user-friendly interfaces for your project.
            </p>
          </motion.div>
          
          {/* Step 3: Development (Highlighted) */}
          <motion.div 
            className="process-step mb-10 md:mb-0 w-full md:w-1/4 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="process-step-icon bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg 
             shadow-green-500/30">
              <FaWrench className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Development</h3>
            <p className="text-gray-300 text-center px-4">
              Our skilled developers build robust, scalable, and secure solutions using the latest 
               technologies.
            </p>
          </motion.div>
          
          {/* Step 4: Marketing */}
          <motion.div 
            className="process-step w-full md:w-1/4 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="process-step-icon bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg 
             shadow-amber-500/30">
              <FaChartBar className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Marketing</h3>
            <p className="text-gray-300 text-center px-4">
              We help promote your product with effective digital marketing strategies to reach your 
               target audience.
            </p>
          </motion.div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a href="/contact" className="relative group inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md blur- 
             md opacity-70 group-hover:opacity-100 transition-all duration-300"></span>
            <button className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
             font-medium rounded-md shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all">
              Start Your Project Today
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessSection;
