import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  CreditCard,
  Instagram, // Using CreditCard for "Pay Online"
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface LinkCategory {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const companyName = "Jharkhand IT Solutions";

  const mainLinkCategories: LinkCategory[] = [
    {
      title: "Our Services",
      links: [
        { label: "Web Development", href: "/web-development" },
        { label: "Mobile Apps", href: "/services" },
        { label: "UI/UX Design", href: "/services" },
        { label: "Digital Marketing", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/company" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Hire Us", href: "/hire-us" },
        { label: "Blog", href: "/blog" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/Jharkhanditsolutions",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/jharkhand_it_solutions",
      label: "Instagram",
    },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Linkedin, href: "https://in.linkedin.com/company/jharkahnditsolutions", label: "LinkedIn" },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 70 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const columnItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      y: -3,
      color: "#38bdf8",
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.9 },
  };

  return (
    <motion.footer
      className="bg-gradient-to-br from-black via-slate-900 to-black text-gray-400 pt-12 md:pt-16 pb-8 relative overflow-hidden"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_top,white_10%,transparent_60%)] opacity-60"></div>

      <motion.div
        className="absolute bottom-0 left-1/4 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-52 h-52 bg-sky-600/10 rounded-full blur-3xl translate-x-1/2"
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 mb-12 md:mb-16">
          {/* Left Part: Company Info & Links (Takes 2/3 on lg screens) */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8"
            variants={columnItemVariants}
          >
            {/* Company Info */}
            <motion.div className="sm:col-span-1" variants={itemVariants}>
              <Link
                to="/"
                className="inline-block mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
              >
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400">
                  {companyName.split(" ")[0]}
                  <span className="text-white">
                    {companyName.substring(companyName.indexOf(" ") + 1)}
                  </span>
                </h2>
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Crafting innovative digital solutions to elevate your business.
              </p>
              <motion.a
                href="https://wa.me/+917033333433" // Replace
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-green-500/80 hover:bg-green-500 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={16} strokeWidth={2.5} /> Chat on WhatsApp
              </motion.a>
            </motion.div>

            {/* Link Categories */}
            {mainLinkCategories.map((category) => (
              <motion.div
                key={category.title}
                className="sm:col-span-1"
                variants={itemVariants}
              >
                <h3 className="text-md font-semibold text-white mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-xs hover:text-sky-400 transition-colors duration-200 relative group focus:outline-none focus-visible:text-sky-400"
                      >
                        <span>{link.label}</span>
                        <span className="absolute bottom-[-1px] left-0 w-0 h-px bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Part: Contact / Special Section (Takes 1/3 on lg screens) */}
          <motion.div
            className="lg:col-span-1 flex flex-col"
            variants={columnItemVariants}
          >
            {" "}
            {/* Added flex flex-col */}
            <motion.h3
              className="text-xl font-semibold text-white mb-5"
              variants={itemVariants}
            >
              Get in Touch
            </motion.h3>
            <motion.div className="space-y-3.5 mb-8" variants={itemVariants}>
              <motion.a
                href="mailto:info@example.com"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-sky-400 transition-colors group"
                variants={itemVariants}
              >
                <Mail
                  size={18}
                  className="text-gray-500 group-hover:text-sky-400 transition-colors"
                />{" "}
                info@jharkhanditsolutions.com
              </motion.a>
              <motion.a
                href="tel:+91 7033333433"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-sky-400 transition-colors group"
                variants={itemVariants}
              >
                <Phone
                  size={18}
                  className="text-gray-500 group-hover:text-sky-400 transition-colors"
                />{" "}
                +91 9031143738 +91 7033333433
              </motion.a>
              <motion.p
                className="flex items-start gap-3 text-sm text-gray-300"
                variants={itemVariants}
              >
                {" "}
                {/* text-gray-300 for better contrast */}
                <MapPin
                  size={18}
                  className="text-gray-500 mt-0.5 flex-shrink-0"
                />{" "}
                Riverview Colony, Near Vidya Vikas Public School, Boriya
                Road,Morabadi,Ranchi-834006
              </motion.p>
            </motion.div>
            {/* Hiring Ad - Styled as per image */}
            <motion.div
              className="bg-gradient-to-br from-purple-600/40 via-pink-600/30 to-red-500/30 p-5 rounded-xl shadow-lg mb-8 border border-pink-500/20 backdrop-blur-sm" // Added backdrop-blur
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -3,
                borderColor: "rgba(236, 72, 153, 0.4)",
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <div className="flex items-center gap-3 mb-1.5">
                <Briefcase size={20} className="text-pink-300" />
                <h4 className="font-semibold text-md text-white">
                  We're Hiring: Android Developer
                </h4>
              </div>
              <p className="text-xs text-gray-200/80 mb-3 ml-[32px]">
                (0-2 Years Experience)
              </p>
              <Link
                to="/career"
                className="ml-[32px] inline-flex items-center justify-center text-xs gap-1.5 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300 transform hover:scale-105 active:scale-95"
              >
                Apply Now <ArrowRight size={14} />
              </Link>
            </motion.div>
            {/* Payment Section - Styled as per image */}
            <motion.div className="mt-auto" variants={itemVariants}>
              {" "}
              {/* mt-auto to push to bottom if column has space */}
              <motion.h4
                className="text-md font-semibold text-white mb-3"
                variants={itemVariants}
              >
                Secure Online Payments
              </motion.h4>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 text-sm bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-sky-300 hover:text-sky-200 hover:border-sky-500/70 rounded-lg transition-all duration-300 py-2.5 px-4 group"
                >
                  <span className="flex items-center justify-center w-7 h-7 bg-sky-500/80 group-hover:bg-sky-500 rounded-full transition-colors duration-300">
                    <CreditCard size={14} className="text-white" />
                  </span>
                  Pay Online Securely
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Social Media & Copyright */}
        <motion.div
          className="pt-10 border-t border-slate-800"
          variants={columnItemVariants}
        >
          {" "}
          {/* Use columnItemVariants for consistent stagger */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-500 transition-colors duration-200" // Hover color handled by variants
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <social.icon size={22} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-center sm:text-right text-gray-500">
              © {new Date().getFullYear()} {companyName} Pvt Ltd. All Rights
              Reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
