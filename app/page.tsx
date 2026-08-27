"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tech from "@/components/Tech";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import SectionWrapper from "@/components/SectionWrapper";

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

      <SectionWrapper idName="work">
        <Projects />
      </SectionWrapper>

      <SectionWrapper idName="experience">
        <Experience />
      </SectionWrapper>

      <SectionWrapper idName="tech">
        <Tech />
      </SectionWrapper>

      <div className="relative z-0">
        <SectionWrapper idName="contact">
          <Contact />
        </SectionWrapper>
        <StarsCanvas />
      </div>
    </div>
  );
}
