"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { styles, experiences } from "@/constants";

const SHRINK_PER_LEVEL = 0.055;
const FADE_PER_LEVEL = 0.08;

function stickyTopFor(index: number, isMobile: boolean) {
  const base = isMobile ? 72 : 100;
  const step = isMobile ? 14 : 22;
  return base + index * step;
}

function ExperienceCard({
  exp,
  index,
  total,
  isMobile,
}: {
  exp: (typeof experiences)[number];
  index: number;
  total: number;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const depth = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.25"],
  });

  const enterScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const enterOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.55, 0.9, 1]
  );
  const enterY = useTransform(scrollYProgress, [0, 1], [28, 0]);

  useEffect(() => {
    const updateDepth = () => {
      const el = cardRef.current;
      if (!el) return;

      const mobile = window.innerWidth < 768;
      const mySticky = stickyTopFor(index, mobile);
      const myTop = el.getBoundingClientRect().top;

      if (myTop > mySticky + 6) {
        depth.set(0);
        return;
      }

      const stack = el.parentElement;
      if (!stack) return;
      const siblings = stack.querySelectorAll<HTMLElement>("[data-exp-card]");
      let behind = 0;
      siblings.forEach((sibling, i) => {
        if (i <= index) return;
        const top = sibling.getBoundingClientRect().top;
        if (top <= stickyTopFor(i, mobile) + 6) behind += 1;
      });

      depth.set(behind);
    };

    updateDepth();
    window.addEventListener("scroll", updateDepth, { passive: true });
    window.addEventListener("resize", updateDepth);
    return () => {
      window.removeEventListener("scroll", updateDepth);
      window.removeEventListener("resize", updateDepth);
    };
  }, [depth, index]);

  const stackScale = useTransform(depth, (d) => 1 - d * SHRINK_PER_LEVEL);
  const stackOpacity = useTransform(depth, (d) => 1 - d * FADE_PER_LEVEL);

  const combinedScale = useTransform(
    [enterScale, stackScale],
    ([enter, stack]) => (enter as number) * (stack as number)
  );
  const combinedOpacity = useTransform(
    [enterOpacity, stackOpacity],
    ([enter, stack]) => (enter as number) * (stack as number)
  );

  const scale = useSpring(combinedScale, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });
  const opacity = useSpring(combinedOpacity, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });
  const y = useSpring(enterY, { stiffness: 140, damping: 28, mass: 0.3 });

  return (
    <div
      ref={cardRef}
      data-exp-card
      className="sticky mb-4 sm:mb-6 last:mb-0"
      style={{
        top: `${stickyTopFor(index, isMobile)}px`,
        zIndex: index + 1,
      }}
    >
      <motion.article
        style={{ scale, opacity, y }}
        className="relative w-full overflow-hidden rounded-2xl border border-[#915EFF]/35 bg-[#151030] p-4 sm:p-6 md:p-8 shadow-[0_28px_90px_rgba(0,0,0,0.55)] origin-top"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#915EFF] to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#915EFF]/15 blur-3xl" />

        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[#915EFF] text-xs sm:text-sm font-semibold tracking-wider uppercase">
              {String(index + 1).padStart(2, "0")} —{" "}
              {String(total).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-white text-[20px] sm:text-[28px] font-bold leading-tight">
              {exp.title}
            </h3>
            <p className="mt-1 text-[#915EFF] text-[15px] sm:text-[18px] font-semibold">
              {exp.company}
            </p>
          </div>
          <p className="text-secondary text-[13px] sm:text-[15px] shrink-0 sm:pt-8">
            {exp.date}
          </p>
        </div>

        <ul className="relative mt-4 sm:mt-5 list-disc ml-5 space-y-2">
          {exp.points.map((point) => (
            <li
              key={point}
              className="text-white-100 text-[13px] sm:text-[15px] leading-[22px] sm:leading-[24px]"
            >
              {point}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="relative pb-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="relative">
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={`${exp.title}-${exp.company}`}
            exp={exp}
            index={index}
            total={experiences.length}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}
