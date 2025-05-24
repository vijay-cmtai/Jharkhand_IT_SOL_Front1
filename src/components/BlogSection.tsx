import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  UserCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface ApiBlogPost {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  excerpt?: string;
  content?: string;
  author: string;
  publishDate: string;
  slug: string;
}

interface DisplayBlogPost {
  _id: string;
  title: string;
  category: string;
  imageSrc: string;
  excerpt: string;
  author: string;
  displayDate: string;
  slug: string;
}

const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";
const SCROLL_SPEED_PPS = 40; // pixels per second

const formatDate = (isoDateString: string): string => {
  try {
    if (!isoDateString) return "Date not available";
    return new Date(isoDateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", isoDateString, error);
    return "Invalid Date";
  }
};

const LatestBlogSection = () => {
  const [latestPosts, setLatestPosts] = useState<DisplayBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeControls = useAnimation();

  // Reset animation position safely after mount
  useEffect(() => {
    marqueeControls.set({ x: 0 });
  }, [marqueeControls]);

  // Start marquee animation once posts loaded
  useEffect(() => {
    if (latestPosts.length === 0) return;

    const track = trackRef.current;
    if (!track) return;

    const trackWidth = track.scrollWidth / 2; // duplicated content
    const duration = trackWidth / SCROLL_SPEED_PPS;

    marqueeControls.start({
      x: [0, -trackWidth],
      transition: {
        ease: "linear",
        duration,
        repeat: Infinity,
        repeatType: "loop",
      },
    });

    return () => {
      marqueeControls.stop();
    };
  }, [latestPosts, marqueeControls]);

  // Pause on drag or hover
  const handleDragStart = () => marqueeControls.stop();
  const handleDragEnd = () => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.scrollWidth / 2;
    const duration = trackWidth / SCROLL_SPEED_PPS;
    marqueeControls.start({
      x: [0, -trackWidth],
      transition: {
        ease: "linear",
        duration,
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/blogs`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const dataFromApi: ApiBlogPost[] = await res.json();

        const transformedPosts: DisplayBlogPost[] = dataFromApi
          .map((post) => {
            let finalImageSrc =
              "https://via.placeholder.com/600x338.png?text=Image+Loading...";
            if (post.imageUrl?.trim()) {
              if (
                post.imageUrl.startsWith("http://") ||
                post.imageUrl.startsWith("https://")
              ) {
                finalImageSrc = post.imageUrl;
              } else {
                const pathSegment = post.imageUrl.startsWith("/")
                  ? post.imageUrl.substring(1)
                  : post.imageUrl;
                finalImageSrc = `${BASE_URL}/${pathSegment.replace(/\\/g, "/")}`;
              }
            } else {
              finalImageSrc =
                "https://via.placeholder.com/600x338.png?text=No+Image";
            }
            return {
              _id: post._id,
              title: post.title || "Untitled Post",
              category: post.category || "Uncategorized",
              imageSrc: finalImageSrc,
              excerpt:
                post.excerpt ||
                (post.content
                  ? post.content.substring(0, 100) + "..."
                  : "No excerpt."),
              author: post.author || "Unknown Author",
              displayDate: formatDate(post.publishDate),
              slug: post.slug || "",
            };
          })
          .sort((a, b) => {
            const dateA = dataFromApi.find((p) => p._id === a._id)?.publishDate;
            const dateB = dataFromApi.find((p) => p._id === b._id)?.publishDate;
            if (!dateA || !dateB) return 0;
            return new Date(dateB).getTime() - new Date(dateA).getTime();
          });
        setLatestPosts(transformedPosts.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <section
      className="pt-12 pb-16 bg-gradient-to-b from-black via-slate-900 to-black text-white relative overflow-hidden"
      style={{ minHeight: "600px" }} // Ensure minimum height so cards are visible
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col sm:flex-row justify-between items-center gap-6 md:gap-0">
        <div>
          <h2 className="font-bold text-4xl md:text-5xl max-w-xl leading-tight text-white">
            Latest <span className="text-teal-400 ">Blog Posts</span>
          </h2>
          <p className="max-w-xl mt-2 text-lg text-slate-300">
            Read up on Jharkhand IT Solutions company updates, tech guides, and
            more.
          </p>
        </div>
        <Link
          to="/blog"
          className="inline-flex gap-2 items-center px-6 py-3 rounded bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition"
          aria-label="See all blog posts"
        >
          See All Posts <ArrowRight size={20} />
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-56 text-white/80">
          <Loader2 className="animate-spin mr-3" size={24} /> Loading latest
          posts...
        </div>
      )}

      {error && (
        <div className="flex flex-col justify-center items-center h-56 text-red-600 gap-3">
          <AlertTriangle size={36} />
          <p>Error loading posts: {error}</p>
        </div>
      )}

      {!isLoading && !error && latestPosts.length > 1 && (
        <motion.div
          ref={trackRef}
          className="flex gap-6 lg:gap-8 cursor-grab select-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleDragStart}
          onMouseLeave={handleDragEnd}
          animate={marqueeControls}
          style={{
            willChange: "transform",
            whiteSpace: "nowrap",
            width: "max-content",
          }}
        >
          {[...latestPosts, ...latestPosts].map((post, idx) => (
            <motion.article
              key={`${post._id}-${idx}`}
              className="w-80 md:w-96 flex-shrink-0 rounded-md bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg overflow-hidden cursor-pointer inline-block"
            >
              <Link to={`/blog/${post.slug}`} className="block group">
                <div className="relative h-44 md:h-52 overflow-hidden rounded-t-md">
                  <img
                    src={post.imageSrc}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-300 line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-slate-400 space-x-3">
                    <span className="flex items-center gap-1">
                      <UserCircle size={14} /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} /> {post.displayDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpenText size={14} /> {post.category}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default LatestBlogSection;
