import React from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaUserGraduate,
  FaLightbulb,
  FaCogs,
} from "react-icons/fa";

const Training = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* <TopBar />
      <Navbar /> */}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-jis-blue/80 to-jis-dark/80 py-20">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
                Professional Training Programs
              </h1>
              <p className="text-lg text-gray-200 mb-8 drop-shadow-md">
                Empower your future with industry-focused training programs
                designed by experts.
              </p>
              <div className="card-3d inline-block p-8 rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="bg-gradient-to-br from-jis-blue to-jis-dark p-1 rounded-lg shadow-xl">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Learn. Build. Grow.
                    </h3>
                    <p className="text-gray-300">
                      Our training curriculum is tailored for students,
                      professionals, and businesses seeking to upskill.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Offered */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Our Training Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaLaptopCode className="text-jis-blue text-4xl" />,
                  title: "Full Stack Development",
                  description:
                    "Master front-end and back-end technologies through practical projects.",
                },
                {
                  icon: <FaLightbulb className="text-jis-teal text-4xl" />,
                  title: "UI/UX Design",
                  description:
                    "Learn user-centered design with tools like Figma and Adobe XD.",
                },
                {
                  icon: <FaCogs className="text-jis-yellow text-4xl" />,
                  title: "DevOps & Cloud",
                  description:
                    "Get hands-on with AWS, Docker, CI/CD pipelines, and more.",
                },
              ].map((program, idx) => (
                <div
                  key={idx}
                  className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl hover:shadow-jis-blue/20 transform transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-gray-800 border border-gray-700 shadow-inner mb-4">
                      {program.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {program.title}
                    </h3>
                    <p className="text-gray-300">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Choose Our Training
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Real-world Projects",
                "Expert Trainers",
                "Flexible Timings",
                "Certification Provided",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl hover:shadow-jis-teal/20 transform transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-center text-white font-semibold">
                    {benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Trainers */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              Meet Our Trainers
            </h2>
            <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
              Industry veterans and certified professionals dedicated to guiding
              you to success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((trainer) => (
                <div
                  key={trainer}
                  className="card-3d bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-700 hover:shadow-jis-blue/20 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-48 bg-gray-800 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                      <FaChalkboardTeacher className="text-gray-500 text-3xl" />
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Trainer {trainer}
                    </h3>
                    <p className="text-jis-blue mb-4">
                      {trainer % 2 === 0 ? "DevOps Expert" : "Senior Developer"}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Passionate about mentoring and driving career growth
                      through practical learning.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jis-blue/10 to-jis-dark/10 -rotate-2 transform-gpu"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="card-3d max-w-4xl mx-auto bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-1">
              <div className="bg-gray-900 rounded-lg p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4 text-white">
                      Start Your Learning Journey Today
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Enroll now and gain the skills to boost your career in
                      tech.
                    </p>
                    <button className="bg-jis-blue hover:bg-jis-blue/90 text-white px-6 py-3 rounded-md shadow-lg font-medium button-3d transform transition hover:-translate-y-1">
                      Enroll Now
                    </button>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-40 h-40 relative animate-float">
                      <div className="absolute inset-0 bg-jis-blue/20 rounded-full blur-xl"></div>
                      <div className="relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-jis-blue to-jis-dark border border-white/10 shadow-lg">
                        <FaUserGraduate className="text-white text-4xl" />
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

export default Training;
