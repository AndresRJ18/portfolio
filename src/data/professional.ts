import { cvHref } from './site';
import type { Bi } from './types';

export interface Certification {
    name: string;
    issuer: string;
    year: number;
    /** Public credential URL, if the issuer provides one. */
    url?: string;
    /** PDF under /public/certs. */
    file?: string;
}

export const cv = {
    targetRole: { es: 'Practicante Cloud & AI Engineer' } as Bi,
    pdf: cvHref,
    /** Page-1 preview rendered from the PDF (scripts/media.mjs). */
    preview: { src: '/media/cv-preview-900.webp', srcSet: '/media/cv-preview-480.webp 480w, /media/cv-preview-900.webp 900w', width: 900, height: 1270 },
    pages: 2,
    updated: { es: 'Noviembre 2026' } as Bi,
};

/** Taken from the current CV. PDFs / credential URLs are still owed (public/certs is empty). */
export const certifications: Certification[] = [
    { name: 'Cloud Computing Applications: Cloud Systems and Infrastructure', issuer: 'University of Illinois Urbana-Champaign', year: 2025 },
    { name: 'Cloud Computing: AWS – Azure – Google Cloud', issuer: 'Universidad Nacional de Ingeniería', year: 2025 },
    { name: 'Fundamentos de Docker / AWS Architect', issuer: 'Universidad Nacional de Ingeniería', year: 2026 },
    { name: 'Buenas prácticas y casos reales de AWS', issuer: 'Data Science Research Perú', year: 2026 },
    { name: 'Scrum Foundation Professional Certificate (SFPC)', issuer: 'CertiProf', year: 2023 },
];
