"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ASSETS, navLinks, styles } from "@/constants";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let raf = 0;
    let scheduled = false;

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(() => {
        scheduled = false;
        const y = window.scrollY;
        const isMobile = window.innerWidth < 640;
        const delta = y - lastY.current;

        setScrolled(y > 24);

        if (!isMobile || toggle) {
          setHidden(false);
        } else if (y < 56) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
          setToggle(false);
        } else if (delta < -6) {
          setHidden(false);
        }

        lastY.current = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [toggle]);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const offset = isMobile && hidden ? "12px" : "80px";
    document.documentElement.style.setProperty("--nav-sticky-offset", offset);
    window.dispatchEvent(new Event("nav-offset-change"));
    return () => {
      document.documentElement.style.removeProperty("--nav-sticky-offset");
    };
  }, [hidden]);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20
        transition-transform duration-300 ease-out
        ${hidden ? "-translate-y-full pointer-events-none" : "translate-y-0"}`}
    >
      {/* Animated backdrop — opacity fades instead of snapping bg color */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 bg-primary/95 backdrop-blur-md
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          transition-opacity duration-300 ease-out
          ${scrolled ? "opacity-100" : "opacity-0"}`}
      />

      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <Image
            src={ASSETS.icons.logo}
            alt="logo"
            width={28}
            height={28}
            className="w-9 h-9 object-contain"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Jai&nbsp;
            <span className="sm:block hidden">| Portfolio</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`font-poppins font-medium cursor-pointer text-[16px] ${
                active === nav.title ? "text-white" : "text-secondary"
              }`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            onClick={() => setToggle((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl
              border border-[#915EFF]/45 bg-tertiary text-white
              shadow-[0_0_20px_rgba(145,94,255,0.18)]
              transition hover:border-[#915EFF] hover:bg-[#1a1435]"
          >
            {toggle ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="#915EFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                <path
                  d="M1 1h16M1 7h16M5 13h12"
                  stroke="#E6E0FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } absolute top-[4.5rem] right-4 z-10 min-w-[180px] flex-col gap-1
              rounded-2xl border border-[#915EFF]/40 bg-[#151030] p-3
              shadow-[0_20px_50px_rgba(5,8,22,0.75)]
              transition-opacity duration-200`}
          >
            <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#915EFF] to-transparent" />
            <ul className="list-none flex flex-col gap-1">
              {navLinks.map((nav) => {
                const isActive = active === nav.title;
                return (
                  <li key={nav.id}>
                    <a
                      href={`#${nav.id}`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                      className={`block rounded-xl px-4 py-2.5 text-[15px] font-medium transition ${
                        isActive
                          ? "bg-[#915EFF]/20 text-white"
                          : "text-secondary hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {nav.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
