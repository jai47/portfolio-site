"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { styles, projects, projectTechnologies } from "@/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", delay: i * 0.06, duration: 0.55 },
  }),
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

export default function Projects() {
  const [activeTech, setActiveTech] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeTech === "All") return projects;
    return projects.filter((p) =>
      p.tags.some((t) => t.name === activeTech)
    );
  }, [activeTech]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
        <p className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-[28px]">
          Featured builds from production freelancing and research — filter by
          technology to explore the stack behind each one.
        </p>
      </motion.div>

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by technology"
      >
        {["All", ...projectTechnologies].map((tech) => {
          const selected = activeTech === tech;
          return (
            <button
              key={tech}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTech(tech)}
              className={`px-3.5 py-1.5 text-[13px] sm:text-[14px] font-medium transition-colors duration-200
                border outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]/60
                ${
                  selected
                    ? "bg-[#915EFF]/20 border-[#915EFF] text-white"
                    : "bg-transparent border-white/10 text-secondary hover:border-white/25 hover:text-white"
                }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-secondary text-[13px]">
        Showing {filtered.length} of {projects.length} projects
        {activeTech !== "All" ? ` · ${activeTech}` : ""}
      </p>

      <motion.div layout className="mt-10 flex flex-wrap gap-7">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => {
            const href =
              ("live_link" in project && project.live_link) ||
              ("source_code_link" in project && project.source_code_link) ||
              undefined;
            return (
              <motion.article
                layout
                key={project.name}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="exit"
                className="bg-tertiary p-5 sm:w-[360px] w-full min-h-[420px] flex flex-col
                  border border-white/5 hover:border-[#915EFF]/35 transition-colors duration-300"
              >
                <div
                  className={`relative w-full h-[230px] group overflow-hidden ${href ? "cursor-pointer" : ""}`}
                  onClick={() => href && window.open(href, "_blank")}
                  role={href ? "link" : undefined}
                  tabIndex={href ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (!href) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      window.open(href, "_blank");
                    }
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
                  {"live_link" in project && project.live_link && (
                    <span className="absolute bottom-3 left-3 text-[12px] font-medium text-white/90 tracking-wide">
                      View live →
                    </span>
                  )}
                </div>

                <div className="mt-5 flex-1 flex flex-col">
                  <h3 className="text-white font-bold text-[22px] sm:text-[24px] leading-tight">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-secondary text-[14px] flex-1 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <button
                      key={`${project.name}-${tag.name}`}
                      type="button"
                      onClick={() => setActiveTech(tag.name)}
                      className={`text-[13px] ${tag.color} hover:opacity-80 transition-opacity`}
                    >
                      #{tag.name}
                    </button>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-secondary text-[15px]">
          No projects match this technology. Try another filter.
        </p>
      )}
    </>
  );
}
