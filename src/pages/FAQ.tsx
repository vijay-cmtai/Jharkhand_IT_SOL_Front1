
import React from "react";
import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of digital services including web design, web development, mobile app development, software solutions, graphic design, and digital marketing. Our team of experts can help bring your digital vision to life with cutting-edge technologies and creative solutions."
    },
    {
      question: "How long does it take to complete a website?",
      answer: "The timeline for website completion depends on various factors such as complexity, features, and content requirements. A simple website might take 2-4 weeks, while more complex projects with custom functionality could take 2-3 months or more. During our initial consultation, we'll provide you with a more accurate timeline based on your specific requirements."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing varies depending on project scope, complexity, and specific requirements. We offer flexible packages tailored to different budgets and needs. Contact us for a personalized quote based on your project requirements."
    },
    {
      question: "Do you provide ongoing support after the project is completed?",
      answer: "Yes, we offer comprehensive maintenance and support services post-launch. We have various support packages available to ensure your digital products remain up-to-date, secure, and functioning optimally. Our team is always available to address any issues or implement new features as needed."
    },
    {
      question: "Can you help with existing websites or only new ones?",
      answer: "We work with both new projects and existing websites. Our team is skilled in taking over existing projects, conducting thorough audits, and implementing improvements or redesigns as needed. Whether you need a complete overhaul or specific enhancements, we can help."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "Our team is proficient in a wide range of technologies including React, Angular, Vue.js, Node.js, PHP, .NET, WordPress, Shopify, and many more. We stay updated with the latest technological advancements to provide cutting-edge solutions for our clients."
    },
    {
      question: "How do you handle project communication?",
      answer: "We maintain clear communication throughout the project lifecycle using collaborative tools like Slack, Trello, or Asana. We schedule regular update meetings and provide progress reports to keep you informed at every stage. Our transparent approach ensures you're always in the loop about your project's status."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <TopBar />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-purple/80 to-jis-teal/80 py-20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-900 mb-8 drop-shadow-md font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Find answers to commonly asked questions about our services, processes, and technologies.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className="card-3d overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div 
                    className={`bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-xl hover:shadow-jis-purple/20 transition-all duration-300 ${openIndex === index ? 'ring-2 ring-jis-purple' : ''}`}
                  >
                    <button 
                      className="flex justify-between items-center w-full p-6 text-left"
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="text-xl font-medium text-white">{faq.question}</h3>
                      <div className={`p-2 rounded-full bg-gray-800 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                        {openIndex === index ? 
                          <Minus className="text-jis-purple" size={18} /> : 
                          <Plus className="text-jis-teal" size={18} />
                        }
                      </div>
                    </button>
                    {openIndex === index && (
                      <motion.div 
                        className="p-6 pt-0 text-gray-300"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jis-purple/10 to-jis-teal/10 rotate-2 transform-gpu"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="card-3d max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-1">
              <div className="bg-gray-900 rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4 text-white">Still Have Questions?</h2>
                    <p className="text-gray-300 mb-6">Our team is ready to assist you with any additional questions or concerns you may have. Feel free to reach out to us anytime.</p>
                    <div className="flex flex-wrap gap-4">
                      <motion.button 
                        className="bg-jis-purple hover:bg-jis-purple/90 text-white px-6 py-3 rounded-md shadow-lg font-medium button-3d transform transition hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contact Us Today
                      </motion.button>
                      <motion.button 
                        className="bg-transparent border border-jis-teal text-jis-teal hover:bg-jis-teal/10 px-6 py-3 rounded-md shadow button-3d transform transition hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Services
                      </motion.button>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 relative animate-float">
                      <div className="absolute inset-0 bg-jis-purple/20 rounded-full blur-xl"></div>
                      <div className="relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-jis-purple to-jis-teal border border-white/10 shadow-lg">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="text-white text-4xl"
                        >
                          ?
                        </motion.div>
                      </div>
                    </div>
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

export default FAQ;
