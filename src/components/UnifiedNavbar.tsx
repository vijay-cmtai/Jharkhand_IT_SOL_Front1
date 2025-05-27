import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  UserCog,
  Settings,
  LogOut,
  FilePlus,
  Plus,
  Mail,
  ArrowRight,
  ChevronRight as SubServiceChevron,
  Layers,
  Palette,
  Cpu,
  TrendingUp,
  Smartphone,
  ShoppingCart,
  SearchCode,
  Settings2,
  ShieldCheck,
  Zap,
  Server,
  Database,
  Users,
  FileText,
  Brain,
  Shuffle,
  Briefcase,
  Cloud,
  BarChart3,
  RefreshCcw,
  Filter as FilterIcon,
  LogIn,
  Loader2,
  Menu,
  X,
  Home as HomeIcon,
  DollarSign,
  HeartPulse,
  GraduationCap,
  Factory,
  Building,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import I1 from "@/assets/I1.avif";
import I4 from "@/assets/I4.jpeg";
import I3 from "@/assets/I3.avif";
import I2 from "@/assets/I2.avif";
import I7 from "@/assets/I7.avif";
import I6 from "@/assets/I6.avif";

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
interface SubServiceItem {
  _id?: string;
  name: string;
  path: string;
  icon?: React.ReactElement;
}
interface ServiceCategoryItem {
  _id: string;
  category: string;
  path: string;
  description: string;
  icon: React.ReactElement;
  imageUrl?: string;
  services: SubServiceItem[];
}

interface LocalIndustryDataItem {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  imageUrl: string;
  keySolutions: string[];
  excerpt: string;
}

interface IndustryDropdownDisplayItem {
  _id: string;
  category: string;
  path: string;
  description: string;
  iconElement: React.ReactElement;
  imageUrl?: string;
  featuredSolutions: { name: string; icon?: React.ReactElement }[];
}

const API_SERVICES_URL =
  "https://jharkhand-it-sol-back1.onrender.com/services/find";
const API_BASE_URL = "https://jharkhand-it-sol-back1.onrender.com";
const MAX_NAVBAR_SERVICES_DISPLAY = 6;
const MAX_NAVBAR_INDUSTRIES_DISPLAY = 6;

const localIndustriesDataArray: LocalIndustryDataItem[] = [
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: HeartPulse,
    description: "Empowering healthcare...",
    imageUrl: I1,
    keySolutions: ["EHR/EMR Integration", "Telemedicine Platforms"],
    excerpt: "Revolutionizing patient care...",
  },
  {
    id: "finance",
    name: "Banking & Finance (FinTech)",
    icon: DollarSign,
    description: "Transforming financial services...",
    imageUrl: I4,
    keySolutions: ["Digital Banking Platforms", "Payment Gateway Integration"],
    excerpt: "Driving innovation...",
  },
  {
    id: "ecommerce",
    name: "E-commerce & Retail",
    icon: ShoppingCart,
    description: "Building immersive online shopping...",
    imageUrl: I3,
    keySolutions: ["Custom E-commerce Platforms", "Mobile Commerce Apps"],
    excerpt: "Crafting seamless online retail...",
  },
  {
    id: "education",
    name: "Education (EdTech)",
    icon: GraduationCap,
    description: "Innovating learning experiences...",
    imageUrl: I2,
    keySolutions: [
      "Learning Management Systems (LMS)",
      "Virtual Reality in Education",
    ],
    excerpt: "Transforming education...",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & IoT",
    icon: Factory,
    description: "Driving efficiency and innovation...",
    imageUrl: I7,
    keySolutions: ["Industrial IoT (IIoT) Platforms", "Predictive Maintenance"],
    excerpt: "Optimizing manufacturing...",
  },
  {
    id: "realestate",
    name: "Real Estate & PropTech",
    icon: Building,
    description: "Modernizing the real estate industry...",
    imageUrl: I6,
    keySolutions: ["Property Listing Platforms", "Virtual Property Tours"],
    excerpt: "Revolutionizing property management...",
  },
];

const getCategoryIcon = (slugOrName: string): React.ReactElement => {
  const lowerSlugOrName = slugOrName.toLowerCase();
  if (lowerSlugOrName.includes("design") || lowerSlugOrName.includes("graphic"))
    return <Palette size={20} className="text-cyan-400" />;
  if (lowerSlugOrName.includes("develop") || lowerSlugOrName.includes("dev"))
    return <Cpu size={20} className="text-cyan-400" />;
  if (lowerSlugOrName.includes("mobile") || lowerSlugOrName.includes("app"))
    return <Smartphone size={20} className="text-cyan-400" />;
  if (lowerSlugOrName.includes("marketing") || lowerSlugOrName.includes("seo"))
    return <TrendingUp size={20} className="text-cyan-400" />;
  return <Layers size={20} className="text-cyan-400" />;
};
const getSubServiceIcon = (slugOrName: string): React.ReactElement => {
  const lowerSlugOrName = slugOrName.toLowerCase();
  if (lowerSlugOrName.includes("ui") || lowerSlugOrName.includes("ux"))
    return <FilterIcon size={16} />;
  if (lowerSlugOrName.includes("responsive")) return <Smartphone size={16} />;
  if (lowerSlugOrName.includes("brand")) return <Users size={16} />;
  if (lowerSlugOrName.includes("frontend")) return <Palette size={16} />;
  if (lowerSlugOrName.includes("backend")) return <Server size={16} />;
  if (lowerSlugOrName.includes("ecom") || lowerSlugOrName.includes("shop"))
    return <ShoppingCart size={16} />;
  if (lowerSlugOrName.includes("cms") || lowerSlugOrName.includes("wordpress"))
    return <FileText size={16} />;
  if (lowerSlugOrName.includes("domain")) return <Cloud size={16} />;
  return <SubServiceChevron size={16} />;
};
const transformBackendServicesToFrontend = (
  backendServices: BackendService[]
): ServiceCategoryItem[] => {
  return backendServices
    .filter((service) => service.isActive)
    .map((service) => {
      const frontendSubServices: SubServiceItem[] = service.subServices.map(
        (sub) => ({
          _id: sub._id,
          name: sub.name,
          path: `/services/${service.slug}/${sub.slug}`,
          icon: getSubServiceIcon(sub.slug || sub.name),
        })
      );
      return {
        _id: service._id,
        category: service.name,
        path: `/services/${service.slug}`,
        description: service.description,
        icon: getCategoryIcon(service.slug || service.name),
        imageUrl: service.mainImage
          ? service.mainImage.startsWith("http")
            ? service.mainImage
            : `${API_BASE_URL}/${service.mainImage.startsWith("/") ? service.mainImage.substring(1) : service.mainImage}`
          : undefined,
        services: frontendSubServices,
      };
    });
};

