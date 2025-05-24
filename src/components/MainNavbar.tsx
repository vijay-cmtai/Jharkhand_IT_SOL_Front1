import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils"; // Conditional class utility

const serviceItems = [
  {
    category: "Web Development",
    path: "/Service",
    services: [
      { name: "React.js", path: "/services/web-development/react" },
      { name: "Next.js", path: "/services/web-development/next" },
      { name: "Node.js", path: "/services/web-development/node" },
      { name: "Laravel", path: "/services/web-development/laravel" },
      { name: "PHP", path: "/services/web-development/php" },
      { name: "View All", path: "/services/web-development" },
    ],
  },
  {
    category: "Mobile Apps",
    path: "/Service",
    services: [
      { name: "Flutter", path: "/services/mobile-apps/flutter" },
      { name: "React Native", path: "/services/mobile-apps/react-native" },
      { name: "Android", path: "/services/mobile-apps/android" },
      { name: "iOS", path: "/services/mobile-apps/ios" },
      { name: "PWA", path: "/Service" },
    ],
  },
  {
    category: "Digital Marketing",
    path: "/Service",
    services: [
      { name: "SEO", path: "/services/digital-marketing/seo" },
      { name: "Google Ads", path: "/services/digital-marketing/google-ads" },
      {
        name: "Social Media",
        path: "/services/digital-marketing/social-media",
      },
      { name: "Email Marketing", path: "/services/digital-marketing/email" },
      {
        name: "Affiliate Marketing",
        path: "/services/digital-marketing/affiliate",
      },
    ],
  },
  {
    category: "UI/UX & Branding",
    path: "/services/design",
    services: [
      { name: "Logo Design", path: "/services/design/logo" },
      { name: "UI/UX", path: "/services/design/uiux" },
      { name: "Wireframing", path: "/services/design/wireframe" },
      { name: "Brand Identity", path: "/services/design/brand" },
      { name: "Prototyping", path: "/services/design/prototype" },
    ],
  },
];

const MainNavbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolled = scrollPosition > 50;

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/company" },
    { name: "Hire Us", path: "/hire-us" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileDropdown = (dropdownIdentifier: string) => {
    setActiveDropdown((prev) =>
      prev === dropdownIdentifier ? null : dropdownIdentifier
    );
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 mt-12",
        isScrolled
          ? "bg-gray-900/95 shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://www.jharkhanditsolutions.com/wp-content/uploads/2016/10/logo-1.png"
              alt="JIS Logo"
              className="h-10"
            />
            <div>
              <h1 className="text-[#ff9900] text-2xl font-bold leading-tight">
                JIS
              </h1>
              <p className="text-[#00bfff] text-[10px] tracking-wider uppercase">
                Jharkhand IT Solutions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-cyan-400 transition-colors font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}

            {/* Desktop Services Dropdown */}
            <div className="relative group">
              <div className="flex items-center text-white hover:text-cyan-400 transition-colors font-medium cursor-default py-2">
                Services
                <ChevronDown
                  size={16}
                  className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                />
              </div>
              <div
                className={cn(
                  "absolute top-full right-0 w-[800px] max-h-[70vh] overflow-y-auto bg-gray-900/95 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 transition-all duration-300 transform origin-top-right",
                  "opacity-0 scale-95 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                )}
              >
                {serviceItems.map((category) => (
                  <div key={category.category}>
                    <Link
                      to={category.path}
                      onClick={() => handleLinkClick(category.path)}
                      className="text-cyan-400 font-semibold text-sm block mb-3 hover:text-white transition-colors"
                    >
                      {category.category}
                    </Link>
                    <ul className="space-y-2">
                      {category.services.slice(0, 5).map((service) => (
                        <li key={service.name}>
                          <Link
                            to={service.path}
                            onClick={() => handleLinkClick(service.path)}
                            className="text-gray-300 text-xs block hover:text-cyan-400 transition-colors"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-md text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-1"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen
            ? "max-h-[calc(100vh-80px)] opacity-100 border-t border-gray-800"
            : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-white hover:text-cyan-400 transition-colors font-medium py-3 border-b border-gray-800"
                onClick={() => handleLinkClick(item.path)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Services Dropdown */}
            <div className="py-2 border-b border-gray-800">
              <button
                onClick={() => toggleMobileDropdown("services-mobile")}
                className="flex items-center justify-between w-full text-white hover:text-cyan-400 transition-colors font-medium py-1"
              >
                Services
                <ChevronDown
                  size={20}
                  className={cn(
                    "transition-transform duration-300",
                    activeDropdown === "services-mobile" ? "rotate-180" : ""
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  activeDropdown === "services-mobile"
                    ? "max-h-[1200px] pt-3"
                    : "max-h-0"
                )}
              >
                {serviceItems.map((category) => (
                  <div key={category.category} className="mb-3 pl-4">
                    <Link
                      to={category.path}
                      className="text-cyan-300 font-semibold text-sm block mb-2 hover:text-white transition-colors"
                      onClick={() => handleLinkClick(category.path)}
                    >
                      {category.category}
                    </Link>
                    <ul className="space-y-1.5 pl-2 border-l border-gray-700">
                      {category.services.slice(0, 4).map((service) => (
                        <li key={service.name}>
                          <Link
                            to={service.path}
                            className="text-gray-300 text-xs block hover:text-cyan-400 transition-colors py-0.5"
                            onClick={() => handleLinkClick(service.path)}
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                to="/contact"
                className="block bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 rounded-md text-white font-medium text-center"
                onClick={() => handleLinkClick("/contact")}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
