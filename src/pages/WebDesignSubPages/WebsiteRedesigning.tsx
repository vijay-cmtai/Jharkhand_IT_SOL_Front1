
import React from "react";
import { motion } from "framer-motion";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WebsiteRedesigning = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <TopBar />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-orange/80 to-jis-yellow/80 py-20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
                  Website Redesigning Services
                </h1>
                <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
                  Transform your outdated website into a modern, high-converting digital experience.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <motion.button 
                      className="bg-gradient-to-r from-jis-orange to-jis-yellow text-gray-900 px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-jis-orange/50 transform transition-all hover:-translate-y-1 button-3d flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get a Free Consultation <ArrowRight className="ml-2" size={16} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -top-4 -right-4 left-4 bottom-4 bg-jis-orange/20 rounded-lg transform rotate-3"></div>
                  <div className="absolute -top-2 -left-2 right-2 bottom-2 bg-jis-yellow/20 rounded-lg transform -rotate-2"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white text-center mb-4">Website Redesign</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-900/80 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-jis-orange mb-2">Before</h3>
                        <div className="h-32 bg-gray-800 rounded flex items-center justify-center">
                          <p className="text-gray-600">Old Design</p>
                        </div>
                      </div>
                      <div className="bg-gray-900/80 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-jis-yellow mb-2">After</h3>
                        <div className="h-32 bg-gray-800 rounded flex items-center justify-center">
                          <p className="text-white">New Design</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Content Preview */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Transform Your Online Presence
              </h2>
              <p className="text-gray-400">
                Our website redesigning services help businesses transform their outdated websites into modern, 
                effective digital platforms that drive results.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link to="/contact" className="bg-gradient-to-r from-jis-orange to-jis-yellow text-gray-900 px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-jis-orange/50 transform transition-all hover:-translate-y-1 button-3d">
                Contact Us to Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebsiteRedesigning;
