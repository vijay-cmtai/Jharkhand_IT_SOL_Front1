import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  Cpu,
  Palette,
  Smartphone,
  TrendingUp,
  Send,
  MessageSquare,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

import vedio2 from "../assets/vedio2.mp4"; // Importing the video

// JISS brand colors - We will use darker shades for the hero overlay
const jisPurple = "purple-500";
const jisBlue = "sky-500";
const jisYellow = "amber-400";
const jisTeal = "teal-500";
const jisOrange = "orange-500";
const jisGreen = "green-500";

const HireUs = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Normal speed
      videoRef.current.onloadeddata = () => {
        console.log("HireUs Page Hero Video data loaded");
      };
      videoRef.current.onerror = () => {
        console.error("Error loading HireUs Page Hero video");
      };
    }
  }, []);

  // Animation Variants remain the same
  const sectionVariants = {
    hidden: { opacity: 0, y: 70 },
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
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 13,
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: `0px 10px 30px -5px rgba(168, 85, 247, 0.2)`,
    },
  };

  const talentCardHoverShadows: { [key: string]: string } = {
    SoftwareEngineers: `hover:shadow-[0_10px_30px_-5px_rgba(56,189,248,0.2)]`,
    CreativeDesigners: `hover:shadow-[0_10px_30px_-5px_rgba(20,184,166,0.2)]`,
    MobileAppExperts: `hover:shadow-[0_10px_30px_-5px_rgba(34,197,94,0.2)]`,
    DigitalMarketers: `hover:shadow-[0_10px_30px_-5px_rgba(249,115,22,0.2)]`,
  };

  const hiringModels = [
    {
      title: "Dedicated Team",
      icon: <Users size={32} className={`text-${jisPurple}`} />,
      description:
        "Assemble a full-fledged team of developers, designers, and PMs for your ongoing, large-scale projects, ensuring seamless collaboration and focused expertise dedicated solely to your success.",
      features: [
        "Full Lifecycle Management",
        "Scalable Team Resources",
        "Transparent Reporting & KPIs",
        "Dedicated Project Lead",
        "Direct Communication Channels",
      ],
      ctaPath: "/contact?model=dedicated-team",
      accentColor: jisPurple,
    },
    {
      title: "Staff Augmentation",
      icon: <UserCheck size={32} className={`text-${jisPurple}`} />,
      description:
        "Enhance your existing in-house team by integrating our skilled professionals to fill specific skill gaps, accelerate development, and boost overall project capacity when you need it most.",
      features: [
        "Seamless Team Integration",
        "Flexible Engagement Duration",
        "Precisely Matched Skillsets",
        "Cost-Efficient Solution",
        "Rapid Onboarding Process",
      ],
      ctaPath: "/contact?model=staff-augmentation",
      accentColor: jisPurple,
    },
    {
      title: "Project-Based Engagement",
      icon: <FileText size={32} className={`text-${jisPurple}`} />,
      description:
        "Entrust us with specific projects defined by a clear scope, fixed timeline, and predetermined budget. We take full ownership to deliver predictable outcomes and high-quality results.",
      features: [
        "Defined Deliverables & Scope",
        "Fixed, Transparent Pricing",
        "Milestone-Driven Payments",
        "Complete Project Ownership",
        "Guaranteed Deliverables",
      ],
      ctaPath: "/contact?model=project-based",
      accentColor: jisPurple,
    },
  ];

  const talentCategories = [
    {
      key: "SoftwareEngineers",
      icon: <Cpu size={36} className={`text-${jisBlue}`} />,
      title: "Software Engineers",
      description:
        "Architecting and building robust, scalable, and high-performance software solutions across various platforms and technologies.",
      skills: [
        "Frontend (React, Vue, Angular)",
        "Backend (Node.js, Python, Java, .NET)",
        "Full Stack Development",
        "DevOps & CI/CD",
        "Microservices",
        "API Development",
      ],
    },
    {
      key: "CreativeDesigners",
      icon: <Palette size={36} className={`text-${jisTeal}`} />,
      title: "Creative Designers",
      description:
        "Crafting visually stunning and user-centric designs that elevate brands and create intuitive digital experiences.",
      skills: [
        "UI/UX Research & Design",
        "Graphic Design & Illustration",
        "Motion Graphics & Animation",
        "Brand Identity & Strategy",
        "Prototyping & Wireframing",
        "User Testing",
      ],
    },
    {
      key: "MobileAppExperts",
      icon: <Smartphone size={36} className={`text-${jisGreen}`} />,
      title: "Mobile App Experts",
      description:
        "Developing engaging and high-performance native and cross-platform mobile applications for iOS and Android.",
      skills: [
        "iOS (Swift, Objective-C)",
        "Android (Kotlin, Java)",
        "React Native Development",
        "Flutter Development",
        "Mobile UI/UX Design",
        "App Store Optimization",
      ],
    },
    {
      key: "DigitalMarketers",
      icon: <TrendingUp size={36} className={`text-${jisOrange}`} />,
      title: "Digital Marketers",
      description:
        "Driving growth and brand visibility through data-driven digital marketing strategies and impactful campaigns.",
      skills: [
        "SEO Strategy & Optimization",
        "PPC Campaign Management",
        "Social Media Marketing",
        "Content Strategy & Creation",
        "Email Marketing Automation",
        "Analytics & Reporting",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-300">
      {/* <UnifiedNavbar /> */}
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          className={`relative py-20 md:py-28 overflow-hidden isolate`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Video Background (-z-10) with Blur */}
          <video
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
          </video>

          {/* Dark Gradient Overlay to match the "Build Your Dream Team" image example */}
          {/* This uses very dark, semi-transparent colors to achieve the look */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-slate-900/80 via-black/85 to-black/90`}
          ></div>

          {/* Original Grid Pattern (on top of gradient overlay) */}
          {/* Opacity slightly reduced to blend better with the darker overlay */}
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)] opacity-40"></div>

          {/* Content Container (z-10) */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                // H1 color remains as originally defined in your code
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-purple-300 drop-shadow-[0_3px_8px_rgba(168,85,247,0.3)]"
                variants={itemVariants}
              >
                Build Your Dream Team With Us
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-300/90 mb-10 leading-relaxed"
                variants={itemVariants}
              >
                Access top-tier global talent for your ambitious projects. We
                offer flexible engagement models meticulously tailored to your
                unique business needs, ensuring quality, scalability, and
                innovation.
              </motion.p>

              <motion.div
                className="inline-block perspective"
                variants={itemVariants}
              >
                <motion.div
                  // Card background slightly more transparent to let video effect through
                  className={`bg-gradient-to-br from-purple-500/40 via-sky-500/40 to-slate-800/60 p-1 rounded-xl shadow-2xl shadow-purple-500/20`}
                  initial={{ rotateY: 2, rotateX: -2 }}
                  whileHover={{
                    rotateY: -2,
                    rotateX: 2,
                    scale: 1.03,
                    boxShadow: `0px 25px 50px -12px rgba(168, 85, 247,0.35)`,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="bg-slate-900/60 backdrop-blur-md p-6 md:p-8 rounded-lg">
                    {" "}
                    {/* Slightly more transparent */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                      Need Specialized Skills for Your Project?
                    </h3>
                    <motion.button
                      onClick={() => navigate("/contact?reason=talent-request")}
                      className={`bg-${jisYellow} hover:bg-opacity-90 text-slate-900 font-semibold px-8 py-3.5 rounded-md shadow-lg hover:shadow-${jisYellow}/40 transform transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center group`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Request a Talent Match
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* --- Hiring Models Section --- */}
        <motion.section
          className="py-16 md:py-24 bg-slate-900"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className={`text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-${jisPurple} via-${jisBlue} to-white`}
              variants={itemVariants}
            >
              Flexible Hiring Models to Suit Your Needs
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hiringModels.map((model, index) => (
                <motion.div
                  key={index}
                  className={`bg-slate-800/70 backdrop-blur-md p-6 md:p-8 rounded-xl border border-slate-700/80 shadow-xl transition-all duration-300 flex flex-col group hover:border-${model.accentColor}/50`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex justify-center mb-6">
                    <span
                      className={`p-4 bg-slate-900/60 border border-slate-700 rounded-full shadow-inner inline-flex items-center justify-center group-hover:border-${model.accentColor}/70 transition-colors`}
                    >
                      {React.cloneElement(model.icon, {
                        className: `text-${model.accentColor} transition-colors`,
                      })}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white text-center">
                    {model.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 text-center leading-relaxed flex-grow">
                    {model.description}
                  </p>
                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {model.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-300/90 text-sm"
                      >
                        <span
                          className={`text-${model.accentColor} mr-2.5 flex-shrink-0 font-bold`}
                        >
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    onClick={() => navigate(model.ctaPath)}
                    className={cn(
                      "w-full mt-auto py-3 px-6 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center group",
                      `bg-${model.accentColor} hover:bg-opacity-85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-${model.accentColor}`
                    )}
                    whileHover={{
                      y: -2,
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Talent Pool Section --- */}
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-black"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-teal-400"
              variants={itemVariants}
            >
              Our Diverse Talent Pool
            </motion.h2>
            <motion.p
              className="text-center mb-12 md:mb-16 text-gray-300/90 max-w-2xl mx-auto text-lg leading-relaxed"
              variants={itemVariants}
            >
              We house a versatile team of seasoned professionals, each an
              expert in their domain, ready to bring your vision to life with
              precision and creativity.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {talentCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/70 shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center flex flex-col",
                    talentCardHoverShadows[
                      category.key as keyof typeof talentCardHoverShadows
                    ] || ""
                  )}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex-shrink-0 mb-5">
                    <div className="p-4 rounded-full bg-slate-900/60 border border-slate-700 shadow-inner mb-1 inline-block">
                      {category.icon}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-normal mb-4 flex-grow">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {category.skills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="bg-slate-700/70 text-gray-300 px-3 py-1.5 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- CTA Section --- */}
        <motion.section
          className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-t from-black via-slate-900 to-slate-900"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-${jisPurple}/15 via-${jisBlue}/15 to-transparent opacity-50 transform-gpu -rotate-2 scale-110`}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className={`max-w-4xl mx-auto bg-slate-800/70 backdrop-blur-xl rounded-2xl p-1 shadow-2xl shadow-black/50 border border-slate-700/60 perspective`}
              variants={itemVariants}
            >
              <motion.div
                className="bg-slate-900/90 rounded-xl p-8 md:p-12"
                initial={{ rotateY: 0, rotateX: 0 }}
                whileHover={{ rotateY: 1, rotateX: -1, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-2/3 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-purple-400">
                      Ready to Build Your Dream Team?
                    </h2>
                    <p className="text-gray-300/90 mb-8 text-lg leading-relaxed">
                      Let us connect you with the perfect talent match for your
                      project. Our experts are eager to collaborate and drive
                      your success to new heights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <motion.button
                        onClick={() => navigate("/contact?reason=hire-talent")}
                        className={`bg-gradient-to-r from-${jisPurple} to-${jisBlue} hover:from-${jisPurple}/90 hover:to-${jisBlue}/90 text-white px-8 py-3.5 rounded-lg shadow-lg font-semibold text-base transform transition hover:-translate-y-1 active:translate-y-0 flex items-center justify-center group`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Hire Talent Now{" "}
                        <UserCheck
                          size={18}
                          className="inline ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </motion.button>
                      <motion.button
                        onClick={() =>
                          navigate("/contact?reason=discuss-project")
                        }
                        className={`bg-transparent border-2 border-${jisBlue} text-${jisBlue} hover:bg-${jisBlue}/10 px-8 py-3.5 rounded-lg shadow font-semibold text-base transform transition hover:-translate-y-1 active:translate-y-0 flex items-center justify-center group`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Discuss Requirements{" "}
                        <MessageSquare
                          size={18}
                          className="inline ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </motion.button>
                    </div>
                  </div>
                  <div className="lg:w-1/3 flex justify-center mt-8 lg:mt-0">
                    <motion.div
                      className="w-40 h-40 md:w-48 md:h-48 relative"
                      animate={{ y: ["0%", "-10%", "0%"] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div
                        className={`absolute inset-0 bg-${jisPurple}/25 rounded-full blur-2xl`}
                      ></div>
                      <div
                        className={`relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-${jisPurple} to-${jisBlue} border-2 border-white/20 shadow-2xl shadow-${jisPurple}/40`}
                      >
                        <Users size={50} className="text-white opacity-90" />
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

export default HireUs;
