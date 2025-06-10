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

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string; // This will hold the relative path like 'uploads/portfolio/image.jpg'
  excerpt: string;
  slug: string;
  projectUrl?: string;
}

const getCategoryIcon = (categoryName: string): React.ReactNode => {
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
        const data = await response.json();
        // The backend sends 'imageUrl' but your model has 'image'. We'll use 'image' from the raw data.
        const mappedData: PortfolioItem[] = data.map((item: any) => ({
          id: item._id,
          title: item.title,
          category: item.category,
          image: item.imageUrl, // Backend controller sends `imageUrl`, which contains the path.
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

  // Other hooks and functions remain the same...
  useEffect(() => { if (videoRef.current) { videoRef.current.playbackRate = 0.4; } }, []);
  const filterCategories = useMemo(() => { const cats = new Set(portfolioItems.map(item => item.category)); return ["All Projects", ...Array.from(cats).sort()]; }, [portfolioItems]);
  const filteredItems = useMemo(() => { if (activeFilter === 'All Projects') return portfolioItems; return portfolioItems.filter(item => item.category === activeFilter); }, [activeFilter, portfolioItems]);
  const itemsToShow = useMemo(() => filteredItems.slice(0, visibleItemsCount), [filteredItems, visibleItemsCount]);
  const loadMoreItems = () => setVisibleItemsCount(prev => prev + 6);

  // Your variants and loading/error states are fine...
  if (isLoading) return <div className="flex justify-center items-center h-screen bg-slate-900">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen bg-slate-900 text-red-400">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-300">
      <main className="flex-grow">
        {/* --- Hero Section (No changes needed) --- */}
        {/* ... */}
        
        {/* --- Portfolio Grid Section --- */}
        <motion.section
          className="py-16 md:py-20 bg-slate-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <div className="container mx-auto px-4">
            {/* Filter buttons... */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8">
              {filterCategories.map((category) => (
                <motion.button key={category} onClick={() => setActiveFilter(category)} /* ... */>
                  {getCategoryIcon(category)} {category}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {itemsToShow.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    className={`bg-slate-800/60 rounded-xl overflow-hidden shadow-2xl group`}
                  >
                    <div className="flex flex-col flex-grow">
                      <AspectRatio ratio={16 / 10} className="bg-slate-700/40 relative">
                        {/* --- THIS IS THE FIX --- */}
                        <img
                          src={`${BASE_URL}/${project.image}`}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
                      </AspectRatio>
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <span className={`text-xs font-semibold py-1 px-2.5 rounded-full bg-amber-400/20 text-amber-400`}>
                            {project.category}
                          </span>
                        </div>
                        <h3 className={`text-lg md:text-xl font-bold text-white mb-2 group-hover:text-amber-300`}>
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                          {project.excerpt}
                        </p>
                        <div className="mt-auto self-start">
                          {project.projectUrl ? (
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center text-amber-400/80 hover:text-amber-300`}>
                              Visit Project <ExternalLink size={16} className="ml-1.5" />
                            </a>
                          ) : (
                            <Link to={project.slug} className={`inline-flex items-center text-amber-400/80 hover:text-amber-300`}>
                              View Details <ArrowRight size={16} className="ml-1.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Load more button... */}
            {itemsToShow.length < filteredItems.length && (
              <div className="text-center mt-12">
                <button onClick={loadMoreItems} /* ... */>
                  Load More Projects
                </button>
              </div>
            )}
          </div>
        </motion.section>

        {/* --- CTA Section (No changes needed) --- */}
        {/* ... */}
      </main>
    </div>
  );
};

export default Portfolio;
