import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import arrow icons

// Your image imports remain the same
import I1 from "../assets/I1.avif";
import I2 from "../assets/I2.avif";
import I3 from "../assets/I3.avif";
import I4 from "../assets/I4.jpeg";
import I5 from "../assets/I5.avif";
import I6 from "../assets/I6.avif";
import I7 from "../assets/I7.avif";
import I8 from "../assets/I8.jpg";

const IndustriesWeServe = () => {
  const industries = [
    {
      name: "Healthcare",
      icon: "🏥",
      description: "Pioneering digital health solutions...",
      image: I1,
    },
    {
      name: "Education",
      icon: "🎓",
      description: "Transforming learning with e-learning platforms...",
      image: I2,
    },
    {
      name: "E-Commerce",
      icon: "🛒",
      description: "Building dynamic online stores...",
      image: I3,
    },
    {
      name: "Finance",
      icon: "💰",
      description: "Developing secure digital banking solutions...",
      image: I4,
    },
    {
      name: "Manufacturing",
      icon: "🏭",
      description: "Integrating smart technology for Industry 4.0...",
      image: I5,
    },
    {
      name: "Real Estate",
      icon: "🏢",
      description: "Creating digital platforms for property listings...",
      image: I6,
    },
    {
      name: "Travel & Hospitality",
      icon: "✈️",
      description: "Designing intuitive booking engines...",
      image: I7,
    },
    {
      name: "Logistics & Supply Chain",
      icon: "🚚",
      description: "Optimizing logistics operations...",
      image: I8,
    },
  ];

  // --- CONFIGURATION ---
  // You can change this number to control how many cards are visible at once on larger screens.
  const CARDS_PER_PAGE = 4;

  // --- STATE MANAGEMENT ---
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- PAGINATION LOGIC ---
  const handleNext = () => {
    // Move to the next set of cards, but don't go past the end
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + CARDS_PER_PAGE, industries.length - CARDS_PER_PAGE)
    );
  };

  const handlePrev = () => {
    // Move to the previous set of cards, but don't go below zero
    setCurrentIndex((prevIndex) => Math.max(prevIndex - CARDS_PER_PAGE, 0));
  };

  // Determine if buttons should be disabled
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + CARDS_PER_PAGE >= industries.length;

  // --- ANIMATION VARIANTS ---
  const cardAnimationVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <motion.section
      className="pt-12 md:pt-16 pb-16 md:pb-20 bg-gradient-to-b from-slate-900 to-gray-900 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        {/* --- Header with Title and Navigation Buttons --- */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 md:mb-14">
          <div className="max-w-xl mb-6 md:mb-0">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Industries We Empower
            </motion.h2>
            <motion.p
              className="text-gray-300 text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              We deliver specialized digital solutions across various
              industries.
            </motion.p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3 self-end md:self-center">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className="p-2.5 rounded-full bg-slate-700/60 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition-all"
              aria-label="Previous Industries"
            >
              <ArrowLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="p-2.5 rounded-full bg-slate-700/60 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition-all"
              aria-label="Next Industries"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>

        {/* --- Card Grid Container --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {industries
            .slice(currentIndex, currentIndex + CARDS_PER_PAGE)
            .map((industry) => (
              <AnimatePresence key={industry.name}>
                <motion.div
                  className="relative group overflow-hidden rounded-xl shadow-2xl shadow-black/30 h-[420px] flex flex-col justify-end"
                  variants={cardAnimationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none"></div>
                  <div className="relative p-5 md:p-6 z-10">
                    <div className="mb-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-3xl w-14 h-14 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                      <span>{industry.icon}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-1.5 drop-shadow-md">
                      {industry.name}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
        </div>
      </div>
    </motion.section>
  );
};

export default IndustriesWeServe;
