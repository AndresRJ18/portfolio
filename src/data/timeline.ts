import type { Bi } from './types';

export interface Milestone {
    id: string;
    /** Display date as Andrés confirmed it (month only when known). */
    date: Bi;
    /** Sort key: year + month/100 (no month → .00). */
    order: number;
    title: Bi;
    detail?: Bi;
    kind: 'academico' | 'reconocimiento' | 'proyecto' | 'programa';
    /** Gets the large-photo treatment. */
    featured?: boolean;
    /** Photo under /media/… (public/raw → npm run media). */
    photo?: { src: string; srcSet: string; width: number; height: number; alt: Bi };
}

/** Confirmed by Andrés on 26–27/11/2026. Photos still pending (CADE → public/raw/cade/). */
export const milestones: Milestone[] = [
    { id: 'ingreso', date: { es: '2023' }, order: 2023.0, kind: 'academico', title: { es: 'Ingreso a Ingeniería Informática' }, detail: { es: 'Universidad Peruana Cayetano Heredia, Lima.' } },
    { id: 'veyro', date: { es: '2025' }, order: 2025.0, kind: 'reconocimiento', title: { es: '2.º lugar, hackathon VEYRO' }, detail: { es: 'Seguridad con cámara e IA, en equipo.' }, photo: { src: '/media/tl-veyro-1200.webp', srcSet: '/media/tl-veyro-640.webp 640w, /media/tl-veyro-1200.webp 1200w', width: 1200, height: 798, alt: { es: 'Foto grupal de los participantes del hackathon VEYRO' } } },
    { id: 'aws-scholars', date: { es: '2025' }, order: 2025.001, kind: 'programa', title: { es: 'AWS AI & ML Scholars Challenge' } },
    {
        id: 'quim-detect2',
        date: { es: '2025-II' },
        order: 2025.08,
        kind: 'proyecto',
        featured: true,
        title: { es: 'QUIM-DETECT2: detección de pesticidas en fresas' },
        detail: { es: 'Proyectos de Ingeniería I. Lideré el componente de machine learning sobre espectroscopía VIS/NIR (sensor AS7343).' },
        photo: { src: '/media/tl-quim-1200.webp', srcSet: '/media/tl-quim-640.webp 640w, /media/tl-quim-1200.webp 1200w', width: 1200, height: 1314, alt: { es: 'Equipo de QUIM-DETECT junto al prototipo y su póster en la feria de proyectos' } },
    },
    { id: 'patente', date: { es: 'Dic. 2025' }, order: 2025.12, kind: 'reconocimiento', title: { es: 'Solicitud de patente ante INDECOPI' }, detail: { es: 'Modelo de Utilidad a nombre de la UPCH, en trámite.' } },
    { id: 'cubepath', date: { es: 'Mar. 2026' }, order: 2026.03, kind: 'reconocimiento', title: { es: 'Finalista, hackathon Cubepath 2026' }, detail: { es: 'Proyecto Mellow, en solitario.' } },
    { id: 'gci', date: { es: 'Abr. 2026' }, order: 2026.04, kind: 'programa', title: { es: 'GCI World, Matsuo-Iwasawa Lab' }, detail: { es: 'Universidad de Tokio.' } },
    {
        id: 'cade',
        date: { es: 'May. 2026' },
        order: 2026.05,
        kind: 'reconocimiento',
        featured: true,
        title: { es: 'CADE Universitario 2026' },
        detail: { es: 'Representando a la UPCH.' },
        photo: {
            src: '/media/tl-cade-1200.webp',
            srcSet: '/media/tl-cade-640.webp 640w, /media/tl-cade-1200.webp 1200w',
            width: 1200,
            height: 900,
            alt: { es: 'Andrés Rodas en CADE Universitario 2026 mostrando su credencial de participante' },
        },
    },
    { id: 'kiwie', date: { es: 'Jul. 2026' }, order: 2026.07, kind: 'reconocimiento', featured: true, title: { es: 'Medalla de plata, KIWIE 2026' }, detail: { es: 'Korea International Women’s Invention Exposition (Corea del Sur), 18 de julio de 2026, por el Sistema de Detección de Pesticidas en Frutas.' }, photo: { src: '/media/tl-kiwie-1200.webp', srcSet: '/media/tl-kiwie-640.webp 640w, /media/tl-kiwie-1200.webp 1200w', width: 1200, height: 1600, alt: { es: 'Diploma Silver Prize de KIWIE 2026 y medalla de plata del equipo de QUIM-DETECT' } } },
    { id: 'aspire', date: { es: '2026' }, order: 2026.0, kind: 'programa', title: { es: 'Aspire Leaders Program 2026' }, detail: { es: 'Cohorte 2, 40 horas.' } },
    {
        id: 'unicamp',
        date: { es: '2026-2' },
        order: 2026.08,
        kind: 'academico',
        featured: true,
        title: { es: 'Intercambio en UNICAMP + LatamAirQuality' },
        detail: { es: 'Modelos de calidad del aire (PM2.5) para Campinas, São Paulo, Medellín y Lima, desplegados en AWS Fargate.' },
    },
    { id: 'ancon', date: { es: 'Nov. 2026' }, order: 2026.11, kind: 'programa', title: { es: 'Clase de introducción a la IA' }, detail: { es: 'Alumnos de 4.º de secundaria, Colegio Nacional Ancón.' } },
    { id: 'egreso', date: { es: 'Dic. 2027' }, order: 2027.12, kind: 'academico', title: { es: 'Egreso previsto' } },
].sort((a, b) => a.order - b.order) as Milestone[];
