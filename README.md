# Portafolio profesional – Andrés Rodas

Portafolio web de **Andrés Steven Rodas Janampa**, estudiante de Ingeniería Informática (UPCH) enfocado en **Cloud & AI**.
Entrega del curso C1342 Desarrollo Profesional II.

🔗 **Sitio en producción:** [andresrodas.cloud](https://www.andresrodas.cloud)

---

## Secciones

1. **Acerca de mí**: nombre completo, propósito del portafolio, plan de carrera y pasatiempos.
2. **Desarrollo Profesional**: CV en PDF con vista previa, LinkedIn, trayectoria 2023 → 2027 (plegable) y habilidades técnicas.
3. **Proyectos Académicos y Profesionales**: casos de estudio con filtros, evidencias, arquitectura, resultados y repositorios.
4. **Competencias Blandas**: reflexión por competencia y un caso práctico en formato STAR.
5. **Anexos**: reconocimientos y testimonios.

## Tecnologías

- **React 19 + TypeScript** con **Vite**; HTML prerenderizado en el build (SSG con `react-dom/server`) e hidratado en el cliente.
- **Tailwind CSS v4**, con los tokens de diseño en `@theme` (`src/index.css`).
- **Framer Motion** (`LazyMotion` + `domAnimation`): las animaciones usan solo transform/opacity y respetan `prefers-reduced-motion`.
- **lucide-react** y **simple-icons** para los íconos; fuentes autoalojadas (Syne, Hanken Grotesk e IBM Plex Mono).
- Despliegue en **Vercel**.

## Desarrollo local

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # tsc + vite build + prerender → dist/
npm run preview        # sirve el build de producción
npm run media          # optimiza los originales de public/raw/ → public/media/ (requiere ffmpeg)
npm run check:pending  # lista el contenido marcado como pendiente en src/data/
```

## Estructura

```text
├── index.html                 # shell de Vite: meta, preload de fuentes/poster, <!--app-html-->
├── scripts/
│   ├── media.mjs              # public/raw → public/media (WebP/MP4/WebM)
│   ├── prerender.mjs          # inyecta el HTML renderizado en dist/index.html
│   └── check-pending.mjs
├── src/
│   ├── main.tsx · entry-server.tsx · App.tsx · index.css
│   ├── data/                  # todo el contenido tipado (about, professional, projects, timeline, softSkills…)
│   ├── components/            # Navbar, Footer, Timeline, SkillsCarousel, CaseStudyDialog, LiteYouTube… + ui/
│   ├── sections/              # Hero, About, Professional, Projects, SoftSkills, Annexes
│   ├── context/               # LanguageContext (ES; EN preparado pero oculto)
│   └── hooks/                 # useScrollSpy
└── public/
    ├── CV_ANDRES_ES.pdf       # CV enlazado desde el sitio
    ├── media/                 # imágenes y video optimizados (generados con npm run media)
    ├── fonts/                 # fuentes autoalojadas
    └── raw/                   # originales sin optimizar — en .gitignore, no se suben
```

## Contacto

- Correo: me@andresrodas.cloud
- LinkedIn: [linkedin.com/in/andresrodas18](https://www.linkedin.com/in/andresrodas18)
- GitHub: [github.com/AndresRJ18](https://github.com/AndresRJ18)
