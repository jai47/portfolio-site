"use client";

import { useEffect, useRef, useState } from "react";
import { styles, experiences } from "@/constants";

const SHRINK_MOBILE = 0.04;
const SHRINK_DESKTOP = 0.055;
const MOBILE_STACK_STEP = 14;

function mobileNavOffset() {
  if (typeof window === "undefined") return 80;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-sticky-offset")
    .trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 80;
}

function stickyTopFor(index: number, isMobile: boolean) {
  if (!isMobile) return 100 + index * 22;
  return mobileNavOffset() + index * MOBILE_STACK_STEP;
}

function CardBody({
  exp,
  index,
  total,
  lite,
}: {
  exp: (typeof experiences)[number];
  index: number;
  total: number;
  lite?: boolean;
}) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#915EFF] to-transparent" />
      {!lite && (
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#915EFF]/15 blur-3xl" />
      )}

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
    </>
  );
}

function ExperienceStack({ isMobile }: { isMobile: boolean }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);
  const lastDepths = useRef<number[]>(experiences.map(() => 0));

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const shrink = isMobile ? SHRINK_MOBILE : SHRINK_DESKTOP;
    let raf = 0;
    let scheduled = false;

    const applyDepth = (index: number, depth: number) => {
      if (lastDepths.current[index] === depth) return;
      lastDepths.current[index] = depth;
      const el = articleRefs.current[index];
      if (!el) return;
      const scale = Math.max(0.86, 1 - depth * shrink);
      el.style.transform = `translate3d(0,0,0) scale(${scale})`;
    };

    const update = () => {
      scheduled = false;
      const cards = stack.querySelectorAll<HTMLElement>("[data-exp-card]");
      const tops: number[] = new Array(cards.length);
      for (let i = 0; i < cards.length; i++) {
        tops[i] = cards[i].getBoundingClientRect().top;
      }

      for (let index = 0; index < cards.length; index++) {
        const mySticky = stickyTopFor(index, isMobile);
        if (tops[index] > mySticky + 6) {
          applyDepth(index, 0);
          continue;
        }
        let behind = 0;
        for (let i = index + 1; i < tops.length; i++) {
          if (tops[i] <= stickyTopFor(i, isMobile) + 6) behind += 1;
        }
        applyDepth(index, behind);
      }
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("nav-offset-change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("nav-offset-change", onScroll);
    };
  }, [isMobile]);

  return (
    <div ref={stackRef} className="relative">
      {experiences.map((exp, index) => (
        <div
          key={`${exp.title}-${exp.company}`}
          data-exp-card
          className={`sticky last:mb-0 ${isMobile ? "mb-4" : "mb-6"}`}
          style={{
            top: isMobile
              ? `calc(var(--nav-sticky-offset, 80px) + ${index * MOBILE_STACK_STEP}px)`
              : `${stickyTopFor(index, false)}px`,
            zIndex: index + 1,
            transition: isMobile ? "top 0.3s ease-out" : undefined,
          }}
        >
          <article
            ref={(el) => {
              articleRefs.current[index] = el;
            }}
            className={`relative w-full overflow-hidden rounded-2xl border border-[#915EFF]/35 bg-[#151030] origin-top
              ${isMobile ? "p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)]" : "p-6 md:p-8 shadow-[0_28px_90px_rgba(0,0,0,0.55)]"}`}
            style={{
              transformOrigin: "top center",
              transform: "translate3d(0,0,0) scale(1)",
              transition:
                "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            <CardBody
              exp={exp}
              index={index}
              total={experiences.length}
              lite={isMobile}
            />
          </article>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative pb-8 scroll-mt-28">
      <div className="mb-6 sm:mb-8">
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </div>

      <ExperienceStack isMobile={isMobile} />
    </section>
  );
}
