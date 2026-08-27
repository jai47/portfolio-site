"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { styles, projects } from "@/constants";

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

export default function Projects() {
  return (
    <>
      <motion.div variants={fadeIn("", "", 0.1, 1)}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <motion.div
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            key={project.name}
          >
            <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full min-h-[420px] flex flex-col">
              <div
                className="relative w-full h-[230px] cursor-pointer"
                onClick={() => window.open(project.source_code_link, "_blank")}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <div className="mt-5 flex-1 flex flex-col">
                <h3 className="text-white font-bold text-[24px]">{project.name}</h3>
                <p className="mt-2 text-secondary text-[14px] flex-1">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <p key={`${project.name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
                    #{tag.name}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
