
import React from 'react';
import { Facebook, Twitter, Mail, Phone, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TopBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg shadow-blue-500/10">
      <div className="container mx-auto py-3 px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Navigation Links */}
          <motion.div
            className="flex flex-wrap items-center space-x-1 sm:space-x-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="px-2 py-1 hover:text-jis-teal transition-colors text-white font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/company"
              className="px-2 py-1 hover:text-jis-teal transition-colors text-white font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">About us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/career"
              className="px-2 py-1 hover:text-jis-teal transition-colors text-white font- 
             medium relative overflow-hidden group"
            >
              <span className="relative z-10">Career</span>
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to- 
                blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 
                 origin-left"
              ></span>
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/training"
              className="px-2 py-1 hover:text-jis-teal transition-colors text- 
             white font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">Training</span>
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to- 
               blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 
                origin-left"
              ></span>
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/faq"
              className="px-2 py-1 hover:text-jis-teal transition-colors text-white font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">FAQ's</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/blog"
              className="px-2 py-1 hover:text-jis-teal transition-colors text-white font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">Blog</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/contact"
              className="px-2 py-1 hover:text-jis-teal transition-colors text-white font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center justify-end space-x-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hidden md:flex items-center">
              <span className="mr-2 text-gray-300">Connect with us:</span>
              <div className="flex space-x-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-gray-300 hover:text-blue-400 transition- 
                 colors transform hover:scale-110 transition-transform"
                >
                  <Facebook
                    size={16}
                    className="hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-gray-300 hover:text-blue-400 transition- 
                 colors transform hover:scale-110 transition-transform"
                >
                  <Twitter
                    size={16}
                    className="hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                </a>
                <a
                  href="mailto:info@company.com"
                  aria-label="Email"
                  className="text-gray-300 hover:text- 
                 blue-400 transition-colors transform hover:scale-110 transition-transform"
                >
                  <Mail
                    size={16}
                    className="hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                </a>
                <a
                  href="tel:+1234567890"
                  aria-label="Phone"
                  className="text-gray-300 hover:text-blue-400 
                 transition-colors transform hover:scale-110 transition-transform"
                >
                  <Phone
                    size={16}
                    className="hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                </a>
              </div>
            </div>

            <Link to="/contact" className="relative group">
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-lg 
               blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200"
              ></div>
              <div
                className="relative bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg 
               flex items-center shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all 
                transform hover:-translate-y-1"
              >
                <Coffee size={18} className="mr-2 text-white" />
                <span className="text-white font-semibold">
                  Let's Have a Cup of Coffee?
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
