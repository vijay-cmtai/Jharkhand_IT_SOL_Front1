
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Server, Search, Monitor, ArrowRight, Globe, Mail, FileText, BarChart3, Layout, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  isVisible: boolean;
  data?: {
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
  };
}

const getIconByTitle = (title: string) => {
  switch(true) {
    case title.includes('WEB DESIGNING'):
    case title.includes('DEVELOPMENT'):
    case title.includes('MOBILE'):
      return <Monitor className="text-white" />;
    case title.includes('DOMAIN'):
    case title.includes('HOSTING'):
    case title.includes('SERVER'):
    case title.includes('CLOUD'):
      return <Server className="text-white" />;
    case title.includes('GRAPHICS'):
    case title.includes('DESIGN'):
      return <Palette className="text-white" />;
    case title.includes('PSD'):
    case title.includes('HTML'):
      return <Code className="text-white" />;
    case title.includes('SEO'):
    case title.includes('MARKETING'):
      return <Search className="text-white" />;
    case title.includes('EMAIL'):
      return <Mail className="text-white" />;
    case title.includes('WORDPRESS'):
    case title.includes('JOOMLA'):
    case title.includes('DRUPAL'):
    case title.includes('MAGENTO'):
      return <Globe className="text-white" />;
    case title.includes('CATALOGUE'):
    case title.includes('BROCHURE'):
      return <FileText className="text-white" />;
    case title.includes('ANALYTICS'):
    case title.includes('CHART'):
      return <BarChart3 className="text-white" />;
    case title.includes('TEMPLATE'):
    case title.includes('LAYOUT'):
      return <Layout className="text-white" />;
    case title.includes('DATABASE'):
    case title.includes('SQL'):
      return <Database className="text-white" />;
    default:
      return <ArrowRight size={16} className="text-white" />;
  }
};

const MegaMenu: React.FC<MegaMenuProps> = ({ isVisible, data }) => {
  if (!isVisible || !data) return null;

  const { items } = data;

  // Helper to create a clean URL path
  const createUrlPath = (section: string, item: string) => {
    const sectionPath = section.toLowerCase().replace(/[&\s]/g, '-').replace(/[^\w-]/g, '');
    const itemPath = item.toLowerCase().replace(/[&\s]/g, '-').replace(/[^\w-]/g, '');
    return `/${sectionPath}/${itemPath}`;
  };

  const renderColumn = (title: string, links: string[]) => {
    const titleIcon = getIconByTitle(title);
    
    return (
      <div className="mega-menu-column">
        <motion.h3 
          className="flex items-center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="mr-2 text-white bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg 
           shadow-xl shadow-blue- 
            500/30 flex items-center justify-center">
            {titleIcon}
          </span> 
          <span className="font-bold text-white text-shadow-sm">
            {title}
          </span>
        </motion.h3>
        <ul>
          {links.map((link, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link 
                to={createUrlPath(title, link)}
                className="mega-menu-link transform transition-transform duration-300 hover:translate-x-1 
                 group"
              >
                <span className="mr-2 text-xs bg-gradient-to-r from-purple-500 to-blue-500 p-1.5 rounded- 
                 md shadow-lg shadow-cyan-500/20 flex items-center justify-center group-hover:shadow-cyan- 
                  500/40 transition-all duration-300">
                  {getIconByTitle(link)}
                </span> 
                <span className="group-hover:text-cyan-300 transition-colors">
                  {link}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <motion.div 
      className="absolute left-0 w-full bg-gradient-to-b from-[#003b4a] via-[#00667a] to-[#004a5a]  
       shadow-2xl z-40 backdrop-blur-lg border-t border-cyan-500/20 border-b border-b-cyan-500/20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto py-6 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Column 1 */}
        {renderColumn(items.column1.title, items.column1.links)}

        {/* Column 2 */}
        <div className="mega-menu-column">
          <motion.h3 
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="mr-2 text-white bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg 
             shadow-xl shadow-blue-500/30 flex items-center justify-center">
              {getIconByTitle(items.column2.title)}
            </span>
            <span className="font-bold text-white text-shadow-sm">
              {items.column2.title}
            </span>
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              {items.column2.links.slice(0, Math.ceil(items.column2.links.length / 2)).map((link, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 + 0.1 }}
                >
                  <Link 
                    to={createUrlPath(items.column2.title, link)}
                    className="mega-menu-link transform transition-transform duration-300 hover:translate- 
                     x-1 group"
                  >
                    <span className="mr-2 text-xs bg-gradient-to-r from-purple-500 to-blue-500 p-1.5 
                      rounded-md shadow-lg shadow-cyan-500/20 flex items-center justify-center group- 
                       hover:shadow-cyan-500/40 transition-all duration-300">
                      {getIconByTitle(link)}
                    </span>
                    <span className="group-hover:text-cyan-300 transition-colors">
                      {link}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <ul>
              {items.column2.links.slice(Math.ceil(items.column2.links.length / 2)).map((link, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 + 0.2 }}
                >
                  <Link 
                    to={createUrlPath(items.column2.title, link)}
                    className="mega-menu-link transform transition-transform duration-300 hover:translate- 
                     x-1 group"
                  >
                    <span className="mr-2 text-xs bg-gradient-to-r from-purple-500 to-blue-500 p-1.5 
                     rounded-md shadow-lg 
                     shadow-cyan-500/20 flex items-center justify-center group-hover:shadow-cyan-500/40 
                      transition-all 
                      duration-300">
                      {getIconByTitle(link)}
                    </span>
                    <span className="group-hover:text-cyan-300 transition-colors">
                      {link}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3 */}
        {renderColumn(items.column3.title, items.column3.links)}
        {/* Column 4 */}
        <div className="mega-menu-column">
          <motion.h3 
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span className="mr-2 text-white bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg 
             shadow-xl shadow-blue- 
             500/30 flex items-center justify-center">
              {getIconByTitle(items.column4.title)}
            </span>
            <span className="font-bold text-white text-shadow-sm">
              {items.column4.title}
            </span>
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <ul>
              {items.column4.links.slice(0, Math.ceil(items.column4.links.length / 2)).map((link, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 + 0.3 }}
                >
                  <Link 
                    to={createUrlPath(items.column4.title, link)}
                    className="mega-menu-link transform transition-transform duration-300 hover:translate- 
                     x-1 group"
                  >
                    <span className="mr-2 text-xs bg-gradient-to-r from-purple-500 to-blue-500 p-1.5 
                     rounded-md shadow-lg 
                     shadow-cyan-500/20 flex items-center justify-center group-hover:shadow-cyan-500/40 
                      transition-all 
                      duration-300">
                      {getIconByTitle(link)}
                    </span>
                    <span className="group-hover:text-cyan-300 transition-colors">
                      {link}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <ul>
              {items.column4.links.slice(Math.ceil(items.column4.links.length / 2)).map((link, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 + 0.4 }}
                >
                  <Link 
                    to={createUrlPath(items.column4.title, link)}
                    className="mega-menu-link transform transition-transform duration-300 hover:translate- 
                     x-1 group"
                  >
                    <span className="mr-2 text-xs bg-gradient-to-r from-purple-500 to-blue-500 p-1.5 
                     rounded-md shadow-lg shadow-cyan-500/20 flex items-center justify-center group- 
                      hover:shadow-cyan-500/40 
                     transition-all duration-300">
                      {getIconByTitle(link)}
                    </span>
                    <span className="group-hover:text-cyan-300 transition-colors">
                      {link}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
