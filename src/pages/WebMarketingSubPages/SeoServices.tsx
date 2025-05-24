
import React from "react";
import { motion } from "framer-motion";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ArrowRight, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const SeoServices = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <TopBar />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-green/80 to-jis-yellow/80 py-20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800 drop-shadow-[0_5px_5px_rgba(255,255,255,0.1)]">
                  SEO Services
                </h1>
                <p className="text-lg text-gray-900 mb-8 drop-shadow-md font-medium">
                  Boost your website's visibility and drive organic traffic with our proven SEO strategies.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <motion.button 
                      className="bg-gray-900 text-white px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-gray-900/50 transform transition-all hover:-translate-y-1 button-3d flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get an SEO Audit <ArrowRight className="ml-2" size={16} />
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
                  <div className="absolute -top-4 -right-4 left-4 bottom-4 bg-jis-green/20 rounded-lg transform rotate-3"></div>
                  <div className="absolute -top-2 -left-2 right-2 bottom-2 bg-jis-yellow/20 rounded-lg transform -rotate-2"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700 shadow-2xl">
                    <div className="flex items-center justify-center min-h-[200px]">
                      <motion.div 
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-jis-green to-jis-yellow mx-auto mb-4 rounded-full flex items-center justify-center">
                          <BarChart className="text-gray-900 text-3xl" />
                        </div>
                        <div className="space-y-2">
                          <motion.div 
                            className="h-4 w-32 mx-auto bg-gradient-to-r from-jis-green to-jis-yellow rounded"
                            initial={{ width: "10%" }}
                            animate={{ width: "80%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          ></motion.div>
                          <motion.div 
                            className="h-4 w-24 mx-auto bg-gradient-to-r from-jis-green to-jis-yellow rounded"
                            initial={{ width: "10%" }}
                            animate={{ width: "60%" }}
                            transition={{ duration: 1.5, delay: 0.7 }}
                          ></motion.div>
                          <motion.div 
                            className="h-4 w-40 mx-auto bg-gradient-to-r from-jis-green to-jis-yellow rounded"  
                            initial={{ width: "10%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.9 }}
                          ></motion.div>
                        </div>
                      </motion.div>
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
                Comprehensive SEO Solutions
              </h2>
              <p className="text-gray-400">
                Our search engine optimization services help your business achieve higher rankings, increased organic traffic, and better conversion rates.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link to="/contact" className="bg-gradient-to-r from-jis-green to-jis-yellow text-gray-900 font-semibold px-8 py-4 rounded-md shadow-lg hover:shadow-jis-green/50 transform transition-all hover:-translate-y-1 button-3d">
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

export default SeoServices;
