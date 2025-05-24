import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Users2,
  Award,
  Rocket,
  Handshake,
  Linkedin,
  Twitter,
  Briefcase,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

import vedio2 from "../assets/vedio2.mp4"; // Importing the video

const jisBlue = "sky-500";
const jisDark = "slate-800";
const jisYellow = "amber-400";
const jisTeal = "teal-500";
const jisOrange = "orange-500";
const jisGreen = "green-500";

const Company = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (videoRef.current) {
      // Video ki speed normal (100%) rakhne ke liye
      videoRef.current.playbackRate = 1.0; // <<--- SPEED NORMAL KI GAYI HAI
      videoRef.current.onloadeddata = () => {
        console.log("Company Page Hero Video data loaded");
      };
      videoRef.current.onerror = () => {
        console.error("Error loading Company Page Hero video");
      };
    }
  }, []);

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const card3DVariants = {
    hover: {
      rotateY: 5,
      rotateX: -5,
      scale: 1.03,
      boxShadow: `0px 20px 40px -10px rgba(56, 189, 248, 0.2)`,
    },
    initial: { rotateY: 0, rotateX: 0, scale: 1 },
  };

  const valueCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -8,
      scale: 1.04,
      boxShadow: "0px 10px 25px -5px rgba(56, 189, 248, 0.15)",
    },
  };

  const teamMemberCardVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 13,
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0px 10px 25px -5px rgba(56, 189, 248, 0.1)",
    },
  };

  const stats = [
    { value: "10+", label: "Years of Experience" },
    { value: "500+", label: "Projects Completed" },
    { value: "50+", label: "Team Members" },
    { value: "30+", label: "Countries Served" },
  ];

  const coreValues = [
    {
      icon: <Users2 className={`text-${jisBlue} text-3xl md:text-4xl`} />,
      title: "Customer First",
      description:
        "We prioritize our clients' needs and deliver solutions that exceed their expectations.",
      hoverShadowClass: `hover:shadow-sky-500/20`,
    },
    {
      icon: <Rocket className={`text-${jisTeal} text-3xl md:text-4xl`} />,
      title: "Innovation",
      description:
        "We embrace new technologies and ideas to deliver cutting-edge solutions.",
      hoverShadowClass: `hover:shadow-teal-500/20`,
    },
    {
      icon: <Award className={`text-${jisYellow} text-3xl md:text-4xl`} />,
      title: "Excellence",
      description:
        "We maintain the highest standards of quality in everything we do.",
      hoverShadowClass: `hover:shadow-amber-400/20`,
    },
    {
      icon: <Handshake className={`text-${jisOrange} text-3xl md:text-4xl`} />,
      title: "Integrity",
      description:
        "We operate with transparency, honesty, and ethical business practices.",
      hoverShadowClass: `hover:shadow-orange-500/20`,
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Senior UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    },
    {
      id: 3,
      name: "David Lee",
      role: "Project Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    },
    {
      id: 4,
      name: "Maria Garcia",
      role: "Lead Mobile Developer",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    },
    {
      id: 5,
      name: "James Brown",
      role: "Cloud Architect",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    },
    {
      id: 6,
      name: "Linda Davis",
      role: "Marketing Strategist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-300">
      {/* Navbar would go here */}
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          className="relative py-20 md:py-28 overflow-hidden isolate"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Video Background (-z-10) with Blur */}
          {/* <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10 filter blur-sm"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
          >
            <source src={vedio2} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}

          {/* Original UI Color Gradient Overlay (on top of video) */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-sky-700/60 via-slate-900/80 to-black/90`}
          ></div>

          {/* Original Grid Pattern (on top of gradient overlay) */}
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-40"></div>

          {/* Content Container (z-10) */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-sky-200 drop-shadow-[0_3px_8px_rgba(56,189,248,0.3)]"
                variants={itemVariants}
              >
                About Jharkhand IT Solutions
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-300/90 mb-10 leading-relaxed"
                variants={itemVariants}
              >
                A pioneering technology powerhouse, delivering transformative
                and innovative digital solutions to a diverse global clientele.
              </motion.p>

              <motion.div
                className="inline-block perspective"
                variants={itemVariants}
                initial="initial"
                whileHover="hover"
              >
                <motion.div
                  className="bg-gradient-to-br from-sky-600/50 to-slate-800/50 p-1 rounded-xl shadow-2xl shadow-sky-500/20"
                  variants={card3DVariants}
                >
                  <div className="bg-slate-900/80 backdrop-blur-sm p-6 md:p-8 rounded-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                      JIS at a Glance
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {stats.map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-slate-800/60 p-4 rounded-lg border border-slate-700/70"
                          variants={itemVariants}
                        >
                          <div
                            className={`text-3xl font-bold text-${jisYellow} mb-1`}
                          >
                            {stat.value}
                          </div>
                          <div className="text-gray-400 text-xs sm:text-sm">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <motion.section
          className="py-16 md:py-24 bg-slate-900"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
              <motion.div className="lg:w-1/2" variants={itemVariants}>
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-${jisBlue}`}
                >
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-300/90 leading-relaxed text-base md:text-lg">
                  <p>
                    Jharkhand IT Solution was founded with a vision to provide
                    cutting-edge technology solutions to businesses of all
                    sizes. Starting as a small team of passionate developers, we
                    have grown into a full-service digital agency with expertise
                    across web, mobile, and software development.
                  </p>
                  <p>
                    Our journey has been defined by continuous learning,
                    innovation, and an unwavering commitment to delivering
                    excellence to our clients. We believe in building long-term
                    relationships based on trust, transparency, and results.
                  </p>
                  <p>
                    Today, we are proud to serve clients across the globe,
                    helping them leverage technology to achieve their business
                    goals and stay ahead in an increasingly digital world.
                  </p>
                </div>
              </motion.div>
              <motion.div className="lg:w-1/2 w-full" variants={itemVariants}>
                <motion.div
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-1 rounded-2xl shadow-2xl shadow-black/30 perspective"
                  initial="initial"
                  whileHover="hover"
                >
                  <motion.div
                    className={`bg-gradient-to-br from-${jisBlue}/10 to-${jisTeal}/10 rounded-xl p-2 aspect-[16/10] flex items-center justify-center border border-slate-700/50`}
                    variants={card3DVariants}
                  >
                    <Building2
                      className={`text-slate-700 text-7xl md:text-9xl opacity-50`}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Core Values Section */}
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-black"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400"
              variants={itemVariants}
            >
              Our Core Values
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/80 shadow-xl transition-all duration-300 transform",
                    value.hoverShadowClass
                  )}
                  custom={index}
                  variants={valueCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="p-4 rounded-full bg-slate-900/50 border border-slate-700 shadow-inner mb-5 inline-block"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-normal">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Meet Our Team Section */}
        <motion.section
          className="py-16 md:py-24 bg-slate-900"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400"
              variants={itemVariants}
            >
              Meet Our Expert Team
            </motion.h2>
            <motion.p
              className="text-center mb-12 md:mb-16 text-gray-300/90 max-w-2xl mx-auto text-lg leading-relaxed"
              variants={itemVariants}
            >
              Our success is driven by a collective of passionate professionals,
              bringing diverse skills and unwavering dedication to every
              project.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-slate-700/70 transition-all duration-300"
                  custom={index}
                  variants={teamMemberCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="aspect-[4/3] bg-slate-700/50 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className={`text-sm font-medium text-${jisBlue} mb-3`}>
                      {member.role}
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                      Brief bio about the team member's expertise and experience
                      in delivering excellence.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <motion.a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-sky-400 transition-colors"
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin size={20} />
                      </motion.a>
                      <motion.a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-sky-400 transition-colors"
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="sr-only">Twitter</span>
                        <Twitter size={20} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-black to-slate-900"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600/10 via-purple-600/10 to-pink-600/10 opacity-50 transform-gpu -rotate-3 scale-110"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-xl rounded-2xl p-1 shadow-2xl shadow-black/40 border border-slate-700/50 perspective"
              variants={itemVariants}
              initial="initial"
              whileHover="hover"
            >
              <motion.div
                className="bg-slate-900/80 rounded-xl p-8 md:p-12"
                variants={card3DVariants}
              >
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-2/3 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      Join Our Journey
                    </h2>
                    <p className="text-gray-300/90 mb-8 text-lg leading-relaxed">
                      Whether you're looking to partner with us on a
                      groundbreaking project or become part of our innovative
                      team, we're excited to connect.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <motion.button
                        onClick={() => navigate("/contact")}
                        className={`bg-${jisBlue} hover:bg-${jisBlue}/90 text-white px-7 py-3 rounded-lg shadow-lg font-semibold text-base button-3d transform transition hover:-translate-y-1 active:translate-y-0`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contact Us <Send size={18} className="inline ml-2" />
                      </motion.button>
                      <motion.button
                        onClick={() => navigate("/career")}
                        className={`bg-transparent border-2 border-${jisTeal} text-${jisTeal} hover:bg-${jisTeal}/10 px-7 py-3 rounded-lg shadow font-semibold text-base button-3d transform transition hover:-translate-y-1 active:translate-y-0`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Careers{" "}
                        <Briefcase size={18} className="inline ml-2" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="lg:w-1/3 flex justify-center mt-8 lg:mt-0">
                    <motion.div
                      className="w-40 h-40 md:w-48 md:h-48 relative"
                      animate={{ y: ["0%", "-8%", "0%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div
                        className={`absolute inset-0 bg-${jisBlue}/20 rounded-full blur-2xl`}
                      ></div>
                      <div
                        className={`relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-${jisBlue} to-${jisDark} border-2 border-white/20 shadow-2xl shadow-${jisBlue}/30`}
                      >
                        <Building2 className="text-white text-5xl md:text-6xl" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Company;
