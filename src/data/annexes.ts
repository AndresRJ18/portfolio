import type { Bi } from './types';

export interface Testimonial {
    quote: Bi;
    author: string;
    role: Bi;
    relation: Bi;
    url?: string;
}

export interface Recognition {
    title: Bi;
    issuer: string;
    date: string;
    detail?: Bi;
    /** Diploma/photo under /public, or external proof. Required before publishing. */
    evidence?: string;
}

// PENDIENTE: testimonios solicitados el 26/11 — si no llegan antes del 30/11, la sección sale solo con reconocimientos.
export const testimonials: Testimonial[] = [];

// PENDIENTE: evidencias de cada reconocimiento (Andrés las confirma). Rellenar en F4.
export const recognitions: Recognition[] = [];
