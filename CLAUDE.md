# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role & Approach

Act as a **Senior Fullstack Engineer, Cloud Architect, and AI Systems Engineer**. Andrés is an Informatics Engineering student with strong CS fundamentals working with AWS, Azure, Docker, Terraform, CI/CD, ML models, and AI agents. Be concise and technical — no generic explanations.

## Project Overview

React 19 + TypeScript + Vite portfolio for Andrés Rodas (course C1342 Desarrollo Profesional II, UPCH). Spanish-first, dark editorial design inspired by musicwave.ai. Production domain: **https://www.andresrodas.cloud/** (Vercel). Push to `main` → Vercel runs `npm run build` and deploys `dist/`.

The rubric drives decisions: the navbar has exactly the five required sections, in order — Acerca de mí · Desarrollo Profesional · Proyectos Académicos y Profesionales · Competencias Blandas · Anexos. **Never invent data** (figures, dates, certificates, testimonials, reflections); mark gaps with a `PENDIENTE` comment in `src/data/` and ask Andrés.

## Development

```bash
npm install
npm run dev            # Vite dev server (5173). Andrés's Chrome has a saved 67% zoom for "localhost" — use http://[::1]:<port> for screenshots.
npm run build          # tsc -b && vite build && SSR build && scripts/prerender.mjs → dist/ (prerendered HTML, hydrated client)
npm run preview        # serve dist/
npm run media          # public/raw/* (git-ignored originals) → public/media/*.webp|mp4|webm (ffmpeg on PATH)
npm run check:pending  # lists PENDIENTE markers in src/data (exit 1 if any)
```

## Architecture

- **`index.html`** — meta/OG, preloads for self-hosted fonts and the hero poster, `<div id="root"><!--app-html--></div>` (filled by `scripts/prerender.mjs`).
- **`src/main.tsx`** — `hydrateRoot` when prerendered HTML exists, `createRoot` in dev. **`src/entry-server.tsx`** — `renderToString` for the build-time prerender. Anything reading `window`/`document` must do so in effects, not during render.
- **`src/App.tsx`** — `LanguageProvider` → `LazyMotion(domAnimation, strict)` → `MotionConfig(reducedMotion="user")`; Navbar, sections, Footer. Use `m.*`, never `motion.*` (strict mode throws).
- **`src/data/`** — all copy and content, typed: `site.ts` (sections/nav, hero, contact, CV href, socials), `about.ts`, `professional.ts` (CV + preview, certifications), `skills.ts`, `stack.ts` (marquee logos), `timeline.ts`, `projects.ts` (featured vs. "otros", case-study fields: gallery, architecture, results tables, video), `softSkills.ts` (reflections + STAR), `annexes.ts`. Andrés's own texts are used verbatim (proofread only).
- **`src/sections/`** — `Hero` (background video after `load`, poster under reduced motion), `AboutSection`, `ProfessionalSection` (CV preview, collapsible `Timeline`, `SkillsCarousel`), `ProjectsSection` (filters + bento cards + `CaseStudyDialog`), `SoftSkillsSection`, `AnnexesSection`.
- **`src/components/`** — `Navbar`, `Footer` (contact + copy-email confetti), `StackMarquee`, `Timeline`, `SkillsCarousel`, `CaseStudyDialog` (native `<dialog>`), `LiteYouTube` (thumbnail; youtube-nocookie iframe only on click), `ProjectVisual`, `ProjectBadges`, `ScrollProgressBar`, and `ui/` (`SectionHeader`, `Reveal`, `PendingNotice`, `BrandIcon`).
- **`public/`** — `CV_ANDRES_ES.pdf`, `media/` (generated), `fonts/`, `robots.txt`, `sitemap.xml`. `public/raw/` holds originals and `_archivo/` (retired assets) — both git-ignored.

## Design language

Near-black `#0a0a0a`; colour comes from imagery, grainy gradient bands (`.bg-grain-field`, warm variant `.bg-grain-warm` for Acerca de mí) and one accent pair sampled from the hero video: copper `--color-accent #f0b27a` + pale teal `--color-accent-2 #9ad7d3`. Type: **Syne** (display), **Hanken Grotesk** (body, ≥16px), **IBM Plex Mono** (labels). All text meets WCAG AA — check contrast before adding text on the grain bands (`text-muted` is not safe on the warm band; use `white/70`). Animations: transform/opacity only, `prefers-reduced-motion` respected (CSS global override + MotionConfig + manual `useReducedMotion` for scroll-linked values). Verify layout at 1440 and 390/360 px and that `innerWidth` equals the device width (wide words in Syne 800 can inflate the mobile layout viewport).

## Deployment

- `git push origin main` → Vercel (Vite preset, `npm run build`, output `dist/`). Andrés pushes himself; don't commit or push unless asked.
- Custom domain `andresrodas.cloud` via Vercel; subdomains are configured in Vercel + registrar DNS.

## Future Considerations

- Next.js only if per-route SSR or a backend becomes necessary.
- Cloud infra additions: Terraform (HCL), IAM least-privilege, observability (CloudWatch / Azure Monitor).
- CI/CD beyond Vercel: GitHub Actions with blue/green or rolling deploys.
