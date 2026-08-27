"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { styles, siteConfig } from "@/constants";

const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: "easeOut" },
  },
});

const contactDetails = [
  {
    label: "Location",
    value: siteConfig.location,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.location)}`,
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jai47",
    href: siteConfig.linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/jai47",
    href: siteConfig.github,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden">
      <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#915EFF] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-sm">
              Thank you. I will get back to you as soon as possible.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </motion.div>

      <motion.aside
        variants={fadeIn("right", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex-1 flex flex-col justify-start gap-6"
      >
        <div>
          <p className={styles.sectionSubText}>Details</p>
          <h3 className="text-white font-black text-[24px] sm:text-[32px] mt-1">
            Reach me directly.
          </h3>
        </div>

        <ul className="flex flex-col gap-1 border border-white/10 bg-black-100/60">
          {contactDetails.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                target={item.label === "Email" || item.label === "Phone" ? undefined : "_blank"}
                rel={item.label === "Email" || item.label === "Phone" ? undefined : "noreferrer"}
                className={`group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 px-5 py-4
                  transition-colors duration-200 hover:bg-[#915EFF]/10
                  ${index < contactDetails.length - 1 ? "border-b border-white/10" : ""}`}
              >
                <span className="text-secondary text-[12px] sm:text-[13px] uppercase tracking-wider font-semibold">
                  {item.label}
                </span>
                <span className="text-white text-[15px] sm:text-[16px] font-medium group-hover:text-[#915EFF] transition-colors">
                  {item.value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-secondary text-[14px] leading-relaxed max-w-md">
          Based in {siteConfig.location}. Open to full-time roles, freelance
          work, and collaboration.
        </p>
      </motion.aside>
    </div>
  );
}
