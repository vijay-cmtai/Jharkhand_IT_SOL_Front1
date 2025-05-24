// src/pages/industrydetails/RealEstateDetailPage.tsx
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
  Building, // Specific icon
  ShoppingCart, // Re-using for marketplace concept if needed elsewhere, or choose another
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
  name: "Real Estate & PropTech",
  icon: Building,
  tagline:
    "Innovating Property Management and Transactions with Cutting-Edge PropTech Solutions.",
  // Kept for poster or fallback
  imageUrl:
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvcHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80",
  overviewDescription:
    "We are modernizing the real estate industry by developing technology-driven solutions (PropTech) that enhance efficiency, transparency, and user experience for agents, developers, buyers, and tenants.",
  detailedPoints: [
    "Our PropTech solutions encompass comprehensive property management software, immersive virtual tour platforms, and AI-powered property valuation tools.",
    "We focus on streamlining complex real estate processes, from property discovery and transaction management to smart building operations and tenant services.",
    "By leveraging data analytics and AI, we provide valuable market insights, optimize property portfolios, and enable personalized experiences for all stakeholders.",
    "We are also exploring the use of blockchain for secure and transparent property transactions and tokenization of real estate assets.",
  ],
  keySolutions: [
    {
      title: "Property Management Software (PMS)",
      description:
        "Cloud-based PMS for managing listings, leases, tenants, maintenance, and financials.",
      icon: Layers,
    },
    {
      title: "Virtual & 3D Property Tours",
      description:
        "Immersive AR/VR solutions for virtual property viewings and interactive floor plans.",
      icon: Zap,
    },
    {
      title: "AI-Powered Property Valuation",
      description:
        "Machine learning models for accurate and real-time property valuation and market analysis.",
      icon: BarChart3,
    },
    {
      title: "Smart Building & IoT Solutions",
      description:
        "IoT integration for smart home automation, energy management, and building security.",
      icon: Cpu,
    },
    {
      title: "Real Estate CRM Platforms",
      description:
        "Custom CRM systems for managing leads, client relationships, and sales pipelines for agents and brokers.",
      icon: Users,
    },
    {
      title: "Online Property Marketplaces",
      description:
        "Development of feature-rich online portals for property listings, buying, selling, and renting.",
      icon: ShoppingCart, // Using ShoppingCart for marketplace concept
    },
    {
      title: "Blockchain for Real Estate",
      description:
        "Exploring DLT for secure land registries, transparent transactions, and property tokenization.",
      icon: ShieldCheck,
    },
    {
      title: "Construction Tech (ConTech)",
      description:
        "Solutions for project management, BIM integration, and site monitoring in construction.",
      icon: Target,
    },
  ],
  challenges: [
    "Fragmented and often outdated legacy systems in property management.",
    "Lack of transparency and efficiency in property transactions.",
    "Need for better data utilization for market insights and valuations.",
    "Enhancing tenant and buyer experiences through digital channels.",
    "Managing sustainability and energy efficiency in buildings.",
    "Security concerns related to online transactions and data handling.",
  ],
  benefits: [
    "Streamlined property management operations and reduced administrative costs.",
    "Enhanced property discovery and engagement through immersive virtual tours.",
    "More accurate and data-driven property valuations and investment decisions.",
    "Improved tenant and buyer satisfaction with seamless digital experiences.",
    "Increased transparency and security in property transactions.",
    "Optimized building performance and sustainability through smart technologies.",
  ],
  relevantTechnologies: [
    "React/Vue",
    "Node.js/Python",
    "AI/ML (Regression, CV)",
    "AR/VR (Unity, WebXR)",
    "IoT (MQTT, LoRaWAN)",
    "Blockchain (Hyperledger, Ethereum)",
    "GIS",
    "Cloud (AWS, Azure)",
  ],
  caseStudy: {
    title: "Streamlining Property Management for 'Urban Living Spaces'",
    excerpt:
      "Learn how our custom PMS and virtual tour solution helped Urban Living Spaces reduce vacancy rates by 15% and improve tenant satisfaction.",
    link: "/case-studies/urban-living-spaces-proptech",
  },
  // Added for sidebar content
  whyPartnerPoints: [
    "Holistic understanding of the entire real estate lifecycle.",
    "Proven expertise in AR/VR, AI, IoT, and blockchain for PropTech.",
    "User-centric design focus for intuitive and engaging platforms.",
    "Development of scalable, secure, and compliant real estate solutions.",
    "Data-driven approach to optimize property operations and investments.",
    "Commitment to driving innovation and efficiency in the property sector.",
  ],
};

const RealEstateDetailPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const IndustryIcon = industryInfo.icon;
  const industryNameShort = industryInfo.name.split("&")[0].trim(); // For "Real Estate"

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
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-teal-900/30"></div>{" "}
            {/* Adjusted gradient to teal for real estate */}
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
                  Modernize Your Real Estate Tech{" "}
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
                  Shaping the Future of {industryNameShort}
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
                  Key PropTech Solutions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  {industryInfo.keySolutions.map((solution, index) => {
                    const SolutionIcon = solution.icon || HelpCircle; // Fallback icon
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
                    {industryNameShort}
                    Challenges We Address
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
                    PropTech Advantages We Deliver
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
                    PropTech Success Showcase
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
                        See the Results <ArrowRight className="ml-2 w-4 h-4" />
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
                  Why Our PropTech Solutions?
                </h3>
                <ul className="space-y-3 text-sm text-slate-300/95">
                  {industryInfo.whyPartnerPoints.map((point, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-emerald-400/90 mr-2.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-700/80 via-sky-700/80 to-teal-800/80 p-8 rounded-xl border border-transparent hover:border-sky-400/70 text-center shadow-2xl backdrop-blur-sm transition-all duration-300 group">
                {" "}
                {/* Adjusted gradient */}
                <MessageSquare className="w-12 h-12 text-sky-100 group-hover:text-white mx-auto mb-5 transition-colors duration-300 transform group-hover:scale-110" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Innovate Your Property Business?
                </h3>
                <p className="text-sky-100/90 mb-6 text-sm">
                  Let's explore how our PropTech expertise can enhance your
                  operations and client engagement.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-sky-700 hover:bg-sky-50 font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-sky-300/70 shadow-md hover:shadow-lg"
                >
                  <Link to="/contact">Talk to a PropTech Expert</Link>
                </Button>
              </div>

              <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50 shadow-lg backdrop-blur-sm hover:border-slate-600/70 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center">
                  <Cpu className="w-6 h-6 mr-3 text-cyan-400 shrink-0" /> Key
                  PropTech Technologies
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
      {/* <Footer /> Re-enabled Footer */}
    </div>
  );
};

export default RealEstateDetailPage;
