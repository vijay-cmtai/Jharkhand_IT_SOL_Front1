import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Loader2,
  ImageOff,
  Briefcase, // Icon for Projects
  Users, // Icon for Clients
  Award, // Icon for Experience/Quality
  Zap, // Icon for Innovation or Speed
} from "lucide-react"; // Added icons for stats
import { cn } from "@/lib/utils";

// --- INTERFACES (Same as your provided code) ---
interface BackendSubService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
}
interface BackendService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mainImage?: string;
  subServices: BackendSubService[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
interface ServiceCardData {
  _id: string;
  category: string;
  path: string;
  description: string;
  imageUrl?: string;
}

// --- API Constants (Same as your provided code) ---
const API_SERVICES_URL =
  "https://jharkhand-it-sol-back1.onrender.com/services/find";
const API_BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";

// --- Transformation Function (Same as your provided code) ---
const transformBackendDataToServiceCards = (
  backendData: BackendService[]
): ServiceCardData[] => {
  return backendData
    .filter((service) => service.isActive)
    .map((bs) => ({
      _id: bs._id,
      category: bs.name,
      path: `/services/${bs.slug}`,
      description: bs.description,
      imageUrl: bs.mainImage
        ? bs.mainImage.startsWith("http")
          ? bs.mainImage
          : `${API_BASE_URL}/${bs.mainImage.startsWith("/") ? bs.mainImage.substring(1) : bs.mainImage}`
        : undefined,
    }));
};

// Example Stats Data
const keyStats = [
  {
    id: 1,
    icon: <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />,
    value: "150+",
    label: "Projects Delivered",
  },
  {
    id: 2,
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-sky-400" />,
    value: "90+",
    label: "Satisfied Clients",
  },
  {
    id: 3,
    icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />,
    value: "8+",
    label: "Years of Expertise",
  },
  {
    id: 4,
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-rose-400" />,
    value: "24/7",
    label: "Dedicated Support",
  },
];

const ServicesPage: React.FC = () => {
  const [serviceCards, setServiceCards] = useState<ServiceCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(API_SERVICES_URL);
        if (!response.ok) {
          let errorMsg = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorData.error || errorMsg;
          } catch (e) {
            /* Ignore */
          }
          throw new Error(errorMsg);
        }
        const apiResponse = await response.json();
        const backendData: BackendService[] = Array.isArray(apiResponse)
          ? apiResponse
          : apiResponse.data && Array.isArray(apiResponse.data)
            ? apiResponse.data
            : [];

        if (!Array.isArray(backendData)) {
          console.error("Fetched services data is not an array:", backendData);
          throw new Error("Data format error from API.");
        }
        const transformedCards =
          transformBackendDataToServiceCards(backendData);
        setServiceCards(transformedCards);
      } catch (error: any) {
        console.error("Failed to fetch services:", error);
        setFetchError(error.message || "Could not load services.");
        setServiceCards([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
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
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: -25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.1 },
    },
  };
  const cardHoverVariant = {
    y: -8,
    scale: 1.03,
    boxShadow: "0px 15px 30px rgba(0, 220, 255, 0.25)",
    borderColor: "rgba(0, 220, 255, 0.7)",
    transition: { type: "spring", stiffness: 250, damping: 15 },
  };
  const statItemVariants = {
    // For individual stat items
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 10 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black text-gray-300 antialiased">
      <motion.main
        className="flex-grow"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="relative pt-24 pb-16 md:pt-32 md:pb-20 text-white overflow-hidden bg-slate-900/50">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] opacity-60"></div>
          <motion.div
            className="container mx-auto px-4 relative z-10"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 leading-tight"
              >
                Our Comprehensive Services
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-cyan-100/80 mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto"
              >
                Discover how our expertise across diverse digital domains can
                propel your business forward, crafting solutions that resonate
                and deliver.
              </motion.p>
            </div>

            {/* --- Key Stats Section --- */}
            <motion.div
              className="mt-10 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }} // Stagger after main text
              initial="hidden" // Ensure these are set for children to inherit correctly
              animate="visible"
            >
              {keyStats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={statItemVariants} // Use specific variant for stat items
                  className="text-center p-4 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-lg"
                >
                  <div className="flex justify-center mb-3">{stat.icon}</div>
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            {/* --- End Key Stats Section --- */}
          </motion.div>
        </motion.section>

        {/* Main Services Display Section */}
        <section className="py-16 md:py-20 bg-slate-950">
          <div className="container mx-auto px-4">
            <motion.h2
              variants={sectionTitleVariants}
              className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              Explore Our Core Expertise
            </motion.h2>

            {/* Explore All Services Button - Moved here from ServicesSlider */}
            <motion.div
              className="text-center mb-12 md:mb-16" // Added more margin below
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.5 },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white text-sm md:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                View All Our Services
                <ArrowRight className="ml-2.5 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </motion.div>

            {isLoading ? (
              <div className="flex flex-col justify-center items-center min-h-[300px] text-slate-400">
                <Loader2 className="animate-spin text-cyan-400" size={56} />
                <p className="mt-4 text-xl">Loading Our Services...</p>
                <p className="text-sm text-slate-500">Just a moment, please.</p>
              </div>
            ) : fetchError ? (
              <div className="flex flex-col justify-center items-center min-h-[300px] text-red-400 text-center p-6 bg-slate-800/50 rounded-lg border border-red-500/30">
                <ShieldCheck size={56} className="mb-4 text-red-500" />
                <p className="text-2xl font-semibold">
                  Failed to Load Services
                </p>
                <p className="text-md mt-2 text-red-300/80">{fetchError}</p>
                <p className="text-sm mt-3 text-slate-500">
                  Please try refreshing or check back later.
                </p>
              </div>
            ) : serviceCards.length === 0 ? (
              <div className="flex flex-col justify-center items-center min-h-[300px] text-slate-500 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                <Layers size={56} className="mb-4 opacity-60" />
                <p className="text-2xl">No Services Available</p>
                <p className="text-md mt-2 text-slate-400">
                  We're currently updating our offerings.
                </p>
                <p className="text-sm mt-1 text-slate-500">
                  Please check back soon!
                </p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                initial="hidden"
                animate="visible"
              >
                {serviceCards.map((card) => (
                  <motion.div
                    key={card._id}
                    variants={itemVariants}
                    whileHover={cardHoverVariant}
                    className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50 group shadow-xl flex flex-col overflow-hidden transition-all duration-300 ease-out cursor-pointer"
                  >
                    <Link to={card.path} className="block h-full flex flex-col">
                      <div className="relative w-full aspect-video overflow-hidden rounded-t-xl">
                        {card.imageUrl ? (
                          <img
                            src={card.imageUrl}
                            alt={`${card.category} service`}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentNode as HTMLElement;
                              if (
                                parent &&
                                !parent.querySelector(
                                  ".fallback-image-placeholder"
                                )
                              ) {
                                const fallbackDiv =
                                  document.createElement("div");
                                fallbackDiv.className =
                                  "fallback-image-placeholder w-full h-full bg-slate-700/80 flex items-center justify-center rounded-t-xl";
                                fallbackDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500 opacity-70"><path d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7.5"/><path d="m2 10 4.37-4.37a2 2 0 0 1 2.82 0L14 11"/><path d="m14 19.5 3-3 3 3"/><path d="m17 22.5-3-3 3-3"/><path d="m19 10-3 3"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`;
                                parent.appendChild(fallbackDiv);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-700/80 flex items-center justify-center rounded-t-xl">
                            <ImageOff className="w-14 h-14 text-slate-500 opacity-70" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 mt-1 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
                          {card.category}
                        </h3>
                        <p className="text-gray-300/90 text-sm md:text-base leading-relaxed mb-5 flex-grow line-clamp-3 group-hover:text-gray-200">
                          {card.description}
                        </p>
                        <div className="mt-auto">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-sky-300 bg-sky-700/40 hover:bg-sky-600/60 group-hover:text-sky-100 rounded-lg transition-colors duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-sky-500/30">
                            Discover More
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </motion.main>
      {/* <Footer /> */}
    </div>
  );
};

export default ServicesPage;
