
import React from 'react';
import { motion } from 'framer-motion';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Phone, TabletSmartphone, Smartphone, BarChart, ShieldCheck, Globe } from 'lucide-react';

const MobileAppDevelopment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <TopBar />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern-grid opacity-5"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-[100px] opacity-20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6 transform -rotate-6">
                  <Smartphone size={40} className="text-white" />
                </div>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Mobile App Development
              </h1>
              
              <p className="text-lg text-gray-300 mb-8">
                We build powerful, feature-rich mobile applications for iOS and Android platforms that help businesses connect with their customers and streamline operations.
              </p>
              
              <div className="flex justify-center gap-4">
                <motion.button 
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative px-6 py-3 bg-gray-900 rounded-lg">
                    <span className="text-white font-medium">Get Free Consultation</span>
                  </div>
                </motion.button>
                
                <motion.button 
                  className="px-6 py-3 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Our Portfolio
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Comprehensive Mobile App Development
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                We deliver end-to-end mobile app development services using the latest technologies and best practices to create engaging user experiences.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Phone className="text-blue-400" />,
                  title: "iOS App Development",
                  description: "Create stunning, high-performance iOS applications that leverage the full capabilities of Apple's ecosystem."
                },
                {
                  icon: <Smartphone className="text-green-400" />,
                  title: "Android App Development",
                  description: "Build robust and feature-rich Android applications that work across the diverse Android device ecosystem."
                },
                {
                  icon: <TabletSmartphone className="text-purple-400" />,
                  title: "Cross-Platform Development",
                  description: "Develop cost-effective applications that work seamlessly across multiple platforms with Flutter or React Native."
                },
                {
                  icon: <ShieldCheck className="text-cyan-400" />,
                  title: "Secure Development",
                  description: "Implement best-in-class security measures to protect user data and ensure compliance with regulations."
                },
                {
                  icon: <BarChart className="text-yellow-500" />,
                  title: "Analytics Integration",
                  description: "Integrate powerful analytics tools to gather insights about user behavior and app performance."
                },
                {
                  icon: <Globe className="text-pink-400" />,
                  title: "API Development",
                  description: "Create robust backend APIs that power your mobile applications and enable seamless data synchronization."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gray-900 p-8 rounded-xl border border-gray-800 h-full hover:bg-gray-800/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-6 border border-gray-700 shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Development Process
              </motion.h2>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 hidden md:block"></div>
              
              {[
                {
                  step: "01",
                  title: "Discovery & Planning",
                  description: "We start by understanding your business goals, target audience, and app requirements to create a strategic roadmap."
                },
                {
                  step: "02",
                  title: "UI/UX Design",
                  description: "Our designers create intuitive, engaging interfaces that align with your brand and provide exceptional user experiences."
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Our experienced developers build your app using the latest technologies and best coding practices for optimal performance."
                },
                {
                  step: "04",
                  title: "Testing & QA",
                  description: "Rigorous testing across devices and platforms ensures your app is bug-free and delivers a smooth user experience."
                },
                {
                  step: "05",
                  title: "Deployment",
                  description: "We handle the app store submission process and make sure your app meets all requirements for a successful launch."
                },
                {
                  step: "06",
                  title: "Maintenance & Updates",
                  description: "Our relationship continues with ongoing support, regular updates, and feature enhancements to keep your app competitive."
                }
              ].map((phase, index) => (
                <motion.div 
                  key={index}
                  className={`flex mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className={`inline-block ${index % 2 === 0 ? '' : ''}`}>
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
                        <div className="relative bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl">
                          <h3 className="text-2xl font-bold mb-3 text-white">{phase.title}</h3>
                          <p className="text-gray-400">{phase.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 md:w-24 mx-auto flex justify-center items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white border-4 border-gray-900 shadow-xl">
                      {phase.step}
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 md:hidden mt-4">
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold mb-2 text-white">{phase.title}</h3>
                      <p className="text-gray-400 text-sm">{phase.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 relative">
          <div className="absolute inset-0 bg-pattern-grid opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to Build Your Mobile App?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Contact us today for a free consultation and let's bring your app idea to life.
              </motion.p>
              
              <motion.div
                className="relative group inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative px-8 py-4 bg-gray-900 rounded-lg">
                  <span className="text-white font-medium">Schedule a Free Consultation</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MobileAppDevelopment;
