import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Techstack from "../assets/TechStack.avif"; // Make sure this path is correct

const TechnologyShowcase = () => {
  // REDUCED to 12 technologies for 3 rows (4 cards per row)
  const technologies = [
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png",
      name: "React",
      description: "Frontend library for building user interfaces",
    },
    {
      icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
      name: "Next.js",
      description: "React framework for production",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-angular-3-226070.png",
      name: "Angular",
      description: "Platform for building mobile & desktop web apps",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-vue-282497.png",
      name: "Vue.js",
      description: "Progressive JavaScript framework",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-node-js-1-1174935.png",
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 engine",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-typescript-1174965.png",
      name: "TypeScript",
      description: "Typed superset of JavaScript",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-python-3521655-2945099.png",
      name: "Python",
      description: "Programming language for web and data science",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-java-60-1174953.png",
      name: "Java",
      description: "Object-oriented programming language",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-docker-226091.png",
      name: "Docker",
      description:
        "Containerization platform for building and shipping applications",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-kubernetes-2-1175094.png",
      name: "Kubernetes",
      description:
        "System for automating deployment and management of containerized applications",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-aws-1869025-1583149.png",
      name: "AWS",
      description:
        "Amazon Web Services, a comprehensive cloud computing platform",
    },
    {
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-flutter-2038877-1720090.png",
      name: "Flutter",
      description:
        "Google's UI toolkit for building natively compiled applications",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Technologies We Master
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            We leverage a robust stack of modern technologies to build
            innovative, scalable, and high-performance digital solutions.
          </motion.p>
        </div>

        {/* The parent div with items-stretch is important for height alignment */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Tech Grid */}
          <motion.div
            className="lg:w-3/5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" // gap-4 (1rem) * 2 gaps = 2rem total vertical gap for 3 rows
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className="group relative hover:z-30"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-slate-800 p-3 rounded-xl w-full h-36 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-cyan-500/25 border border-slate-700 hover:border-cyan-500/70 transition-all duration-300">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-10 h-10 object-contain mb-2"
                    />
                    <h3 className="text-sm font-semibold text-white">
                      {tech.name}
                    </h3>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[calc(100%+10px)] w-56 bg-slate-700 rounded-lg shadow-2xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 group-hover:delay-75">
                    <div className="text-base font-semibold text-white mb-1.5">
                      {tech.name}
                    </div>
                    <div className="text-xs text-gray-200 leading-normal">
                      {tech.description}
                    </div>
                    <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-700 rotate-45"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            className="lg:w-2/5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/*
              To make the image match the height of the 3 rows of cards:
              Card height = h-36 (9rem or 144px)
              Number of rows = 3
              Gap between rows = gap-4 (1rem or 16px)
              Number of gaps = 2

              Total height of cards content = (3 * card_height) + (2 * gap_height)
                                          = (3 * 9rem) + (2 * 1rem)
                                          = 27rem + 2rem = 29rem
                                          = (3 * 144px) + (2 * 16px)
                                          = 432px + 32px = 464px
              We can set min-h-[464px] or min-h-[29rem] for the image container.
              Or, rely on h-full and items-stretch from the parent.
            */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-blue-900/30 h-full">
              <img
                src={Techstack}
                alt="Modern Web Development Technology Stack"
                className="w-full h-full object-cover" // object-cover will ensure the image covers the area, might crop
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent flex flex-col justify-end p-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Cutting-Edge Stack
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">
                    Building robust, scalable, and future-proof digital
                    experiences.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/FullTechStack"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Full Tech Stack
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
