# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role & Approach

Act as a **Senior Fullstack Engineer, Cloud Architect, and AI Systems Engineer**. Andrés is an Informatics Engineering student with strong CS fundamentals working with AWS, Azure, Docker, Terraform, CI/CD, ML models, and AI agents. Be concise and technical — no generic explanations.

## Project Overview

React + TypeScript + Vite portfolio for Andrés Rodas, styled as a retro-arcade/CRT interface (neon glow, glitch text, scanlines, pixel-cut panels) with Tailwind CSS v4 and Framer Motion animations. Production domain: **https://www.andresrodas.cloud/** — custom domain connected to Vercel. Push to `main` → Vercel builds (`npm run build`) and auto-deploys `dist/`.

## Development

```bash
npm install
npm run dev       # Vite dev server (default port 5173; add `-- --port 8080` to pin a port)
npm run build     # tsc -b && vite build → dist/
npm run preview   # serve the production build locally
```

## Architecture

- **`index.html`** — Vite entry shell: meta/OG tags, Google Fonts (`Press Start 2P`, `VT323`, `IBM Plex Sans`, `IBM Plex Mono`), Font Awesome (brand/content icons), `<div id="root">`, `<script type="module" src="/src/main.tsx">`.
- **`src/main.tsx`** — React root, imports `index.css`.
- **`src/index.css`** — `@import "tailwindcss"` + `@theme` block defining all design tokens (colors, fonts, glow shadows, custom animations) and the `.clip-retro` / `.clip-retro-sm` pixel-corner utilities.
- **`src/App.tsx`** — composition root: `LanguageProvider`, boot-flicker overlay, `ScrollProgressBar`, `ScanlineOverlay`, `Navbar`, the five `<section>` components, `Footer`.
- **`src/context/LanguageContext.tsx`** — ES/EN state via React Context, persisted to `localStorage["language"]`; exposes `t(es, en)`.
- **`src/data/`** — all copy and structured content as typed data (`content.ts` nav/hero/about/contact/footer, `skills.ts`, `projects.ts`). Components map over these — no hardcoded copy in JSX beyond labels pulled from here.
- **`src/hooks/useScrollSpy.ts`** — tracks the active section id for nav highlighting.
- **`src/components/`** — `Navbar`, `Footer`, `ProjectCard` (hover/tap-expand detail via local state + `AnimatePresence`), `ScanlineOverlay`, `ScrollProgressBar`, and `ui/` primitives (`GlitchText`, `RetroPanel`, `Button`, `SectionHeader`).
- **`src/sections/`** — `Hero`, `About`, `Skills`, `Projects`, `Contact`, each a thin layout wrapper around the shared `ui/` primitives and Framer Motion `whileInView` stagger animations.
- **`public/`** — served as-is at the site root: `favicon.ico`, `CV_Andres_Rodas_upch.pdf`, `img/` (profile photo + project screenshots/GIFs).

## Design language — retro-arcade/CRT

Dark void background (`--color-void`), neon green as primary accent, neon cyan as secondary, neon magenta reserved for the glitch effect only. `Press Start 2P` for short pixel-font moments (hero name, logo), `VT323` for section titles, `IBM Plex Mono` for nav/tags/technical labels, `IBM Plex Sans` for body copy (kept non-monospace for readability). Panels use `RetroPanel` (clipped pixel corners + neon border + glow shadow) instead of border-radius/blur shadows. `ScanlineOverlay` is a fixed full-viewport CRT effect (scanlines + vignette + flicker); `GlitchText` renders chromatic-aberration duplicate layers on short headings. All custom animations respect `prefers-reduced-motion` (global override in `index.css` collapses durations to ~0).

## Key Patterns

- **Bilingual**: all copy lives in `src/data/*.ts` as `{ es, en }` pairs; components read via `useLanguage().t(es, en)`. No `data-es`/`data-en` DOM attributes anymore (that was the old static-HTML approach).
- **Section reveal**: Framer Motion `whileInView` + `staggerChildren` per section, `viewport={{ once: true }}` so it doesn't re-fire on scroll-back.
- **Project cards**: `ProjectCard` owns its own hover/expand state (`onHoverStart`/`onHoverEnd` + click for touch) — no shared DOM overlay hack like the old vanilla-JS version.
- **Confetti**: `canvas-confetti` fires on successful "copy email" in the Contact section.

## Deployment

- **Domain**: `andresrodas.cloud` — managed via Vercel custom domain (DNS configured at registrar).
- **Flow**: `git push origin main` → Vercel detects the Vite framework preset, runs `npm run build`, deploys `dist/` with SSL. **After the first push post-migration, confirm in the Vercel dashboard that the framework preset auto-detected as Vite** (build command `npm run build` / output directory `dist`) — this repo previously had no build step.
- If adding subdomains (e.g. `api.andresrodas.cloud`), configure in Vercel project settings + registrar DNS.

## Future Considerations

When evolving this project toward production-grade (e.g. adding a backend, blog, or API):
- Consider **Next.js** if SSR/SEO-per-route or a backend becomes necessary — the current Vite SPA is fine for a single-page portfolio.
- For any cloud infra additions: default to Terraform (HCL), include IAM least-privilege and observability (CloudWatch / Azure Monitor).
- For CI/CD beyond Vercel: GitHub Actions with blue/green or rolling deploy strategy.
