"use client";

import { motion } from "framer-motion";
import { styles } from "@/constants";

export default function SectionWrapper({
  idName,
  children,
}: {
  idName: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "tween", duration: 0.5, delay: 0.1 },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>
      {children}
    </motion.section>
  );
}
