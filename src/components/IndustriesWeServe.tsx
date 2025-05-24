import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee"; // Make sure this is installed
import I1 from "../assets/I1.avif";
import I2 from "../assets/I2.avif";
import I3 from "../assets/I3.avif";
import I4 from "../assets/I4.jpeg";
import I5 from "../assets/I5.avif";
import I6 from "../assets/I6.avif";
import I7 from "../assets/I7.avif";
import I8 from "../assets/I8.jpg";

const IndustriesWeServe = () => {
  // Define the industries array INSIDE the component function
  const industries = [
    {
      name: "Healthcare",
      icon: "🏥",
      description:
        "Pioneering digital health solutions for hospitals, clinics, and telemedicine providers, enhancing patient care and operational efficiency.",
      image: I1,
    },
    {
      name: "Education",
      icon: "🎓",
      description:
        "Transforming learning with e-learning platforms, virtual classrooms, and innovative educational technology solutions for all ages.",
      image: I2,
    },
    {
      name: "E-Commerce",
      icon: "🛒",
      description:
        "Building dynamic online stores and scalable shopping platforms that drive sales and provide seamless customer experiences.",
      image: I3,
    },
    {
      name: "Finance",
      icon: "💰",
      description:
        "Developing secure digital banking solutions, innovative fintech applications, and robust financial management tools.",
      image: I4,
    },
    {
      name: "Manufacturing",
      icon: "🏭",
      description:
        "Integrating smart technology for Industry 4.0, optimizing supply chains, and enhancing production with IoT solutions.",
      image: I5,
    },
    {
      name: "Real Estate",
      icon: "🏢",
      description:
        "Creating digital platforms for property listings, virtual tours, and streamlined real estate transaction management.",
      image: I6,
    },
    {
      name: "Travel & Hospitality",
      icon: "✈️",
      description:
        "Designing intuitive booking engines, travel portals, and hospitality management systems for a seamless journey.",
      image: I7,
    },
    {
      name: "Logistics & Supply Chain",
      icon: "🚚",
      description:
        "Optimizing logistics operations with advanced tracking systems, warehouse management, and supply chain analytics.",
      image: I8,
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Card specific animations (optional, as marquee handles movement)
  const cardHoverVariants = {
    scale: 1.03,
    transition: { duration: 0.3 },
  };
  const iconHoverVariants = {
    y: -4, // Move icon up slightly on card hover
    transition: { type: "spring", stiffness: 300, damping: 10 },
  };

  return (
    <motion.section
      className="pt-8 md:pt-12 pb-12 md:pb-16 bg-gradient-to-b from-slate-900 to-gray-900 text-white overflow-x-hidden" // Added overflow-x-hidden to section for safety
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Industries We Empower
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            We deliver specialized digital solutions, meticulously crafted to
            address the unique challenges and opportunities across various
            industries.
          </motion.p>
        </div>

        <Marquee
          gradient={false} // Set to true for a fade effect at the edges if desired
          speed={40} // Adjust speed (pixels per second)
          pauseOnHover={true}
          // autoFill={true} // Consider if you have few items and want continuous loop
          className="py-4 -mx-4" // Negative margin to allow cards to touch edges if container has padding
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name + "-" + index} // More unique key
              className="relative group overflow-hidden rounded-xl shadow-2xl shadow-black/30 h-[400px] md:h-[440px] w-[280px] sm:w-[320px] lg:w-[350px] flex flex-col justify-end mx-3 md:mx-4 flex-shrink-0" // Added flex-shrink-0
              whileHover={cardHoverVariants} // Apply hover animation to the card
            >
              <img
                src={industry.image}
                alt={industry.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none"></div>
              <div className="relative p-5 md:p-6 z-10">
                <motion.div
                  className="mb-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-2xl md:text-3xl w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center shadow-lg"
                  // Apply hover effect to icon based on parent card hover
                  // This requires restructuring slightly or passing hover state if you want independent icon motion
                  // For simplicity, the group-hover on parent will trigger CSS transition on icon if needed
                  // Or, if using Framer Motion for icon explicitly:
                  // variants={iconHoverVariants} // Will be triggered by card's whileHover
                >
                  {/* Icon with its own motion for independent hover or tied to group */}
                  <motion.span
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {industry.icon}
                  </motion.span>
                </motion.div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-1.5 drop-shadow-md">
                  {industry.name}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </Marquee>

        {/* Optional: A div for any content below the marquee, if needed */}
        <div className="text-center mt-10 md:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* You could add a "View All Services" button here if you have a dedicated services page */}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default IndustriesWeServe;
