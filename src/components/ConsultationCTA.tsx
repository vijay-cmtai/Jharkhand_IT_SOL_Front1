import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  MessageSquareText,
  CalendarDays,
  Send, // Icon for the submit button
  Loader2, // Icon for loading state
  User, // Icon for Name field
  Mail, // Icon for Email field
  Smartphone, // Icon for Phone field
  FileText, // Icon for Subject field (alternative: Edit2)
  AlignLeft, // Icon for Message field (alternative: MessageSquare)
} from "lucide-react";
// If you plan to use a toaster for notifications:
// import { toast } from "sonner";

const BASE_URL = "https://jharkhand-it-sol-back1.onrender.com/contact/submit"; // Or your dedicated consultation endpoint

interface ConsultationFormData {
  name: string;
  email: string;
  phone?: string; // Optional
  subject: string; // Made subject required to match the mirrored form structure
  message: string;
}

const initialConsultationFormData: ConsultationFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "Consultation Inquiry", // Default subject, user can change this
  message: "",
};

const ConsultationCTA = () => {
  const [formData, setFormData] = useState<ConsultationFormData>(
    initialConsultationFormData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Client-side validation, now includes subject
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus({
        success: false,
        message: "Please fill out Name, Email, Subject, and Message.",
      });
      // toast.error("Please fill out Name, Email, Subject, and Message.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid email address.",
      });
      // toast.error("Please enter a valid email address.");
      return;
    }
    if (formData.phone && !/^\+?[0-9\s-()]{7,20}$/.test(formData.phone)) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid phone number.",
      });
      // toast.error("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the current formData state
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseData.error ||
          responseData.message ||
          `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      setSubmitStatus({
        success: true,
        message:
          responseData.message ||
          "Inquiry sent successfully! We'll be in touch.",
      });
      // toast.success(responseData.message || "Inquiry sent successfully! We'll be in touch.");
      setFormData(initialConsultationFormData); // Reset form
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again.";
      setSubmitStatus({ success: false, message });
      // toast.error(message);
      console.error("Consultation submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation Variants (from your original code)
  const sectionVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9, rotate: 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 12,
        duration: 0.9,
        staggerChildren: 0.15,
      },
    },
  };
  const contentBlockVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
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
  const formBlockVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: 0.1,
        staggerChildren: 0.07,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="pt-12 md:pt-16 pb-16 md:pb-24 bg-gradient-to-br from-black via-slate-900 to-black text-white relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(to_bottom,transparent_10%,white_30%,white_70%,transparent_90%)]"></div>
      <motion.div
        className="absolute top-10 -left-20 w-72 h-72 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl opacity-70"
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 -right-20 w-80 h-80 bg-gradient-to-l from-sky-500/15 to-cyan-500/15 rounded-full blur-3xl opacity-70"
        animate={{ scale: [1, 1.25, 1], x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-16">
          {/* Left Content Block */}
          <motion.div
            className="lg:w-[45%] flex flex-col justify-center"
            variants={contentBlockVariants}
          >
            <motion.h2
              className="lg:text-[2.7rem] text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
              variants={itemVariants}
            >
              Ready to Ignite Your Business Transformation?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300/90 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Connect with our expert team for a complimentary consultation.
              We'll delve into your project needs and craft a bespoke solution
              to elevate your business.
            </motion.p>
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div
                className="flex items-start space-x-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/60 hover:border-pink-500/50 transition-colors duration-300"
                variants={itemVariants}
              >
                <div className="mt-1 flex-shrink-0 bg-gradient-to-br from-pink-500/30 to-orange-500/30 p-3 rounded-full text-pink-400 shadow-md">
                  <MessageSquareText size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Strategic Expert Guidance
                  </h3>
                  <p className="text-gray-400 text-sm leading-normal">
                    Receive tailored advice and actionable insights from our
                    seasoned industry consultants.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start space-x-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/60 hover:border-sky-500/50 transition-colors duration-300"
                variants={itemVariants}
              >
                <div className="mt-1 flex-shrink-0 bg-gradient-to-br from-sky-500/30 to-cyan-500/30 p-3 rounded-full text-sky-400 shadow-md">
                  <CalendarDays size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Seamless & Flexible Scheduling
                  </h3>
                  <p className="text-gray-400 text-sm leading-normal">
                    Choose a consultation time that effortlessly aligns with
                    your team's agenda.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Form Block */}
          <motion.div
            className="lg:w-[55%] bg-slate-800/60 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-2xl shadow-black/50 border border-slate-700/80"
            variants={formBlockVariants}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-6 text-white text-center lg:text-left"
              variants={itemVariants}
            >
              Connect With Our Experts
            </motion.h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="cta-name"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                      type="text"
                      id="cta-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                      placeholder="e.g., John Doe"
                    />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="cta-email"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                      type="email"
                      id="cta-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="cta-phone"
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                >
                  Phone Number{" "}
                  <span className="text-xs text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Smartphone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="tel"
                    id="cta-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="cta-subject"
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    id="cta-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300"
                    placeholder="e.g., Consultation for Web Project"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="cta-message"
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <AlignLeft
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400 pointer-events-none"
                  />
                  <textarea
                    id="cta-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 resize-none"
                    placeholder="Briefly describe your project or question..."
                  />
                </div>
              </motion.div>

              {submitStatus && (
                <motion.div
                  variants={itemVariants}
                  className={`p-3 rounded-md text-sm ${
                    submitStatus.success
                      ? "bg-green-600/20 text-green-300 border border-green-500/30"
                      : "bg-red-600/20 text-red-300 border border-red-500/30"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-base disabled:opacity-70 disabled:cursor-not-allowed"
                variants={itemVariants}
                whileHover={
                  !isSubmitting
                    ? {
                        scale: 1.03,
                        transition: { type: "spring", stiffness: 300 },
                      }
                    : {}
                }
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Your Inquiry
                    <Send className="ml-2.5 h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ConsultationCTA;
