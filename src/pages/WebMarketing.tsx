import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearchDollar, FaChartLine, FaHashtag, FaAd } from "react-icons/fa";

const WebMarketing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* <TopBar />
      <Navbar /> */}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-orange/80 to-jis-yellow/80 py-20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
                Web Marketing Solutions
              </h1>
              <p className="text-lg text-gray-900 mb-8 drop-shadow-md font-medium">
                Strategic digital marketing solutions to grow your online
                presence and drive measurable results.
              </p>
              <div className="card-3d inline-block p-8 rotate-1 hover:rotate-0 transition-all duration-500">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-1 rounded-lg shadow-xl">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Boost your online presence today
                    </h3>
                    <button className="bg-jis-orange hover:bg-jis-orange/90 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:shadow-jis-orange/30 transform transition-all hover:-translate-y-1 button-3d">
                      Get a Free Analysis
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
            <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-jis-orange via-jis-yellow to-white">
              Our Marketing Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaSearchDollar className="text-jis-orange text-4xl" />,
                  title: "Search Engine Optimization",
                  description:
                    "Improve your search rankings and drive organic traffic to your website.",
                },
                {
                  icon: <FaAd className="text-jis-yellow text-4xl" />,
                  title: "Pay-Per-Click Advertising",
                  description:
                    "Targeted ads on Google, Facebook, and other platforms to reach your audience.",
                },
                {
                  icon: <FaHashtag className="text-jis-teal text-4xl" />,
                  title: "Social Media Marketing",
                  description:
                    "Engage your audience and build your brand on all major social platforms.",
                },
                {
                  icon: <FaChartLine className="text-jis-blue text-4xl" />,
                  title: "Analytics & Reporting",
                  description:
                    "Data-driven insights to optimize your marketing strategies and ROI.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl hover:shadow-jis-orange/20 transition-all duration-300 transform hover:-translate-y-2"
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

        {/* 3D Effect CTA */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jis-orange/10 to-jis-yellow/10 rotate-3 transform-gpu"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="card-3d max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-1">
              <div className="bg-gray-900 rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4 text-white">
                      Ready to Grow Your Online Presence?
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Our digital marketing experts will help you develop a
                      strategy that aligns with your business goals and delivers
                      measurable results.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-jis-orange hover:bg-jis-orange/90 text-white px-6 py-3 rounded-md shadow-lg font-medium button-3d transform transition hover:-translate-y-1">
                        Contact Us Today
                      </button>
                      <button className="bg-transparent border border-jis-yellow text-jis-yellow hover:bg-jis-yellow/10 px-6 py-3 rounded-md shadow button-3d transform transition hover:-translate-y-1">
                        View Case Studies
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 relative animate-float">
                      <div className="absolute inset-0 bg-jis-orange/20 rounded-full blur-xl"></div>
                      <div className="relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-jis-orange to-jis-yellow border border-white/10 shadow-lg">
                        <FaChartLine className="text-white text-4xl" />
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

export default WebMarketing;
