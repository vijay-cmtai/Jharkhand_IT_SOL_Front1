
import React from "react";
import { motion } from "framer-motion";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WordpressDevelopment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <TopBar />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-blue/80 to-jis-teal/80 py-20">
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
                  WordPress Development
                </h1>
                <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
                  Custom WordPress solutions for businesses of all sizes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <motion.button 
                      className="bg-gradient-to-r from-jis-blue to-jis-teal text-white px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-jis-blue/50 transform transition-all hover:-translate-y-1 button-3d flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started <ArrowRight className="ml-2" size={16} />
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
                  <div className="absolute -top-4 -right-4 left-4 bottom-4 bg-jis-blue/20 rounded-lg transform rotate-3"></div>
                  <div className="absolute -top-2 -left-2 right-2 bottom-2 bg-jis-teal/20 rounded-lg transform -rotate-2"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700 shadow-2xl">
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 mx-auto mb-4 rounded-lg flex items-center justify-center">
                          <span className="text-3xl font-bold text-jis-blue">W</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">WordPress Development</h3>
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
                Custom WordPress Solutions
              </h2>
              <p className="text-gray-400">
                Our WordPress development services provide scalable, secure, and user-friendly websites that help businesses grow online.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link to="/contact" className="bg-gradient-to-r from-jis-blue to-jis-teal text-white px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-jis-blue/50 transform transition-all hover:-translate-y-1 button-3d">
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

export default WordpressDevelopment;
