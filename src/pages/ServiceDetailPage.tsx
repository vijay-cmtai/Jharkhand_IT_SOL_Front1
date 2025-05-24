// src/pages/ServiceDetailPage.tsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  ArrowLeft,
  CheckCircle,
  Layers,
  Cpu,
  BarChart3,
  ShieldCheck,
  Loader2,
  Info,
  MessageSquare,
  Star,
  Zap,
  ThumbsUp,
  Users,
  Lightbulb,
  Briefcase,
  HelpCircle,
  Target,
  Link2,
  FileText,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight,
  // Video, // Icon for video - REMOVED as per request
} from "lucide-react";
// import { cn } from "@/lib/utils"; // Not used in this file, can be removed if not used elsewhere
import UnifiedNavbar from "../components/UnifiedNavbar";
import Footer from "../components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

// --- ADDED: Import local video ---
import localBannerVideo from "../assets/vedio2.mp4"; // Adjust path if your video is elsewhere or named differently

// --- INTERFACES ---
interface BackendSubService {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
}
interface BackendService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mainImage?: string;
  bannerVideoUrl?: string; // For service-specific banner video
  subServices: BackendSubService[];
  excerpt?: string;
  isActive?: boolean;
}
interface ServicePageData
  extends Omit<BackendService, "mainImage" | "subServices" | "bannerVideoUrl"> {
  mainImageUrl?: string;
  bannerVideoUrl?: string; // For service-specific banner video
  subServices: Array<
    Omit<BackendSubService, "imageUrl"> & { imageUrl?: string }
  >;
}

const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";
const API_SERVICES_URL = `${BASE_URL}/services`;
const API_ALL_SERVICES_URL = `${BASE_URL}/services/find`;

// const DEFAULT_BANNER_VIDEO_URL =
//   "https://videos.pexels.com/video-files/854006/854006-hd_1280_720_25fps.mp4"; // Not needed if always using local

const sampleFaqs = [
  {
    q: "What is the typical project timeline for this service?",
    a: "Project timelines vary based on complexity and specific requirements. After our initial consultation and scope definition, we provide a detailed project plan with estimated timelines. Generally, projects can range from 4 weeks for smaller engagements to several months for larger, more complex solutions.",
  },
  {
    q: "How do you ensure the quality of the service delivered?",
    a: "Quality is paramount. We employ rigorous testing methodologies throughout the development lifecycle, including unit tests, integration tests, and user acceptance testing (UAT). Our experienced QA team works closely with developers to identify and resolve any issues promptly.",
  },
  {
    q: "What kind of post-launch support can we expect?",
    a: "We offer flexible post-launch support packages tailored to your needs. This can include ongoing maintenance, bug fixes, performance monitoring, security updates, and options for further enhancements or feature additions as your business evolves.",
  },
  {
    q: "How do you handle communication and project updates?",
    a: "We believe in transparent and proactive communication. You'll have a dedicated project manager as your primary point of contact. We schedule regular progress meetings (e.g., weekly or bi-weekly) and provide updates through shared dashboards, email summaries, or your preferred communication tools like Slack.",
  },
  {
    q: "Can this service be customized to our specific business needs?",
    a: "Absolutely. While we have standard frameworks and best practices, a core part of our process is understanding your unique business requirements and tailoring the service to meet those specific needs effectively. Customization is key to delivering maximum value.",
  },
];

const sampleRelatedServicesFallback: BackendService[] = [
  {
    _id: "fallback1",
    name: "Cloud Solutions Architecture",
    slug: "cloud-architecture-fallback",
    description:
      "Design robust and scalable cloud infrastructures for optimal performance and cost-efficiency. We help you choose the right cloud provider and services.",
    mainImage:
      "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=500",
    subServices: [],
    excerpt: "Scalable cloud solutions tailored for your business.",
    isActive: true,
  },
  {
    _id: "fallback2",
    name: "Mobile App Development (Cross-Platform)",
    slug: "mobile-cross-platform-fallback",
    description:
      "Reach wider audiences with high-performance, natively-compiled applications for both iOS and Android from a single codebase.",
    mainImage:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=500",
    subServices: [],
    excerpt: "Engaging mobile experiences for iOS and Android.",
    isActive: true,
  },
  {
    _id: "fallback3",
    name: "E-commerce Platform Development",
    slug: "ecommerce-dev-fallback",
    description:
      "Build powerful, feature-rich online stores that provide seamless user experiences and drive conversions, integrated with secure payment gateways.",
    mainImage:
      "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=500",
    subServices: [],
    excerpt: "Custom e-commerce solutions to boost your sales.",
    isActive: true,
  },
];

