
import React from 'react';
import { FaMobile, FaCogs, FaShoppingCart, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ServicesExpertise: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-500">
            OUR SERVICES & EXPERTISE
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Jharkhand IT Solutions Pvt Ltd is a team of highly skilled programmers and creative designers 
            dedicated to providing innovative and effective IT solutions for businesses.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 opacity-75 blur group-hover:opacity-100 transition duration-200"></div>
            <div className="relative bg-gray-900 rounded-lg p-6 flex flex-col items-center text-center h-full border border-blue-500/30">
              <div className="mb-4 transform group-hover:scale-110 transition-all duration-300">
                <FaMobile size={48} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Mobile Application Development</h3>
              <p className="text-gray-300">
                We specialize in creating custom mobile applications for iOS and Android platforms to help businesses connect with their customers on the go.
              </p>
              <div className="mt-auto pt-4">
                <button className="px-4 py-2 text-sm border border-blue-500 text-blue-400 rounded-md 
                 hover:bg-blue-600 hover:text-white transition-colors duration-300 mt-2">
                  LEARN MORE
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
             opacity-75 blur group-hover:opacity-100 transition duration-200"></div>
            <div className="relative bg-gray-900 rounded-lg p-6 flex flex-col items-center text-center h- 
             full border border-purple-500/30">
              <div className="mb-4 transform group-hover:scale-110 transition-all duration-300">
                <FaGlobe size={48} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Around the World...</h3>
              <p className="text-gray-300 mb-4">
                Our global expertise allows us to serve clients worldwide with cutting-edge web solutions 
                 and support services.
              </p>
              <div className="mt-auto">
                <button className="px-4 py-2 text-sm border border-purple-500 text-purple-400 rounded-md 
                 hover:bg-purple-600 hover:text-white transition-colors duration-300">
                  READ MORE
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 
             opacity-75 blur group-hover:opacity-100 transition duration-200"></div>
            <div className="relative bg-gray-900 rounded-lg p-6 flex flex-col items-center text-center h- 
             full border border-green-500/30">
              <div className="mb-4 transform group-hover:scale-110 transition-all duration-300">
                <FaCogs size={48} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">CMS Website Development</h3>
              <p className="text-gray-300">
                We build powerful content management systems that allow you to easily update and manage 
                 your website content without technical knowledge.
              </p>
              <div className="mt-auto pt-4">
                <button className="px-4 py-2 text-sm border border-green-500 text-green-400 rounded-md 
                 hover:bg-green-600 hover:text-white transition-colors duration-300 mt-2">
                  LEARN MORE
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Card 4 */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 
             opacity-75 blur group-hover:opacity-100 transition duration-200"></div>
            <div className="relative bg-gray-900 rounded-lg p-6 flex flex-col items-center text-center h- 
             full border border-amber-500/30">
              <div className="mb-4 transform group-hover:scale-110 transition-all duration-300">
                <FaShoppingCart size={48} className="text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">E-commerce Development</h3>
              <p className="text-gray-300">
                Launch your online store with our comprehensive e-commerce development services designed 
                 to maximize sales and customer satisfaction.
              </p>
              <div className="mt-auto pt-4">
                <button className="px-4 py-2 text-sm border border-amber-500 text-amber-400 rounded-md 
                 hover:bg-amber-600 hover:text-white transition-colors duration-300 mt-2">
                  LEARN MORE
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating 3D elements */}
        <div className="hidden lg:block">
          <motion.div 
            className="absolute right-10 w-24 h-24 rounded-full bg-blue-500/10 border border-blue-300/20"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute left-10 mt-20 w-16 h-16 rounded-full bg-purple-500/10 border border- 
             purple-300/20"
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesExpertise;
