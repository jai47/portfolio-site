# Jai Mishra — Portfolio (Next.js + Three.js)

A 3D portfolio website built with **Next.js**, **React Three Fiber**, and **Three.js**, featuring an interactive planet model, contact form, and admin panel.

## Features

- **3D Planet Hero** — Interactive GLTF planet model with auto-rotation
- **Tech Stack Balls** — 3D floating tech icons
- **Projects & Experience** — Populated from resume
- **Contact Form** — Saves submissions to local JSON storage
- **Admin Panel** — View, mark read/unread, and delete messages at `/admin`

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local and set ADMIN_PASSWORD
npm run dev
```

- **Portfolio:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ADMIN_PASSWORD` | Password for admin login |
| `ADMIN_SECRET` | JWT signing secret (optional, falls back to ADMIN_PASSWORD) |

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (contact, admin)
│   ├── admin/              # Admin dashboard & login
│   ├── layout.tsx
│   └── page.tsx
├── components/             # React components
│   └── canvas/             # Three.js canvas components
├── constants/              # Site content & asset paths
│   ├── assets.ts           # Centralized public asset URLs
│   └── index.ts            # Projects, experience, config
├── lib/                    # Auth & database helpers
├── data/                   # Contact message storage
├── docs/                   # Resume & reference documents
└── public/
    ├── assets/
    │   ├── backgrounds/    # Hero backgrounds
    │   ├── icons/          # Logo, menu, close icons
    │   ├── projects/       # Project card images
    │   └── tech/           # Tech stack icons
    └── models/
        └── planet/         # 3D planet GLTF model
```

## Deploy

Works on Vercel, Netlify, or any Node.js host. Set `ADMIN_PASSWORD` in your deployment environment.

For serverless deployments, consider upgrading message storage to a database (MongoDB, Supabase, etc.) since file-based storage requires a persistent filesystem.
