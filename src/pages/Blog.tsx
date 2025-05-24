import React, { useState, useMemo, useEffect, useRef } from "react"; // Added useRef
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  CalendarDays,
  UserCircle,
  MessageCircle,
  ArrowRight,
  Filter as FilterIcon,
  Layers,
  Palette,
  Cpu,
  TrendingUp,
  Smartphone,
  ShoppingCart,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import vedio2 from "../assets/vedio2.mp4";

const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";

interface ApiPostData {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: { name: string } | string;
  category: { name: string } | string;
  imageUrl: string;
  createdAt: string;
  publishDate?: string;
  commentsCount?: number;
  tags?: string[];
  status?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  comments: number;
  slug: string;
}

const filterCategories = [
  "All Posts",
  "Web Development",
  "Web Design",
  "Mobile Development",
  "Digital Marketing",
  "UX/UI Design",
  "E-commerce",
  "Programming",
];
const POSTS_PER_PAGE = 6;

const getCategoryIcon = (categoryName: string): React.ReactNode => {
  const iconProps = { size: 16, className: "inline mr-1.5 -mt-0.5" };
  switch (categoryName) {
    case "All Posts":
      return <Layers {...iconProps} />;
    case "Web Development":
    case "Programming":
      return <Cpu {...iconProps} />;
    case "Web Design":
      return <Palette {...iconProps} />;
    case "Mobile Development":
      return <Smartphone {...iconProps} />;
    case "Digital Marketing":
      return <TrendingUp {...iconProps} />;
    case "UX/UI Design":
      return <FilterIcon {...iconProps} />;
    case "E-commerce":
      return <ShoppingCart {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
};

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null); // Ref for the video element

  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get("category") || "All Posts";
  const initialPage = parseInt(queryParams.get("page") || "1", 10);

  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/blogs/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiPostData[] = await response.json();
        // console.log("Raw API data:", data);

        const transformedPosts: BlogPost[] = data.map((post) => {
          const imageUrl = post.imageUrl;
          // console.log(`Processed image URL for "${post.title}": ${imageUrl}`);

          return {
            id: post._id,
            title: post.title,
            excerpt:
              post.excerpt ||
              (post.content
                ? post.content.substring(0, 120) + "..."
                : "No excerpt available."),
            author:
              typeof post.author === "string"
                ? post.author
                : (post.author as { name: string }).name,
            date: new Date(
              post.publishDate || post.createdAt
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            category:
              typeof post.category === "string"
                ? post.category
                : (post.category as { name: string }).name,
            image: imageUrl,
            comments: post.commentsCount || 0,
            slug: post.slug,
          };
        });
        setAllPosts(transformedPosts);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred while fetching posts.");
        }
        console.error("Failed to fetch blog posts:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeFilter !== "All Posts") params.set("category", activeFilter);
    if (currentPage > 1) params.set("page", currentPage.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [activeFilter, currentPage, navigate, location.pathname]);

  // Effect to set video playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // Adjust this value (e.g., 0.5 for half speed, 0.7 for 70% speed)
    }
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All Posts") return allPosts;
    return allPosts.filter((post) => post.category === activeFilter);
  }, [allPosts, activeFilter]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({
        top: document.getElementById("blog-grid-section")?.offsetTop || 0,
        behavior: "smooth",
      });
    }
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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.4,
      },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: `0px 12px 25px -8px rgba(var(--color-cyan-rgb, 0, 183, 255)/0.3)`,
    },
  };
  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -1,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-300">
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          className={`relative py-20 md:py-28 overflow-hidden`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <video
            ref={videoRef} // Assign ref here
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
          >
            <source src={vedio2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Darker Gradient Overlay for video contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-emerald-900/75 to-black/90 z-[1]"></div>

          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)] opacity-50 z-[1]"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 drop-shadow-[0_3px_8px_rgba(var(--color-cyan-rgb,0,183,255)/0.3)]`}
                variants={itemVariants}
              >
                Our Insights & Blog
              </motion.h1>
              <motion.p
                className={`text-lg md:text-xl text-cyan-200/90 mb-8 leading-relaxed font-medium`}
                variants={itemVariants}
              >
                Stay informed with our latest articles, industry trends, expert
                advice, and company news from Jharkhand IT Solutions.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8"
                variants={itemVariants}
              >
                {filterCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={cn(
                      `px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-opacity-70 shadow-sm hover:shadow-md`,
                      activeFilter === category
                        ? `bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-white ring-cyan-300`
                        : `bg-slate-700/60 hover:bg-slate-700/80 text-gray-300 hover:text-white ring-slate-600`
                    )}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {getCategoryIcon(category)}
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Blog Posts Grid Section */}
        <motion.section
          id="blog-grid-section"
          className="py-16 md:py-20 bg-slate-900"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <div className="container mx-auto px-4">
            {loading && (
              <motion.div
                className="text-center text-xl text-gray-400 py-10"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                Loading posts...
              </motion.div>
            )}
            {error && (
              <motion.div
                className="text-center text-xl text-red-400 py-10"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                Error: {error}. Please try refreshing the page.
              </motion.div>
            )}
            {!loading && !error && (
              <AnimatePresence mode="popLayout">
                {paginatedPosts.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                  >
                    {paginatedPosts.map((post) => (
                      <motion.div
                        layout
                        key={post.slug}
                        className={`bg-slate-800/60 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-slate-700/60 flex flex-col group transition-all duration-300 hover:border-cyan-500/50`}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        whileHover="hover"
                      >
                        <Link
                          to={`/blog/${post.slug}`}
                          className="block group/cardlink flex flex-col h-full"
                        >
                          <AspectRatio
                            ratio={16 / 9}
                            className="bg-slate-700/40 w-full"
                          >
                            {post.image ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover/cardlink:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                  console.error(
                                    "Image failed to load:",
                                    post.image,
                                    e
                                  );
                                  e.currentTarget.style.display = "none";
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    const placeholder =
                                      document.createElement("div");
                                    placeholder.className =
                                      "w-full h-full flex items-center justify-center bg-slate-700";
                                    placeholder.innerHTML = `<span class="text-slate-500 text-sm">Image unavailable</span>`;
                                    if (
                                      parent.querySelector(
                                        ".image-placeholder"
                                      ) === null
                                    ) {
                                      // Avoid adding multiple placeholders
                                      placeholder.classList.add(
                                        "image-placeholder"
                                      );
                                      parent.appendChild(placeholder);
                                    }
                                  }
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-slate-500 text-sm">
                                  No image
                                </span>
                              </div>
                            )}
                            <div
                              className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-90 group-hover/cardlink:opacity-100 transition-opacity duration-300`}
                            ></div>
                          </AspectRatio>
                          <div className="p-5 md:p-6 flex flex-col flex-grow">
                            <div className="mb-3">
                              <span
                                className={`text-xs font-semibold inline-block py-1 px-2.5 rounded-full bg-cyan-500/20 text-cyan-400 uppercase tracking-wider`}
                              >
                                {post.category}
                              </span>
                            </div>
                            <h3
                              className={`text-lg md:text-xl font-bold text-white mb-3 group-hover/cardlink:text-cyan-300 transition-colors duration-300 line-clamp-2`}
                            >
                              {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                              {post.excerpt}
                            </p>
                            <div className="mb-4 mt-auto">
                              <span
                                className={`inline-flex items-center text-sm font-medium text-cyan-400 group-hover/cardlink:text-cyan-300 transition-colors duration-300`}
                              >
                                View Details
                                <ArrowRight
                                  size={16}
                                  className="ml-1.5 transition-transform duration-300 group-hover/cardlink:translate-x-1"
                                />
                              </span>
                            </div>
                            <div className="border-t border-slate-700/80 pt-4">
                              <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 gap-y-2">
                                <div className="flex items-center gap-1.5">
                                  <UserCircle size={14} /> {post.author}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <CalendarDays size={14} /> {post.date}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <MessageCircle size={14} /> {post.comments}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.p
                    className="text-center text-gray-400 text-xl py-10"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {allPosts.length === 0 && activeFilter === "All Posts"
                      ? "No blog posts available at the moment."
                      : `No posts found for "${activeFilter}". Please try another category.`}
                  </motion.p>
                )}
              </AnimatePresence>
            )}

            {!loading && !error && totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center mt-12 md:mt-16 space-x-1 sm:space-x-2"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-700/80 hover:bg-slate-600/80 text-gray-300 disabled:hover:bg-slate-700/80`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Previous
                </motion.button>
                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={cn(
                      `px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200`,
                      currentPage === i + 1
                        ? `bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/30`
                        : `bg-slate-700/60 hover:bg-slate-600/70 text-gray-400 hover:text-gray-200`
                    )}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {i + 1}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-700/80 hover:bg-slate-600/80 text-gray-300 disabled:hover:bg-slate-700/80`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Next
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-slate-900 to-black"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 via-emerald-600/10 to-transparent opacity-40 transform-gpu -rotate-3 scale-110`}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className={`max-w-3xl mx-auto bg-slate-800/70 backdrop-blur-xl rounded-2xl p-1 shadow-2xl shadow-black/40 border border-slate-700/60 perspective`}
              variants={itemVariants}
            >
              <motion.div
                className="bg-slate-900/90 rounded-xl p-8 md:p-12"
                initial={{ rotateY: 0, rotateX: 0 }}
                whileHover={{ rotateY: 0.5, rotateX: -0.5, scale: 1.005 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="w-20 h-20 mb-6 relative"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 opacity-25 rounded-full blur-xl`}
                    ></div>
                    <div
                      className={`relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 border-2 border-white/20 shadow-lg shadow-cyan-500/30`}
                    >
                      <Mail className="text-white text-3xl" />
                    </div>
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="text-gray-300/90 mb-8 max-w-lg leading-relaxed">
                    Stay updated with our latest articles, industry insights,
                    and company news delivered straight to your inbox. No spam,
                    ever.
                  </p>

                  <form
                    className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <motion.input
                      type="email"
                      placeholder="Enter your email address"
                      className={`px-5 py-3 bg-slate-700/60 border border-slate-600 rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 flex-grow transition-all duration-300`}
                      variants={itemVariants}
                    />
                    <motion.button
                      type="submit"
                      className={`px-7 py-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/40 transition-all duration-300`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Subscribe
                    </motion.button>
                  </form>
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

export default Blog;
