import { ASSETS } from "./assets";

export { ASSETS } from "./assets";

export const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",
  heroHeadText:
    "font-extrabold text-white text-[80px] leading-[1.05] tracking-tight mt-2",
  heroSubText:
    "text-[#dfd9ff] font-semibold text-[35px] leading-[1.35]",
  sectionHeadText:
    "text-white font-black text-[28px] sm:text-[40px] md:text-[50px] lg:text-[60px]",
  sectionSubText:
    "text-[12px] sm:text-[14px] md:text-[18px] text-secondary uppercase tracking-wider",
};

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "tech", title: "Tech" },
  { id: "projects", title: "Projects" },
  { id: "education", title: "Education" },
  { id: "contact", title: "Contact" },
];

export const technologies = [
  { name: "JavaScript", icon: ASSETS.tech.javascript },
  { name: "TypeScript", icon: ASSETS.tech.typescript },
  { name: "Python", icon: ASSETS.tech.python },
  { name: "C#", icon: ASSETS.tech.csharp },
  { name: "C++", icon: ASSETS.tech.cplusplus },
  { name: "React.js", icon: ASSETS.tech.react },
  { name: "Next.js", icon: ASSETS.tech.nextjs },
  { name: "Tailwind CSS", icon: ASSETS.tech.tailwind },
  { name: "Redux Toolkit", icon: ASSETS.tech.redux },
  { name: "Framer Motion", icon: ASSETS.tech.framermotion },
  { name: "Node.js", icon: ASSETS.tech.nodejs },
  { name: "NestJS", icon: ASSETS.tech.nestjs },
  { name: "Express.js", icon: ASSETS.tech.express },
  { name: "FastAPI", icon: ASSETS.tech.fastapi },
  { name: "PostgreSQL", icon: ASSETS.tech.postgresql },
  { name: "MongoDB", icon: ASSETS.tech.mongodb },
  { name: "Redis", icon: ASSETS.tech.redis },
  { name: "Prisma", icon: ASSETS.tech.prisma },
  { name: "Docker", icon: ASSETS.tech.docker },
  { name: "AWS", icon: ASSETS.tech.aws },
  { name: "GraphQL", icon: ASSETS.tech.graphql },
  { name: "Git", icon: ASSETS.tech.git },
];

