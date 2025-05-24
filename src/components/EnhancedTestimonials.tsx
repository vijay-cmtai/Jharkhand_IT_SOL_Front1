import React, { useState, useEffect } from "react"; // Added useEffect for potential autoplay
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote as QuoteIcon,
} from "lucide-react"; // Renamed Quote to QuoteIcon
import { cn } from "@/lib/utils"; // Assuming this is for classnames utility

interface TestimonialProps {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const EnhancedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0 for initial, 1 for next, -1 for prev

  const testimonials: TestimonialProps[] = [
    {
      id: 1,
      name: "Anuj Kumar", // Slightly changed names for variety
      role: "Director",
      company: "ASCOT",
      image:
        "https://www.jharkhanditsolutions.com/wp-content/uploads/2016/12/princiapl.png",
      content:
        "'OutStanding Expirence',JIS demonstrated us that they are highly dedicated and committed professionals which bring a wealth of knowledge and experince.They tackle challenges and get to the source of technical issues.",
      rating: 5,
    },
    {
      id: 2,
      name: "AK Singh",
      role: "Manager",
      company: "JCSOI",
      image:
        "https://www.jharkhanditsolutions.com/wp-content/uploads/2016/12/ak-singh.jpg",
      content:
        "' Wonderful Job ',JIS demonstrated us that they are highly dedicated and commited professionals which bring a wealth of knowledge and experince. They tackle challenges and get to the source of technical issues.",
      rating: 4,
    },
    {
      id: 3,
      name: "Zaki Rhaman",
      role: "Director",
      company: "Sadaf Public School",
      image:
        "https://www.jharkhanditsolutions.com/wp-content/uploads/2016/12/director-sadaf-public-school.jpg",
      content:
        "' Great Expirence ' , I am very much satisfied with you web work. I would like to express my sincere thanks Gratidute and appreciation to all your nice staff for the excellent web service",
      rating: 4,
    },
    {
      id: 4,
      name: "Bhanu Singh",
      role: "Director",
      company: "Hotel Genista Inn",
      image:
        "https://www.jharkhanditsolutions.com/wp-content/uploads/2016/12/vanu.jpg", // Different image
      content:
        "JIS provided outstanding web development for our healthcare portal, implementing secure authentication and robust data management systems compliant with all industry regulations. Highly recommended for their precision!",
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Optional: Autoplay
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(autoplayInterval);
  }, [currentIndex]); // Reset interval if currentIndex changes manually

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.9, rotate: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 12,
        duration: 0.9,
        staggerChildren: 0.15,
      },
    },
  };

  const titleBlockVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 10 },
    },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      // rotateY: direction > 0 ? -30 : 30,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      // rotateY: 0,
      transition: { type: "spring", stiffness: 50, damping: 20, duration: 0.6 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      // rotateY: direction < 0 ? 30 : -30,
      transition: { type: "spring", stiffness: 50, damping: 20, duration: 0.4 },
    }),
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <motion.section
      className="pt-12 md:pt-16 pb-16 md:pb-24 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={titleBlockVariants}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500
"
          >
            Voices of Our Valued Clients
          </h2>
          <p className="text-gray-300/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Hear directly from those who've experienced the impact of our
            collaborative solutions and dedicated expertise.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto relative"
          variants={titleBlockVariants}
        >
          {" "}
          {/* Container for testimonial and quote */}
          <motion.div
            className="absolute -top-8 -left-8 md:-top-10 md:-left-10 text-pink-500/10 opacity-50 pointer-events-none"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <QuoteIcon size={100} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 text-cyan-500/10 opacity-50 pointer-events-none transform scale-x-[-1]"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
          >
            <QuoteIcon size={100} strokeWidth={1.5} />
          </motion.div>
          <div className="relative min-h-[450px] md:min-h-[420px] overflow-hidden bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-2xl shadow-black/40 border border-slate-700/80 p-8 md:p-10">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex} // Important for AnimatePresence to detect changes
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center" // Ensure div fills the space for absolute positioning
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left mb-6">
                  <div className="relative mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg border-2 border-pink-500/50">
                      <img
                        src={activeTestimonial.image}
                        alt={activeTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-pink-500 to-orange-400 p-1.5 rounded-full shadow-md">
                      <QuoteIcon
                        size={14}
                        className="text-white"
                        strokeWidth={3}
                      />
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      {activeTestimonial.name}
                    </h3>
                    <p className="text-pink-400/90 text-sm md:text-base">
                      {activeTestimonial.role} at {activeTestimonial.company}
                    </p>
                    <div className="flex mt-2 justify-center sm:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={cn(
                            "transition-colors duration-300",
                            i < activeTestimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-600 fill-transparent"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <motion.p
                  className="text-gray-300/90 italic text-base md:text-lg leading-relaxed text-center line-clamp-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  "{activeTestimonial.content}"
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 relative z-10">
            <motion.button
              onClick={prevSlide}
              className="p-3 rounded-full text-slate-300 hover:text-white bg-slate-700/50 hover:bg-pink-500/80 transition-all duration-300 shadow-lg transform hover:scale-110 active:scale-95"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </motion.button>

            <div className="flex items-center space-x-2.5">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(
                      index > currentIndex ? 1 : index < currentIndex ? -1 : 0
                    );
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out",
                    index === currentIndex
                      ? "bg-pink-500 scale-125 shadow-md shadow-pink-500/50"
                      : "bg-slate-600 hover:bg-slate-500"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                  whileHover={{ scale: index === currentIndex ? 1.25 : 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="p-3 rounded-full text-slate-300 hover:text-white bg-slate-700/50 hover:bg-pink-500/80 transition-all duration-300 shadow-lg transform hover:scale-110 active:scale-95"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EnhancedTestimonials;
