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
} from "lucide-react";
import { cn } from "@/lib/utils";
import vedio2 from "../assets/vedio2.mp4";

// The base URL of your deployed backend
const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";

// --- INTERFACES ---
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string; // The backend now sends 'imageUrl'
  excerpt: string;
  slug: string;
  projectUrl?: string;
}

// ... (getCategoryIcon function remains the same)

const getCategoryIcon = (categoryName: string): React.ReactNode => {
    // ... no changes needed here
    const iconProps = { size: 16, className: "inline mr-1.5 -mt-0.5" };
    switch (categoryName) {
      case "All Projects": return <Layers {...iconProps} />;
      case "Web Design": return <Palette {...iconProps} />;
      case "Mobile Apps": return <Smartphone {...iconProps} />;
      case "E-commerce": return <ShoppingCart {...iconProps} />;
      default: return <FilterIcon {...iconProps} />;
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
        // Backend sends an array of items with _id, title, category, imageUrl, etc.
        const data = await response.json();

        // Map the backend data to the frontend interface
        const mappedData: PortfolioItem[] = data.map((item: any) => ({
          id: item._id,
          title: item.title,
          category: item.category,
          imageUrl: item.imageUrl, // Use the imageUrl field directly
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
  
  // ... (other useEffect, useMemo, functions are fine)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4;
    }
  }, []);

  const filterCategories = useMemo(() => {
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
  
  // ... (variants and loading/error states are fine)

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-slate-900">Loading...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-slate-900 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-300">
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        {/* ... (Your hero section JSX is fine, no changes needed) ... */}
        <motion.section
          className={`relative py-20 md:py-28 overflow-hidden isolate`}
        >
             <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover -z-10">
                <source src={vedio2} type="video/mp4" />
            </video>
            <div className={`absolute inset-0 bg-gradient-to-b from-slate-900/70 via-black/80 to-black/85`}></div>
            <div className="container mx-auto px-4 relative z-10">
                {/* ... content ... */}
            </div>
        </motion.section>

        {/* --- Portfolio Grid Section --- */}
        <motion.section className="py-16 md:py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8">
                {filterCategories.map((category) => (
                    <motion.button key={category} onClick={() => setActiveFilter(category)} /* ... */>
                        {getCategoryIcon(category)} {category}
                    </motion.button>
                ))}
            </div>
            {/* Grid */}
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {itemsToShow.map((project) => (
                  <motion.div layout key={project.id} /* ... */>
                    <div className="flex flex-col flex-grow">
                      <AspectRatio ratio={16 / 10} className="bg-slate-700/40 relative">
                        {/* --- THIS IS THE FIX --- */}
                        <img
                          src={`${BASE_URL}/${project.imageUrl}`}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          loading="lazy"
                          // ... onError handler is good to keep
                        />
                        {/* ... */}
                      </AspectRatio>
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        {/* ... card content ... */}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            {/* ... Load More Button ... */}
          </div>
        </motion.section>

        {/* --- CTA Section --- */}
        {/* ... (Your CTA section JSX is fine, no changes needed) ... */}
      </main>
    </div>
  );
};

export default Portfolio;
