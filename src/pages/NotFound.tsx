import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* <TopBar />
      <Navbar /> */}

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-lg mx-auto">
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <h1 className="text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-jis-teal via-jis-blue to-jis-purple leading-none">
              404
            </h1>
            <div className="absolute -top-10 -left-10 right-0 text-[220px] font-bold text-gray-800/10 z-[-1]">
              404
            </div>
            <div className="absolute -bottom-10 -right-10 text-[220px] font-bold text-gray-800/5 z-[-1] transform rotate-12">
              404
            </div>
          </motion.div>

          <motion.div
            className="card-3d backdrop-blur-sm bg-gray-800/30 border border-gray-700 p-8 rounded-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-jis-yellow via-jis-teal to-jis-blue">
              Oops! Page not found
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-jis-teal hover:bg-jis-teal/90 text-white px-8 py-4 rounded-md shadow-lg hover:shadow-jis-teal/50 button-3d transform transition-all hover:-translate-y-1"
              >
                Back to Home
              </Link>
              <Link
                to="/contact"
                className="border-2 border-jis-yellow text-jis-yellow px-8 py-4 rounded-md hover:bg-jis-yellow hover:text-gray-900 shadow-lg button-3d transform transition-all hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
                ease: "easeInOut",
              },
            }}
          >
            <div className="w-12 h-12 mx-auto bg-jis-yellow/20 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-jis-yellow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                ></path>
              </svg>
            </div>
            <p className="text-gray-400 mt-2">Scroll up to navigate</p>
          </motion.div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default NotFound;