export const experiences = [
  {
    title: "Full Stack Software Engineer",
    company: "Cogneet",
    date: "Feb 2026 – Present",
    points: [
      "Developing and maintaining scalable full-stack applications across frontend and backend.",
      "Collaborating with cross-functional teams to deliver production-ready features.",
      "Optimizing system performance for reliable production deployments.",
    ],
  },
  {
    title: "Machine Learning Intern",
    company: "AlgoCure",
    date: "Feb 2026 – Mar 2026",
    points: [
      "Developing core algorithms driving proprietary machine learning models.",
      "Working on research-backed ML pipelines and model experimentation.",
    ],
  },
  {
    title: "Operational & Technical Lead Intern",
    company: "Xcubit",
    date: "Aug 2025 – Jan 2026",
    points: [
      "Led technical and operational workflows for event platform development.",
      "Coordinated between development and business teams for smooth product delivery.",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Vief.in / VastavIntellect.com",
    date: "Dec 2024 – Feb 2025",
    points: [
      "Built production features for a legal and IP consultancy platform.",
      "Implemented secure authentication, REST APIs, and content management workflows.",
    ],
  },
  {
    title: "Freelancer",
    company: "Self-Employed",
    date: "Sep 2023 – Present",
    points: [
      "Deliver personalized websites and digital solutions for businesses.",
      "Assess server issues and support scalability and performance improvements.",
    ],
  },
];

const tag = (name: string, color: string) => ({ name, color });

export const projects = [
  {
    name: "BikeBuddiesMore.com",
    description:
      "Headless commerce + community platform: 14-module NestJS backend, Shopify Storefront API (GraphQL) for product/cart/checkout, multi-vendor marketplace with HMAC webhooks, and a 23+ component admin dashboard.",
    tags: [
      tag("Remix", "blue-text-gradient"),
      tag("NestJS", "green-text-gradient"),
      tag("MongoDB", "pink-text-gradient"),
      tag("Shopify", "blue-text-gradient"),
      tag("GraphQL", "green-text-gradient"),
    ],
    image: ASSETS.projects.bikebuddies,
    live_link: "https://bikesbuddiesandmore.com/",
    // source_code_link: "https://github.com/jai47",
  },
  {
    name: "The Box Factory",
    description:
      "CRM-style enterprise inventory & ops system with row-level locking, three-layer security gate, automated low-stock alerts, and AI-powered search.",
    tags: [
      tag("Next.js", "blue-text-gradient"),
      tag("Payload CMS", "green-text-gradient"),
      tag("PostgreSQL", "pink-text-gradient"),
      tag("Docker", "blue-text-gradient"),
      tag("AWS", "green-text-gradient"),
    ],
    image: ASSETS.projects.boxFactory,
    live_link: "https://boxf.47.run",
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "Aakaar Medical",
    description:
      "CMS-powered product site with a 17-block layout builder, 6 Payload plugins, live preview, and on-demand ISR revalidation.",
    tags: [
      tag("Next.js", "blue-text-gradient"),
      tag("Payload CMS", "green-text-gradient"),
      tag("MongoDB", "pink-text-gradient"),
      tag("AWS", "blue-text-gradient"),
      tag("GSAP", "green-text-gradient"),
    ],
    image: ASSETS.projects.aakaar,
    live_link: "https://vm-aakaar.in",
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "HRMS",
    description:
      "20-module ERP-style HR system covering attendance, biometrics, payroll, leaves, reviews, and tasks with RBAC and Zod validation.",
    tags: [
      tag("Next.js", "blue-text-gradient"),
      tag("Prisma", "green-text-gradient"),
      tag("PostgreSQL", "pink-text-gradient"),
      tag("NextAuth", "blue-text-gradient"),
    ],
    image: ASSETS.projects.hrms,
    live_link: "https://hrms-sts3.vercel.app",
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "Xcubit.in",
    description:
      "Full-stack event hosting platform with ticket purchases, NextAuth auth, Razorpay payments, and Redis read-through caching — handled 3,000+ registrations.",
    tags: [
      tag("Next.js", "blue-text-gradient"),
      tag("MongoDB", "green-text-gradient"),
      tag("Redis", "pink-text-gradient"),
      tag("NextAuth", "blue-text-gradient"),
      tag("GSAP", "green-text-gradient"),
    ],
    image: ASSETS.projects.xcubit,
    live_link: "https://xcubit.vercel.app/",
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "VastavIntellect.com",
    description:
      "Production-grade legal & IP consultancy platform with React 19, JWT auth, TinyMCE CMS, document uploads, and Excel reporting.",
    tags: [
      tag("React", "blue-text-gradient"),
      tag("Node.js", "green-text-gradient"),
      tag("MongoDB", "pink-text-gradient"),
      tag("JWT", "blue-text-gradient"),
      tag("Express", "green-text-gradient"),
    ],
    image: ASSETS.projects.vastav,
    live_link: "https://vastavintellect.com",
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "Sankalp",
    description:
      "Centralized club management platform with event hosting, attendance tracking, verifiable certificates, Socket.io realtime updates, and Docker deployment.",
    tags: [
      tag("Next.js", "blue-text-gradient"),
      tag("Socket.io", "green-text-gradient"),
      tag("Redux", "pink-text-gradient"),
      tag("Express", "blue-text-gradient"),
      tag("Docker", "green-text-gradient"),
    ],
    image: ASSETS.projects.mobile,
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "Depression Detection",
    description:
      "Full-stack app detecting depression from voice samples using Wav2Vec2, XGBoost, and a Flask ML API — privacy-first, inspired by AICVMD-2025 research.",
    tags: [
      tag("Next.js", "blue-text-gradient"),
      tag("Flask", "green-text-gradient"),
      tag("Wav2Vec2", "pink-text-gradient"),
      tag("XGBoost", "blue-text-gradient"),
      tag("MongoDB", "green-text-gradient"),
    ],
    image: ASSETS.projects.backend,
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "Echiesta",
    description:
      "Live event registration platform that handled 3,000+ registrations and 1,300+ attendees — won 2nd prize at HackSplash.",
    tags: [
      tag("React", "blue-text-gradient"),
      tag("Node.js", "green-text-gradient"),
      tag("Express", "pink-text-gradient"),
      tag("Firebase", "blue-text-gradient"),
    ],
    image: ASSETS.projects.web,
    source_code_link: "https://github.com/jai47",
  },
];

export const projectTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.tags.map((t) => t.name)))
).sort((a, b) => a.localeCompare(b));

export const education = [
  {
    school: "Echelon Institute of Technology",
    affiliation: "Affiliated to J.C. Bose University, YMCA",
    degree: "B.Tech, Computer Science & Engineering",
    location: "Faridabad, Haryana",
    date: "2022 – 2026",
  },
];

export const siteConfig = {
  name: "Jai Mishra",
  title: "Jai | Portfolio",
  email: "official.jaimishra@gmail.com",
  phone: "+91 9599027965",
  location: "Faridabad, Haryana, 121001",
  linkedin: "https://linkedin.com/in/jai47",
  github: "https://github.com/jai47",
  about:
    "I'm a skilled full-stack software developer with experience in TypeScript and JavaScript, and expertise in frameworks like React, Next.js, Node.js, and Three.js. I build efficient, scalable, and user-friendly solutions — from event platforms and CMS systems to ML-powered applications. Currently working at Cogneet while freelancing and contributing to open-source projects.",
  heroTagline: "Frontend · Backend · Fullstack",
};
