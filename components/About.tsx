"use client";

import { motion } from "framer-motion";
import { styles, siteConfig } from "@/constants";

const fadeIn = (direction: string, type: string, delay: number, duration: number) => ({
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

export default function About() {
  return (
    <>
      <motion.div variants={fadeIn("", "", 0.1, 1)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {siteConfig.about}
      </motion.p>

      <motion.div
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-8 flex flex-wrap gap-4"
      >
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="bg-tertiary py-3 px-5 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition"
        >
          GitHub
        </a>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noreferrer"
          className="bg-tertiary py-3 px-5 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="bg-tertiary py-3 px-5 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition"
        >
          Email
        </a>
      </motion.div>
    </>
  );
}
