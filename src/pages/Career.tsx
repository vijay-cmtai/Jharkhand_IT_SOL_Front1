import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Laptop,
  Handshake,
  // ArrowRight, // Not used directly in JSX, Send icon is used
  MapPin,
  Clock,
  TrendingUp,
  FileText,
  Search,
  Send,
} from "lucide-react";
import { FaUserGraduate } from "react-icons/fa";

import UnifiedNavbar from "../components/UnifiedNavbar"; // Assuming you use this
import Footer from "../components/Footer"; // Assuming you use this
import vedio2 from "../assets/vedio2.mp4"; // Importing the video - VERIFY THIS PATH

// Placeholder for your JISS brand colors
// These are used in Tailwind template literals, so they need to be actual color names
// e.g., `text-teal-500` not `text-${jisTeal}` unless you configure Tailwind JIT properly.
// For simplicity, I will hardcode the color names in the JSX for now.
// const jisTeal = "teal-500";
// const jisBlue = "sky-500";
// const jisGreen = "green-500";
// const jisYellow = "amber-400";

const Career = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.playbackRate = 1.0; // Normal speed

      const handleLoadedData = () => {
        console.log(
          "Career Page Hero Video: Data loaded. Video should be playing due to autoplay."
        );
        if (videoElement.paused) {
          videoElement.play().catch((error) => {
            console.error(
              "Career Page Hero Video: play() promise rejected.",
              error
            );
          });
        }
      };

      const handleError = (e: Event) => {
        console.error("Career Page Hero Video: Error event triggered.");
        if (videoElement.error) {
          console.error("Video error code:", videoElement.error.code);
          console.error("Video error message:", videoElement.error.message);
        } else {
          console.error("Unknown video error occurred.", e);
        }
      };

      videoElement.addEventListener("loadeddata", handleLoadedData);
      videoElement.addEventListener("error", handleError);

      if (
        videoElement.paused &&
        videoElement.readyState >= videoElement.HAVE_ENOUGH_DATA
      ) {
        videoElement.play().catch((error) => {
          console.error(
            "Career Page Hero Video: Manual play attempt failed.",
            error
          );
        });
      }

      return () => {
        videoElement.removeEventListener("loadeddata", handleLoadedData);
        videoElement.removeEventListener("error", handleError);
      };
    }
  }, []);

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const benefits = [
    {
      icon: <Laptop className="text-green-500 w-10 h-10" />,
      title: "Innovative Work",
      description:
        "Work on cutting-edge projects using the latest technologies.",
      borderColor: "border-green-500/50",
    },
    {
      icon: <FaUserGraduate className="text-teal-500 w-10 h-10" />,
      title: "Learning & Growth",
      description:
        "Continuous learning opportunities and career advancement paths.",
      borderColor: "border-teal-500/50",
    },
    {
      icon: <Handshake className="text-sky-500 w-10 h-10" />,
      title: "Collaborative Culture",
      description:
        "Supportive team environment that values diverse perspectives.",
      borderColor: "border-sky-500/50",
    },
    {
      icon: <Briefcase className="text-amber-400 w-10 h-10" />,
      title: "Competitive Benefits",
      description:
        "Attractive compensation and benefits package for all employees.",
      borderColor: "border-amber-400/50",
    },
  ];

  const jobOpenings = [
    {
      id: "senior-react-developer",
      title: "Senior React Developer",
      details: [
        {
          icon: <Clock size={16} className="text-green-500/80" />,
          text: "Full-time",
        },
        {
          icon: <MapPin size={16} className="text-sky-500/80" />,
          text: "Ranchi (Remote Option)",
        },
        {
          icon: <TrendingUp size={16} className="text-teal-500/80" />,
          text: "3+ years exp.",
        },
      ],
      description:
        "Lead the development of high-performance web applications using React and modern frontend technologies.",
    },
    {
      id: "ui-ux-designer",
      title: "UI/UX Designer",
      details: [
        {
          icon: <Clock size={16} className="text-green-500/80" />,
          text: "Full-time",
        },
        {
          icon: <MapPin size={16} className="text-sky-500/80" />,
          text: "Ranchi, Jharkhand",
        },
        {
          icon: <TrendingUp size={16} className="text-teal-500/80" />,
          text: "2+ years exp.",
        },
      ],
      description:
        "Craft intuitive and visually appealing user interfaces and experiences for web and mobile platforms.",
    },
    {
      id: "android-developer",
      title: "Android Developer",
      details: [
        {
          icon: <Clock size={16} className="text-green-500/80" />,
          text: "Full-time",
        },
        {
          icon: <MapPin size={16} className="text-sky-500/80" />,
          text: "Hybrid (Ranchi)",
        },
        {
          icon: <TrendingUp size={16} className="text-teal-500/80" />,
          text: "2-5 years exp.",
        },
      ],
      description:
        "Develop and maintain high-quality Android applications, ensuring responsiveness and performance.",
    },
    {
      id: "digital-marketing-specialist",
      title: "Digital Marketing Specialist",
      details: [
        {
          icon: <Clock size={16} className="text-green-500/80" />,
          text: "Full-time",
        },
        {
          icon: <MapPin size={16} className="text-sky-500/80" />,
          text: "Remote",
        },
        {
          icon: <TrendingUp size={16} className="text-teal-500/80" />,
          text: "1-3 years exp.",
        },
      ],
      description:
        "Plan and execute digital marketing campaigns, including SEO/SEM, email, social media, and display advertising.",
    },
  ];

  const handleApplyNow = (jobId: string, jobTitle: string) => {
    navigate(`/careers/apply/${jobId}?title=${encodeURIComponent(jobTitle)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-black text-gray-200 antialiased">
      <UnifiedNavbar />
      <motion.main
        className="flex-grow"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden isolate">
          {/* Container for Video and Overlays to ensure stacking order */}
          <div className="absolute inset-0 -z-10">
            {/* Video Background */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter blur-sm"
              poster="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
            >
              <source src={vedio2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* UI Color Gradient Overlay - Applied on top of video */}
            {/* This is the crucial part: the gradient overlay that maintains your UI color */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/60 via-sky-500/50 to-green-500/60"></div>

            {/* Grid Pattern Overlay - Applied on top of color gradient */}
            <div className="absolute inset-0 bg-grid-slate-700/[0.05] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)] opacity-30"></div>

            {/* Bottom Fade Overlay - Applied on top of grid pattern */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <motion.div
            className="container mx-auto px-4 relative z-0" // z-0 or z-1 here, ensure it's above the -z-10 background container but allows overlays to be effective
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-[0_3px_8px_rgba(20,184,166,0.3)]"
              >
                Join Our Visionary Team
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-200/90 mb-10 drop-shadow-sm max-w-2xl mx-auto"
              >
                Build your career with a passionate team dedicated to innovation
                and shaping the future of technology.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="inline-block p-0.5 rounded-xl bg-gradient-to-br from-green-500 via-teal-500 to-sky-500 shadow-2xl shadow-teal-500/30 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    Ready for Your Next Challenge?
                  </h3>
                  <a
                    href="#openings"
                    className="group inline-flex items-center bg-amber-400 hover:bg-opacity-90 text-gray-900 font-semibold px-8 py-3.5 rounded-md shadow-lg hover:shadow-amber-400/40 transform transition-all hover:-translate-y-1 active:scale-95"
                  >
                    <Search
                      size={20}
                      className="mr-2.5 transition-transform duration-300 group-hover:rotate-[360deg]"
                    />
                    Explore Open Positions
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-500">
                Why Join JISS?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                We're more than just a workplace. We're a community of
                innovators, thinkers, and creators.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className={`bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:${benefit.borderColor} transition-all duration-300 transform hover:-translate-y-1`}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-white text-center mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Openings Section */}
        <section id="openings" className="py-16 md:py-24 bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-14"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-500">
                Current Openings
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Explore our exciting career opportunities and apply to be a part
                of our dynamic team.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {jobOpenings.map((job) => (
                <motion.div
                  key={job.id}
                  className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-teal-500 transition duration-300 shadow-lg"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {job.title}
                  </h3>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 mb-4">
                    {job.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-1.5">
                        {React.cloneElement(detail.icon, {
                          className: `${detail.icon.props.className || ""}`,
                        })}
                        <span>{detail.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-300 mb-6">{job.description}</p>
                  <button
                    onClick={() => handleApplyNow(job.id, job.title)}
                    className="group inline-flex items-center px-5 py-2.5 bg-teal-500 hover:bg-opacity-90 text-white font-medium rounded-lg transition-all hover:-translate-y-1 active:scale-95 shadow-md hover:shadow-teal-500/40"
                  >
                    <Send
                      size={16}
                      className="mr-2 transition-transform group-hover:translate-x-1"
                    />
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
            {/* <motion.div
              className="text-center mt-16"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-gray-400 mb-4">
                Don't see a role that fits? We're always looking for talented
                individuals.
              </p>
              <Link
                to="/contact?subject=General Career Inquiry"
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Submit Your Resume{" "}
                <FileText
                  size={18}
                  className="ml-2 group-hover:animate-pulse"
                />
              </Link>
            </motion.div> */}
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default Career;
