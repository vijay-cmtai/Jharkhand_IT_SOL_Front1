
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Monitor, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-20 overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-jis-teal rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-jis-purple rounded-full filter blur-3xl 
           opacity-20 translate-x-1/2 translate-y-1/2"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-jis-orange rounded-full filter blur-3xl 
           opacity-10 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            className="w-full lg:w-1/2 text-left mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg- 
               gradient-to-r from-white via-jis-yellow to-jis-orange"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Digital Solutions<br/>for Modern World
            </motion.h1>
            <motion.p 
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We create stunning websites, powerful applications and cutting-edge digital experiences that help businesses thrive in the digital landscape.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700 
                 hover:border-jis-teal transition-all shadow-lg hover:shadow-jis-teal/20 card-3d"
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 188, 212, 0.25), 0 10px 10px -5px rgba(0, 188, 212, 0.1)" 
                }}
              >
                <Monitor className="text-jis-teal text-3xl mb-2" />
                <h3 className="text-white font-medium">Web Development</h3>
              </motion.div>
              <motion.div 
                className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-jis-purple transition-all shadow-lg hover:shadow-jis-purple/20 card-3d"
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.25), 0 10px 10px -5px rgba(139, 92, 246, 0.1)" 
                }}
              >
                <Smartphone className="text-jis-purple text-3xl mb-2" />
                <h3 className="text-white font-medium">Mobile Apps</h3>
              </motion.div>
              <motion.div 
                className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-jis-orange transition-all shadow-lg hover:shadow-jis-orange/20 card-3d"
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.25), 0 10px 10px -5px rgba(249, 115, 22, 0.1)" 
                }}
              >
                <Rocket className="text-jis-orange text-3xl mb-2" />
                <h3 className="text-white font-medium">Digital Marketing</h3>
              </motion.div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/contact"
                  className="bg-gradient-to-r from-jis-teal to-jis-blue text-white px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-jis-teal/50 transform transition-all hover:-translate-y-1 button-3d flex items-center"
                >
                  Start Your Project <ArrowRight className="ml-2" size={16} />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/portfolio"
                  className="border-2 border-jis-yellow text-jis-yellow px-8 py-4 rounded-md font-medium hover:bg-jis-yellow hover:text-gray-900 shadow-lg transform transition-all hover:-translate-y-1 button-3d"
                >
                  View Our Work
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2 pl-0 lg:pl-10"
            initial={{ opacity: 0, scale: 0.9, rotateY: 5 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4, 
              type: "spring",
              stiffness: 100
            }}
          >
            <div className="relative perspective-1000">
              <motion.div 
                className="absolute -top-4 -left-4 right-4 bottom-4 bg-jis-purple/20 rounded-lg"
                animate={{ 
                  rotateX: [0, 2, 0, -2, 0], 
                  rotateY: [0, -2, 0, 2, 0] 
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              ></motion.div>
              <motion.div 
                className="absolute -top-2 -right-2 left-2 bottom-2 bg-jis-teal/20 rounded-lg"
                animate={{ 
                  rotateX: [0, -2, 0, 2, 0], 
                  rotateY: [0, 2, 0, -2, 0] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              ></motion.div>
              <motion.div 
                className="relative bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
              >
                <AspectRatio ratio={16/9} className="bg-gray-900 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                    alt="Web Development" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <motion.div 
                    className="bg-gray-900/80 rounded p-2 hover:bg-gray-700/80 transition-colors"
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <AspectRatio ratio={1/1} className="bg-gray-800 rounded">
                      <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                        alt="Web Design" 
                        className="object-cover w-full h-full rounded"
                      />
                    </AspectRatio>
                  </motion.div>
                  <motion.div 
                    className="bg-gray-900/80 rounded p-2 hover:bg-gray-700/80 transition-colors"
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <AspectRatio ratio={1/1} className="bg-gray-800 rounded">
                      <img 
                        src="https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                        alt="App Development" 
                        className="object-cover w-full h-full rounded"
                      />
                    </AspectRatio>
                  </motion.div>
                  <motion.div 
                    className="bg-gray-900/80 rounded p-2 hover:bg-gray-700/80 transition-colors"
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <AspectRatio ratio={1/1} className="bg-gray-800 rounded">
                      <img 
                        src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                        alt="Digital Marketing" 
                        className="object-cover w-full h-full rounded"
                      />
                    </AspectRatio>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D floating elements */}
      <motion.div 
        className="hidden lg:block absolute top-20 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-jis-teal/20 to-jis-blue/20 border border-jis-teal/30"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>

      <motion.div 
        className="hidden lg:block absolute bottom-20 left-20 w-16 h-16 rounded-md bg-gradient-to-br from-jis-purple/20 to-jis-blue/20 border border-jis-purple/30"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      ></motion.div>
    </div>
  );
};

export default HeroSection;