const getIndustrySolutionIcon = (solutionText: string): React.ReactElement => {
  const lowerText = solutionText.toLowerCase();
  if (lowerText.includes("ehr") || lowerText.includes("emr"))
    return <FileText size={10} className="text-emerald-600" />;
  if (lowerText.includes("telemedicine"))
    return <Smartphone size={10} className="text-emerald-600" />;
  if (lowerText.includes("ai"))
    return <Brain size={10} className="text-emerald-600" />;
  if (lowerText.includes("iot"))
    return <Cpu size={10} className="text-emerald-600" />;
  if (lowerText.includes("digital banking"))
    return <DollarSign size={10} className="text-emerald-600" />;
  return <CheckCircle size={10} className="text-emerald-600" />;
};

// --- UPDATED transformLocalIndustriesToFrontend ---
const transformLocalIndustriesToFrontend = (
  industries: LocalIndustryDataItem[]
): IndustryDropdownDisplayItem[] => {
  return industries.map((industry) => {
    const IconComp = industry.icon;
    let detailPath: string;

    if (industry.id === "healthcare") {
      detailPath = "/industriesDetails"; // Specific path for Healthcare
    } else {
      detailPath = `/${industry.id}`; // General path for other industries
    }

    return {
      _id: industry.id,
      category: industry.name,
      path: detailPath, // Use the determined path
      description:
        industry.excerpt || industry.description.substring(0, 120) + "...",
      iconElement: (
        <IconComp size={16} strokeWidth={1.5} className="text-emerald-400" />
      ),
      imageUrl: industry.imageUrl,
      featuredSolutions: industry.keySolutions
        .slice(0, 4)
        .map((solution) => ({
          name: solution,
          icon: getIndustrySolutionIcon(solution),
        })),
    };
  });
};
// --- END OF UPDATE ---

const UnifiedNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const { isAuthenticated, isAdmin, user, clearAuthState } = useAuth();
  const navigate = useNavigate();

  const [servicesForDropdown, setServicesForDropdown] = useState<
    ServiceCategoryItem[]
  >([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [hoveredService, setHoveredService] =
    useState<ServiceCategoryItem | null>(null);
  const [isServicesDropdownVisible, setIsServicesDropdownVisible] =
    useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [industriesForDropdown, setIndustriesForDropdown] = useState<
    IndustryDropdownDisplayItem[]
  >([]);
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(true);
  const [hoveredIndustry, setHoveredIndustry] =
    useState<IndustryDropdownDisplayItem | null>(null);
  const [isIndustriesDropdownVisible, setIsIndustriesDropdownVisible] =
    useState(false);
  const [fetchIndustriesError, setFetchIndustriesError] = useState<
    string | null
  >(null);

  const NAVBAR_HEIGHT = "68px";

  useEffect(() => {
    let isMounted = true;
    const fetchNavServices = async () => {
      if (!isMounted) return;
      const shouldFetch =
        (isServicesDropdownVisible || activeMobileDropdown === "services") &&
        (servicesForDropdown.length === 0 || fetchError);
      if (!shouldFetch) {
        if (
          isServicesDropdownVisible &&
          servicesForDropdown.length > 0 &&
          !hoveredService &&
          !isLoadingServices &&
          !fetchError
        ) {
          if (isMounted) setHoveredService(servicesForDropdown[0]);
        }
        return;
      }
      if (isMounted) {
        setIsLoadingServices(true);
        setFetchError(null);
      }
      try {
        const response = await fetch(API_SERVICES_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const apiResponse = await response.json();
        if (!isMounted) return;
        const backendData: BackendService[] = Array.isArray(apiResponse)
          ? apiResponse
          : apiResponse.data && Array.isArray(apiResponse.data)
            ? apiResponse.data
            : [];
        const transformedServices =
          transformBackendServicesToFrontend(backendData);
        setServicesForDropdown(transformedServices);
        if (transformedServices.length > 0) {
          if (
            isServicesDropdownVisible &&
            (!hoveredService ||
              !transformedServices.find((s) => s._id === hoveredService?._id))
          ) {
            setHoveredService(transformedServices[0]);
          }
        } else {
          if (isServicesDropdownVisible) setHoveredService(null);
        }
      } catch (error: any) {
        if (!isMounted) return;
        console.error("Failed to fetch services for navbar:", error);
        setFetchError(error.message || "Failed to load services.");
        setServicesForDropdown([]);
        if (isServicesDropdownVisible) setHoveredService(null);
      } finally {
        if (isMounted) setIsLoadingServices(false);
      }
    };
    if (isServicesDropdownVisible || activeMobileDropdown === "services") {
      fetchNavServices();
    }
    return () => {
      isMounted = false;
    };
  }, [
    isServicesDropdownVisible,
    activeMobileDropdown,
    servicesForDropdown.length,
    fetchError,
  ]);

  useEffect(() => {
    if (
      isServicesDropdownVisible &&
      servicesForDropdown.length > 0 &&
      !isLoadingServices &&
      !fetchError
    ) {
      if (
        !hoveredService ||
        !servicesForDropdown.find((s) => s._id === hoveredService?._id)
      ) {
        setHoveredService(servicesForDropdown[0]);
      }
    }
  }, [
    isServicesDropdownVisible,
    servicesForDropdown,
    isLoadingServices,
    fetchError,
    hoveredService,
  ]);

  useEffect(() => {
    let isMounted = true;
    const loadLocalIndustries = () => {
      if (!isMounted) return;
      const shouldLoad =
        (isIndustriesDropdownVisible ||
          activeMobileDropdown === "industries") &&
        (industriesForDropdown.length === 0 || fetchIndustriesError);
      if (!shouldLoad) {
        if (
          isIndustriesDropdownVisible &&
          industriesForDropdown.length > 0 &&
          !hoveredIndustry &&
          !isLoadingIndustries &&
          !fetchIndustriesError
        ) {
          if (isMounted) setHoveredIndustry(industriesForDropdown[0]);
        }
        return;
      }
      if (isMounted) {
        setIsLoadingIndustries(true);
        setFetchIndustriesError(null);
      }
      setTimeout(() => {
        if (!isMounted) return;
        try {
          const transformed = transformLocalIndustriesToFrontend(
            localIndustriesDataArray
          );
          setIndustriesForDropdown(transformed);
          if (transformed.length > 0) {
            if (
              isIndustriesDropdownVisible &&
              (!hoveredIndustry ||
                !transformed.find((ind) => ind._id === hoveredIndustry?._id))
            ) {
              setHoveredIndustry(transformed[0]);
            }
          } else {
            if (isIndustriesDropdownVisible) setHoveredIndustry(null);
          }
        } catch (error: any) {
          console.error("Failed to load local industries for navbar:", error);
          setFetchIndustriesError(
            error.message || "Failed to load industries."
          );
          setIndustriesForDropdown([]);
          if (isIndustriesDropdownVisible) setHoveredIndustry(null);
        } finally {
          if (isMounted) setIsLoadingIndustries(false);
        }
      }, 50);
    };
    if (isIndustriesDropdownVisible || activeMobileDropdown === "industries") {
      loadLocalIndustries();
    }
    return () => {
      isMounted = false;
    };
  }, [
    isIndustriesDropdownVisible,
    activeMobileDropdown,
    industriesForDropdown.length,
    fetchIndustriesError,
  ]);

  useEffect(() => {
    if (
      isIndustriesDropdownVisible &&
      industriesForDropdown.length > 0 &&
      !isLoadingIndustries &&
      !fetchIndustriesError
    ) {
      if (
        !hoveredIndustry ||
        !industriesForDropdown.find((ind) => ind._id === hoveredIndustry?._id)
      ) {
        setHoveredIndustry(industriesForDropdown[0]);
      }
    }
  }, [
    isIndustriesDropdownVisible,
    industriesForDropdown,
    isLoadingIndustries,
    fetchIndustriesError,
    hoveredIndustry,
  ]);

  const toggleMobileDropdown = (dropdown: string) =>
    setActiveMobileDropdown((prev) => (prev === dropdown ? null : dropdown));

  const handleLogout = () => {
    clearAuthState();
    setMobileMenuOpen(false);
    setActiveMobileDropdown(null);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  };

  const megaMenuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.98,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  const detailPanelVariants = {
    hidden: { opacity: 0, x: 15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: "easeOut", delay: 0.05 },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md py-3.5 fixed top-0 left-0 right-0 z-50 border-b border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <img
              src="https://www.jharkhanditsolutions.com/wp-content/uploads/2016/10/logo-1.png"
              alt="JIS Logo"
              className="h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-[#ff9900] text-xl font-bold leading-tight">
                JIS
              </h1>
              <p className="text-[#00bfff] text-[9px] tracking-wider uppercase">
                Jharkhand IT Solutions
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            <Link
              to="/"
              className="text-white hover:text-cyan-400 transition-colors text-sm font-medium flex items-center"
            >
              <HomeIcon size={20} className="mr-1" />
            </Link>
            <Link
              to="/company"
              className="text-white hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              About JIS
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsServicesDropdownVisible(true)}
              onMouseLeave={() => setIsServicesDropdownVisible(false)}
            >
              <span className="text-white hover:text-cyan-400 transition-colors text-sm font-medium flex items-center cursor-default py-2">
                Services{" "}
                <ChevronDown
                  size={15}
                  className={`ml-1 transition-transform duration-200 ${isServicesDropdownVisible ? "rotate-180" : ""}`}
                />
              </span>
              <AnimatePresence>
                {isServicesDropdownVisible && (
                  <motion.div
                    variants={megaMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-x-0 flex justify-center z-[60] pointer-events-none"
                    style={{ top: NAVBAR_HEIGHT }}
                  >
                    <div className="bg-slate-950 shadow-2xl rounded-lg overflow-hidden border border-slate-700/50 w-full max-w-4xl xl:max-w-5xl pointer-events-auto">
                      <div className="flex flex-col lg:flex-row min-h-[420px] max-h-[calc(100vh-120px)]">
                        <div className="lg:w-[300px] xl:w-[340px] p-4 space-y-1.5 overflow-y-auto custom-scrollbar-nav bg-slate-900 border-r border-slate-800">
                          {isLoadingServices ? (
                            <div className="flex items-center justify-center h-full p-4">
                              <Loader2
                                className="animate-spin text-cyan-400"
                                size={22}
                              />
                              <span className="ml-2 text-slate-400 text-xs">
                                Loading...
                              </span>
                            </div>
                          ) : fetchError ? (
                            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                              <ShieldCheck
                                size={30}
                                className="text-red-500 mb-1.5"
                              />
                              <p className="text-red-400 text-xs">
                                {fetchError}
                              </p>
                            </div>
                          ) : servicesForDropdown.length === 0 ? (
                            <div className="flex items-center justify-center h-full p-4">
                              <p className="text-slate-400 text-xs">
                                No services available.
                              </p>
                            </div>
                          ) : (
                            servicesForDropdown
                              .slice(0, MAX_NAVBAR_SERVICES_DISPLAY)
                              .map((service) => (
                                <div
                                  key={service._id}
                                  className={cn(
                                    "block p-2.5 rounded-md hover:bg-cyan-600/20 transition-colors group/serviceitem cursor-pointer flex items-center space-x-2.5",
                                    hoveredService?._id === service._id
                                      ? "bg-cyan-600/30 text-cyan-300 shadow-sm"
                                      : "text-slate-300 hover:text-white"
                                  )}
                                  onMouseEnter={() =>
                                    setHoveredService(service)
                                  }
                                >
                                  <span
                                    className={cn(
                                      "flex-shrink-0 w-7 h-7 p-1 rounded-md flex items-center justify-center transition-all duration-200",
                                      hoveredService?._id === service._id
                                        ? "bg-cyan-500 text-white scale-105"
                                        : "bg-slate-700 group-hover/serviceitem:bg-slate-600 text-cyan-400"
                                    )}
                                  >
                                    {React.cloneElement(service.icon, {
                                      size: 16,
                                      strokeWidth: 1.5,
                                    })}
                                  </span>
                                  <div>
                                    <p
                                      className={cn(
                                        "font-medium text-xs leading-tight",
                                        hoveredService?._id === service._id
                                          ? "text-cyan-200"
                                          : "text-white group-hover/serviceitem:text-cyan-300"
                                      )}
                                    >
                                      {service.category}
                                    </p>
                                  </div>
                                </div>
                              ))
                          )}
                          {!isLoadingServices &&
                            !fetchError &&
                            servicesForDropdown.length > 0 && (
                              <Link
                                to="/services"
                                className="block p-3 mt-2.5 text-center rounded-md bg-emerald-600/30 hover:bg-emerald-600/40 transition-colors"
                                onClick={() =>
                                  setIsServicesDropdownVisible(false)
                                }
                              >
                                <span className="font-semibold text-emerald-300 text-[11px] uppercase tracking-wider flex items-center justify-center">
                                  All Services{" "}
                                  <ArrowRight size={12} className="ml-1.5" />
                                </span>
                              </Link>
                            )}
                        </div>
                        <div className="flex-1 bg-slate-800/50 p-5 md:p-6 py-6 flex flex-col relative overflow-hidden">
                          <AnimatePresence mode="wait">
                            {isLoadingServices &&
                            !hoveredService &&
                            (servicesForDropdown.length === 0 || fetchError) ? (
                              <div className="flex items-center justify-center h-full">
                                <Loader2
                                  className="animate-spin text-cyan-400"
                                  size={28}
                                />
                              </div>
                            ) : hoveredService ? (
                              <motion.div
                                key={hoveredService._id}
                                variants={detailPanelVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full h-full flex flex-col items-start justify-start text-left"
                              >
                                <div className="flex flex-col xl:flex-row items-start xl:items-start gap-5 xl:gap-6 w-full">
                                  {hoveredService.imageUrl && (
                                    <motion.div
                                      className="w-full xl:w-[55%] flex-shrink-0 order-1 xl:order-2 rounded-md overflow-hidden shadow-xl border-2 border-slate-700/70 pointer-events-none"
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: 0.05,
                                        duration: 0.3,
                                      }}
                                    >
                                      {" "}
                                      <img
                                        src={hoveredService.imageUrl}
                                        alt={hoveredService.category}
                                        className="max-h-[220px] md:max-h-[250px] w-full object-cover"
                                        onError={(e) => {
                                          (
                                            e.target as HTMLImageElement
                                          ).style.display = "none";
                                        }}
                                      />{" "}
                                    </motion.div>
                                  )}
                                  <div
                                    className={cn(
                                      "flex-1 order-2 xl:order-1 flex flex-col",
                                      !hoveredService.imageUrl && "w-full"
                                    )}
                                  >
                                    <div className="pointer-events-none">
                                      <motion.h3
                                        className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                      >
                                        {" "}
                                        {hoveredService.category}{" "}
                                      </motion.h3>
                                      <motion.p
                                        className="text-xs text-gray-300/90 mb-3 leading-relaxed line-clamp-3 md:line-clamp-3"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                      >
                                        {" "}
                                        {hoveredService.description}{" "}
                                      </motion.p>
                                      {hoveredService.services &&
                                        hoveredService.services.length > 0 && (
                                          <motion.div
                                            className="mb-4 w-full"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                          >
                                            {" "}
                                            <p className="text-[10px] font-semibold text-cyan-400 mb-1.5 uppercase tracking-wider">
                                              {" "}
                                              Key Offerings:{" "}
                                            </p>{" "}
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                              {" "}
                                              {hoveredService.services
                                                .slice(0, 4)
                                                .map((sub) => (
                                                  <li key={sub._id || sub.name}>
                                                    {" "}
                                                    <Link
                                                      to={sub.path}
                                                      className="text-[11px] text-gray-400 hover:text-cyan-300 flex items-center py-0.5 group/sublink"
                                                      onClick={() =>
                                                        setIsServicesDropdownVisible(
                                                          false
                                                        )
                                                      }
                                                    >
                                                      {" "}
                                                      {sub.icon ? (
                                                        React.cloneElement(
                                                          sub.icon,
                                                          {
                                                            size: 10,
                                                            className:
                                                              "mr-1.5 flex-shrink-0 text-cyan-600 group-hover/sublink:text-cyan-500 transition-colors",
                                                          }
                                                        )
                                                      ) : (
                                                        <SubServiceChevron
                                                          size={10}
                                                          className="mr-1.5 flex-shrink-0 text-cyan-600 group-hover/sublink:text-cyan-500"
                                                        />
                                                      )}{" "}
                                                      {sub.name}{" "}
                                                    </Link>{" "}
                                                  </li>
                                                ))}{" "}
                                            </ul>{" "}
                                          </motion.div>
                                        )}
                                    </div>
                                    <motion.div
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.25 }}
                                      className="mt-auto self-start pointer-events-auto"
                                    >
                                      {" "}
                                      <Link
                                        to={hoveredService.path}
                                        className="mt-1.5 inline-flex items-center text-[11px] px-4 py-2 bg-emerald-500/90 hover:bg-emerald-500 text-white font-semibold rounded-md shadow-sm hover:shadow-md transition-all group/seemore"
                                        onClick={() =>
                                          setIsServicesDropdownVisible(false)
                                        }
                                      >
                                        {" "}
                                        Learn More{" "}
                                        <ArrowRight
                                          size={12}
                                          className="ml-1.5 group-hover/seemore:translate-x-0.5 transition-transform"
                                        />{" "}
                                      </Link>{" "}
                                    </motion.div>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <div className="text-center text-slate-500 p-8 flex flex-col items-center justify-center h-full">
                                {" "}
                                {fetchError ? (
                                  <ShieldCheck
                                    size={40}
                                    className="mx-auto mb-2 opacity-40 text-red-500"
                                  />
                                ) : (
                                  <Layers
                                    size={40}
                                    className="mx-auto mb-2 opacity-40"
                                  />
                                )}{" "}
                                <p className="text-xs">
                                  {" "}
                                  {fetchError
                                    ? "Error loading details."
                                    : servicesForDropdown.length === 0 &&
                                        !isLoadingServices
                                      ? "No service details available."
                                      : "Select a service to see details."}{" "}
                                </p>{" "}
                              </div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsIndustriesDropdownVisible(true)}
              onMouseLeave={() => setIsIndustriesDropdownVisible(false)}
            >
              <span className="text-white hover:text-emerald-400 transition-colors text-sm font-medium flex items-center cursor-default py-2">
                Industries{" "}
                <ChevronDown
                  size={15}
                  className={`ml-1 transition-transform duration-200 ${isIndustriesDropdownVisible ? "rotate-180" : ""}`}
                />
              </span>
              <AnimatePresence>
                {isIndustriesDropdownVisible && (
                  <motion.div
                    variants={megaMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-x-0 flex justify-center z-[60] pointer-events-none"
                    style={{ top: NAVBAR_HEIGHT }}
                  >
                    <div className="bg-slate-950 shadow-2xl rounded-lg overflow-hidden border border-slate-700/50 w-full max-w-4xl xl:max-w-5xl pointer-events-auto">
                      <div className="flex flex-col lg:flex-row min-h-[420px] max-h-[calc(100vh-120px)]">
                        <div className="lg:w-[300px] xl:w-[340px] p-4 space-y-1.5 overflow-y-auto custom-scrollbar-nav bg-slate-900 border-r border-slate-800">
                          {isLoadingIndustries ? (
                            <div className="flex items-center justify-center h-full p-4">
                              <Loader2
                                className="animate-spin text-emerald-400"
                                size={22}
                              />
                              <span className="ml-2 text-slate-400 text-xs">
                                Loading...
                              </span>
                            </div>
                          ) : fetchIndustriesError ? (
                            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                              <ShieldCheck
                                size={30}
                                className="text-red-500 mb-1.5"
                              />
                              <p className="text-red-400 text-xs">
                                {fetchIndustriesError}
                              </p>
                            </div>
                          ) : industriesForDropdown.length === 0 ? (
                            <div className="flex items-center justify-center h-full p-4">
                              <p className="text-slate-400 text-xs">
                                No industries available.
                              </p>
                            </div>
                          ) : (
                            industriesForDropdown
                              .slice(0, MAX_NAVBAR_INDUSTRIES_DISPLAY)
                              .map((industry) => (
                                <div
                                  key={industry._id}
                                  className={cn(
                                    "block p-2.5 rounded-md hover:bg-emerald-600/20 transition-colors group/industryitem cursor-pointer flex items-center space-x-2.5",
                                    hoveredIndustry?._id === industry._id
                                      ? "bg-emerald-600/30 text-emerald-300 shadow-sm"
                                      : "text-slate-300 hover:text-white"
                                  )}
                                  onMouseEnter={() =>
                                    setHoveredIndustry(industry)
                                  }
                                >
                                  <span
                                    className={cn(
                                      "flex-shrink-0 w-7 h-7 p-1 rounded-md flex items-center justify-center transition-all duration-200",
                                      hoveredIndustry?._id === industry._id
                                        ? "bg-emerald-500 text-white scale-105"
                                        : "bg-slate-700 group-hover/industryitem:bg-slate-600"
                                    )}
                                  >
                                    {React.cloneElement(industry.iconElement, {
                                      className:
                                        hoveredIndustry?._id === industry._id
                                          ? "text-white"
                                          : "text-emerald-400",
                                    })}
                                  </span>
                                  <div>
                                    <p
                                      className={cn(
                                        "font-medium text-xs leading-tight",
                                        hoveredIndustry?._id === industry._id
                                          ? "text-emerald-200"
                                          : "text-white group-hover/industryitem:text-emerald-300"
                                      )}
                                    >
                                      {industry.category}
                                    </p>
                                  </div>
                                </div>
                              ))
                          )}
                          {!isLoadingIndustries &&
                            !fetchIndustriesError &&
                            industriesForDropdown.length > 0 && (
                              <Link
                                to="/industries"
                                className="block p-3 mt-2.5 text-center rounded-md bg-sky-600/30 hover:bg-sky-600/40 transition-colors"
                                onClick={() =>
                                  setIsIndustriesDropdownVisible(false)
                                }
                              >
                                <span className="font-semibold text-sky-300 text-[11px] uppercase tracking-wider flex items-center justify-center">
                                  All Industries{" "}
                                  <ArrowRight size={12} className="ml-1.5" />
                                </span>
                              </Link>
                            )}
                        </div>

                        <div className="flex-1 bg-slate-800/50 p-5 md:p-6 py-6 flex flex-col relative overflow-hidden">
                          <AnimatePresence mode="wait">
                            {isLoadingIndustries &&
                            !hoveredIndustry &&
                            (industriesForDropdown.length === 0 ||
                              fetchIndustriesError) ? (
                              <div className="flex items-center justify-center h-full">
                                <Loader2
                                  className="animate-spin text-emerald-400"
                                  size={28}
                                />
                              </div>
                            ) : hoveredIndustry ? (
                              <motion.div
                                key={hoveredIndustry._id}
                                variants={detailPanelVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full h-full flex flex-col items-start justify-start text-left"
                              >
                                <div className="flex flex-col xl:flex-row items-start xl:items-start gap-5 xl:gap-6 w-full">
                                  {hoveredIndustry.imageUrl && (
                                    <motion.div
                                      className="w-full xl:w-[55%] flex-shrink-0 order-1 xl:order-2 rounded-md overflow-hidden shadow-xl border-2 border-slate-700/70 pointer-events-none"
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: 0.05,
                                        duration: 0.3,
                                      }}
                                    >
                                      <img
                                        src={hoveredIndustry.imageUrl}
                                        alt={hoveredIndustry.category}
                                        className="max-h-[220px] md:max-h-[250px] w-full object-cover"
                                        onError={(e) => {
                                          (
                                            e.target as HTMLImageElement
                                          ).style.display = "none";
                                        }}
                                      />
                                    </motion.div>
                                  )}
                                  <div
                                    className={cn(
                                      "flex-1 order-2 xl:order-1 flex flex-col",
                                      !hoveredIndustry.imageUrl && "w-full"
                                    )}
                                  >
                                    <div className="pointer-events-none">
                                      <motion.h3
                                        className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                      >
                                        {hoveredIndustry.category}
                                      </motion.h3>
                                      <motion.p
                                        className="text-xs text-gray-300/90 mb-3 leading-relaxed line-clamp-3 md:line-clamp-3"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                      >
                                        {hoveredIndustry.description}
                                      </motion.p>
                                      {hoveredIndustry.featuredSolutions &&
                                        hoveredIndustry.featuredSolutions
                                          .length > 0 && (
                                          <motion.div
                                            className="mb-4 w-full"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                          >
                                            <p className="text-[10px] font-semibold text-emerald-400 mb-1.5 uppercase tracking-wider">
                                              Key Solutions:
                                            </p>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                              {hoveredIndustry.featuredSolutions.map(
                                                (solution) => (
                                                  <li
                                                    key={solution.name}
                                                    className="text-[11px] text-gray-400 flex items-center py-0.5"
                                                  >
                                                    {solution.icon ? (
                                                      React.cloneElement(
                                                        solution.icon,
                                                        {
                                                          size: 10,
                                                          className:
                                                            "mr-1.5 flex-shrink-0",
                                                        }
                                                      )
                                                    ) : (
                                                      <CheckCircle
                                                        size={10}
                                                        className="mr-1.5 flex-shrink-0 text-emerald-600"
                                                      />
                                                    )}
                                                    {solution.name}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </motion.div>
                                        )}
                                    </div>
                                    <motion.div
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.25 }}
                                      className="mt-auto self-start pointer-events-auto"
                                    >
                                      <Link
                                        to={hoveredIndustry.path}
                                        className="mt-1.5 inline-flex items-center text-[11px] px-4 py-2 bg-emerald-500/90 hover:bg-emerald-500 text-white font-semibold rounded-md shadow-sm hover:shadow-md transition-all group/seemore"
                                        onClick={() =>
                                          setIsIndustriesDropdownVisible(false)
                                        }
                                      >
                                        Explore Solutions{" "}
                                        <ArrowRight
                                          size={12}
                                          className="ml-1.5 group-hover/seemore:translate-x-0.5 transition-transform"
                                        />
                                      </Link>
                                    </motion.div>
                                  </div>
                                </div>
                              </motion.div>
                            ) : !isLoadingIndustries &&
                              (fetchIndustriesError ||
                                industriesForDropdown.length === 0) ? (
                              <div className="text-center text-slate-500 p-8 flex flex-col items-center justify-center h-full">
                                {fetchIndustriesError ? (
                                  <ShieldCheck
                                    size={40}
                                    className="mx-auto mb-2 opacity-40 text-red-500"
                                  />
                                ) : (
                                  <Briefcase
                                    size={40}
                                    className="mx-auto mb-2 opacity-40"
                                  />
                                )}
                                <p className="text-xs">
                                  {fetchIndustriesError
                                    ? fetchIndustriesError
                                    : industriesForDropdown.length === 0 &&
                                        !isLoadingIndustries
                                      ? "No industry details available."
                                      : "Select an industry."}
                                </p>
                              </div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/hire-us"
              className="text-white hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              Hire Us
            </Link>
            <Link
              to="/portfolio"
              className="text-white hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              Portfolio
            </Link>
            <Link
              to="/blog"
              className="text-white hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              to="/career"
              className="text-white hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              Career
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2.5">
                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-md hover:shadow-blue-500/30 transition-all"
                        aria-label="Admin Menu"
                      >
                        <UserCog size={18} />
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-52 bg-gray-800 text-white border-gray-700 shadow-lg text-xs"
                    >
                      <DropdownMenuItem
                        className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700 py-1.5 px-2.5"
                        onClick={() => navigate("/admin")}
                      >
                        {" "}
                        <Settings className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                        <span>Dashboard</span>{" "}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700 py-1.5 px-2.5"
                        onClick={() => navigate("/admin/create-service")}
                      >
                        {" "}
                        <FilePlus className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                        <span>Create Service</span>{" "}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700 py-1.5 px-2.5"
                        onClick={() => navigate("/admin/create-portfolio")}
                      >
                        {" "}
                        <Plus className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                        <span>Create Portfolio</span>{" "}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700 py-1.5 px-2.5"
                        onClick={() => navigate("/admin/createBlogs")}
                      >
                        {" "}
                        <Plus className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                        <span>Create Blog</span>{" "}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700 py-1.5 px-2.5"
                        onClick={() => navigate("/admin/showContacts")}
                      >
                        {" "}
                        <Mail className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                        <span>Messages</span>{" "}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-gray-700 cursor-pointer focus:bg-gray-700 py-1.5 px-2.5 text-red-400 hover:text-red-300 focus:text-red-300"
                        onClick={handleLogout}
                      >
                        {" "}
                        <LogOut className="mr-1.5 h-3.5 w-3.5" />{" "}
                        <span>Logout</span>{" "}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/20 hover:text-cyan-300 group"
                >
                  <LogIn
                    size={14}
                    className="mr-1.5 transition-transform group-hover:translate-x-0.5"
                  />
                  Admin Login
                </Button>
              </Link>
            )}
          </div>

          <button
            className="lg:hidden text-white p-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "100vh" }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-gray-900 shadow-lg absolute top-full left-0 right-0 overflow-y-auto"
            style={{ paddingTop: "1px", paddingBottom: "1rem" }}
          >
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-white hover:text-cyan-400 py-2 flex items-center text-sm"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  <HomeIcon size={16} className="mr-2 text-cyan-500" />{" "}
                  Home{" "}
                </Link>
                <Link
                  to="/company"
                  className="text-white hover:text-cyan-400 py-2 text-sm"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  About{" "}
                </Link>

                <div className="py-1.5">
                  <button
                    className="flex items-center justify-between w-full text-white hover:text-cyan-400 py-1 text-sm"
                    onClick={() => toggleMobileDropdown("services")}
                    aria-expanded={activeMobileDropdown === "services"}
                  >
                    {" "}
                    Services{" "}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${activeMobileDropdown === "services" ? "rotate-180" : ""}`}
                    />{" "}
                  </button>
                  <AnimatePresence>
                    {activeMobileDropdown === "services" && (
                      <motion.div
                        initial={{ opacity: 0, maxHeight: 0 }}
                        animate={{ opacity: 1, maxHeight: "500px" }}
                        exit={{ opacity: 0, maxHeight: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 flex flex-col space-y-0.5 pt-1.5">
                          {isLoadingServices &&
                          servicesForDropdown.length === 0 ? (
                            <p className="text-gray-400 text-xs py-1">
                              {" "}
                              Loading services...{" "}
                            </p>
                          ) : fetchError ? (
                            <p className="text-red-400 text-xs py-1">
                              {" "}
                              {fetchError}{" "}
                            </p>
                          ) : servicesForDropdown.length > 0 ? (
                            servicesForDropdown.map((service) => (
                              <Link
                                key={service._id}
                                to={service.path}
                                className="text-gray-300 hover:text-cyan-400 text-xs py-1 flex items-center"
                                onClick={closeMobileMenu}
                              >
                                {" "}
                                {React.cloneElement(service.icon, {
                                  size: 14,
                                  className: "mr-2 text-cyan-500",
                                })}{" "}
                                {service.category}{" "}
                              </Link>
                            ))
                          ) : (
                            <p className="text-gray-400 text-xs py-1">
                              {" "}
                              No services available.{" "}
                            </p>
                          )}
                          {!isLoadingServices &&
                            !fetchError &&
                            servicesForDropdown.length > 0 && (
                              <Link
                                to="/services"
                                className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs py-1.5 mt-1 border-t border-gray-700/50"
                                onClick={closeMobileMenu}
                              >
                                {" "}
                                View All Services{" "}
                                <ArrowRight
                                  size={12}
                                  className="inline ml-1"
                                />{" "}
                              </Link>
                            )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="py-1.5">
                  <button
                    className="flex items-center justify-between w-full text-white hover:text-emerald-400 py-1 text-sm"
                    onClick={() => toggleMobileDropdown("industries")}
                    aria-expanded={activeMobileDropdown === "industries"}
                  >
                    Industries{" "}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${activeMobileDropdown === "industries" ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeMobileDropdown === "industries" && (
                      <motion.div
                        initial={{ opacity: 0, maxHeight: 0 }}
                        animate={{ opacity: 1, maxHeight: "500px" }}
                        exit={{ opacity: 0, maxHeight: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 flex flex-col space-y-0.5 pt-1.5">
                          {isLoadingIndustries &&
                          industriesForDropdown.length === 0 ? (
                            <p className="text-gray-400 text-xs py-1">
                              Loading industries...
                            </p>
                          ) : fetchIndustriesError ? (
                            <p className="text-red-400 text-xs py-1">
                              {fetchIndustriesError}
                            </p>
                          ) : industriesForDropdown.length > 0 ? (
                            industriesForDropdown.map((industry) => (
                              <Link
                                key={industry._id}
                                to={industry.path}
                                className="text-gray-300 hover:text-emerald-400 text-xs py-1 flex items-center"
                                onClick={closeMobileMenu}
                              >
                                {React.cloneElement(industry.iconElement, {
                                  size: 14,
                                  className: "mr-2 text-emerald-500",
                                })}
                                {industry.category}
                              </Link>
                            ))
                          ) : (
                            <p className="text-gray-400 text-xs py-1">
                              No industries available.
                            </p>
                          )}
                          {!isLoadingIndustries &&
                            !fetchIndustriesError &&
                            industriesForDropdown.length > 0 && (
                              <Link
                                to="/industries"
                                className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs py-1.5 mt-1 border-t border-gray-700/50"
                                onClick={closeMobileMenu}
                              >
                                View All Industries{" "}
                                <ArrowRight size={12} className="inline ml-1" />
                              </Link>
                            )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/hire-us"
                  className="text-white hover:text-cyan-400 py-2 text-sm"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  Hire Us{" "}
                </Link>
                <Link
                  to="/portfolio"
                  className="text-white hover:text-cyan-400 py-2 text-sm"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  Portfolio{" "}
                </Link>
                <Link
                  to="/blog"
                  className="text-white hover:text-cyan-400 py-2 text-sm"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  Blog{" "}
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:text-cyan-400 py-2 text-sm"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  Contact{" "}
                </Link>
                <Link
                  to="/career"
                  className="text-white hover:text-cyan-400 py-2 text-sm"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  Career{" "}
                </Link>

                <hr className="border-gray-700/50 my-2.5" />

                {isAuthenticated && isAdmin && (
                  <div className="py-1.5">
                    <button
                      className="flex items-center justify-between w-full text-purple-400 hover:text-purple-300 py-1 text-sm"
                      onClick={() => toggleMobileDropdown("admin")}
                      aria-expanded={activeMobileDropdown === "admin"}
                    >
                      {" "}
                      Admin Panel{" "}
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 ${activeMobileDropdown === "admin" ? "rotate-180" : ""}`}
                      />{" "}
                    </button>
                    <AnimatePresence>
                      {activeMobileDropdown === "admin" && (
                        <motion.div
                          initial={{ opacity: 0, maxHeight: 0 }}
                          animate={{ opacity: 1, maxHeight: "500px" }}
                          exit={{ opacity: 0, maxHeight: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 flex flex-col space-y-1 pt-1.5">
                            <Link
                              to="/admin"
                              className="text-gray-300 hover:text-cyan-400 text-xs py-1"
                              onClick={closeMobileMenu}
                            >
                              {" "}
                              <Settings className="inline-block mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                              Dashboard{" "}
                            </Link>
                            <Link
                              to="/admin/create-service"
                              className="text-gray-300 hover:text-cyan-400 text-xs py-1"
                              onClick={closeMobileMenu}
                            >
                              {" "}
                              <FilePlus className="inline-block mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                              Create Service{" "}
                            </Link>
                            <Link
                              to="/admin/create-portfolio"
                              className="text-gray-300 hover:text-cyan-400 text-xs py-1"
                              onClick={closeMobileMenu}
                            >
                              {" "}
                              <Plus className="inline-block mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                              Create Portfolio{" "}
                            </Link>
                            <Link
                              to="/admin/createBlogs"
                              className="text-gray-300 hover:text-cyan-400 text-xs py-1"
                              onClick={closeMobileMenu}
                            >
                              {" "}
                              <Plus className="inline-block mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                              Create Blog{" "}
                            </Link>
                            <Link
                              to="/admin/showContacts"
                              className="text-gray-300 hover:text-cyan-400 text-xs py-1"
                              onClick={closeMobileMenu}
                            >
                              {" "}
                              <Mail className="inline-block mr-1.5 h-3.5 w-3.5 text-cyan-400" />{" "}
                              Messages{" "}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {isAuthenticated ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full text-red-400 hover:text-red-300 bg-red-600/20 hover:bg-red-600/30 border-red-500/50 text-xs"
                    onClick={handleLogout}
                  >
                    {" "}
                    <LogOut className="inline-block mr-1.5 h-3.5 w-3.5" />{" "}
                    Logout{" "}
                  </Button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center text-center text-cyan-400 hover:text-cyan-300 hover:bg-cyan-600/20 py-2 px-3 text-xs border border-cyan-600 rounded-md transition-colors group"
                    onClick={closeMobileMenu}
                  >
                    {" "}
                    <LogIn
                      size={14}
                      className="mr-1.5 transition-transform group-hover:translate-x-0.5"
                    />{" "}
                    Admin Login{" "}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default UnifiedNavbar;
