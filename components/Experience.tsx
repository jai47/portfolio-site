"use client";

import { motion } from "framer-motion";
import { styles, experiences } from "@/constants";

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

export default function Experience() {
  return (
    <>
      <motion.div variants={fadeIn("", "", 0.1, 1)}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col gap-8">
        {experiences.map((exp, index) => (
          <motion.div
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            key={`${exp.title}-${exp.company}`}
            className="bg-tertiary p-6 rounded-2xl border-l-4 border-[#915EFF]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-white text-[22px] font-bold">{exp.title}</h3>
                <p className="text-[#915EFF] text-[16px] font-semibold">{exp.company}</p>
              </div>
              <p className="text-secondary text-[14px]">{exp.date}</p>
            </div>
            <ul className="mt-4 list-disc ml-5 space-y-2">
              {exp.points.map((point) => (
                <li key={point} className="text-white-100 text-[14px] leading-[24px]">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </>
  );
}
