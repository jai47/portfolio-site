"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { styles } from "@/constants";

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
  return (
    <section className="relative w-full min-h-[100dvh] mx-auto overflow-hidden">
      <div
        className={`relative z-10 max-w-7xl mx-auto ${styles.paddingX} pt-28 sm:pt-32 pb-8 md:absolute md:inset-0 md:top-[120px] md:pt-0 md:pb-0 flex flex-row items-start gap-4 sm:gap-5 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-3 sm:mt-5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 h-32 sm:h-40 md:h-80 violet-gradient" />
        </div>

        <div className="pointer-events-auto max-w-[min(100%,780px)]">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-[5] w-full h-[280px] xs:h-[320px] sm:h-[420px] md:absolute md:right-0 md:top-[40px] md:h-[720px] md:w-[58%] xl:w-[54%] cursor-grab active:cursor-grabbing"
      >
        <EarthCanvas />
      </motion.div>

      <div className="absolute bottom-6 sm:bottom-10 w-full flex justify-center items-center z-10 pointer-events-none">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="pointer-events-auto"
        >
          <div className="w-[30px] h-[54px] sm:w-[35px] sm:h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
