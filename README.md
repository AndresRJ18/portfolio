# 💼 Portafolio Personal – Andrés Rodas

Este repositorio contiene mi **portafolio web personal**, donde presento mi perfil profesional, proyectos, habilidades y mi CV.
El objetivo del sitio es servir como carta de presentación digital y punto central de contacto.

🔗 **Sitio en producción:**
👉 [andresrodas.cloud](https://andresrodas.cloud)

---

## 🚀 Tecnologías utilizadas

* **React 19 + TypeScript** – componentes y lógica del frontend
* **Vite** – build tool y dev server
* **Tailwind CSS v4** – estilos utilitarios (tokens de diseño vía `@theme`)
* **Framer Motion** – animaciones (entradas con stagger, glitch, scroll progress, hover/press)
* **canvas-confetti** – celebración al copiar el email de contacto
* **Vercel** – despliegue y hosting

Estética: **retro-arcade/CRT** — fondo oscuro, glow neón (verde/cyan), efecto glitch, scanlines y paneles con esquinas cortadas estilo pixel-art.

---

## 🖥️ Desarrollo local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve el build de producción
```

---

## 📁 Estructura del proyecto

```text
portfolio/
│── index.html            # shell de Vite
│── vite.config.ts
│── src/
│   │── main.tsx
│   │── App.tsx
│   │── index.css          # tokens de diseño (Tailwind v4 @theme) + keyframes
│   │── context/           # LanguageContext (ES/EN)
│   │── data/               # copy bilingüe, skills y proyectos (tipado)
│   │── hooks/               # useScrollSpy
│   │── components/          # Navbar, Footer, ProjectCard, overlays + ui/ (GlitchText, RetroPanel, Button)
│   └── sections/             # Hero, About, Skills, Projects, Contact
│── public/
│   │── favicon.ico
│   │── CV_Andres_Rodas_upch.pdf
│   └── img/                 # imágenes y GIFs de proyectos
│── README.md
```

---

## 🧩 Funcionalidades principales

* Presentación personal y perfil profesional, con efecto glitch en el nombre
* Sección de proyectos con detalle expandible al hover/tap
* Descarga directa del CV
* Toggle de idioma ES/EN
* Barra de progreso de scroll y overlay CRT (scanlines)
* Confetti al copiar el email de contacto
* Diseño responsive (adaptado a desktop y mobile), animaciones con `prefers-reduced-motion` respetado

---

## 📄 CV

El currículum actualizado se encuentra incluido en el repositorio:

📎 **CV_Andres_Rodas_upch.pdf**

---

## 🛠️ Deploy

El proyecto está desplegado automáticamente usando **Vercel**, lo que permite:

* Actualizaciones rápidas
* Alta disponibilidad
* Integración directa con GitHub

---

## 📌 Estado del proyecto

🟢 **Activo**
El portafolio se encuentra en constante mejora visual y funcional.

---

## 📬 Contacto

Si deseas contactarme o conocer más sobre mi trabajo, puedes hacerlo a través del portafolio web.

---

✨ *Gracias por visitar este repositorio.*
