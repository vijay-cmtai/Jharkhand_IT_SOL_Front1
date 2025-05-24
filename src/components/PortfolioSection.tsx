import React, { useState, useEffect } from "react"; // Removed useMemo as it's not strictly needed here now
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";

// Interface for the portfolio items fetched from the API
interface FeaturedProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string; // For internal fallback link (e.g., /portfolio/PROJECT_ID)
  projectUrl?: string; // For external project link
}

const MAX_FEATURED_PROJECTS = 2;

const PortfolioSection = () => {
  const [featuredProjects, setFeaturedProjects] = useState<
    FeaturedProjectItem[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/portfolio/all`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allProjectsData = await response.json();
        const mappedData: FeaturedProjectItem[] = allProjectsData.map(
          (item: any) => ({
            id: item._id,
            title: item.title,
            category: item.category,
            description: item.description,
            image: item.image,
            slug: `/portfolio/${item._id}`,
            projectUrl: item.projectLink,
          })
        );
        setFeaturedProjects(mappedData.slice(0, MAX_FEATURED_PROJECTS));
      } catch (e: any) {
        setError(e.message || "Failed to fetch featured projects.");
        console.error("Fetch featured projects error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeaturedProjects();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95, rotate: 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 12,
        duration: 0.9,
        staggerChildren: 0.2,
      },
    },
  };

  const childContentVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 60, damping: 10 },
    },
  };

  const projectCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 15, duration: 0.6 },
    },
  };

  // Loading, Error, No Data states (replace with your styled versions)
  if (isLoading) {
    return (
      <section className="pt-12 md:pt-20 pb-16 md:pb-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-5xl text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
            Loading Showcase...
          </h2>
          {/* Add your loading spinner/animation here */}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-12 md:pt-20 pb-16 md:pb-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-5xl text-3xl md:text-4xl font-bold mb-4 text-red-500">
            Error Loading Projects
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </section>
    );
  }

  if (featuredProjects.length === 0) {
    return (
      <section className="pt-12 md:pt-20 pb-16 md:pb-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-5xl text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
            Our Showcase Projects
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            No featured projects available at the moment. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="pt-12 md:pt-20 pb-16 md:pb-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={childContentVariants}
        >
          <h2 className="lg:text-5xl text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
            Our Showcase Projects
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Explore a glimpse of our capabilities through these handpicked
            projects, demonstrating innovation and excellence.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              // The main motion.div for the card is NOT a link itself.
              // It uses `group` for hover effects on children.
              className="relative group overflow-hidden rounded-xl shadow-2xl shadow-black/40 bg-slate-800/50 h-[380px] md:h-[420px] flex flex-col"
              variants={projectCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2 + 0.3 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0px 20px 40px -10px rgba(34, 211, 238, 0.25)",
                transition: { type: "spring", stiffness: 200, damping: 20 },
              }}
            >
              {/* Card Content - Not Clickable by default */}
              <div className="relative h-3/5 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay does not need pointer-events-none if parent is not clickable */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 via-slate-800/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative p-4 md:p-5 flex flex-col flex-grow justify-between bg-slate-800/80 rounded-b-xl">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-white text-[11px] font-semibold rounded-full mb-3 tracking-wide">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 transition-colors duration-300 group-hover:text-cyan-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300/90 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Clickable Button Area */}
                <div className="mt-auto">
                  {project.projectUrl ? (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-medium text-white hover:text-cyan-400 transition-colors duration-300 text-sm group/button cursor-pointer" // Added cursor-pointer here
                    >
                      Explore Project{" "}
                      <ExternalLink className="ml-1.5 h-4 w-4 group-hover/button:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      to={project.slug}
                      className="inline-flex items-center font-medium text-white hover:text-cyan-400 transition-colors duration-300 text-sm group/button cursor-pointer" // Added cursor-pointer here
                    >
                      View Details{" "}
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover/button:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12 md:mt-16"
          variants={childContentVariants}
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-white text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1.5"
          >
            View All Our Work
            <ArrowRight className="ml-2.5 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PortfolioSection;
