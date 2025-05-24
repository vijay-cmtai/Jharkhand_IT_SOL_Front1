import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaCode, FaDatabase, FaServer, FaMobile } from "react-icons/fa";

const WebDevelopment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* <TopBar />
      <Navbar /> */}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-blue/80 to-jis-purple/80 py-20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
                Web Development Solutions
              </h1>
              <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
                We build powerful, scalable web applications using the latest
                technologies and best practices in web development.
              </p>
              <div className="card-3d inline-block p-8 rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="bg-gradient-to-br from-jis-blue to-jis-purple p-1 rounded-lg shadow-xl">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Need a custom web solution?
                    </h3>
                    <button className="bg-jis-yellow hover:bg-jis-yellow/90 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-jis-yellow/30 transform transition-all hover:-translate-y-1 button-3d">
                      Discuss Your Project
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
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-jis-blue via-jis-purple to-white">
              Our Web Development Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaCode className="text-jis-blue text-4xl" />,
                  title: "Frontend Development",
                  description:
                    "Crafting responsive, performant user interfaces using React, Angular, or Vue.",
                },
                {
                  icon: <FaServer className="text-jis-purple text-4xl" />,
                  title: "Backend Development",
                  description:
                    "Building robust APIs and server-side applications with Node.js, Python, or PHP.",
                },
                {
                  icon: <FaDatabase className="text-jis-teal text-4xl" />,
                  title: "Database Design",
                  description:
                    "Optimizing data storage with SQL or NoSQL databases for performance and scalability.",
                },
                {
                  icon: <FaMobile className="text-jis-yellow text-4xl" />,
                  title: "Progressive Web Apps",
                  description:
                    "Creating offline-capable web applications with native app-like experiences.",
                },
                {
                  icon: <FaCode className="text-jis-green text-4xl" />,
                  title: "E-commerce Development",
                  description:
                    "Building custom shopping experiences with secure payment processing.",
                },
                {
                  icon: <FaServer className="text-jis-orange text-4xl" />,
                  title: "CMS Development",
                  description:
                    "Custom WordPress, Drupal, or headless CMS solutions for content management.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl hover:shadow-jis-blue/20 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-gray-800 border border-gray-700 shadow-inner mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Technologies We Use
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "React",
                "Node.js",
                "MongoDB",
                "TypeScript",
                "Angular",
                "Vue.js",
                "PHP",
                "MySQL",
                "Python",
                "Django",
                "Laravel",
                "AWS",
              ].map((tech, index) => (
                <div
                  key={index}
                  className="card-3d bg-gray-800 border border-gray-700 p-4 rounded-lg text-center hover:shadow-jis-blue/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="text-white font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Effect CTA */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jis-blue/10 to-jis-purple/10 -rotate-3 transform-gpu"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="card-3d max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-1">
              <div className="bg-gray-900 rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4 text-white">
                      Start Your Web Development Project
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Our team of expert developers is ready to turn your ideas
                      into powerful web applications with clean code and
                      scalable architecture.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-jis-blue hover:bg-jis-blue/90 text-white px-6 py-3 rounded-md shadow-lg font-medium button-3d transform transition hover:-translate-y-1">
                        Get Started
                      </button>
                      <button className="bg-transparent border border-jis-purple text-jis-purple hover:bg-jis-purple/10 px-6 py-3 rounded-md shadow button-3d transform transition hover:-translate-y-1">
                        View Our Portfolio
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 relative animate-float">
                      <div className="absolute inset-0 bg-jis-blue/20 rounded-full blur-xl"></div>
                      <div className="relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-jis-blue to-jis-purple border border-white/10 shadow-lg">
                        <FaCode className="text-white text-4xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default WebDevelopment;
