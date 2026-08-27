"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { styles, technologies } from "@/constants";

function dockMagnitude(distance: number, radius: number) {
  const t = Math.max(0, 1 - Math.abs(distance) / radius);
  return t * t * (3 - 2 * t);
}

/** Arc from bottom-left → rising through center → exiting top-right */
function pathOffsetY(screenX: number, width: number, height: number) {
  const t = Math.min(1, Math.max(0, screenX / Math.max(width, 1)));
  // Smooth ease: low on the left, lifts as it travels right
  const rise = t * t * (3 - 2 * t); // smoothstep
  const startY = height * 0.28; // bottom-left
  const endY = -height * 0.22; // top-right
  // Slight upward bulge in the middle of the arc
  const bulge = Math.sin(t * Math.PI) * -height * 0.06;
  return startY + (endY - startY) * rise + bulge;
}

function TechBall({
  name,
  icon,
  trackX,
  pathHeight,
}: {
  name: string;
  icon: string;
  trackX: MotionValue<number>;
  pathHeight: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const baseCenter = useMotionValue(0);
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const measure = () => {
      const el = itemRef.current;
      if (!el) return;
      baseCenter.set(el.offsetLeft + el.offsetWidth / 2);
      setRadius(Math.min(220, Math.max(150, window.innerWidth * 0.18)));
    };

    measure();
    window.addEventListener("resize", measure);
    const img = itemRef.current?.querySelector("img");
    img?.addEventListener("load", measure);
    const t = window.setTimeout(measure, 100);
    return () => {
      window.removeEventListener("resize", measure);
      img?.removeEventListener("load", measure);
      window.clearTimeout(t);
    };
  }, [baseCenter]);

  const scale = useTransform([trackX, baseCenter], ([x, center]) => {
    const screenCenter =
      typeof window === "undefined" ? 0 : window.innerWidth / 2;
    const dist = (center as number) + (x as number) - screenCenter;
    const mag = dockMagnitude(dist, radius);
    return 1 + mag * 0.32;
  });

  const y = useTransform([trackX, baseCenter], ([x, center]) => {
    const width = typeof window === "undefined" ? 1200 : window.innerWidth;
    const screenX = (center as number) + (x as number);
    const pathY = pathOffsetY(screenX, width, pathHeight);
    const screenCenter = width / 2;
    const dist = screenX - screenCenter;
    const mag = dockMagnitude(dist, radius);
    // Path arc + slight dock lift near center
    return pathY - mag * 18;
  });

  const zIndex = useTransform([trackX, baseCenter], ([x, center]) => {
    const screenCenter =
      typeof window === "undefined" ? 0 : window.innerWidth / 2;
    const dist = Math.abs((center as number) + (x as number) - screenCenter);
    return Math.round(1000 - dist);
  });

  const glow = useTransform([trackX, baseCenter], ([x, center]) => {
    const screenCenter =
      typeof window === "undefined" ? 0 : window.innerWidth / 2;
    const dist = (center as number) + (x as number) - screenCenter;
    const mag = dockMagnitude(dist, radius);
    return `0 10px ${12 + mag * 22}px rgba(145,94,255,${0.12 + mag * 0.28})`;
  });

  return (
    <motion.div
      ref={itemRef}
      style={{ scale, y, zIndex }}
      className="relative flex flex-col items-center shrink-0 w-[140px] sm:w-[160px] origin-bottom"
    >
      <motion.div
        style={{ boxShadow: glow }}
        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center
          bg-gradient-to-br from-[#2a2640] via-[#1a1630] to-[#0d0a1a]
          border border-[#915EFF]/40
          shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      >
        <div className="pointer-events-none absolute inset-[12%] rounded-full bg-gradient-to-br from-white/15 to-transparent" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt={name}
          width={56}
          height={56}
          className="relative z-[1] w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-md"
          draggable={false}
        />
      </motion.div>
      <p className="text-secondary text-[13px] sm:text-[14px] text-center mt-3 whitespace-nowrap">
        {name}
      </p>
    </motion.div>
  );
}

export default function Tech() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [pathHeight, setPathHeight] = useState(420);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.35,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const overflow = track.scrollWidth - window.innerWidth;
      setTravel(Math.max(overflow, 0));
      setPathHeight(Math.max(320, window.innerHeight * 0.48));
    };

    measure();
    window.addEventListener("resize", measure);
    const imgs = trackRef.current?.querySelectorAll("img") ?? [];
    imgs.forEach((img) => img.addEventListener("load", measure));
    const t = window.setTimeout(measure, 120);
    return () => {
      window.removeEventListener("resize", measure);
      imgs.forEach((img) => img.removeEventListener("load", measure));
      window.clearTimeout(t);
    };
  }, []);

  const sectionHeight =
    travel > 0 ? `calc(100vh + ${Math.round(travel * 0.85)}px)` : "180vh";

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative bg-primary"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col pt-24 sm:pt-28">
        <div className={`${styles.paddingX} max-w-7xl mx-auto w-full shrink-0`}>
          <p className={styles.sectionSubText}>What I have learned so far</p>
          <h2 className={styles.sectionHeadText}>Tech Explored.</h2>
        </div>

        <div className="relative flex-1 min-h-0">
          {/* Tall path stage so the arc has room */}
          <div
            className="absolute inset-x-0 top-[8%] bottom-[18%] flex items-center"
            style={{ minHeight: pathHeight }}
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-center gap-6 sm:gap-10 will-change-transform w-max
                pl-[calc(50vw-70px)] sm:pl-[calc(50vw-80px)]
                pr-[calc(50vw-70px)] sm:pr-[calc(50vw-80px)]"
            >
              {technologies.map((technology) => (
                <TechBall
                  key={technology.name}
                  name={technology.name}
                  icon={technology.icon}
                  trackX={x}
                  pathHeight={pathHeight}
                />
              ))}
            </motion.div>
          </div>

          {/* Progress bar — bottom right */}
          <div className="absolute bottom-8 right-6 sm:bottom-10 sm:right-10 md:right-16 z-10">
            <div className="h-1.5 w-40 sm:w-56 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full origin-left bg-[#915EFF]"
                style={{ scaleX: smoothProgress }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
