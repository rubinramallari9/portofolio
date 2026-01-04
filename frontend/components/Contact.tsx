"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // Simulate form submission
    // TODO: Integrate with your preferred contact form service (e.g., Formspree, EmailJS, or API endpoint)
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      setStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-text-secondary text-center mb-16 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Drop me a message!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="glass glass-hover rounded-3xl p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-500/10 to-blue-500/10 rounded-full blur-3xl" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Name field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                  focus:bg-white/10 focus:border-blue-400/50 focus:shadow-[0_0_20px_rgba(96,165,250,0.2)]
                  transition-all duration-300 outline-none text-text-primary placeholder:text-text-tertiary"
                  placeholder="Your name"
                />
              </motion.div>

              {/* Email field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                  focus:bg-white/10 focus:border-blue-400/50 focus:shadow-[0_0_20px_rgba(96,165,250,0.2)]
                  transition-all duration-300 outline-none text-text-primary placeholder:text-text-tertiary"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              {/* Message field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  rows={5}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl
                  focus:bg-white/10 focus:border-blue-400/50 focus:shadow-[0_0_20px_rgba(96,165,250,0.2)]
                  transition-all duration-300 outline-none text-text-primary placeholder:text-text-tertiary resize-none"
                  placeholder="Your message..."
                />
              </motion.div>

              {/* Status message */}
              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      status.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {status.type === "success" ? (
                      <HiCheckCircle className="text-2xl flex-shrink-0" />
                    ) : (
                      <HiXCircle className="text-2xl flex-shrink-0" />
                    )}
                    <p className="text-sm">{status.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-blue-400 rounded-xl font-semibold text-black overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(96,165,250,0.5)] hover:bg-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
