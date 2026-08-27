"use client";

import { motion } from "framer-motion";
import { styles, education } from "@/constants";

export default function Education() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className={styles.sectionSubText}>Where I studied</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <div className="mt-10 flex flex-col gap-6">
        {education.map((item, index) => (
          <motion.article
            key={item.school}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative overflow-hidden border border-white/10 bg-black-100/80 px-6 py-7 sm:px-8 sm:py-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#915EFF] to-transparent" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[#915EFF] text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  {item.date}
                </p>
                <h3 className="mt-2 text-white text-[20px] sm:text-[26px] font-bold leading-tight">
                  {item.degree}
                </h3>
                <p className="mt-2 text-[#915EFF] text-[15px] sm:text-[17px] font-semibold">
                  {item.school}
                </p>
                <p className="mt-1 text-secondary text-[13px] sm:text-[14px]">
                  {item.affiliation}
                </p>
              </div>
              <p className="text-secondary text-[13px] sm:text-[15px] shrink-0 sm:pt-8">
                {item.location}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}
