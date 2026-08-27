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
      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#915EFF] px-6 py-3 text-base font-semibold text-white shadow-[0_8px_30px_rgba(145,94,255,0.35)] transition hover:opacity-90"
    >
      Download CV
    </a>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="pointer-events-auto max-w-[min(100%,780px)]">
          <h1
            className="mt-2 text-white tracking-tight"
            style={{ fontSize: "80px", fontWeight: 800, lineHeight: 1.05 }}
          >
            Hi, I&apos;m{" "}
            <span className="text-[#915EFF]">Jai</span>
          </h1>
          <p
            className="mt-4 sm:mt-5 text-white-100"
            style={{ fontSize: "35px", fontWeight: 600, lineHeight: 1.35 }}
          >
            I am a developer
            <br />
            <span className="inline-block mt-2 min-h-[1.2em]">
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
        className="absolute right-0 top-[120px] z-[5] w-full h-[380px] sm:h-[520px] md:top-[40px] md:h-[720px] md:w-[58%] xl:w-[54%] cursor-grab active:cursor-grabbing"
      >
        <EarthCanvas />
      </motion.div>

      <div className="absolute bottom-10 w-full flex justify-center items-center z-10 pointer-events-none">
        <a href="#about" aria-label="Scroll to about" className="pointer-events-auto">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
