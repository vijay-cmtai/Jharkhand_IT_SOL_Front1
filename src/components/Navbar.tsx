import React, { useState, useEffect } from "react"; // <--- THIS LINE IS RE-ADDED
import { FaSearch, FaBars } from "react-icons/fa";
import MegaMenu from "./MegaMenu"; // Assuming MegaMenu.tsx is in the same directory
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface MegaMenuData {
  title: string;
  items: {
    column1: {
      title: string;
      links: string[];
    };
    column2: {
      title: string;
      links: string[];
    };
    column3: {
      title: string;
      links: string[];
    };
    column4: {
      title: string;
      links: string[];
    };
  };
}

const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const navLinks = [
    "WEB DESIGN & GRAPHICS",
    "WEB DEVELOPMENT",
    "SOFTWARE & MOBILE",
    "WEB MARKETING",
    "HIRE US",
    "PORTFOLIO",
    "COMPANY",
    "CAREER",
    "MORE", // Added "MORE" section
  ];

  // Mock data for different mega menus
  const megaMenuData: Record<string, MegaMenuData> = {
    "WEB DESIGN & GRAPHICS": {
      title: "WEB DESIGN & GRAPHICS",
      items: {
        column1: {
          title: "WEB DESIGNING",
          links: [
            "RESPONSIVE WEB DESIGNING",
            "WEB DESIGNING",
            "WEBSITE REDESIGNING",
            "EMAIL TEMPLATE DESIGNING",
            "WEBSITE MAINTENANCE",
          ],
        },
        column2: {
          title: "DOMAIN & HOSTING",
          links: [
            "DOMAIN",
            "DOMAIN REGISTRATION / PRICING",
            "DOMAIN TRANSFER",
            "DOMAIN RENEW",
            "UNLIMITED HOSTING",
            "UNLIMITED LINUX",
            "UNLIMITED WINDOWS",
            "WEBSITE SECURITY",
            "DEDICATED HOSTING",
            "DEDICATED SERVER",
            "VPS HOSTING",
            "CLOUD HOSTING",
            "JAVA HOSTING",
            "SHARED HOSTING",
          ],
        },
        column3: {
          title: "GRAPHICS DESIGN SERVICES",
          links: [
            "LOGO DESIGNING",
            "ADE BANNER DESIGN",
            "MAILER DESIGNING",
            "FLYER DESIGNING",
            "CATALOGUE DESIGNING",
            "BROCHURE DESIGNING",
            "PRINTING TEMPLATES DESIGNING",
            "PRODUCT COVER DESIGN",
          ],
        },
        column4: {
          title: "PSD TO ANY",
          links: [
            "SOCIAL MEDIA DESIGNING",
            "FACEBOOK LANDING PAGES",
            "TWITTER COVER PAGES",
            "YOUTUBE COVER DESIGN",
            "MULTIMEDIA DESIGN",
            "3D GRAPHIC DESIGN",
            "2D GRAPHIC DESIGN",
            "PSD TO HTML5",
            "PSD TO WORDPRESS",
            "PSD TO JOOMLA",
            "PSD TO DRUPAL",
            "PSD TO MAGENTO",
            "PSD TO EMAIL TEMPLATE",
            "PSD TO RESPONSIVE",
          ],
        },
      },
    },
    "WEB DEVELOPMENT": {
      title: "WEB DEVELOPMENT",
      items: {
        column1: {
          title: "CMS DEVELOPMENT",
          links: [
            "WORDPRESS DEVELOPMENT",
            "JOOMLA DEVELOPMENT",
            "DRUPAL DEVELOPMENT",
            "MAGENTO DEVELOPMENT",
            "CUSTOM CMS DEVELOPMENT",
          ],
        },
        column2: {
          title: "BACKEND DEVELOPMENT",
          links: [
            "PHP DEVELOPMENT",
            "NODE.JS DEVELOPMENT",
            "PYTHON DEVELOPMENT",
            "JAVA DEVELOPMENT",
            "ASP.NET DEVELOPMENT",
            "RUBY ON RAILS",
          ],
        },
        column3: {
          title: "FRONTEND DEVELOPMENT",
          links: [
            "HTML/CSS DEVELOPMENT",
            "JAVASCRIPT FRAMEWORKS",
            "REACT DEVELOPMENT",
            "ANGULAR DEVELOPMENT",
            "VUE.JS DEVELOPMENT",
            "RESPONSIVE DESIGN",
          ],
        },
        column4: {
          title: "E-COMMERCE SOLUTIONS",
          links: [
            "SHOPIFY DEVELOPMENT",
            "WOOCOMMERCE DEVELOPMENT",
            "OPENCART DEVELOPMENT",
            "PRESTASHOP DEVELOPMENT",
            "CUSTOM E-COMMERCE",
            "PAYMENT INTEGRATION",
          ],
        },
      },
    },
    "SOFTWARE & MOBILE": {
      title: "SOFTWARE & MOBILE",
      items: {
        column1: {
          title: "MOBILE APPS",
          links: [
            "ANDROID DEVELOPMENT",
            "IOS DEVELOPMENT",
            "CROSS-PLATFORM APPS",
            "FLUTTER DEVELOPMENT",
            "REACT NATIVE DEVELOPMENT",
          ],
        },
        column2: {
          title: "SOFTWARE SOLUTIONS",
          links: [
            "CUSTOM SOFTWARE DEVELOPMENT",
            "ERP SOLUTIONS",
            "CRM SOLUTIONS",
            "INVENTORY MANAGEMENT",
            "BILLING SOFTWARE",
            "HR MANAGEMENT SYSTEMS",
          ],
        },
        column3: {
          title: "DESKTOP APPLICATIONS",
          links: [
            "WINDOWS APPLICATIONS",
            "MAC APPLICATIONS",
            "CROSS-PLATFORM APPS",
            "ELECTRON APPLICATIONS",
            "DATABASE APPLICATIONS",
          ],
        },
        column4: {
          title: "CLOUD SOLUTIONS",
          links: [
            "AWS SOLUTIONS",
            "AZURE DEVELOPMENT",
            "GOOGLE CLOUD SERVICES",
            "CLOUD MIGRATION",
            "SAAS APPLICATIONS",
            "SERVERLESS ARCHITECTURE",
          ],
        },
      },
    },
    "WEB MARKETING": {
      title: "WEB MARKETING",
      items: {
        column1: {
          title: "SEO SERVICES",
          links: [
            "ON-PAGE SEO",
            "OFF-PAGE SEO",
            "LOCAL SEO",
            "TECHNICAL SEO",
            "SEO AUDIT",
            "KEYWORD RESEARCH",
          ],
        },
        column2: {
          title: "SOCIAL MEDIA MARKETING",
          links: [
            "FACEBOOK MARKETING",
            "INSTAGRAM MARKETING",
            "TWITTER MARKETING",
            "LINKEDIN MARKETING",
            "YOUTUBE MARKETING",
            "SOCIAL MEDIA MANAGEMENT",
          ],
        },
        column3: {
          title: "DIGITAL ADVERTISING",
          links: [
            "GOOGLE ADS",
            "FACEBOOK ADS",
            "INSTAGRAM ADS",
            "DISPLAY ADVERTISING",
            "REMARKETING",
            "PPC MANAGEMENT",
          ],
        },
        column4: {
          title: "CONTENT MARKETING",
          links: [
            "BLOG WRITING",
            "ARTICLE WRITING",
            "COPYWRITING",
            "EMAIL MARKETING",
            "VIDEO MARKETING",
            "INFOGRAPHIC DESIGN",
          ],
        },
      },
    },
    "HIRE US": {
      title: "HIRE US",
      items: {
        column1: {
          title: "HIRE DEVELOPERS",
          links: [
            "HIRE PHP DEVELOPERS",
            "HIRE JAVASCRIPT DEVELOPERS",
            "HIRE PYTHON DEVELOPERS",
            "HIRE JAVA DEVELOPERS",
            "HIRE .NET DEVELOPERS",
          ],
        },
        column2: {
          title: "HIRE DESIGNERS",
          links: [
            "HIRE UI/UX DESIGNERS",
            "HIRE GRAPHIC DESIGNERS",
            "HIRE WEB DESIGNERS",
            "HIRE LOGO DESIGNERS",
            "HIRE PRINT DESIGNERS",
          ],
        },
        column3: {
          title: "HIRE MOBILE DEVELOPERS",
          links: [
            "HIRE ANDROID DEVELOPERS",
            "HIRE IOS DEVELOPERS",
            "HIRE FLUTTER DEVELOPERS",
            "HIRE REACT NATIVE DEVELOPERS",
            "HIRE HYBRID APP DEVELOPERS",
          ],
        },
        column4: {
          title: "HIRE MARKETERS",
          links: [
            "HIRE SEO SPECIALISTS",
            "HIRE SMM SPECIALISTS",
            "HIRE PPC SPECIALISTS",
            "HIRE CONTENT WRITERS",
            "HIRE DIGITAL MARKETERS",
          ],
        },
      },
    },
    PORTFOLIO: {
      title: "PORTFOLIO",
      items: {
        column1: {
          title: "WEB PROJECTS",
          links: [
            "CORPORATE WEBSITES",
            "E-COMMERCE PROJECTS",
            "EDUCATIONAL WEBSITES",
            "HEALTHCARE PORTALS",
            "REAL ESTATE WEBSITES",
          ],
        },
        column2: {
          title: "MOBILE PROJECTS",
          links: [
            "ANDROID APPLICATIONS",
            "IOS APPLICATIONS",
            "HYBRID APPLICATIONS",
            "MOBILE GAMES",
            "ENTERPRISE MOBILE APPS",
          ],
        },
        column3: {
          title: "DESIGN PROJECTS",
          links: [
            "UI/UX DESIGNS",
            "BRANDING PROJECTS",
            "PRINT DESIGNS",
            "PACKAGING DESIGNS",
            "DIGITAL ARTWORK",
          ],
        },
        column4: {
          title: "SOFTWARE PROJECTS",
          links: [
            "ERP IMPLEMENTATIONS",
            "CRM SOLUTIONS",
            "CUSTOM SOFTWARE",
            "CLOUD APPLICATIONS",
            "AI & ML PROJECTS",
          ],
        },
      },
    },
    COMPANY: {
      title: "COMPANY",
      items: {
        column1: {
          title: "ABOUT US",
          links: [
            "COMPANY PROFILE",
            "OUR TEAM",
            "OUR MISSION & VISION",
            "OUR APPROACH",
            "WORK CULTURE",
          ],
        },
        column2: {
          title: "RESOURCES",
          links: [
            "BLOG",
            "CASE STUDIES",
            "WHITEPAPERS",
            "TESTIMONIALS",
            "FAQS",
          ],
        },
        column3: {
          title: "PARTNERSHIPS",
          links: [
            "TECHNOLOGY PARTNERS",
            "CHANNEL PARTNERS",
            "BECOMING A PARTNER",
            "AFFILIATE PROGRAM",
            "COLLABORATIONS",
          ],
        },
        column4: {
          title: "CONTACT",
          links: [
            "CONTACT DETAILS",
            "SUPPORT",
            "REQUEST A QUOTE",
            "CAREERS",
            "FEEDBACK",
          ],
        },
      },
    },
    CAREER: {
      title: "CAREER",
      items: {
        column1: {
          title: "CURRENT OPENINGS",
          links: [
            "DEVELOPMENT POSITIONS",
            "DESIGN POSITIONS",
            "MARKETING POSITIONS",
            "MANAGEMENT POSITIONS",
            "INTERNSHIP OPPORTUNITIES",
          ],
        },
        column2: {
          title: "WHY JOIN US",
          links: [
            "EMPLOYEE BENEFITS",
            "GROWTH OPPORTUNITIES",
            "WORK ENVIRONMENT",
            "TRAINING PROGRAMS",
            "EMPLOYEE TESTIMONIALS",
          ],
        },
        column3: {
          title: "RECRUITMENT PROCESS",
          links: [
            "APPLICATION PROCESS",
            "INTERVIEW STAGES",
            "SKILL ASSESSMENT",
            "ONBOARDING PROCESS",
            "CAREER GROWTH PATH",
          ],
        },
        column4: {
          title: "LEARNING & DEVELOPMENT",
          links: [
            "TRAINING PROGRAMS",
            "SKILL DEVELOPMENT",
            "MENTORSHIP PROGRAMS",
            "CERTIFICATION SUPPORT",
            "KNOWLEDGE SHARING",
          ],
        },
      },
    },
    MORE: {
      // New "MORE" section data
      title: "MORE SERVICES & TECHNOLOGIES",
      items: {
        column1: {
          title: "AI & ALLIED SERVICES",
          links: [
            "MACHINE LEARNING",
            "DEEP LEARNING",
            "NATURAL LANGUAGE PROCESSING (NLP)",
            "COMPUTER VISION",
            "AI CHATBOTS",
            "AI CONSULTING",
            "CLOUD & INFRASTRUCTURE", // Added from image
          ],
        },
        column2: {
          title: "CONSULTING & DATA ANALYTICS",
          links: [
            "TECHNOLOGY CONSULTING",
            "BUSINESS STRATEGY",
            "DIGITAL TRANSFORMATION",
            "BIG DATA ANALYTICS",
            "BUSINESS INTELLIGENCE",
            "DATA VISUALIZATION",
            "DATA WAREHOUSING",
            "BUSINESS PROCESS SERVICES", // Added from image
          ],
        },
        column3: {
          title: "EMERGING TECH & ENGINEERING",
          links: [
            "BLOCKCHAIN DEVELOPMENT",
            "INTERNET OF THINGS (IOT)",
            "AUGMENTED REALITY (AR)",
            "VIRTUAL REALITY (VR)",
            "APPLICATION MODERNIZATION",
            "LEGACY SYSTEM TRANSFORMATION",
            "DEVOPS SERVICES",
            "BUSINESS APPLICATIONS", // Added from image
          ],
        },
        column4: {
          title: "IT, CYBERSECURITY & PARTNER SERVICES",
          links: [
            "MANAGED IT SERVICES",
            "IT INFRASTRUCTURE",
            "CYBERSECURITY SOLUTIONS",
            "PENETRATION TESTING",
            "SECURITY AUDITS",
            "CLOUD SECURITY",
            "PARTNER ECOSYSTEM",
            "DESIGN & DEVELOPMENT", // Added from image
          ],
        },
      },
    },
  };

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Check screen size
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMegaMenuToggle = (index: number) => {
    const navItem = navLinks[index];

    if (activeMegaMenu === navItem) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(navItem);
    }
  };

  const handleMegaMenuHover = (index: number) => {
    if (!isSmallScreen) {
      setActiveMegaMenu(navLinks[index]);
    }
  };

  const handleMegaMenuLeave = () => {
    if (!isSmallScreen) {
      setActiveMegaMenu(null);
    }
  };

  return (
    <motion.nav
      className={`bg-gradient-to-r from-cyan-700 to-blue-600 relative z-40 shadow-lg shadow-blue-700/30 ${isSticky ? "fixed top-0 left-0 w-full" : ""}`}
      onMouseLeave={handleMegaMenuLeave}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-jis-yellow bg-blue-700 p-2 rounded-md"
            >
              <FaBars size={24} />
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-1 flex-1">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMegaMenuHover(index)}
              >
                <Link
                  to={`/${link.toLowerCase().replace(/\s|&/g, "-").replace(/-+/g, "-")}`} // Improved slug generation
                  className={`px-3 py-5 text-sm font-medium nav-link-3d relative overflow-hidden group ${
                    activeMegaMenu === link
                      ? "bg-yellow-400 text-gray-800"
                      : "text-white hover:text-gray-100"
                  }`}
                >
                  <span className="relative z-10">{link}</span>
                  {activeMegaMenu !== link && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400
                     to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform
                      duration-300 origin-left"
                    ></span>
                  )}
                  {activeMegaMenu === link && (
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-300 -z-0"></span>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Search Icon */}
          <div className="flex items-center">
            <button
              className="p-2 text-white bg-blue-700 rounded-full hover:bg-blue-600 shadow-md
             transition-transform hover:scale-110"
            >
              <FaSearch size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-blue-600 to-cyan-700 border-t border-blue-500">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleMegaMenuToggle(index)}
                    className={`block px-3 py-2 text-base font-medium w-full text-left rounded-md
                       transition-all ${
                         activeMegaMenu === link
                           ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 shadow-md"
                           : "text-white hover:bg-blue-600"
                       }`}
                  >
                    {link}
                  </button>
                  {activeMegaMenu === link &&
                    megaMenuData[link] && ( // Check if data exists
                      <div className="pl-4">
                        <MegaMenu isVisible={true} data={megaMenuData[link]} />
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mega Menu */}
        {activeMegaMenu &&
          !isSmallScreen &&
          megaMenuData[activeMegaMenu] && ( // Check if data exists
            <MegaMenu isVisible={true} data={megaMenuData[activeMegaMenu]} />
          )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
