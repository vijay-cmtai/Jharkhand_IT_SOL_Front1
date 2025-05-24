import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  DollarSign,
  HeartPulse,
  ShoppingCart,
  GraduationCap,
  Factory,
  Building,
  CheckCircle,
  ArrowRight,
  Users,
} from "lucide-react";

import UnifiedNavbar from "../components/UnifiedNavbar";
import Footer from "../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import I1 from "../assets/I1.avif";
import I4 from "../assets/I4.jpeg";
import I3 from "../assets/I3.avif";
import I2 from "../assets/I2.avif";
import I7 from "../assets/I7.avif";
import I6 from "../assets/I6.avif";

import vedio2 from "../assets/vedio2.mp4";

interface Industry {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  imageUrl: string;
  keySolutions: string[];
  excerpt: string;
}

const industriesData: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: HeartPulse,
    description:
      "Empowering healthcare providers and life science organizations with innovative technology to improve patient outcomes, streamline operations, and accelerate research. We build secure, compliant, and scalable solutions tailored to the unique needs of the healthcare industry.",
    imageUrl: I1,
    keySolutions: [
      "EHR/EMR Integration & Customization",
      "Telemedicine Platforms",
      "AI-Powered Diagnostics Support",
      "Patient Engagement Portals",
      "Regulatory Compliance Solutions (HIPAA)",
      "Clinical Trial Management Software",
    ],
    excerpt:
      "Revolutionizing patient care and research with cutting-edge digital health solutions for better outcomes.",
  },
  {
    id: "finance",
    name: "Banking & Finance (FinTech)",
    icon: DollarSign,
    description:
      "Transforming financial services with secure, agile, and customer-centric digital solutions. We help banks, insurance companies, and FinTech startups navigate the evolving landscape with robust platforms for digital banking, risk management, and payment processing.",
    imageUrl: I4,
    keySolutions: [
      "Digital Banking Platforms",
      "Payment Gateway Integration",
      "Blockchain & Cryptocurrency Solutions",
      "AI for Fraud Detection & Risk Assessment",
      "Regulatory Technology (RegTech)",
      "Robo-Advisory Platforms",
    ],
    excerpt:
      "Driving innovation in financial services with secure, scalable, and customer-focused FinTech solutions.",
  },
  {
    id: "ecommerce",
    name: "E-commerce & Retail",
    icon: ShoppingCart,
    description:
      "Building immersive and high-conversion online shopping experiences. We provide end-to-end e-commerce solutions, from custom platform development and mobile apps to AI-driven personalization and supply chain optimization, helping retailers thrive in the digital marketplace.",
    imageUrl: I3,
    keySolutions: [
      "Custom E-commerce Platform Development (B2C & B2B)",
      "Mobile Commerce (m-Commerce) Apps",
      "Personalized Recommendation Engines",
      "Inventory Management & Order Fulfillment Systems",
      "Customer Relationship Management (CRM) Integration",
      "Headless Commerce Solutions",
    ],
    excerpt:
      "Crafting seamless online retail experiences that boost sales, enhance customer loyalty, and drive growth.",
  },
  {
    id: "education",
    name: "Education (EdTech)",
    icon: GraduationCap,
    description:
      "Innovating learning experiences for students and educators worldwide. We develop interactive e-learning platforms, virtual classrooms, student management systems, and AI-powered personalized learning tools to make education more accessible, engaging, and effective.",
    imageUrl: I2,
    keySolutions: [
      "Learning Management Systems (LMS)",
      "Virtual & Augmented Reality in Education",
      "Online Assessment & Proctoring Tools",
      "Student Information Systems (SIS)",
      "Personalized Learning Paths with AI",
      "Gamified Educational Content",
    ],
    excerpt:
      "Transforming education through innovative EdTech, making learning more accessible, engaging, and personalized.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & IoT",
    icon: Factory,
    description:
      "Driving efficiency and innovation in the manufacturing sector with Industry 4.0 solutions. We implement IoT for smart factories, predictive maintenance systems, supply chain visibility platforms, and AI-driven quality control to optimize production and reduce costs.",
    imageUrl: I7,
    keySolutions: [
      "Industrial IoT (IIoT) Platforms",
      "Predictive Maintenance Solutions",
      "Smart Factory Automation & Robotics",
      "Supply Chain Optimization & Visibility",
      "AI for Quality Control & Anomaly Detection",
      "Digital Twin Technology",
    ],
    excerpt:
      "Optimizing manufacturing with smart factory innovations, IoT integration, and AI-driven efficiency.",
  },
  {
    id: "realestate",
    name: "Real Estate & PropTech",
    icon: Building,
    description:
      "Modernizing the real estate industry with technology-driven solutions. We develop property management software, virtual tour platforms, AI-powered property valuation tools, and smart building solutions to enhance efficiency and user experience for agents, buyers, and tenants.",
    imageUrl: I6,
    keySolutions: [
      "Property Listing & Management Platforms (PMS)",
      "Virtual & 3D Property Tours (AR/VR)",
      "Smart Building Management Systems (BMS)",
      "AI for Property Valuation & Market Analysis",
      "CRM for Real Estate Agents & Brokers",
      "Blockchain for Secure Transactions",
    ],
    excerpt:
      "Revolutionizing property management and transactions with innovative and user-centric PropTech solutions.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardHoverEffect = {
  scale: 1.03,
  boxShadow: "0px 12px 35px -8px rgba(0, 190, 255, 0.25)",
  transition: { type: "spring", stiffness: 300, damping: 15 },
};

const IndustriesPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (videoRef.current) {
      // Video ki speed normal (100%) karne ke liye
      videoRef.current.playbackRate = 1.0; // <<--- SPEED NORMAL KI GAYI HAI
      videoRef.current.onloadeddata = () => {
        console.log("Industries Page Hero Video data loaded");
      };
      videoRef.current.onerror = () => {
        console.error("Error loading Industries Page Hero video");
      };
    }
  }, []);

  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen antialiased flex flex-col">
      <UnifiedNavbar />
      <main className="flex-grow">
        {/* --- BANNER SECTION --- */}
        <motion.section
          className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 text-white overflow-hidden isolate"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
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
          {/* Original Image-based Background and Gradient Overlay (on top of video) */}
          <div className="absolute inset-0">
            <img
              src={I1}
              alt="Industries we empower background"
              className="w-full h-full object-cover opacity-5 blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/70 to-sky-900/30"></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-slate-700/[0.05] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)] opacity-20"></div>
          {/* Content Container (z-10, on top of everything) */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-3 md:mb-4">
                <Users className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 mx-auto" />
              </motion.div>
              <motion.h1
                variants={fadeIn}
                className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500"
              >
                Industries We Empower
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
              >
                Driving digital transformation and fostering growth across
                diverse sectors with our tailored technology solutions and
                strategic expertise.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* --- INDUSTRIES GRID SECTION --- */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {industriesData.map((industry) => {
                const IconComponent = industry.icon;
                let linkPath: string;
                if (industry.id === "healthcare") {
                  linkPath = "/industriesDetails";
                } else {
                  linkPath = `/${industry.id}`;
                }

                return (
                  <motion.div
                    key={industry.id}
                    variants={fadeIn}
                    whileHover={cardHoverEffect}
                    className="bg-slate-800/70 border border-slate-700/80 rounded-xl shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-cyan-500/70"
                  >
                    <div className="relative w-full">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={industry.imageUrl}
                          alt={`${industry.name} industry visual representation`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 md:p-6">
                        <div className="flex items-center mb-1 md:mb-2">
                          <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mr-2 md:mr-3 shrink-0" />
                          <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {industry.name}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-6 flex-grow flex flex-col">
                      <p className="text-slate-400/90 mb-4 text-xs md:text-sm leading-relaxed flex-grow line-clamp-3 hover:line-clamp-none transition-all duration-300">
                        {industry.description}
                      </p>
                      <div className="mb-4">
                        <h4 className="text-xs md:text-sm font-semibold text-slate-200 mb-2">
                          Key Solutions:
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-400 list-inside">
                          {industry.keySolutions
                            .slice(0, 3)
                            .map((solution, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-500 mr-1.5 md:mr-2 mt-0.5 shrink-0" />
                                <span className="truncate" title={solution}>
                                  {solution}
                                </span>
                              </li>
                            ))}
                          {industry.keySolutions.length > 3 && (
                            <li className="text-cyan-400/80 italic text-xs">
                              + {industry.keySolutions.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mt-auto w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 text-xs md:text-sm"
                      >
                        <Link to={linkPath}>
                          Explore {industry.name.split(" ")[0]} Solutions
                          <ArrowRight className="ml-1.5 md:ml-2 w-3.5 h-3.5 md:w-4 md:h-4" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <motion.section
          className="py-16 md:py-24 bg-slate-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Partner with Us to Transform Your Industry
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Ready to leverage technology for a competitive edge? Let's discuss
              how our expertise can be tailored to your specific industry
              challenges and goals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-cyan-300/70 px-10 py-3"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default IndustriesPage;
