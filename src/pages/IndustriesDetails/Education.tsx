// src/pages/industrydetails/EducationDetailPage.tsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Zap,
  Layers,
  Cpu,
  BarChart3,
  ShieldCheck,
  ThumbsUp,
  Target,
  MessageSquare,
  HelpCircle,
  FileText,
  Users,
  Lightbulb,
  Award,
  ArrowRight,
  GraduationCap, // Specific icon
} from "lucide-react";

import UnifiedNavbar from "../../components/UnifiedNavbar";
import Footer from "../../components/Footer"; // Assuming you might want to re-enable this
import { Button } from "@/components/ui/button";
import vedio2 from "../../assets/vedio2.mp4"; // Video import

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// --- PAGE SPECIFIC DATA ---
const industryInfo = {
  name: "Education (EdTech)",
  icon: GraduationCap,
  tagline:
    "Empowering Learners and Educators with Innovative and Accessible EdTech Solutions.",
  // Kept for poster or fallback
  imageUrl:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWR1Y2F0aW9uJTIwdGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  overviewDescription:
    "We are passionate about innovating learning experiences for students and educators globally. Our EdTech solutions focus on making education more accessible, engaging, personalized, and effective through technology.",
  detailedPoints: [
    "We develop interactive e-learning platforms, robust Learning Management Systems (LMS), virtual classrooms, and comprehensive student management systems (SIS).",
    "Our team leverages AI to create personalized learning paths, adaptive assessments, and intelligent tutoring systems that cater to individual student needs.",
    "We explore immersive technologies like AR/VR to create engaging educational content and simulations, transforming traditional learning methods.",
    "Accessibility and inclusivity are core to our EdTech philosophy, ensuring our platforms are usable by learners of all abilities and backgrounds.",
  ],
  keySolutions: [
    {
      title: "Learning Management Systems (LMS)",
      description:
        "Custom LMS development with features for course creation, delivery, tracking, and assessment.",
      icon: Layers,
    },
    {
      title: "Virtual Classroom Platforms",
      description:
        "Interactive platforms for live online classes, webinars, and collaborative learning.",
      icon: MessageSquare,
    },
    {
      title: "AI-Powered Personalized Learning",
      description:
        "Adaptive learning paths, intelligent tutoring, and AI-driven content recommendations.",
      icon: Cpu,
    },
    {
      title: "Student Information Systems (SIS)",
      description:
        "Comprehensive systems for managing student data, admissions, grading, and administrative tasks.",
      icon: Users,
    },
    {
      title: "Online Assessment & Proctoring",
      description:
        "Secure tools for creating, delivering, and proctoring online exams and assessments.",
      icon: ShieldCheck,
    },
    {
      title: "EdTech Mobile Applications",
      description:
        "Engaging mobile learning apps for students and content delivery tools for educators.",
      icon: Zap,
    }, // Changed icon
    {
      title: "AR/VR in Education",
      description:
        "Development of immersive learning experiences using Augmented and Virtual Reality.",
      icon: Lightbulb,
    },
    {
      title: "Gamified Learning Content",
      description:
        "Creating interactive and gamified educational modules to boost student engagement and retention.",
      icon: BarChart3,
    },
  ],
  challenges: [
    "Bridging the digital divide and ensuring equitable access to technology.",
    "Engaging students effectively in remote and hybrid learning environments.",
    "Integrating new EdTech tools seamlessly with existing institutional systems.",
    "Ensuring data privacy and security for student information.",
    "Providing adequate training and support for educators to utilize new technologies.",
    "Measuring the impact and effectiveness of EdTech interventions.",
  ],
  benefits: [
    "Enhanced student engagement and motivation through interactive and personalized learning.",
    "Improved learning outcomes and knowledge retention.",
    "Greater accessibility and flexibility in education delivery.",
    "Streamlined administrative processes for educational institutions.",
    "Data-driven insights for educators to tailor instruction and support students.",
    "Development of future-ready skills through technology-enhanced learning.",
  ],
  relevantTechnologies: [
    "Moodle/Canvas APIs",
    "WebRTC",
    "AI/ML (NLP, CV)",
    "React/Angular",
    "Node.js",
    "AR/VR SDKs",
    "xAPI/SCORM",
    "Cloud (AWS, Azure)",
  ],
  caseStudy: {
    title: "Transforming K-12 Learning with an Interactive E-Learning Platform",
    excerpt:
      "See how our custom LMS and personalized learning modules improved student engagement by 50% and test scores by 15% for a leading school district.",
    link: "/case-studies/k12-elearning-platform-edtech",
  },
  // Added for sidebar content
  whyPartnerPoints: [
    "Pedagogy-driven technology solutions for impactful learning.",
    "Strong focus on accessibility, inclusivity, and user experience.",
    "Development of scalable, secure, and robust learning platforms.",
    "Expertise in leveraging AI, AR/VR for innovative education.",
    "Comprehensive training and continuous support for educators.",
    "Proven ability to integrate with existing institutional ecosystems.",
  ],
};

const EducationDetailPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const IndustryIcon = industryInfo.icon;

  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen antialiased flex flex-col">
      <UnifiedNavbar />
      <main className="flex-grow">
        {/* --- BANNER SECTION (Height Reduced & Enhanced) --- */}
        <motion.section
          className="relative pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-30 lg:pb-18 text-white overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="absolute inset-0 z-0">
            {/* Background video */}
            <video
              autoPlay
              loop
              muted
              playsInline // Ensures video plays inline on mobile
              className="w-full h-full object-cover blur-sm" // Video covers the area, added blur-sm
              src={vedio2} // Source of the video
              poster={industryInfo.imageUrl} // Optional: poster image
            >
              Your browser does not support the video tag.
            </video>
            {/* Gradient overlay to maintain UI color and text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-blue-900/40"></div>{" "}
            {/* Adjusted gradient to blue for education feel */}
          </div>
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-3">
                <IndustryIcon className="w-12 h-12 md:w-14 md:h-14 text-cyan-400 mx-auto" />
              </motion.div>
              <motion.h1
                variants={fadeIn}
                className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500"
              >
                {industryInfo.name}
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-md md:text-lg text-slate-300/90 max-w-xl mx-auto leading-relaxed"
              >
                {industryInfo.tagline}
              </motion.p>
              <motion.div variants={fadeIn} className="mt-6">
                <Button
                  size="lg"
                  onClick={() => navigate("/contact")}
                  className="bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white font-semibold shadow-lg hover:shadow-sky-500/40 transition-all duration-300 transform hover:scale-105 px-8 py-3"
                >
                  Shape the Future of Learning{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* --- LEFT/MAIN CONTENT AREA --- */}
            <motion.div className="lg:col-span-8 space-y-16" variants={fadeIn}>
              <motion.section variants={fadeIn}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <Layers className="w-8 h-8 mr-3 text-cyan-400 shrink-0" />
                  Pioneering {industryInfo.name}
                </h2>
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-300/90 leading-relaxed space-y-5">
                  <p>{industryInfo.overviewDescription}</p>
                  {industryInfo.detailedPoints.map((point, index) => (
                    <p key={index}>{point}</p>
                  ))}
                </div>
              </motion.section>

              <motion.section variants={fadeIn}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <Zap className="w-8 h-8 mr-3 text-cyan-400 shrink-0" /> Our
                  Key EdTech Solutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  {industryInfo.keySolutions.map((solution, index) => {
                    const SolutionIcon = solution.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={fadeIn}
                        className="group bg-slate-800/50 border border-slate-700/60 rounded-xl p-6 shadow-lg hover:border-cyan-500/70 hover:bg-slate-700/70 hover:shadow-cyan-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <div className="flex items-start mb-3">
                          <div className="bg-slate-700/50 group-hover:bg-cyan-500/20 p-2.5 rounded-lg mr-4 transition-colors duration-300">
                            <SolutionIcon className="w-6 h-6 text-emerald-400 group-hover:text-cyan-300 transition-colors duration-300 shrink-0" />
                          </div>
                          <h3 className="text-xl font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 mt-1">
                            {solution.title}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-400/80 leading-relaxed">
                          {solution.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>

              <motion.section
                variants={fadeIn}
                className="grid md:grid-cols-2 gap-x-10 gap-y-12"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 pb-2.5 border-b border-red-500/50 flex items-center">
                    <Target className="w-7 h-7 mr-3 text-red-400 shrink-0" />{" "}
                    Educational Challenges We Solve
                  </h2>
                  <ul className="space-y-3.5">
                    {industryInfo.challenges.map((challenge, index) => (
                      <motion.li
                        key={index}
                        variants={fadeIn}
                        className="flex items-start"
                      >
                        <CheckCircle className="w-5 h-5 text-red-400/70 mr-3 mt-0.5 shrink-0" />
                        <span className="text-slate-300/90">{challenge}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 pb-2.5 border-b border-emerald-500/50 flex items-center">
                    <ThumbsUp className="w-7 h-7 mr-3 text-emerald-400 shrink-0" />{" "}
                    Advantages We Offer
                  </h2>
                  <ul className="space-y-3.5">
                    {industryInfo.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        variants={fadeIn}
                        className="flex items-start"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-400/70 mr-3 mt-0.5 shrink-0" />
                        <span className="text-slate-300/90">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.section>

              {industryInfo.caseStudy && (
                <motion.section variants={fadeIn}>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                    <FileText className="w-8 h-8 mr-3 text-cyan-400 shrink-0" />{" "}
                    EdTech Impact Story
                  </h2>
                  <div className="bg-gradient-to-br from-sky-800/50 via-slate-800/40 to-emerald-800/50 p-8 rounded-xl shadow-2xl border border-sky-600/50 hover:border-sky-500 transition-colors">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {industryInfo.caseStudy.title}
                    </h3>
                    <p className="text-slate-300/90 mb-6 leading-relaxed">
                      {industryInfo.caseStudy.excerpt}
                    </p>
                    <Button
                      asChild
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <Link to={industryInfo.caseStudy.link}>
                        Discover the Impact{" "}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.section>
              )}
            </motion.div>

            {/* --- RIGHT SIDEBAR (Enhanced) --- */}
            <motion.aside
              className="lg:col-span-4 space-y-8 sticky top-24 self-start"
              variants={fadeIn}
            >
              <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50 shadow-lg backdrop-blur-sm hover:border-slate-600/70 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-cyan-400 shrink-0" />{" "}
                  Why Choose Our EdTech Expertise?
                </h3>
                <ul className="space-y-3 text-sm text-slate-300/95">
                  {industryInfo.whyPartnerPoints.map(
                    (
                      point,
                      index // Using whyPartnerPoints
                    ) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400/90 mr-2.5 shrink-0" />
                        {point}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-700/80 via-sky-700/80 to-blue-800/80 p-8 rounded-xl border border-transparent hover:border-sky-400/70 text-center shadow-2xl backdrop-blur-sm transition-all duration-300 group">
                {" "}
                {/* Adjusted gradient */}
                <MessageSquare className="w-12 h-12 text-sky-100 group-hover:text-white mx-auto mb-5 transition-colors duration-300 transform group-hover:scale-110" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Transform Education?
                </h3>
                <p className="text-sky-100/90 mb-6 text-sm">
                  Let's collaborate to create impactful EdTech solutions that
                  empower learners and educators alike.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-sky-700 hover:bg-sky-50 font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-sky-300/70 shadow-md hover:shadow-lg"
                >
                  <Link to="/contact">Start the Conversation</Link>
                </Button>
              </div>

              <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50 shadow-lg backdrop-blur-sm hover:border-slate-600/70 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center">
                  <Cpu className="w-6 h-6 mr-3 text-cyan-400 shrink-0" /> Key
                  EdTech Technologies
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {industryInfo.relevantTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-700/80 text-cyan-300/90 px-3.5 py-2 rounded-lg text-xs font-medium border border-slate-600/70 hover:bg-slate-600/80 hover:text-cyan-200 hover:border-slate-500 transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </main>
      <Footer /> {/* Re-enabled Footer, or remove if not desired */}
    </div>
  );
};

export default EducationDetailPage;
