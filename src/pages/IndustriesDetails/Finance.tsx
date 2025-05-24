// src/pages/industrydetails/FinanceDetailPage.tsx
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
  DollarSign, // Specific icon
} from "lucide-react";

import UnifiedNavbar from "../../components/UnifiedNavbar";
import Footer from "../../components/Footer"; // Assuming you might want to re-enable this
import { Button } from "@/components/ui/button";
import vedio2 from "../../assets/vedio2.mp4"; // Video import

// import { AspectRatio } from "@/components/ui/aspect-ratio"; // Commented out as not used

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
  name: "Banking & Finance (FinTech)",
  icon: DollarSign,
  tagline:
    "Architecting the Future of Finance with Secure and Innovative FinTech Solutions.",
  // This will be replaced by the video, but kept for fallback or if video fails
  imageUrl:
    "https://images.unsplash.com/photo-1600979990900-92fab73c6939?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZpbnRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80",
  overviewDescription:
    "We are at the forefront of transforming financial services, empowering banks, insurance companies, and FinTech startups with secure, agile, and customer-centric digital solutions. Our expertise helps clients navigate the complex and evolving financial landscape.",
  detailedPoints: [
    "Our FinTech solutions are built on a foundation of robust security, regulatory compliance, and cutting-edge technology to address the unique challenges of the financial sector.",
    "We specialize in developing next-generation digital banking platforms, AI-driven fraud detection systems, seamless payment gateway integrations, and innovative blockchain applications.",
    "By fostering a culture of continuous innovation, we help financial institutions enhance customer experiences, optimize operational efficiency, and gain a competitive edge in a rapidly changing market.",
    "Our approach involves a deep understanding of financial workflows, risk management, and the importance of data integrity to deliver solutions that are both powerful and trustworthy.",
  ],
  keySolutions: [
    {
      title: "Digital Banking Platforms",
      description:
        "Comprehensive solutions for online and mobile banking, account management, and customer self-service.",
      icon: Cpu,
    },
    {
      title: "Payment Processing & Gateways",
      description:
        "Secure and efficient payment gateway integrations, including real-time payments and cross-border transactions.",
      icon: Zap,
    },
    {
      title: "AI for Fraud & Risk",
      description:
        "Advanced AI/ML models for real-time fraud detection, credit risk assessment, and AML compliance.",
      icon: ShieldCheck,
    },
    {
      title: "Blockchain & DLT",
      description:
        "Development of decentralized applications (dApps), smart contracts, and solutions for secure asset tokenization and trade finance.",
      icon: Layers,
    },
    {
      title: "Regulatory Technology (RegTech)",
      description:
        "Automated solutions for regulatory reporting, KYC/AML compliance, and transaction monitoring.",
      icon: FileText,
    },
    {
      title: "WealthTech & Robo-Advisory",
      description:
        "Platforms for automated investment advice, portfolio management, and personalized financial planning.",
      icon: BarChart3,
    },
    {
      title: "InsurTech Solutions",
      description:
        "Digital platforms for insurance underwriting, claims processing, policy management, and customer engagement.",
      icon: ThumbsUp,
    },
    {
      title: "Open Banking & APIs",
      description:
        "Developing secure API ecosystems to enable third-party integrations and foster innovation in financial services.",
      icon: MessageSquare,
    },
  ],
  challenges: [
    "Navigating complex and ever-changing regulatory landscapes (e.g., PSD2, GDPR, CCPA).",
    "Combating sophisticated cybersecurity threats and ensuring data protection.",
    "Meeting evolving customer expectations for seamless digital experiences.",
    "Integrating legacy systems with modern FinTech innovations.",
    "Managing vast amounts of financial data for insights and risk management.",
    "The rapid pace of technological disruption and competition from new entrants.",
  ],
  benefits: [
    "Enhanced operational efficiency through automation and streamlined processes.",
    "Improved customer acquisition, engagement, and retention via superior digital experiences.",
    "Strengthened security posture and reduced risk of fraud and cyberattacks.",
    "Greater agility to adapt to market changes and launch new products quickly.",
    "Data-driven decision-making for better risk management and personalized services.",
    "Compliance with regulatory requirements, minimizing penalties and reputational damage.",
  ],
  relevantTechnologies: [
    "AI/ML",
    "Blockchain",
    "Cloud Computing (AWS, Azure)",
    "Microservices",
    "API Gateways",
    "Cybersecurity Tools",
    "Big Data Analytics",
    "DevSecOps",
  ],
  caseStudy: {
    title: "Revolutionizing Digital Banking for Global Finance Corp",
    excerpt:
      "Learn how our custom digital banking platform enabled Global Finance Corp to increase customer engagement by 40% and reduce operational costs significantly.",
    link: "/case-studies/global-finance-corp-fintech",
  },
  // Added for sidebar content
  whyPartnerPoints: [
    "Unparalleled expertise in FinTech domain and regulatory nuances.",
    "Steadfast commitment to security, compliance, and data integrity.",
    "Agile development of future-ready, scalable financial solutions.",
    "True collaborative partnership model focused on your success.",
    "Proven track record of delivering transformative FinTech projects.",
    "Dedicated to customer-centric innovation in the financial sector.",
  ],
};

const FinanceDetailPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const IndustryIcon = industryInfo.icon;
  const industryNameShort = industryInfo.name.split("(")[0].trim(); // For concise titles

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
              playsInline // Ensures video plays inline on mobile, good practice
              className="w-full h-full object-cover" // Video covers the area
              src={vedio2} // Source of the video
              poster={industryInfo.imageUrl} // Optional: poster image while video loads or if it fails
            >
              Your browser does not support the video tag.
            </video>
            {/* Gradient overlay to maintain UI color and text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-green-900/30"></div>
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
                  Discuss Your FinTech Project{" "}
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
                  Empowering {industryNameShort}
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
                  Key {industryNameShort} Solutions
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
                    Benefits of Our Solutions
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
                    Success in {industryNameShort}
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
                      {/* <Link to={industryInfo.caseStudy.link}>
                        Read Full Case Study{" "}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link> */}
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
                  Why Us for {industryNameShort}?
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

              <div className="bg-gradient-to-br from-emerald-700/80 via-sky-700/80 to-green-800/80 p-8 rounded-xl border border-transparent hover:border-sky-400/70 text-center shadow-2xl backdrop-blur-sm transition-all duration-300 group">
                {" "}
                {/* Adjusted gradient */}
                <MessageSquare className="w-12 h-12 text-sky-100 group-hover:text-white mx-auto mb-5 transition-colors duration-300 transform group-hover:scale-110" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready for FinTech Transformation?
                </h3>
                <p className="text-sky-100/90 mb-6 text-sm">
                  Discuss how our FinTech solutions can revolutionize your
                  financial services and drive growth.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-sky-700 hover:bg-sky-50 font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-sky-300/70 shadow-md hover:shadow-lg"
                >
                  <Link to="/contact">Request a Consultation</Link>
                </Button>
              </div>

              <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/50 shadow-lg backdrop-blur-sm hover:border-slate-600/70 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center">
                  <Cpu className="w-6 h-6 mr-3 text-cyan-400 shrink-0" />{" "}
                  Technologies We Master
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
      {/* <Footer /> */}
    </div>
  );
};

export default FinanceDetailPage;
