"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
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

/** Shallow arc: slight rise toward the right, mild dip toward the left */
function pathOffsetY(screenX: number, width: number, height: number) {
  const t = Math.min(1, Math.max(0, screenX / Math.max(width, 1)));
  const bottomY = height * 0.1;
  const midY = height * 0.01;
  const topY = -height * 0.12;
  const u = 1 - t;
  return u * u * bottomY + 2 * u * t * midY + t * t * topY;
}

function TechBallStatic({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="relative flex flex-col items-center shrink-0 w-[100px]">
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center
          bg-gradient-to-br from-[#2a2640] via-[#1a1630] to-[#0d0a1a]
          border border-[#915EFF]/40
          shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      >
        <div className="pointer-events-none absolute inset-[12%] rounded-full bg-gradient-to-br from-white/15 to-transparent" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt={name}
          width={40}
          height={40}
          className="relative z-[1] w-10 h-10 object-contain drop-shadow-md"
          draggable={false}
        />
      </div>
      <p className="text-secondary text-[11px] text-center mt-2 whitespace-nowrap">
        {name}
      </p>
    </div>
  );
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
  const [radius, setRadius] = useState(220);

  useEffect(() => {
    const measure = () => {
      const el = itemRef.current;
      if (!el) return;
      baseCenter.set(el.offsetLeft + el.offsetWidth / 2);
      setRadius(Math.min(220, Math.max(100, window.innerWidth * 0.18)));
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
    return 1 + dockMagnitude(dist, radius) * 0.32;
  });

  const y = useTransform([trackX, baseCenter], ([x, center]) => {
    const width = typeof window === "undefined" ? 1200 : window.innerWidth;
    const screenX = (center as number) + (x as number);
    const pathY = pathOffsetY(screenX, width, pathHeight);
    const dist = screenX - width / 2;
    return pathY - dockMagnitude(dist, radius) * 18;
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
      className="relative flex flex-col items-center shrink-0 w-[160px] origin-bottom"
    >
      <motion.div
        style={{ boxShadow: glow }}
        className="relative w-28 h-28 rounded-full flex items-center justify-center
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
          className="relative z-[1] w-14 h-14 object-contain drop-shadow-md"
          draggable={false}
        />
      </motion.div>
      <p className="text-secondary text-[14px] text-center mt-3 whitespace-nowrap">
        {name}
      </p>
    </motion.div>
  );
}

function MobileTechScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const x = useMotionValue(0);

  // Two copies — loop by wrapping translateX by one set width
  const loopItems = [...technologies, ...technologies];

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setWidthRef.current = track.scrollWidth / 2;
    };

    measure();
    const imgs = trackRef.current?.querySelectorAll("img") ?? [];
    imgs.forEach((img) => img.addEventListener("load", measure));
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 80);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
      imgs.forEach((img) => img.removeEventListener("load", measure));
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const wrapX = () => {
    const w = setWidthRef.current;
    if (w <= 0) return;
    let v = x.get();
    // Keep x in (-w, 0]
    v = ((v % w) + w) % w;
    if (v > 0) v -= w;
    x.set(v);
  };

  useAnimationFrame((_, delta) => {
    if (
      draggingRef.current ||
      pausedRef.current ||
      reduceMotionRef.current ||
      setWidthRef.current <= 0
    ) {
      return;
    }
    // Delta-time based — smooth at any refresh rate
    const pxPerSecond = 36;
    x.set(x.get() - (pxPerSecond * Math.min(delta, 32)) / 1000);
    wrapX();
  });

  const pauseAuto = () => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const resumeAutoSoon = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 1600);
  };

  return (
    <section className="relative bg-primary md:hidden py-16">
      <div className={`${styles.paddingX} max-w-7xl mx-auto w-full`}>
        <p className={styles.sectionSubText}>What I have learned so far</p>
        <h2 className={styles.sectionHeadText}>Tech Explored.</h2>
      </div>

      <div className="mt-10 overflow-hidden pb-4">
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragElastic={0.04}
          dragMomentum
          dragTransition={{ power: 0.2, timeConstant: 220 }}
          onDragStart={() => {
            draggingRef.current = true;
            pauseAuto();
          }}
          onDrag={() => wrapX()}
          onDragEnd={() => {
            draggingRef.current = false;
            wrapX();
            resumeAutoSoon();
          }}
          className="flex items-center gap-5 w-max px-6 will-change-transform
            cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {loopItems.map((technology, i) => (
            <TechBallStatic
              key={`${technology.name}-${i}`}
              name={technology.name}
              icon={technology.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DesktopTechScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [pathHeight, setPathHeight] = useState(380);

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
      setPathHeight(Math.max(320, window.innerHeight * 0.42));
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
    travel > 0 ? `calc(100vh + ${Math.round(travel * 0.85)}px)` : "160vh";

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary hidden md:block"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col pt-28">
        <div className={`${styles.paddingX} max-w-7xl mx-auto w-full shrink-0`}>
          <p className={styles.sectionSubText}>What I have learned so far</p>
          <h2 className={styles.sectionHeadText}>Tech Explored.</h2>
        </div>

        <div className="relative flex-1 min-h-0">
          <div
            className="absolute inset-x-0 top-[4%] bottom-[14%] flex items-center"
            style={{ minHeight: pathHeight }}
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-center gap-10 will-change-transform w-max
                pl-[calc(50vw-80px)] pr-[calc(50vw-80px)]"
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

          <div className="absolute bottom-10 right-10 md:right-16 z-10">
            <div className="h-1.5 w-56 rounded-full bg-white/10 overflow-hidden">
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

export default function Tech() {
  return (
    <div id="tech">
      <MobileTechScroll />
      <DesktopTechScroll />
    </div>
  );
}
