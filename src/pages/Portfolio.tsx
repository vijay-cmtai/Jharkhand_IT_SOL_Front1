import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Briefcase,
  ArrowRight,
  ExternalLink,
  Filter as FilterIcon,
  Layers,
  Palette,
  Smartphone,
  ShoppingCart,
  SearchCode,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import vedio2 from "../assets/vedio2.mp4";

// Original JISS brand colors (not used for hero background overlay in this version)
const jisBrown = "orange-700"; // Used for some buttons
const jisYellow = "amber-400"; // Used for some buttons and highlights
const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  slug: string;
  projectUrl?: string;
}

const getCategoryIcon = (categoryName: string): React.ReactNode => {
  const iconProps = { size: 16, className: "inline mr-1.5 -mt-0.5" };
  switch (categoryName) {
    case "All Projects":
      return <Layers {...iconProps} />;
    case "Web Design":
      return <Palette {...iconProps} />;
    case "Mobile Apps":
      return <Smartphone {...iconProps} />;
    case "E-commerce":
      return <ShoppingCart {...iconProps} />;
    default:
      return <FilterIcon {...iconProps} />;
  }
};

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All Projects");
  const [visibleItemsCount, setVisibleItemsCount] = useState<number>(6);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/portfolio/all`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const mappedData: PortfolioItem[] = data.map((item: any) => ({
          id: item._id,
          title: item.title,
          category: item.category,
          image: item.imageUrl,
          excerpt: item.description,
          slug: `/portfolio/${item._id}`,
          projectUrl: item.projectLink,
        }));
        setPortfolioItems(mappedData);
      } catch (e: any) {
        setError(e.message || "Failed to fetch portfolio items.");
        console.error("Fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      // Video ki speed kam karne ke liye (e.g., 0.4 for 40% speed)
      videoRef.current.playbackRate = 0.4; // <<--- YAHAN SPEED ADJUST KI GAYI HAI
      videoRef.current.onloadeddata = () => {
        console.log("Portfolio Hero Video data loaded");
      };
      videoRef.current.onerror = () => {
        console.error("Error loading Portfolio Hero video");
      };
    }
  }, []);

  const filterCategories = useMemo(() => {
    if (portfolioItems.length === 0) return ["All Projects"];
    const categories = new Set(portfolioItems.map((item) => item.category));
    return ["All Projects", ...Array.from(categories).sort()];
  }, [portfolioItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All Projects") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter, portfolioItems]);

  const itemsToShow = useMemo(() => {
    return filteredItems.slice(0, visibleItemsCount);
  }, [filteredItems, visibleItemsCount]);

  const loadMoreItems = () => {
    setVisibleItemsCount((prevCount) => prevCount + 6);
  };

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
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: `0px 12px 25px -8px rgba(var(--color-amber-400-rgb, 251, 191, 36)/0.3)`,
    },
  };
  const ctaButtonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-300 justify-center items-center">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-amber-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-amber-400 delay-200"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-amber-400 delay-400"></div>
          <span className="ml-2 text-xl font-semibold">
            Loading Portfolio...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-300 justify-center items-center">
        <div className="text-center p-8 bg-slate-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-400 mb-2">Could not load portfolio items.</p>
          <p className="text-sm text-gray-500">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-6 bg-${jisYellow} hover:bg-${jisYellow}/90 text-slate-900 font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-300">
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <motion.section
          className={`relative py-20 md:py-28 overflow-hidden isolate`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Video Background (-z-10) */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
          >
            <source src={vedio2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dark Semi-Transparent Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-slate-900/70 via-black/80 to-black/85`}
          ></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_top_left,white_20%,transparent_70%)] opacity-50"></div>

          {/* Content Container (z-10) */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-300 drop-shadow-[0_3px_8px_rgba(250,204,21,0.3)]"
                variants={itemVariants}
              >
                Our Portfolio
              </motion.h1>
              <motion.p
                className={`text-lg md:text-xl text-amber-300/90 mb-8 leading-relaxed font-medium`}
                variants={itemVariants}
              >
                Explore our diverse range of successful projects that showcase
                our expertise, innovation, and creative prowess.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8"
                variants={itemVariants}
              >
                {filterCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setActiveFilter(category);
                      setVisibleItemsCount(6);
                    }}
                    className={cn(
                      `px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-opacity-50`,
                      activeFilter === category
                        ? `bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400`
                        : `bg-slate-700/60 hover:bg-slate-700/80 text-gray-200 hover:text-white ring-slate-600 hover:ring-slate-500`
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getCategoryIcon(category)}
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
        {/* --- End Hero Section --- */}

        {/* --- Portfolio Grid Section --- */}
        <motion.section
          className="py-16 md:py-20 bg-slate-900"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <div className="container mx-auto px-4">
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              >
                {itemsToShow.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    className={`bg-slate-800/60 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-slate-700/60 flex flex-col group transition-all duration-300 hover:border-amber-400/50`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                  >
                    <div className="flex flex-col flex-grow">
                      <AspectRatio
                        ratio={16 / 10}
                        className="bg-slate-700/40 relative"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (
                              parent &&
                              !parent.querySelector(".img-placeholder")
                            ) {
                              const placeholder = document.createElement("div");
                              placeholder.className =
                                "img-placeholder w-full h-full flex items-center justify-center text-slate-500 text-sm bg-slate-700/40";
                              placeholder.innerText = "Image not available";
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
                        ></div>
                      </AspectRatio>
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <span
                            className={`text-xs font-semibold inline-block py-1 px-2.5 rounded-full bg-amber-400/20 text-amber-400 uppercase tracking-wider`}
                          >
                            {project.category}
                          </span>
                        </div>
                        <h3
                          className={`text-lg md:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2`}
                        >
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                          {project.excerpt}
                        </p>

                        <div className="mt-auto self-start">
                          {project.projectUrl ? (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center text-amber-400/80 hover:text-amber-300 font-medium text-sm transition-colors duration-300 hover:underline cursor-pointer`}
                            >
                              Visit Project{" "}
                              <ExternalLink size={16} className="ml-1.5" />
                            </a>
                          ) : (
                            <Link
                              to={project.slug}
                              className={`inline-flex items-center text-amber-400/80 hover:text-amber-300 font-medium text-sm transition-colors duration-300 cursor-pointer`}
                            >
                              View Details{" "}
                              <ArrowRight size={16} className="ml-1.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {itemsToShow.length < filteredItems.length && (
              <motion.div
                className="text-center mt-12 md:mt-16"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <motion.button
                  onClick={loadMoreItems}
                  className={`bg-${jisYellow} hover:bg-${jisYellow}/90 text-slate-900 font-semibold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-${jisYellow}/40 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0`}
                  variants={ctaButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Load More Projects
                </motion.button>
              </motion.div>
            )}
            {itemsToShow.length === 0 &&
              activeFilter !== "All Projects" &&
              portfolioItems.length > 0 && (
                <motion.p
                  className="text-center text-gray-400 mt-12 text-lg"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  No projects found for "{activeFilter}". Try a different
                  category!
                </motion.p>
              )}
            {portfolioItems.length === 0 && !isLoading && !error && (
              <motion.p
                className="text-center text-gray-400 mt-12 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No portfolio items available at the moment. Check back soon!
              </motion.p>
            )}
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
            className={`absolute inset-0 bg-gradient-to-r from-${jisBrown}/15 via-${jisYellow}/15 to-transparent opacity-50 transform-gpu rotate-2 scale-110`}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className={`max-w-4xl mx-auto bg-slate-800/70 backdrop-blur-xl rounded-2xl p-1 shadow-2xl shadow-black/40 border border-slate-700/60 perspective`}
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      Ready to Start Your Next Project?
                    </h2>
                    <p className="text-gray-300/90 mb-8 text-lg leading-relaxed">
                      Let's collaborate to bring your vision to life with our
                      expertise in design, development, and cutting-edge digital
                      strategies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <motion.button
                        onClick={() =>
                          navigate("/contact?reason=project-discussion")
                        }
                        className={`bg-${jisBrown} hover:bg-${jisBrown}/90 text-white px-8 py-3.5 rounded-lg shadow-lg font-semibold text-base button-3d transform transition hover:-translate-y-1 active:translate-y-0`}
                        variants={ctaButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Discuss Your Project{" "}
                        <Send size={18} className="inline ml-2" />
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setActiveFilter("All Projects");
                          setVisibleItemsCount(6);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`bg-transparent border-2 border-${jisYellow} text-${jisYellow} hover:bg-${jisYellow}/10 px-8 py-3.5 rounded-lg shadow font-semibold text-base button-3d transform transition hover:-translate-y-1 active:translate-y-0`}
                        variants={ctaButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        View All Projects{" "}
                        <Layers size={18} className="inline ml-2" />
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
                        className={`absolute inset-0 bg-${jisBrown}/25 rounded-full blur-2xl`}
                      ></div>
                      <div
                        className={`relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-${jisBrown} to-${jisYellow} border-2 border-white/20 shadow-2xl shadow-${jisYellow}/40`}
                      >
                        <Briefcase
                          size={50}
                          className="text-white opacity-90"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Portfolio;
