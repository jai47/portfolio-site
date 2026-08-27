"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { styles } from "@/constants";
import About from "@/components/About";

const EarthCanvas = dynamic(() => import("@/components/canvas/Earth"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="canvas-loader" />
    </div>
  ),
});

const ROLES = ["Frontend", "Backend", "Fullstack"];

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const typingSpeed = deleting ? 45 : 90;
    const pauseAtFull = 1600;
    const pauseAtEmpty = 350;

    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), pauseAtFull);
      return () => clearTimeout(t);
    }

    if (deleting && display === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }, pauseAtEmpty);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setDisplay(
        deleting
          ? current.slice(0, display.length - 1)
          : current.slice(0, display.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(t);
  }, [display, deleting, roleIndex]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-[#915EFF]">{display}</span>
      <motion.span
        aria-hidden
        className="ml-0.5 inline-block w-[3px] h-[0.9em] translate-y-[0.1em] bg-[#915EFF]"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

function DownloadCvButton() {
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    fetch("/api/resume")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.resumeUrl === "string") setResumeUrl(data.resumeUrl);
      })
      .catch(() => {});
  }, []);

  if (!resumeUrl) return null;

  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-xl bg-[#915EFF] px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-[0_8px_30px_rgba(145,94,255,0.35)] transition hover:opacity-90"
    >
      Download CV
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });

  // Scroll slide only applied on mobile via style merge below
  const slideY = useTransform(smooth, [0, 1], [0, 240]);
  const slideX = useTransform(smooth, [0, 1], [0, 80]);
  const slideRotate = useTransform(smooth, [0, 1], [0, 14]);
  const slideOpacity = useTransform(smooth, [0, 0.6, 1], [1, 0.7, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full md:min-h-[100dvh] mx-auto overflow-hidden"
    >
      {/*
        Mobile: top-right decorative globe + scroll slide
        Desktop: large interactive globe on the right (unchanged)
      */}
      <motion.div
        initial={{ opacity: 0, y: isMobile ? -12 : 40, x: isMobile ? 36 : 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={
          isMobile
            ? "pointer-events-none absolute z-0 top-[4.25rem] right-[-22%] w-[72vw] max-w-[300px] aspect-square"
            : "pointer-events-auto absolute right-0 top-[40px] z-[5] h-[720px] w-[58%] xl:w-[54%] cursor-grab active:cursor-grabbing"
        }
        aria-hidden={isMobile}
      >
        {/* Inner layer: scroll slide on mobile only (avoids fighting entrance animate) */}
        <motion.div
          className="h-full w-full"
          style={
            isMobile
              ? {
                  x: slideX,
                  y: slideY,
                  rotate: slideRotate,
                  opacity: slideOpacity,
                }
              : undefined
          }
        >
          <EarthCanvas interactive={!isMobile} />
        </motion.div>
      </motion.div>

      <div
        className={`relative z-10 max-w-7xl mx-auto ${styles.paddingX} pt-28 pb-10
          md:absolute md:inset-0 md:top-[120px] md:pt-0 md:pb-0
          flex flex-row items-start gap-4 sm:gap-5 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-3 sm:mt-5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 h-32 sm:h-40 md:h-80 violet-gradient" />
        </div>

        <div className="pointer-events-auto w-full max-w-[min(100%,780px)]">
          {/* Leave room for the top-right globe on mobile */}
          <div className="relative z-10 pr-[28%] xs:pr-[26%] md:pr-0">
            <h1
              className="mt-2 text-white tracking-tight"
              style={{
                fontSize: "clamp(2.25rem, 8vw, 80px)",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              Hi, I&apos;m{" "}
              <span className="text-[#915EFF]">Jai</span>
            </h1>
            <p
              className="mt-3 sm:mt-5 text-white-100"
              style={{
                fontSize: "clamp(1.125rem, 3.5vw, 35px)",
                fontWeight: 600,
                lineHeight: 1.35,
              }}
            >
              I am a developer
              <br />
              <span className="inline-block mt-1 sm:mt-2 min-h-[1.2em]">
                <Typewriter />
              </span>
            </p>
            <DownloadCvButton />
          </div>

          {isMobile && (
            <motion.div
              id="about"
              className="mt-12 scroll-mt-24 relative z-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <About />
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 w-full hidden md:flex justify-center items-center z-10 pointer-events-none">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="pointer-events-auto"
        >
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
