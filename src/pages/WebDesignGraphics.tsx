import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FaPalette, FaLaptop, FaMobileAlt, FaCode } from "react-icons/fa";

const WebDesignGraphics = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* <TopBar />
      <Navbar /> */}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-teal/80 to-jis-blue/80 py-20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
                Web Design & Graphics Services
              </h1>
              <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
                We create stunning, responsive designs that elevate your brand
                and engage your audience with cutting-edge visual experiences.
              </p>
              <div className="card-3d inline-block p-8 rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="bg-gradient-to-br from-jis-teal to-jis-blue p-1 rounded-lg shadow-xl">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Ready to transform your digital presence?
                    </h3>
                    <button className="bg-jis-yellow hover:bg-jis-yellow/90 text-gray-900 font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-jis-yellow/30 transform transition-all hover:-translate-y-1 button-3d">
                      Get a Free Quote
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
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-jis-teal via-jis-yellow to-white">
              Our Design & Graphics Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaPalette className="text-jis-teal text-4xl" />,
                  title: "Responsive Web Design",
                  description:
                    "Mobile-first designs that look amazing on all devices and screen sizes.",
                },
                {
                  icon: <FaLaptop className="text-jis-yellow text-4xl" />,
                  title: "Website Redesigning",
                  description:
                    "Breathe new life into your existing website with modern design updates.",
                },
                {
                  icon: <FaMobileAlt className="text-jis-blue text-4xl" />,
                  title: "Email Template Design",
                  description:
                    "Custom, responsive email templates that convert and look great in any inbox.",
                },
                {
                  icon: <FaCode className="text-jis-green text-4xl" />,
                  title: "Logo Designing",
                  description:
                    "Memorable, distinctive logos that capture your brand's essence.",
                },
                {
                  icon: <FaPalette className="text-jis-yellow text-4xl" />,
                  title: "Graphic Design Services",
                  description:
                    "Illustrations, banners, flyers, and all visual assets your brand needs.",
                },
                {
                  icon: <FaCode className="text-jis-teal text-4xl" />,
                  title: "PSD to HTML5",
                  description:
                    "Pixel-perfect conversion of your designs to responsive HTML5 code.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border 
                   border-gray-700 shadow-xl hover:shadow-jis-teal/20 transition-all duration-300 
                    transform hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="p-3 rounded-full bg-gray-800 border border-gray-700 shadow-inner mb- 
                    4"
                    >
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

        {/* Case Studies */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-white">
              Recent Projects
            </h2>
            <p className="text-center mb-12 text-gray-300 max-w-2xl mx-auto">
              Take a look at some of our recent web design and graphics projects
              that have helped our clients achieve their business goals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((project) => (
                <div
                  key={project}
                  className="card-3d overflow-hidden rounded-lg shadow-xl hover:shadow-jis-blue/30 
                   transition-all duration-300"
                >
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <div
                        className="bg-gradient-to-br from-jis-blue/20 to-jis-teal/20 w-full h-full flex 
                       items-center justify-center"
                      >
                        <span className="text-xl text-white">
                          Project Image {project}
                        </span>
                      </div>
                    </AspectRatio>
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
                     opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                          Project Title {project}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Website redesign for a leading tech company
                        </p>
                        <button
                          className="bg-jis-teal hover:bg-jis-teal/90 text-white px-4 py-2 rounded 
                         shadow button-3d transform transition-all hover:-translate-y-1"
                        >
                          View Case Study
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Effect CTA */}
        <section className="py-16 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-jis-blue/10 to-jis-teal/10 rotate-3 
           transform-gpu"
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <div
              className="card-3d max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded- 
              xl p-1"
            >
              <div className="bg-gray-900 rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4 text-white">
                      Ready to Transform Your Digital Presence?
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Our team of designers and developers are ready to bring
                      your vision to life with cutting-edge designs and seamless
                      functionality.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        className="bg-jis-yellow hover:bg-jis-yellow/90 text-gray-900 px-6 py-3 
                       rounded-md shadow-lg font-medium button-3d transform transition hover:-translate-y- 
                        1"
                      >
                        Request a Quote
                      </button>
                      <button
                        className="bg-transparent border border-jis-teal text-jis-teal hover:bg-jis- 
                       teal/10 px-6 py-3 rounded-md shadow button-3d transform transition hover:- 
                        translate-y-1"
                      >
                        View Our Portfolio
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 relative animate-float">
                      <div className="absolute inset-0 bg-jis-teal/20 rounded-full blur-xl"></div>
                      <div
                        className="relative w-full h-full flex items-center justify-center rounded-full 
                       bg-gradient-to-br from-jis-teal to-jis-blue border border-white/10 shadow-lg"
                      >
                        <FaPalette className="text-white text-4xl" />
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

export default WebDesignGraphics;
