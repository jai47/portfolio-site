"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tech from "@/components/Tech";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import SectionWrapper from "@/components/SectionWrapper";
import { styles } from "@/constants";

const StarsCanvas = dynamic(
  () => import("@/components/canvas/Ball").then((mod) => mod.StarsCanvas),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>

      <SectionWrapper idName="about">
        <About />
      </SectionWrapper>

      {/* Own section (no transform ancestor) so sticky card stacking works */}
      <section
        className={`${styles.paddingX} pt-10 sm:pt-16 pb-4 max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id="experience">
          &nbsp;
        </span>
        <Experience />
      </section>

      {/* Own section (no transform ancestor) so sticky horizontal scroll works */}
      <Tech />

      <div className="relative z-0">
        <section
          className={`${styles.paddingX} pt-8 sm:pt-12 pb-16 sm:pb-20 max-w-7xl mx-auto relative z-0`}
        >
          <span className="hash-span" id="contact">
            &nbsp;
          </span>
          <Contact />
        </section>
        <StarsCanvas />
      </div>
    </div>
  );
}
