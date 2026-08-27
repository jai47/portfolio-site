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

export const projects = [
  {
    name: "BikeBuddiesMore.com",
    description:
      "Full-stack membership platform for a biking community with admin dashboards, Shopify sync, RSVP tracking, and bulk email workflows.",
    tags: [
      { name: "Remix", color: "blue-text-gradient" },
      { name: "NestJS", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
      { name: "Shopify", color: "blue-text-gradient" },
    ],
    image: ASSETS.projects.backend,
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "AAKAAR Medical",
    description:
      "CMS-powered medical website using Payload CMS, PostgreSQL, and S3 with dynamic layout builder, SEO, and scheduled publishing.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Payload CMS", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
      { name: "Docker", color: "blue-text-gradient" },
    ],
    image: ASSETS.projects.web,
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "Xcubit.in",
    description:
      "Event hosting platform with ticket purchases, NextAuth authentication, Razorpay payments, and Redis caching.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Redis", color: "pink-text-gradient" },
      { name: "GSAP", color: "blue-text-gradient" },
    ],
    image: ASSETS.projects.mobile,
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "VastavIntellect.com",
    description:
      "Production-grade legal consultancy platform with React 19, JWT auth, TinyMCE CMS, and document upload workflows.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
      { name: "JWT", color: "blue-text-gradient" },
    ],
    image: ASSETS.projects.creator,
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "Sankalp",
    description:
      "Centralized club management platform with event hosting, attendance tracking, verifiable certificates, and real-time updates.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Socket.io", color: "green-text-gradient" },
      { name: "Redux", color: "pink-text-gradient" },
      { name: "Docker", color: "blue-text-gradient" },
    ],
    image: ASSETS.projects.web,
    source_code_link: "https://github.com/jai47",
  },
  {
    name: "Depression Detection",
    description:
      "Full-stack app detecting depression from voice samples using Wav2Vec2, XGBoost, and a Flask ML API with privacy-first design.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Flask", color: "green-text-gradient" },
      { name: "ML", color: "pink-text-gradient" },
      { name: "MongoDB", color: "blue-text-gradient" },
    ],
    image: ASSETS.projects.backend,
    source_code_link: "https://github.com/jai47",
  },
];

export const siteConfig = {
  name: "Jai Mishra",
  title: "Jai | Portfolio",
  email: "official.jaimishra@gmail.com",
  phone: "+91 9599027965",
  linkedin: "https://linkedin.com/in/jai47",
  github: "https://github.com/jai47",
  about:
    "I'm a skilled full-stack software developer with experience in TypeScript and JavaScript, and expertise in frameworks like React, Next.js, Node.js, and Three.js. I build efficient, scalable, and user-friendly solutions — from event platforms and CMS systems to ML-powered applications. Currently working at Cogneet while freelancing and contributing to open-source projects.",
  heroTagline: "Frontend · Backend · Fullstack",
};
