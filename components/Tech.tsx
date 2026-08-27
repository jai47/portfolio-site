"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { styles, technologies } from "@/constants";

const BallCanvas = dynamic(() => import("@/components/canvas/Ball"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="canvas-loader" />
    </div>
  ),
});

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

export default function Tech() {
  return (
    <>
      <motion.div variants={fadeIn("", "", 0.1, 1)}>
        <p className={styles.sectionSubText}>What I have learned so far</p>
        <h2 className={styles.sectionHeadText}>Tech Explored.</h2>
      </motion.div>

      <div className="mt-20 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <motion.div
            variants={fadeIn("", "", 0.1, 1)}
            className="w-28 h-28"
            key={technology.name}
          >
            <BallCanvas icon={technology.icon} />
            <p className="text-secondary text-[14px] text-center mt-2">
              {technology.name}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
