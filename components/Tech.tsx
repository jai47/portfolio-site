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

function TechBall({
  name,
  icon,
  trackX,
}: {
  name: string;
  icon: string;
  trackX: MotionValue<number>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const baseCenter = useMotionValue(0);
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const measure = () => {
      const el = itemRef.current;
      if (!el) return;
      baseCenter.set(el.offsetLeft + el.offsetWidth / 2);
      // tighter influence so only near-center balls lift
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
    return 1 + mag * 0.28;
  });

  const y = useTransform([trackX, baseCenter], ([x, center]) => {
    const screenCenter =
      typeof window === "undefined" ? 0 : window.innerWidth / 2;
    const dist = (center as number) + (x as number) - screenCenter;
    const mag = dockMagnitude(dist, radius);
    return -mag * 22;
  });

  const zIndex = useTransform([trackX, baseCenter], ([x, center]) => {
    const screenCenter =
      typeof window === "undefined" ? 0 : window.innerWidth / 2;
    const dist = Math.abs(
      (center as number) + (x as number) - screenCenter
    );
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

  // Only as tall as needed: one viewport + horizontal travel distance
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

        <div className="flex-1 flex flex-col justify-center min-h-0 pb-16">
          <div className="h-[180px] sm:h-[200px] flex items-end">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-end gap-6 sm:gap-10 will-change-transform
                pl-[calc(50vw-70px)] sm:pl-[calc(50vw-80px)]
                pr-[calc(50vw-70px)] sm:pr-[calc(50vw-80px)]"
            >
              {technologies.map((technology) => (
                <TechBall
                  key={technology.name}
                  name={technology.name}
                  icon={technology.icon}
                  trackX={x}
                />
              ))}
            </motion.div>
          </div>

          <div className={`${styles.paddingX} max-w-7xl mx-auto w-full mt-8`}>
            <div className="h-1 w-full max-w-xs rounded-full bg-white/10 overflow-hidden">
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
