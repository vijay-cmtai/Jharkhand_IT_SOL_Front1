
import React from "react";
import { motion } from "framer-motion";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Smartphone, Monitor, Tablet, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ResponsiveWebDesigning = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <TopBar />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-purple/80 to-jis-teal/80 py-20">
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
                  Responsive Web Design Services
                </h1>
                <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
                  Create stunning websites that look great and function flawlessly on all devices - from desktops to smartphones.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button 
                    className="bg-gradient-to-r from-jis-teal to-jis-purple text-white px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-jis-teal/50 transform transition-all hover:-translate-y-1 button-3d flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started <ArrowRight className="ml-2" size={16} />
                  </motion.button>
                  <motion.button 
                    className="border-2 border-white text-white px-8 py-4 rounded-md font-medium hover:bg-white/10 shadow-lg transform transition-all hover:-translate-y-1 button-3d"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Portfolio
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -bottom-6 -left-6 right-6 top-6 bg-jis-purple/20 rounded-lg transform rotate-6"></div>
                  <div className="absolute -bottom-3 -right-3 left-3 top-3 bg-jis-teal/20 rounded-lg transform -rotate-3"></div>
                  <div className="relative flex items-center justify-center">
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-2xl">
                      <AspectRatio ratio={16/9} className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Monitor className="absolute text-jis-teal text-8xl opacity-20" />
                            <Tablet className="absolute text-jis-purple text-5xl opacity-20 -translate-x-12 translate-y-6 rotate-12" />
                            <Smartphone className="absolute text-white text-4xl opacity-20 translate-x-16 translate-y-4 -rotate-12" />
                            
                            <div className="z-10 text-center">
                              <h3 className="text-2xl font-bold text-white mb-2">Responsive Design</h3>
                              <p className="text-gray-300">Any Device, Any Screen Size</p>
                            </div>
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-jis-teal to-jis-purple mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Why Responsive Design Matters
              </motion.h2>
              <motion.p 
                className="text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                In today's multi-device world, your website needs to deliver an optimal experience across all devices and screen sizes.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Mobile-First Design",
                  description: "We build websites with a mobile-first approach, ensuring optimal performance on smartphones before scaling up.",
                  icon: <Smartphone className="text-jis-teal text-3xl" />
                },
                {
                  title: "Fluid Layouts",
                  description: "Our designs use fluid grids and flexible images that respond seamlessly to any screen size.",
                  icon: <Monitor className="text-jis-purple text-3xl" />
                },
                {
                  title: "Cross-Browser Compatibility",
                  description: "We ensure your website functions perfectly across all major browsers and devices.",
                  icon: <Tablet className="text-jis-blue text-3xl" />
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl hover:shadow-jis-purple/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <div className="p-3 rounded-full bg-gray-800 border border-gray-700 shadow-inner mb-4 w-16 h-16 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jis-purple/5 to-jis-teal/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-jis-teal to-jis-purple mb-6">
                  Benefits of Responsive Web Design
                </h2>
                <div className="space-y-4">
                  {[
                    "Improved user experience across all devices",
                    "Higher search engine rankings (Google prioritizes mobile-friendly sites)",
                    "Increased conversion rates and lower bounce rates",
                    "Cost-effective compared to maintaining separate mobile and desktop sites",
                    "Future-proof design that adapts to new devices and screen sizes"
                  ].map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-jis-teal to-jis-purple flex items-center justify-center">
                          <Check className="text-white" size={14} />
                        </div>
                      </div>
                      <p className="text-gray-300">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 shadow-xl">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gradient-to-br from-jis-teal/20 to-jis-purple/20 rounded-full w-64 h-64 filter blur-3xl opacity-30"></div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
                      <div className="mb-6">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 mx-auto">
                          <path fill="#00BCD4" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1C87.1,14.2,81.6,28.4,74.4,42.3C67.2,56.2,58.3,69.8,45.9,77.9C33.4,86,16.7,88.7,1.6,86.2C-13.6,83.8,-27.1,76.2,-40.4,68.1C-53.7,59.9,-66.7,51.2,-75.9,38.9C-85.1,26.7,-90.5,13.3,-90.3,0C-90.2,-13.3,-84.5,-26.7,-76.7,-38.4C-68.9,-50.1,-59,-60.3,-47,-68C-35,-75.7,-21,-81,0,-81C21,-81,30.7,-83.7,44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">93% of users</h3>
                      <p className="text-gray-300">leave websites that don't display properly on their device</p>
                      
                      <div className="mt-8">
                        <Link 
                          to="/contact" 
                          className="bg-gradient-to-r from-jis-teal to-jis-purple text-white px-6 py-3 rounded-md font-medium shadow-lg hover:shadow-jis-teal/50 transition-all button-3d transform hover:-translate-y-1"
                        >
                          Get Your Responsive Website
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-jis-teal to-jis-purple mb-4">
                Our Design Process
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                We follow a structured approach to create responsive websites that not only look great but perform exceptionally well.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-16 md:left-1/2 w-1 bg-gradient-to-b from-jis-teal to-jis-purple"></div>
                
                {[
                  {
                    title: "Discovery & Planning",
                    description: "We begin by understanding your business goals, target audience, and specific requirements."
                  },
                  {
                    title: "Wireframing & Prototyping",
                    description: "We create wireframes and interactive prototypes to visualize the website structure across different devices."
                  },
                  {
                    title: "Responsive Design Implementation",
                    description: "Our designers and developers work together to create a responsive design that adapts fluidly to all screen sizes."
                  },
                  {
                    title: "Testing & Optimization",
                    description: "We rigorously test the website on various devices and browsers to ensure consistent performance and appearance."
                  },
                  {
                    title: "Launch & Ongoing Support",
                    description: "After launching your responsive website, we provide ongoing support and optimization."
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    className="relative mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                      <div className="flex-shrink-0 z-10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-jis-teal to-jis-purple flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className={`mt-4 md:mt-0 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'} card-3d bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl w-full md:w-[calc(100%-3rem)]`}>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jis-purple/10 to-jis-teal/10 rotate-2 transform-gpu"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="card-3d max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-1">
              <div className="bg-gray-900 rounded-lg p-8 md:p-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-jis-teal to-jis-purple">
                    Ready for a Responsive Website?
                  </h2>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Let our expert team create a stunning responsive website that works flawlessly across all devices and helps you reach your business goals.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.button 
                      className="bg-gradient-to-r from-jis-teal to-jis-purple text-white px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-jis-teal/50 transform transition-all hover:-translate-y-1 button-3d"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Your Project
                    </motion.button>
                    <motion.button 
                      className="bg-transparent border border-jis-purple text-jis-purple hover:bg-jis-purple/10 px-8 py-4 rounded-md shadow button-3d transform transition-all hover:-translate-y-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Our Portfolio
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResponsiveWebDesigning;
