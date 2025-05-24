import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import teammeet from "../assets/t1.avif";
import clutchLogo from "../assets/c1.png";
import goodfirmsLogo from "../assets/g1.png";

import badge1_png from "../assets/1.png";
import badge2_avif from "../assets/2.avif";
import badge3_jpeg from "../assets/3.jpeg";
import badge4_jpg from "../assets/4.jpg";
import badge5_webp from "../assets/5.webp";
import badge6_png from "../assets/6.png";
import badge8_jpeg from "../assets/8.jpeg";

const CompanyAwards = () => {
  const awardProviders = [
    {
      id: "clutch",
      logoUrl: clutchLogo,
      name: "Clutch",
      description:
        "Leading Web & Mobile App Development company recognized by Clutch.",
      link: "https://clutch.co/profile/your-company-profile",
    },
    {
      id: "goodfirms",
      logoUrl: goodfirmsLogo,
      name: "GoodFirms",
      description: "Top App & Web Development Company on GoodFirms.",
      link: "https://www.goodfirms.co/company/your-company-profile",
    },
  ];

  const certificateBadges = [
    {
      id: "goodfirms-top-mobile",
      imageUrl: badge1_png,
      alt: "Top Mobile App Development Company by GoodFirms",
    },
    {
      id: "clutch-top-dev-india",
      imageUrl: badge2_avif,
      alt: "Top Developers India 2023 Clutch",
    },
    {
      id: "clutch-top-app-dev",
      imageUrl: badge3_jpeg,
      alt: "Top App Developers Clutch",
    },
    {
      id: "itfirms-top-mobile",
      imageUrl: badge4_jpg,
      alt: "IT Firms Top Mobile App Development",
    },
    {
      id: "topdev-app-dev-2024",
      imageUrl: badge5_webp,
      alt: "Top App Developers 2024 TopDevelopers.co",
    },
    {
      id: "goodfirms-app-dev",
      imageUrl: badge6_png,
      alt: "GoodFirms App Development Badge",
    },
    {
      id: "iso-certified",
      imageUrl: badge8_jpeg,
      alt: "ISO 9001 Certified",
    },
  ];

  const duplicatedBadges = [
    ...certificateBadges,
    ...certificateBadges,
    ...certificateBadges,
  ];

  const autoplayPluginBadges = React.useRef(
    Autoplay({
      delay: 2200,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true,
    })
  );

  const sectionVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.97, rotate: -0.3 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 13,
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };
  const contentBlockVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.97 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };
  const imageBlockVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 15, delay: 0.1 },
    },
  };
  const individualCardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="pt-6 md:pt-10 pb-12 md:pb-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={contentBlockVariants}
          className="mb-10 md:mb-12 text-center lg:text-left"
        >
          <p className="text-xs sm:text-sm font-medium text-cyan-400 uppercase tracking-wider mb-1 inline-block relative lg:mx-0">
            Recognition
            <span className="absolute bottom-[-2px] left-0 w-1/2 h-0.5 bg-cyan-400"></span>
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
            Awarded & Certified
            <br className="hidden sm:block" />
            For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              Our Excellence
            </span>
          </h2>
          <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed mx-auto lg:mx-0">
            Our commitment to quality and innovation is recognized by leading
            industry platforms.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          <motion.div
            className="lg:w-[45%] flex flex-col"
            variants={contentBlockVariants}
          >
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 md:mb-10">
              {awardProviders.map((provider) => (
                <motion.div
                  key={provider.id}
                  className="relative bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700/80 hover:border-cyan-500/60 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 flex flex-col items-start text-left min-h-[220px] sm:min-h-[240px]"
                  variants={individualCardVariant}
                >
                  <img
                    src={provider.logoUrl}
                    alt={`${provider.name} Logo`}
                    className="h-16 md:h-20 mb-4 object-contain self-start"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      console.warn(`Error loading logo: ${provider.logoUrl}`);
                    }}
                  />
                  <p className="text-gray-200 text-sm mb-3 flex-grow">
                    {provider.description}
                  </p>
                  {provider.link && provider.link !== "#" && (
                    <a
                      href={provider.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto self-end group"
                      aria-label={`Visit ${provider.name} profile`}
                    >
                      <div className="w-9 h-9 rounded-full border-2 border-slate-500 group-hover:border-orange-500 group-hover:bg-orange-500/10 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105">
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="w-full" variants={individualCardVariant}>
              <Carousel
                opts={{ align: "start", loop: true, dragFree: true }}
                // plugins={[autoplayPluginBadges.current]}
                className="w-full bg-slate-800/60 py-4 px-2 rounded-lg border border-slate-700/70"
              >
                <CarouselContent className="-ml-3">
                  {duplicatedBadges.map((badge, index) => (
                    <CarouselItem
                      key={`${badge.id}-${index}`}
                      className="pl-3 basis-[30%] xs:basis-[25%] sm:basis-[22%] md:basis-[20%]"
                    >
                      <div className="p-1 bg-transparent rounded h-16 sm:h-20 flex items-center justify-center group hover:bg-slate-700/40 transition-colors">
                        <img
                          src={badge.imageUrl}
                          alt={badge.alt}
                          className="max-h-12 sm:max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                            console.warn(
                              `Error loading badge: ${badge.imageUrl}`
                            );
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-[55%] relative mt-8 lg:mt-0"
            variants={imageBlockVariants}
          >
            <div className="relative w-full aspect-[4/3.2] shadow-2xl shadow-black/40">
              <img
                src={teammeet}
                alt="Team collaborating on project"
                className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl rounded-bl-[70px] rounded-br-xl"
                loading="lazy"
              />
              <motion.div
                className="absolute top-[8%] right-[8%] w-[30%] md:w-[25%] aspect-video bg-slate-700/60 backdrop-blur-sm rounded-lg shadow-xl border border-slate-600/80 overflow-hidden"
                initial={{ opacity: 0, scale: 0.5, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.4,
                }}
                viewport={{ once: true }}
              >
                <img
                  src={teammeet}
                  alt="Team discussion"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CompanyAwards;
