
import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaMobile, FaLaptopCode, FaWindows, FaApple, FaAndroid, FaCloud } from "react-icons/fa";

const SoftwareMobile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* <TopBar />
      <Navbar /> */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-green/80 to-jis-teal/80 py-20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
                Software & Mobile Solutions
              </h1>
              <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
                Custom software and mobile applications designed to streamline your business processes and engage your customers.
              </p>
              <div className="card-3d inline-block p-8 -rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="bg-gradient-to-br from-jis-green to-jis-teal p-1 rounded-lg shadow-xl">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Have a software or app idea?</h3>
                    <button className="bg-jis-yellow hover:bg-jis-yellow/90 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-jis-yellow/30 transform transition-all hover:-translate-y-1 button-3d">
                      Let's Build It Together
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-jis-green via-jis-teal to-white">
              Our Software & Mobile Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaAndroid className="text-jis-green text-4xl" />,
                  title: "Android Development",
                  description: "Native and cross-platform Android apps with Material Design principles."
                },
                {
                  icon: <FaApple className="text-jis-teal text-4xl" />,
                  title: "iOS Development",
                  description: "Sleek, intuitive iOS applications optimized for the Apple ecosystem."
                },
                {
                  icon: <FaMobile className="text-jis-blue text-4xl" />,
                  title: "Cross-Platform Apps",
                  description: "Build once, deploy everywhere with React Native and Flutter frameworks."
                },
                {
                  icon: <FaWindows className="text-jis-yellow text-4xl" />,
                  title: "Desktop Applications",
                  description: "Custom desktop software for Windows, macOS, and Linux environments."
                },
                {
                  icon: <FaLaptopCode className="text-jis-purple text-4xl" />,
                  title: "Custom Software",
                  description: "Tailored software solutions for your unique business challenges."
                },
                {
                  icon: <FaCloud className="text-jis-orange text-4xl" />,
                  title: "Cloud Solutions",
                  description: "Scalable, cloud-native applications with seamless integration capabilities."
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl hover:shadow-jis-green/20 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-gray-800 border border-gray-700 shadow-inner mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Development Process */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-white">Our Development Process</h2>
            <p className="text-center mb-12 text-gray-300 max-w-2xl mx-auto">
              We follow a systematic approach to software development that ensures quality, efficiency, and clear communication at every stage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <FaLaptopCode className="text-jis-green text-3xl" />,
                  step: "1",
                  title: "Discovery & Planning",
                  description: "We analyze your requirements and create a detailed project roadmap."
                },
                {
                  icon: <FaLaptopCode className="text-jis-teal text-3xl" />,
                  step: "2",
                  title: "Design & Architecture",
                  description: "Our team designs intuitive interfaces and robust system architecture."
                },
                {
                  icon: <FaLaptopCode className="text-jis-blue text-3xl" />,
                  step: "3",
                  title: "Development",
                  description: "We write clean, efficient code following best practices and standards."
                },
                {
                  icon: <FaLaptopCode className="text-jis-purple text-3xl" />,
                  step: "4",
                  title: "Testing & Deployment",
                  description: "Rigorous testing ensures your software is reliable and ready for launch."
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="card-3d relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl hover:shadow-jis-green/20 transition-all duration-300"
                >
                  <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-br from-jis-green to-jis-teal flex items-center justify-center text-white font-bold text-xl shadow-lg border border-gray-700">
                    {step.step}
                  </div>
                  <div className="flex flex-col items-center text-center pt-6">
                    <div className="p-3 rounded-full bg-gray-800 border border-gray-700 shadow-inner mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 3D Effect CTA */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jis-green/10 to-jis-teal/10 rotate-3 transform-gpu"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="card-3d max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-1">
              <div className="bg-gray-900 rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4 text-white">Ready to Innovate?</h2>
                    <p className="text-gray-300 mb-6">Let our expert team turn your software or mobile app idea into a reality that drives growth and efficiency for your business.</p>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-jis-green hover:bg-jis-green/90 text-white px-6 py-3 rounded-md shadow-lg font-medium button-3d transform transition hover:-translate-y-1">
                        Schedule a Consultation
                      </button>
                      <button className="bg-transparent border border-jis-teal text-jis-teal hover:bg-jis-teal/10 px-6 py-3 rounded-md shadow button-3d transform transition hover:-translate-y-1">
                        View Case Studies
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 relative animate-float">
                      <div className="absolute inset-0 bg-jis-green/20 rounded-full blur-xl"></div>
                      <div className="relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-jis-green to-jis-teal border border-white/10 shadow-lg">
                        <FaMobile className="text-white text-4xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
{/*       
      <Footer /> */}
    </div>
  );
};

export default SoftwareMobile;
