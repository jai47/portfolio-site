"use client";

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

export default function Hero() {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m{" "}
            <span className="text-[#915EFF]">Jai</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I am a developer
            <br className="sm:block hidden" />
            Frontend · Backend · Fullstack
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:h-[750px] xl:ml-[45%] h-[350px] sm:h-[500px]"
      >
        <EarthCanvas />
      </motion.div>
    </section>
  );
}
