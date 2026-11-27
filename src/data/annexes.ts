import type { Bi } from './types';

export interface Testimonial {
    /** Written by the author; used verbatim (proofread only). */
    quote: Bi;
    author: string;
    /** Relationship to Andrés, taken from the testimonial itself. */
    relation: Bi;
}

export interface Recognition {
    title: Bi;
    detail: Bi;
    date: string;
    photo?: { src: string; srcSet: string; width: number; height: number; alt: Bi; position?: string };
}

const tl = (name: string, width: number, height: number) => ({
    src: `/media/tl-${name}-1200.webp`,
    srcSet: `/media/tl-${name}-640.webp 640w, /media/tl-${name}-1200.webp 1200w`,
    width,
    height,
});

/** Received 27/11/2026. */
export const testimonials: Testimonial[] = [
    {
        quote: {
            es: 'Desde hace cuatro años trabajo de forma continua con Andrés Steven Rodas Janampa en proyectos universitarios, y puedo decir que es un excelente líder de proyectos, con una gran capacidad para afrontar las situaciones difíciles de la carrera y una visión que muy pocos tienen. Es responsable, puntual y trabajador, y sobre todo tiene un enorme interés en cada campo en el que se desempeña.',
        },
        author: 'Wilmer Herrera',
        relation: { es: 'Compañero de proyectos universitarios' },
    },
    {
        quote: {
            es: 'Conozco a Andrés desde hace aproximadamente un año, más como persona que como ingeniero, y puedo decir que es responsable en todo lo que se propone. Me mostró sus proyectos y quedé asombrada con lo que hace y con lo que planea hacer. Es un gran estudiante y una gran persona.',
        },
        author: 'Chiara Minerva',
        relation: { es: 'Lo conoce desde hace un año' },
    },
];

/** Confirmed by Andrés (26–27/11/2026). Ordered most recent first; the first three carry photos. */
export const recognitions: Recognition[] = [
    {
        title: { es: 'Medalla de plata · KIWIE 2026' },
        detail: { es: 'Korea International Women’s Invention Exposition (Corea del Sur), por el Sistema de Detección de Pesticidas en Frutas.' },
        date: 'Jul. 2026',
        photo: { ...tl('kiwie', 1200, 1600), alt: { es: 'Diploma Silver Prize y medalla de plata de KIWIE 2026' }, position: 'center 40%' },
    },
    {
        title: { es: 'CADE Universitario 2026' },
        detail: { es: 'Representante de la Universidad Peruana Cayetano Heredia.' },
        date: 'May. 2026',
        photo: { ...tl('cade', 1200, 900), alt: { es: 'Andrés Rodas con su credencial de participante en CADE Universitario 2026' } },
    },
    {
        title: { es: '2.º lugar · Hackathon VEYRO' },
        detail: { es: 'Solución de seguridad con cámara e inteligencia artificial, en equipo.' },
        date: '2025',
        photo: { ...tl('veyro', 1200, 798), alt: { es: 'Foto grupal de los participantes del hackathon VEYRO' } },
    },
    { title: { es: 'Finalista · Hackathon Cubepath 2026' }, detail: { es: 'Con Mellow, participación individual.' }, date: 'Mar. 2026' },
    { title: { es: 'Participante seleccionado · GCI World' }, detail: { es: 'Matsuo-Iwasawa Lab, Universidad de Tokio.' }, date: 'Abr. 2026' },
    { title: { es: 'Apoyo de movilidad DURIN' }, detail: { es: 'Financiamiento para el intercambio académico en UNICAMP.' }, date: '2026' },
    { title: { es: 'Solicitud de patente (Modelo de Utilidad)' }, detail: { es: 'INDECOPI, exp. 003116-2025/DIN, a nombre de la UPCH — en trámite.' }, date: '2025' },
    { title: { es: 'Becario Beca 18' }, detail: { es: 'PRONABEC, Beca Nacional de Educación Superior.' }, date: '2023' },
];
