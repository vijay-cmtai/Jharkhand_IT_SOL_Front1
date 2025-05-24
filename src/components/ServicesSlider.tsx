import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ImageOff, AlertTriangle, Loader2 } from "lucide-react";
import ServiceImg from "../assets/ServiceImg.avif";

// --- INTERFACES ---
interface BackendSubService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

interface BackendService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  subServices: BackendSubService[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ServiceCardItem {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}

const API_SERVICES_URL =
  "https://jharkhand-it-sol-back1.onrender.com/services/find";
const API_BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";

const transformBackendServicesToCardItems = (
  backendServices: BackendService[]
): ServiceCardItem[] => {
  return backendServices
    .filter((service) => service.isActive)
    .map((service) => ({
      _id: service._id,
      imageUrl: service.mainImage
        ? service.mainImage.startsWith("http")
          ? service.mainImage
          : `${API_BASE_URL}/${service.mainImage.startsWith("/") ? service.mainImage.substring(1) : service.mainImage}`
        : "",
      title: service.name,
      description: service.description,
      link: `/services/${service.slug}`,
    }));
};

const RIGHT_SIDE_IMAGE_URL = { ServiceImg };

const FeaturedServicesGrid = () => {
  const [serviceCards, setServiceCards] = useState<ServiceCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicesForGrid = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(API_SERVICES_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiResponse = await response.json();
        const backendData: BackendService[] = Array.isArray(apiResponse)
          ? apiResponse
          : apiResponse.data && Array.isArray(apiResponse.data)
            ? apiResponse.data
            : [];

        const transformed = transformBackendServicesToCardItems(backendData);
        setServiceCards(transformed);
      } catch (error: any) {
        setFetchError(error.message || "Could not load services.");
        setServiceCards([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicesForGrid();
  }, []);

  return (
    <motion.section
      className="py-10 bg-gradient-to-b from-gray-900 via-slate-900 to-black text-white"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400">
            Our Spectrum of Services
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto text-base">
            Empowering your vision with a comprehensive suite of cutting-edge
            digital solutions, meticulously crafted for impact.
          </p>
        </motion.div>

        {/* Explore Link */}
        <div className="text-center mb-8">
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/40 transition-transform duration-300 hover:scale-105"
          >
            Explore All Services <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Grid + Image */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Grid */}
          <div className="md:w-3/5 lg:w-2/3">
            {isLoading ? (
              <div className="text-center py-12 text-slate-400">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p>Loading Our Services...</p>
              </div>
            ) : fetchError ? (
              <div className="text-center py-12 text-red-400">
                <AlertTriangle className="w-10 h-10 mb-3" />
                <p className="font-semibold">Error loading services</p>
                <p className="text-sm">{fetchError}</p>
              </div>
            ) : serviceCards.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <ImageOff className="w-10 h-10 mb-3" />
                <p>No services available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {serviceCards.slice(0, 4).map((service) => (
                  <motion.div
                    key={service._id}
                    className="bg-slate-800/70 rounded-xl border border-slate-700 shadow-md hover:shadow-cyan-400/20 transition duration-300 overflow-hidden flex flex-col group"
                    whileHover={{ y: -4 }}
                  >
                    <div className="h-36 w-full overflow-hidden">
                      {service.imageUrl ? (
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/300x180?text=Image+Not+Found";
                          }}
                        />
                      ) : (
                        <div className="bg-slate-700 h-full flex justify-center items-center">
                          <ImageOff className="w-8 h-8 text-slate-500" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-2 text-white">
                        {service.title}
                      </h3>
                      <p className="text-slate-300 text-sm line-clamp-3 flex-grow">
                        {service.description}
                      </p>
                      <Link
                        to={service.link}
                        className="mt-3 text-cyan-300 text-sm inline-flex items-center hover:underline"
                      >
                        Discover More <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Image Card */}
          <div className="md:w-2/5 lg:w-1/3">
            {!isLoading && !fetchError && serviceCards.length > 0 ? (
              <motion.div
                className="h-full rounded-xl border border-slate-700 bg-cover bg-center flex flex-col justify-end p-6 relative shadow-xl min-h-[350px]"
                style={{ backgroundImage: `url(${ServiceImg})` }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-black/60 rounded-xl"></div>
                <div className="relative text-white z-10">
                  <h3 className="text-2xl font-bold mb-2">
                    Your Vision, Our Expertise
                  </h3>
                  <p className="text-sm text-slate-300">
                    We partner with you to transform ideas into powerful digital
                    realities. Let’s build the future, together.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full bg-slate-800 border border-slate-700 rounded-xl flex flex-col items-center justify-center text-center p-6 min-h-[350px]">
                <ImageOff className="w-10 h-10 text-slate-500 mb-3" />
                <h3 className="text-lg font-semibold text-slate-300 mb-1">
                  Our Services
                </h3>
                <p className="text-sm text-slate-400">
                  Discover how our solutions can empower your business.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedServicesGrid;