const sampleTestimonials = [
  {
    id: "t1",
    quote:
      "Working with Jharkhand IT Solutions on our project was a game-changer. Their expertise and dedication were evident from start to finish, delivering results that exceeded our expectations.",
    name: "Anuj Kumar",
    title: "Director at ASCOT",
    avatar:
      "https://www.jharkhanditsolutions.com/wp-content/uploads/2016/12/princiapl.png",
  },
  {
    id: "t2",
    quote:
      "The team's professionalism and deep understanding of the service helped us streamline our operations significantly. We've seen a remarkable improvement in efficiency.",
    name: "AK Singh",
    title: "Manager at JCSOI",
    avatar:
      "https://www.jharkhanditsolutions.com/wp-content/uploads/2016/12/ak-singh.jpg",
  },
  {
    id: "t3",
    quote:
      "Their tailored solution addressed all our unique challenges. The post-launch support has also been exceptional. Highly recommend their services!",
    name: "Zaki Rhaman",
    title: "Director at Sadaf Public School",
    avatar:
      "https://www.jharkhanditsolutions.com/wp-content/uploads/2016/12/director-sadaf-public-school.jpg",
  },
  {
    id: "t4",
    quote:
      "From initial consultation to final delivery, the communication was seamless and the quality of work was outstanding. A truly reliable partner.",
    name: "Bhanu Singh",
    title: "Director at Hotel Genista Inn",
    avatar:
      "https://www.jharkhanditsolutions.com/wp-content/uploads/2016/12/vanu.jpg",
  },
];

const ServiceDetailPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();

  const [serviceDetails, setServiceDetails] = useState<ServicePageData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [otherServices, setOtherServices] = useState<BackendService[]>([]);
  const [loadingOtherServices, setLoadingOtherServices] = useState(true);
  const [bannerVideoError, setBannerVideoError] = useState(false);

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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };
  const cardHoverEffect = {
    scale: 1.03,
    boxShadow: "0px 10px 30px -5px rgba(0, 190, 255, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setBannerVideoError(false); // Reset banner error on slug change

    const fetchServiceDetails = async () => {
      if (!serviceSlug) {
        setFetchError("Service identifier (slug) is missing from the URL.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setFetchError(null);
      try {
        const fullFetchURL = `${API_SERVICES_URL}/${serviceSlug}`;
        const response = await fetch(fullFetchURL);
        if (!response.ok) {
          if (response.status === 404)
            throw new Error(`Service '${serviceSlug}' not found.`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BackendService = await response.json();
        const transformedData: ServicePageData = {
          ...data,
          mainImageUrl: data.mainImage
            ? data.mainImage.startsWith("http")
              ? data.mainImage
              : `${BASE_URL}/${data.mainImage.startsWith("/") ? data.mainImage.substring(1) : data.mainImage}`
            : undefined,
          // bannerVideoUrl is still processed but localBannerVideo will take precedence in render
          bannerVideoUrl: data.bannerVideoUrl
            ? data.bannerVideoUrl.startsWith("http")
              ? data.bannerVideoUrl
              : `${BASE_URL}/${data.bannerVideoUrl.startsWith("/") ? data.bannerVideoUrl.substring(1) : data.bannerVideoUrl}`
            : undefined,
          subServices: data.subServices.map((sub) => ({
            ...sub,
            imageUrl: sub.imageUrl
              ? sub.imageUrl.startsWith("http")
                ? sub.imageUrl
                : `${BASE_URL}/${sub.imageUrl.startsWith("/") ? sub.imageUrl.substring(1) : sub.imageUrl}`
              : undefined,
          })),
        };
        setServiceDetails(transformedData);
      } catch (error: any) {
        console.error("Failed to fetch service details:", error);
        setFetchError(error.message || "Could not load service details.");
      } finally {
        setIsLoading(false);
      }
    };
    const fetchAllOtherServices = async () => {
      setLoadingOtherServices(true);
      try {
        const response = await fetch(API_ALL_SERVICES_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch other services list");
        }
        let apiResponse: BackendService[] | { data: BackendService[] } =
          await response.json();
        let servicesArray: BackendService[];
        if (Array.isArray(apiResponse)) {
          servicesArray = apiResponse;
        } else if (
          apiResponse &&
          Array.isArray((apiResponse as { data: BackendService[] }).data)
        ) {
          servicesArray = (apiResponse as { data: BackendService[] }).data;
        } else {
          console.warn("Unexpected format for all services data:", apiResponse);
          servicesArray = [];
        }
        const filteredServices = servicesArray
          .filter((s) => s.slug !== serviceSlug && s.isActive !== false)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setOtherServices(
          filteredServices.length > 0
            ? filteredServices
            : sampleRelatedServicesFallback
                .filter((s) => s.slug !== serviceSlug)
                .slice(0, 3)
        );
      } catch (err) {
        console.error("Error fetching other services:", err);
        setOtherServices(
          sampleRelatedServicesFallback
            .filter((s) => s.slug !== serviceSlug)
            .slice(0, 3)
        );
      } finally {
        setLoadingOtherServices(false);
      }
    };

    if (serviceSlug) {
      fetchServiceDetails();
      fetchAllOtherServices();
    } else {
      setIsLoading(false);
      setLoadingOtherServices(false);
      setFetchError("Service slug is required for this page.");
    }
  }, [serviceSlug]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testimonialSliderSettings = {
    dots: true,
    infinite: sampleTestimonials.length > 2,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    rtl: true, // Consider if RTL is always desired
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: sampleTestimonials.length > 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: sampleTestimonials.length > 0,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-950">
        <UnifiedNavbar />
        <div className="flex-grow flex flex-col items-center justify-center text-white">
          <Loader2 className="w-16 h-16 animate-spin text-cyan-400 mb-6" />
          <p className="text-xl text-slate-300">Loading Service Details...</p>
        </div>
        <Footer />
      </div>
    );
  }
  if (fetchError || !serviceDetails) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-950">
        <UnifiedNavbar />
        <div className="flex-grow flex flex-col items-center justify-center text-white px-6 text-center">
          <ShieldCheck className="w-20 h-20 text-red-500 mb-6" />
          <h2 className="text-3xl font-semibold text-red-400 mb-3">
            Oops! Service Not Found
          </h2>
          <p className="text-slate-400 mb-3 max-w-md">
            We couldn't find the service you were looking for. It might have
            been moved or removed.
          </p>
          {fetchError && (
            <p className="text-xs text-slate-500 mb-8 max-w-xl">
              Error: {fetchError}
            </p>
          )}
          <Button
            onClick={() => navigate("/services")}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Services
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // --- CHANGED: Use localBannerVideo first ---
  // const currentBannerVideoUrl =
  //   serviceDetails.bannerVideoUrl || DEFAULT_BANNER_VIDEO_URL; // Old logic

  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen antialiased flex flex-col">
      <UnifiedNavbar />
      <main className="flex-grow">
        {/* --- BANNER SECTION --- */}
        <motion.section
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 text-white overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="absolute inset-0 z-0">
            {/* --- MODIFIED VIDEO LOGIC --- */}
            {!bannerVideoError && localBannerVideo ? (
              <video
                src={localBannerVideo} // Use imported local video
                poster={serviceDetails.mainImageUrl || undefined}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-25" // Adjust opacity as needed
                onError={() => {
                  console.warn("Local banner video failed to load.");
                  setBannerVideoError(true); // Fallback if local video also fails
                }}
                aria-label={`${serviceDetails.name} background video`}
              >
                {/* It's good practice to provide a source tag for MP4 */}
                <source src={localBannerVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : !bannerVideoError && serviceDetails.bannerVideoUrl ? ( // Fallback to service-specific URL
              <video
                src={serviceDetails.bannerVideoUrl}
                poster={serviceDetails.mainImageUrl || undefined}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-25"
                onError={() => {
                  console.warn("Service-specific banner video failed to load.");
                  setBannerVideoError(true); // Fallback to image if this also fails
                }}
                aria-label={`${serviceDetails.name} background video`}
              />
            ) : serviceDetails.mainImageUrl ? ( // Fallback to image if no video works or error occurs
              <img
                src={serviceDetails.mainImageUrl}
                alt={`${serviceDetails.name} abstract background`}
                className="w-full h-full object-cover opacity-15 blur-sm" // Adjust opacity/blur
              />
            ) : (
              // Ultimate fallback to a solid color
              <div className="w-full h-full bg-slate-800"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-sky-900/40"></div>
          </div>

          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
            >
              {/* --- REMOVED VIDEO ICON ---
              <motion.div variants={fadeIn} className="mb-4">
                <Video className="w-12 h-12 text-cyan-400 mx-auto" />
              </motion.div>
              */}
              <motion.h1
                variants={fadeIn}
                // ADDED: Margin top to compensate for removed icon space, if needed
                className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 mt-4 sm:mt-0 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500"
              >
                {serviceDetails.name}
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
              >
                Unlock the potential of{" "}
                <span className="text-cyan-300 font-medium">
                  {serviceDetails.name.toLowerCase()}
                </span>{" "}
                with our expert solutions, tailored to drive innovation and
                growth for your business.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* ... (rest of the component remains the same) ... */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* --- MAIN CONTENT AREA (LEFT/CENTER) --- */}
            <motion.div className="lg:col-span-8 space-y-16" variants={fadeIn}>
              {/* Overview Section */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <Layers className="w-8 h-8 mr-3 text-cyan-400" /> Overview of{" "}
                  {serviceDetails.name}
                </h2>
                {serviceDetails.mainImageUrl && (
                  <motion.div
                    className="mb-8 shadow-2xl rounded-xl overflow-hidden border-2 border-slate-700/50"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <img
                      src={serviceDetails.mainImageUrl}
                      alt={serviceDetails.name}
                      className="w-full h-auto max-h-[450px] object-cover"
                    />
                  </motion.div>
                )}
                <div className="prose prose-lg prose-invert max-w-none text-slate-300/90 leading-relaxed space-y-5">
                  {serviceDetails.description
                    .split("\n\n")
                    .map(
                      (paragraph, index) =>
                        paragraph.trim() !== "" && (
                          <p key={index}>{paragraph}</p>
                        )
                    )}
                </div>
              </motion.section>

              {/* Is this service right for you? Section */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <Target className="w-8 h-8 mr-3 text-cyan-400" /> Is{" "}
                  {serviceDetails.name} Right For You?
                </h2>
                <p className="text-slate-400 mb-6 text-lg">
                  Our {serviceDetails.name.toLowerCase()} services are designed
                  to address common business challenges and help you achieve
                  specific goals, such as:
                </p>
                <motion.ul className="space-y-4" variants={staggerContainer}>
                  {[
                    `Modernizing outdated systems with cutting-edge ${serviceDetails.name.toLowerCase().split(" ")[0]} solutions.`,
                    "Improving operational efficiency and reducing overhead costs.",
                    "Enhancing user engagement and customer satisfaction through superior digital experiences.",
                    "Ensuring robust security, compliance, and data protection.",
                    `Gaining a competitive edge by leveraging advanced ${serviceDetails.name.toLowerCase().split(" ")[0]} capabilities.`,
                    "Scaling your infrastructure and applications to meet growing demands.",
                  ].map((challenge, index) => (
                    <motion.li
                      key={index}
                      variants={fadeIn}
                      className="flex items-start p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-colors"
                    >
                      <CheckCircle className="w-6 h-6 text-emerald-400 mr-3 mt-1 shrink-0" />
                      <span>{challenge}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.section>

              {/* Key Offerings & Components Section */}
              {serviceDetails.subServices &&
                serviceDetails.subServices.length > 0 && (
                  <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeIn}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                      <Zap className="w-8 h-8 mr-3 text-cyan-400" /> Key
                      Offerings & Components
                    </h2>
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      variants={staggerContainer}
                    >
                      {serviceDetails.subServices.map((subService) => (
                        <motion.div
                          key={subService._id}
                          variants={fadeIn}
                          whileHover={cardHoverEffect}
                          className="bg-slate-800/60 border border-slate-700/70 rounded-xl shadow-xl overflow-hidden flex flex-col group"
                        >
                          {subService.imageUrl && (
                            <div className="w-full h-52 md:h-60 overflow-hidden bg-slate-700">
                              <img
                                src={subService.imageUrl}
                                alt={subService.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl lg:text-2xl font-semibold text-cyan-300 mb-3 group-hover:text-cyan-200 transition-colors">
                              {subService.name}
                            </h3>
                            <div
                              className="text-sm text-slate-400/90 leading-relaxed mb-4 flex-grow prose prose-sm prose-invert max-w-none"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {subService.description}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.section>
                )}

              {/* Why Choose Us Section */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <ThumbsUp className="w-8 h-8 mr-3 text-cyan-400" /> Why Choose
                  Our {serviceDetails.name} Service?
                </h2>
                <motion.ul
                  className="space-y-5 text-slate-300"
                  variants={staggerContainer}
                >
                  {[
                    {
                      icon: (
                        <CheckCircle className="text-emerald-400 w-7 h-7" />
                      ),
                      text: `Unparalleled expertise in ${serviceDetails.name.toLowerCase()} with a proven track record of successful project delivery.`,
                    },
                    {
                      icon: (
                        <CheckCircle className="text-emerald-400 w-7 h-7" />
                      ),
                      text: "Bespoke solutions meticulously designed and architected to align with your unique business objectives and challenges.",
                    },
                    {
                      icon: (
                        <CheckCircle className="text-emerald-400 w-7 h-7" />
                      ),
                      text: "Leveraging cutting-edge technologies, modern frameworks, and industry best practices to deliver future-proof solutions.",
                    },
                    {
                      icon: (
                        <CheckCircle className="text-emerald-400 w-7 h-7" />
                      ),
                      text: "A strong commitment to transparent communication, collaborative partnerships, and agile project management methodologies.",
                    },
                    {
                      icon: (
                        <CheckCircle className="text-emerald-400 w-7 h-7" />
                      ),
                      text: "Dedicated focus on delivering tangible, measurable results that translate into real business value and maximize your return on investment.",
                    },
                    {
                      icon: (
                        <CheckCircle className="text-emerald-400 w-7 h-7" />
                      ),
                      text: "Comprehensive post-launch support and ongoing optimization to ensure long-term success and adaptability.",
                    },
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      variants={fadeIn}
                    >
                      <span className="flex-shrink-0 mr-4 mt-0.5">
                        {benefit.icon}
                      </span>
                      <span className="text-lg">{benefit.text}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.section>

              {/* Methodology Section */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-cyan-400" /> Our{" "}
                  {serviceDetails.name} Delivery Methodology
                </h2>
                <motion.div className="space-y-8" variants={staggerContainer}>
                  {[
                    {
                      title: "Discovery & Strategic Planning",
                      description: `We begin with a comprehensive discovery phase to thoroughly understand your business goals, target audience, technical requirements, and existing infrastructure. This involves collaborative workshops, stakeholder interviews, and market research to define a clear strategic roadmap for your ${serviceDetails.name.toLowerCase()} project, ensuring alignment from day one.`,
                      icon: (
                        <Lightbulb className="text-sky-400 w-10 h-10 mb-3" />
                      ),
                    },
                    {
                      title: "User-Centric Design & Prototyping",
                      description:
                        "Our design team crafts intuitive user interfaces (UI) and seamless user experiences (UX) based on best practices and user research. We create wireframes, mockups, and interactive prototypes to visualize the solution, allowing for iterative feedback and refinement before development commences.",
                      icon: (
                        <Layers className="text-purple-400 w-10 h-10 mb-3" />
                      ),
                    },
                    {
                      title: "Agile Development & Iteration",
                      description: `We employ agile development methodologies, breaking down the project into manageable sprints. This iterative approach allows for flexibility, continuous improvement, regular demonstrations of progress, and active client participation, ensuring the final product perfectly meets your evolving needs for ${serviceDetails.name.toLowerCase()}.`,
                      icon: <Cpu className="text-emerald-400 w-10 h-10 mb-3" />,
                    },
                    {
                      title: "Rigorous Quality Assurance",
                      description:
                        "Quality is at the core of our process. Our dedicated QA engineers conduct comprehensive testing, including functional, usability, performance, security, and compatibility testing across various devices and platforms, to ensure a bug-free, reliable, and high-performing solution.",
                      icon: (
                        <ShieldCheck className="text-red-400 w-10 h-10 mb-3" />
                      ),
                    },
                    {
                      title: "Seamless Deployment & Ongoing Support",
                      description: `We manage the deployment process efficiently, whether to cloud environments or on-premise servers, ensuring a smooth transition. Our commitment doesn't end at launch; we provide robust post-launch support, monitoring, and optimization services to ensure your ${serviceDetails.name.toLowerCase()} solution continues to deliver maximum value and adapt to future demands.`,
                      icon: <Zap className="text-yellow-400 w-10 h-10 mb-3" />,
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className="flex flex-col sm:flex-row items-start bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0 text-center sm:text-left">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                          {index + 1}. {step.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                          {step.description.replace(
                            /\$\{serviceDetails\.name\.toLowerCase\(\)\}/g,
                            serviceDetails.name.toLowerCase()
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Technologies Section */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <Cpu className="w-8 h-8 mr-3 text-cyan-400" /> Technologies
                  Powering Our {serviceDetails.name}
                </h2>
                <motion.div
                  className="flex flex-wrap gap-x-3 gap-y-4"
                  variants={staggerContainer}
                >
                  {[
                    "React",
                    "Node.js",
                    "Python (Django/Flask)",
                    "Java (Spring Boot)",
                    "PostgreSQL",
                    "MongoDB",
                    "Docker",
                    "Kubernetes",
                    "AWS / Azure / GCP",
                    "Terraform",
                    "Next.js",
                    "GraphQL",
                    "Microservices Architecture",
                    "Serverless Functions",
                    "CI/CD Pipelines",
                  ]
                    .slice(0, 10)
                    .map((tech) => (
                      <motion.span
                        key={tech}
                        variants={fadeIn}
                        className="bg-slate-700/60 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium shadow-md border border-slate-600 hover:bg-slate-600/80 transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                </motion.div>
                <p className="text-sm text-slate-500 mt-4 italic">
                  * This is a sample of technologies we leverage. The specific
                  stack is always tailored to project requirements for optimal
                  performance and scalability.
                </p>
              </motion.section>

              {/* Success Story Section */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <FileText className="w-8 h-8 mr-3 text-cyan-400" /> Success
                  Story: {serviceDetails.name} in Action
                </h2>
                <motion.div
                  whileHover={{
                    boxShadow: "0px 0px 25px rgba(0, 220, 255, 0.2)",
                  }}
                  className="bg-gradient-to-r from-sky-800/30 to-emerald-800/30 p-8 rounded-xl shadow-xl border border-sky-700/50 flex flex-col md:flex-row items-center gap-8"
                >
                  <img
                    src={
                      serviceDetails.mainImageUrl ||
                      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=400"
                    }
                    alt="Success Story Visual"
                    className="w-full md:w-1/3 h-auto max-h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      Transforming Global Logistics with {serviceDetails.name}
                    </h3>
                    <p className="text-slate-300/90 mb-4 leading-relaxed">
                      Discover how we partnered with 'ConnectLogistics Inc.' to
                      overhaul their international shipping platform using our
                      advanced {serviceDetails.name.toLowerCase()} solutions.
                      This resulted in a 35% reduction in processing times and a
                      25% increase in customer satisfaction through real-time
                      tracking and automated documentation.
                    </p>
                    <Button
                      asChild
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
                    >
                      {/* <Link
                        to={`/case-studies/connectlogistics-${serviceDetails.slug}`}
                      >
                        Read Full Case Study{" "}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link> */}
                    </Button>
                  </div>
                </motion.div>
              </motion.section>

              {/* FAQ Section */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <HelpCircle className="w-8 h-8 mr-3 text-cyan-400" />{" "}
                  Frequently Asked Questions
                </h2>
                <motion.div className="space-y-4" variants={staggerContainer}>
                  {sampleFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      variants={fadeIn}
                      className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-700/30 focus:outline-none transition-colors"
                      >
                        <span className="text-lg font-medium text-slate-100">
                          {faq.q}
                        </span>
                        {openFaq === index ? (
                          <ChevronUp className="w-6 h-6 text-cyan-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-slate-400" />
                        )}
                      </button>
                      {openFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-5 pb-5 pt-2 text-slate-400 leading-relaxed prose prose-sm prose-invert max-w-none"
                        >
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Explore Other Services Section */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-3 border-b-2 border-cyan-500/40 flex items-center">
                  <Link2 className="w-8 h-8 mr-3 text-cyan-400" /> Explore Other
                  Services
                </h2>
                {loadingOtherServices ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto" />
                    <p className="mt-2 text-slate-400">
                      Loading more services...
                    </p>
                  </div>
                ) : otherServices.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                  >
                    {otherServices.map((service) => {
                      const serviceImageUrl = service.mainImage
                        ? service.mainImage.startsWith("http")
                          ? service.mainImage
                          : `${BASE_URL}/${service.mainImage.startsWith("/") ? service.mainImage.substring(1) : service.mainImage}`
                        : "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VydmljZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
                      return (
                        <motion.div
                          key={service._id}
                          variants={fadeIn}
                          whileHover={cardHoverEffect}
                          className="bg-slate-800/60 border border-slate-700/70 rounded-xl shadow-lg overflow-hidden flex flex-col group p-5 hover:border-cyan-500/70 transition-all"
                        >
                          <AspectRatio
                            ratio={16 / 10}
                            className="mb-4 rounded-md overflow-hidden bg-slate-700"
                          >
                            <img
                              src={serviceImageUrl}
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </AspectRatio>
                          <h3 className="text-lg font-semibold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-xs text-slate-400/80 mb-4 flex-grow line-clamp-3">
                            {service.excerpt ||
                              service.description.substring(0, 120) +
                                (service.description.length > 120 ? "..." : "")}
                          </p>
                          <Button
                            asChild
                            variant="link"
                            className="p-0 h-auto mt-auto self-start text-sm font-medium text-sky-300 hover:text-sky-200 group-hover:underline"
                          >
                            <Link to={`/services/${service.slug}`}>
                              Learn More{" "}
                              <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <p className="text-slate-400 text-center py-6">
                    No other services to display at the moment. Check back soon!
                  </p>
                )}
              </motion.section>
            </motion.div>

            {/* --- ASIDE (RIGHT SIDEBAR) --- */}
            <motion.aside
              className="lg:col-span-4 space-y-10 sticky top-24 self-start"
              variants={fadeIn}
            >
              {/* ... (Sidebar content remains the same) ... */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="bg-slate-800/70 p-6 rounded-xl border border-slate-700/60 shadow-lg backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-cyan-400" /> Our
                  Proven Process
                </h3>
                <ol className="space-y-3.5 text-sm text-slate-400">
                  {[
                    "Deep Dive & Discovery",
                    "Strategic Blueprinting",
                    "Agile Development",
                    "Rigorous QA",
                    "Seamless Deployment",
                    "Continuous Support",
                  ].map((step, index) => (
                    <li key={index} className="flex items-center">
                      <span className="bg-cyan-500/30 text-cyan-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="bg-gradient-to-br from-sky-600/80 to-emerald-600/70 p-8 rounded-xl border border-sky-500/50 text-center shadow-2xl backdrop-blur-sm"
              >
                <MessageSquare className="w-12 h-12 text-sky-200 mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-sky-100/90 mb-6 text-sm">
                  Let's discuss how our {serviceDetails.name.toLowerCase()}{" "}
                  expertise can propel your project to new heights and achieve
                  remarkable results.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-sky-700 hover:bg-sky-100 font-semibold transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-sky-300"
                >
                  <Link to="/contact">Request a Free Consultation</Link>
                </Button>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="bg-slate-800/70 p-6 rounded-xl border border-slate-700/60 shadow-lg backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-white mb-5 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-cyan-400" /> Service at a
                  Glance
                </h3>
                <ul className="space-y-3.5 text-sm">
                  {[
                    {
                      label: "Primary Focus",
                      value: serviceDetails.name,
                      icon: (
                        <Briefcase className="w-4 h-4 mr-2 text-slate-500" />
                      ),
                    },
                    {
                      label: "Core Technologies",
                      value: "Modern & Scalable Stack",
                      icon: <Cpu className="w-4 h-4 mr-2 text-slate-500" />,
                    },
                    {
                      label: "Typical Duration",
                      value: "Varies (Customized)",
                      icon: (
                        <Lightbulb className="w-4 h-4 mr-2 text-slate-500" />
                      ),
                    },
                    {
                      label: "Dedicated Support",
                      value: "Yes (Incl. Post-Launch)",
                      icon: <Users className="w-4 h-4 mr-2 text-slate-500" />,
                    },
                    {
                      label: "Target Outcome",
                      value: "Growth & Efficiency",
                      icon: <Award className="w-4 h-4 mr-2 text-slate-500" />,
                    },
                  ].map((fact) => (
                    <li
                      key={fact.label}
                      className="flex items-center text-slate-400"
                    >
                      <span className="flex-shrink-0">{fact.icon}</span>
                      <strong className="text-slate-200/90 w-32 shrink-0 ml-2">
                        {fact.label}:
                      </strong>
                      <span>{fact.value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                className="bg-slate-800/70 p-6 rounded-xl border border-slate-700/60 shadow-lg text-center backdrop-blur-sm"
              >
                <Award className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Delivered by Experts
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Our {serviceDetails.name.toLowerCase()} services are brought
                  to you by a dedicated team of certified professionals with
                  extensive industry experience and a passion for innovation.
                </p>
                <Button
                  asChild
                  variant="link"
                  className="text-sky-300 hover:text-sky-200 text-sm p-0 h-auto"
                >
                  <Link to="/contact">Meet Our Specialists</Link>
                </Button>
              </motion.div>
            </motion.aside>
          </motion.div>

          {/* Testimonials Section */}
          {serviceDetails && sampleTestimonials.length > 0 && (
            <motion.section
              className="py-16 md:py-20 lg:py-24 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeIn}
            >
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 mr-3 text-cyan-400" /> Words
                  From Our Clients
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Discover how we've helped businesses like yours achieve their
                  goals with our {serviceDetails.name.toLowerCase()} expertise.
                </p>
              </div>
              <div className="relative testimonial-slider-container mx-auto max-w-6xl px-4 sm:px-0">
                <Slider {...testimonialSliderSettings}>
                  {sampleTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="px-2 sm:px-3 md:px-4">
                      <motion.div
                        whileHover={{
                          y: -5,
                          boxShadow: "0px 8px 25px rgba(0, 190, 255, 0.15)",
                        }}
                        className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/70 shadow-lg flex flex-col items-center text-center h-full min-h-[320px] sm:min-h-[350px]"
                      >
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full mb-4 border-2 border-cyan-500 object-cover"
                        />
                        <Star className="w-6 h-6 text-yellow-400 mb-3" />
                        <blockquote className="text-slate-300 italic mb-4 text-sm leading-relaxed flex-grow">
                          "
                          {testimonial.quote.replace(
                            "project",
                            serviceDetails.name.toLowerCase()
                          )}
                          "
                        </blockquote>
                        <div className="mt-auto">
                          <p className="font-semibold text-cyan-300">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {testimonial.title}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </Slider>
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
