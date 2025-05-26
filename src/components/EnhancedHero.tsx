import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Vedio1 from "../assets/Vedio1.mp4";

const EnhancedHero = () => {
  // Animation Variants (remain largely the same)
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.15 },
    },
  };

  const leftContentVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonGroupVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2, staggerChildren: 0.1 },
    },
  };

  const buttonItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: {
      scale: 1.03,
      y: -1,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
    tap: { scale: 0.97 },
  };

  const videoBlockVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.98, rotateY: -5 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 45,
        damping: 12,
        duration: 0.7,
        delay: 0.1,
      },
    },
  };

  return (
    <motion.section
      // Outer section has symmetrical py-12 (3rem top/bottom)
      className="relative flex items-start bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-hidden py-12"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 bg-grid-white/[0.025] [mask-image:radial-gradient(ellipse_at_center,white_5%,transparent_55%)] opacity-70"></div>

      <motion.div
        className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-600/10 to-blue-700/10 rounded-full blur-3xl opacity-40 transform -translate-x-1/4 -translate-y-1/4"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/10 to-pink-600/10 rounded-full blur-3xl opacity-40 transform translate-x-1/4 translate-y-1/4"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.55, 0.4] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* CHANGED: Inner container now has symmetrical responsive vertical padding */}
      <div className="container mx-auto px-4 relative z-10 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            variants={leftContentVariants}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-[2.8rem] lg:text-[3.2rem] font-extrabold mb-4 !leading-tight"
              variants={textItemVariants}
            >
              <div className="lg:flex lg:items-baseline lg:gap-x-3">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Transforming
                </span>
                <span className="block lg:inline text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mt-0 sm:mt-1 lg:mt-0">
                  Ideas
                </span>
              </div>
              <span className="block mt-1 sm:mt-2 text-white">
                Into Digital Reality
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-gray-300/80 mb-5 leading-relaxed max-w-md mx-auto lg:mx-0"
              variants={textItemVariants}
            >
              We architect cutting-edge digital solutions that drive growth,
              efficiency, and innovation. From intuitive web and mobile
              platforms to enterprise-grade systems, our team of experts
              delivers tailor-made solutions designed for your unique business
              needs.
            </motion.p>

            <motion.p
              className="text-xs sm:text-sm text-cyan-400/60 mb-8 max-w-md mx-auto lg:mx-0"
              variants={textItemVariants}
              transition={{ delay: 0.1 }}
            >
              From concept to deployment, we ensure quality, scalability, and
              impactful results. Partner with us.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
              variants={buttonGroupVariants}
            >
              <motion.div
                variants={buttonItemVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative group/button"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-md blur opacity-40 group-hover/button:opacity-60 transition duration-700 group-hover/button:duration-200 animate-tilt"></div>
                <Link
                  to="/services"
                  className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-br from-cyan-500 to-blue-600 rounded-md shadow-md hover:shadow-blue-500/30 transition-shadow duration-300 group"
                >
                  Explore Our Services
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.div
                variants={buttonItemVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative group/button"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-md blur opacity-40 group-hover/button:opacity-60 transition duration-700 group-hover/button:duration-200 animate-tilt"></div>
                <Link
                  to="/contact"
                  className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-br from-yellow-500 to-orange-500 rounded-md shadow-md hover:shadow-orange-500/30 border border-transparent hover:border-orange-300/20 transition-all duration-300 group"
                >
                  Get Started
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="lg:w-1/1 w-full" variants={videoBlockVariants}>
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-black/60 aspect-video border-2 border-slate-700/40 group">
              <video
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.02]"
                autoPlay
                loop
                muted
                playsInline
                key="hero-video-main-corrected"
                poster="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=70&blend=000000&bm=multiply&bs=inherit&h=563"
              >
                <source src={Vedio1} type="video/mp4" />
                <source
                  src="https://static.vecteezy.com/system/resources/previews/004/149/874/mp4/abstract-plexus-geometrical-shapes-connection-and-web-concept-digital-communication-and-technology-network-background-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 opacity-95 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <h3 className="text-md sm:text-lg md:text-xl font-semibold text-white mb-1">
                    Innovative Digital Experiences
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-snug line-clamp-2">
                    Pioneering solutions that redefine user engagement and drive
                    tangible results for modern enterprises.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EnhancedHero;
