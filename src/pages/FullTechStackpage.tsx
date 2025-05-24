import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import UnifiedNavbar from "@/components/UnifiedNavbar"; // Assuming this is part of a global Layout
import Footer from "@/components/Footer";             // Assuming this is part of a global Layout
import {
  ArrowLeft,
  Database,
  Cloud,
  Cpu,
  Smartphone,
  Palette,
  Server,
  Terminal,
  ShieldCheck,
  GitBranch,
  Package,
  Layers,
  Zap,
  Cog,
  Code,
  Network
} from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  category?: string;
}

// IMPORTANT: Ensure you have an `icons` folder inside your `public` directory
// and that all these .svg files exist there.
const allTechItems: TechItem[] = [
  // Frontend
  { id: "react", name: "React", icon: <img src="/icons/react.svg" alt="React" className="w-full h-full object-contain" />, category: "Frontend" },
  { id: "nextjs", name: "Next.js", icon: <img src="/icons/nextjs.svg" alt="Next.js" className="w-full h-full object-contain" />, category: "Frontend" },
  { id: "angular", name: "Angular", icon: <img src="/icons/angular.svg" alt="Angular" className="w-full h-full object-contain" />, category: "Frontend" },
  { id: "vuejs", name: "Vue.js", icon: <img src="/icons/vuejs.svg" alt="Vue.js" className="w-full h-full object-contain" />, category: "Frontend" },
  { id: "typescript", name: "TypeScript", icon: <img src="/icons/typescript.svg" alt="TypeScript" className="w-full h-full object-contain" />, category: "Language" },
  { id: "javascript", name: "JavaScript", icon: <img src="/icons/javascript.svg" alt="JavaScript" className="w-full h-full object-contain" />, category: "Language" },
  { id: "html5", name: "HTML5", icon: <img src="/icons/html5.svg" alt="HTML5" className="w-full h-full object-contain" />, category: "Frontend" },
  { id: "css3", name: "CSS3", icon: <img src="/icons/css3.svg" alt="CSS3" className="w-full h-full object-contain" />, category: "Frontend" },
  { id: "sass", name: "Sass/SCSS", icon: <img src="/icons/sass.svg" alt="Sass" className="w-full h-full object-contain" />, category: "Frontend" },
  { id: "tailwind", name: "Tailwind CSS", icon: <img src="/icons/tailwindcss.svg" alt="Tailwind CSS" className="w-full h-full object-contain" />, category: "Frontend" },
  { id: "redux", name: "Redux", icon: <Layers size={30} className="text-purple-400" />, category: "Frontend" },
  { id: "graphql", name: "GraphQL", icon: <Zap size={30} className="text-pink-400"/>, category: "API" },

  // Backend
  { id: "nodejs", name: "Node.js", icon: <img src="/icons/nodejs.svg" alt="Node.js" className="w-full h-full object-contain" />, category: "Backend" },
  { id: "express", name: "Express.js", icon: <Server size={30} className="text-gray-400"/>, category: "Backend" },
  { id: "python", name: "Python", icon: <img src="/icons/python.svg" alt="Python" className="w-full h-full object-contain" />, category: "Language" },
  { id: "django", name: "Django", icon: <Layers size={30} className="text-green-500"/>, category: "Backend" },
  { id: "flask", name: "Flask", icon: <Layers size={30} className="text-gray-300"/>, category: "Backend" },
  { id: "java", name: "Java", icon: <img src="/icons/java.svg" alt="Java" className="w-full h-full object-contain" />, category: "Language" },
  { id: "spring", name: "Spring Boot", icon: <Layers size={30} className="text-green-400"/>, category: "Backend" },
  { id: "php", name: "PHP", icon: <Code size={30} className="text-indigo-400"/>, category: "Language" },
  { id: "laravel", name: "Laravel", icon: <Layers size={30} className="text-red-500"/>, category: "Backend" },
  { id: "ruby", name: "Ruby on Rails", icon: <Layers size={30} className="text-red-600"/>, category: "Backend" },
  { id: "rust", name: "Rust", icon: <ShieldCheck size={30} className="text-orange-500"/>, category: "Language" },

  // Databases
  { id: "mongodb", name: "MongoDB", icon: <Database size={30} className="text-green-500"/>, category: "Database" },
  { id: "postgresql", name: "PostgreSQL", icon: <Database size={30} className="text-blue-500"/>, category: "Database" },
  { id: "mysql", name: "MySQL", icon: <Database size={30} className="text-sky-600"/>, category: "Database" },
  { id: "redis", name: "Redis", icon: <Cpu size={30} className="text-red-600"/>, category: "Database" },

  // Mobile
  { id: "reactnative", name: "React Native", icon: <Smartphone size={30} className="text-sky-400"/>, category: "Mobile" },
  { id: "flutter", name: "Flutter", icon: <Smartphone size={30} className="text-blue-400"/>, category: "Mobile" },
  { id: "swift", name: "Swift (iOS)", icon: <Smartphone size={30} className="text-orange-500"/>, category: "Mobile" },
  { id: "kotlin", name: "Kotlin (Android)", icon: <Smartphone size={30} className="text-purple-500"/>, category: "Mobile" },

  // Cloud & DevOps
  { id: "aws", name: "AWS", icon: <Cloud size={30} className="text-orange-400"/>, category: "Cloud" },
  { id: "gcp", name: "Google Cloud", icon: <Cloud size={30} className="text-blue-400"/>, category: "Cloud" },
  { id: "azure", name: "Microsoft Azure", icon: <Cloud size={30} className="text-sky-500"/>, category: "Cloud" },
  { id: "docker", name: "Docker", icon: <Package size={30} className="text-blue-500"/>, category: "DevOps" },
  { id: "kubernetes", name: "Kubernetes", icon: <Package size={30} className="text-indigo-600"/>, category: "DevOps" },
  { id: "jenkins", name: "Jenkins", icon: <Cog size={30} className="text-red-500"/>, category: "DevOps" },
  { id: "git", name: "Git", icon: <GitBranch size={30} className="text-orange-600"/>, category: "DevOps" },
  { id: "terraform", name: "Terraform", icon: <Network size={30} className="text-purple-600"/>, category: "DevOps" },

  // CMS & Other Tools
  { id: "wordpress", name: "WordPress", icon: <Cog size={30} className="text-blue-600"/>, category: "CMS" },
  { id: "figma", name: "Figma", icon: <Palette size={30} className="text-pink-500"/>, category: "Design" },
  { id: "jira", name: "Jira", icon: <Cog size={30} className="text-sky-600"/>, category: "Tools" },
];

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const techCardVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 25 }, // Made initial y and scale smaller
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
      duration: 0.35, // Faster animation
    },
  },
};

const FullTechStackPage: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-x-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <UnifiedNavbar /> // Assuming this is handled by a global Layout component
      <main className="flex-grow py-16 md:py-20 lg:py-24"> {/* Adjust pt-X based on global navbar height */}
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10 md:mb-12" // Reduced bottom margin
            variants={contentVariants}
          >
            <motion.h1
              variants={contentVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" // Reduced H1 size
            >
              Our Full Technology Spectrum
            </motion.h1>
            <motion.p
              variants={contentVariants}
              className="text-sm md:text-base text-gray-300/80 max-w-2xl mx-auto leading-relaxed" // Reduced P size
            >
              We harness a comprehensive suite of cutting-edge tools and
              technologies to deliver robust, scalable, and innovative solutions
              tailored to your needs.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-2.5 md:gap-3" // Further reduced gap, increased cols
          >
            {allTechItems.map((tech) => (
              <motion.div
                key={tech.id}
                className="relative group bg-slate-800/50 backdrop-blur-sm p-2.5 md:p-3 rounded-md flex flex-col items-center justify-center text-center aspect-square hover:bg-slate-700/70 transition-colors duration-300 shadow-md hover:shadow-cyan-500/20 cursor-default overflow-hidden" // Further reduced padding, shadow
                variants={techCardVariants}
                whileHover={{
                  y: -4, // Reduced hover y-lift
                  scale: 1.06, // Slightly increased hover scale for pop
                  transition: { type: "spring", stiffness: 350, damping: 10 },
                }}
              >
                <div className="w-7 h-7 md:w-9 md:h-9 mb-1.5 text-cyan-400 flex items-center justify-center"> {/* Reduced icon container and mb */}
                  {React.isValidElement(tech.icon) && tech.icon.type === 'img' ? (
                    React.cloneElement(tech.icon as React.ReactElement<any>, {
                      className: "w-full h-full object-contain",
                      onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        console.warn(`Failed to load icon: ${tech.name} - ${(e.target as HTMLImageElement).src}`);
                      }
                    })
                  ) : (
                     React.isValidElement(tech.icon) ? React.cloneElement(tech.icon as React.ReactElement<any>, { size: tech.name.length > 10 ? 20 : 24 }) : tech.icon // Dynamically adjust Lucide icon size slightly
                  )}
                </div>
                <h3 className="text-[10px] sm:text-[11px] md:text-xs font-medium text-white break-words leading-tight"> {/* Reduced font size, added leading-tight */}
                  {tech.name}
                </h3>
                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent scale-x-0 group-hover:scale-x-75 transition-transform duration-300 ease-out"></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10 md:mt-14" // Reduced margin top
            variants={contentVariants}
          >
            <Link
              to="/"
              className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-white text-xs md:text-sm font-semibold rounded-md shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5" // Smaller button
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5 md:h-4 md:w-4" /> {/* Smaller icon */}
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer /> // Assuming this is handled by a global Layout component
    </motion.div>
  );
};

export default FullTechStackPage;