import type { Bi } from './types';

export interface SoftSkill {
    name: Bi;
    /** Andrés's own reflection — formatted and proofread, never rewritten. */
    reflection: Bi;
}

export interface CaseStudy {
    title: Bi;
    context: Bi;
    situation: Bi;
    task: Bi;
    action: Bi;
    result: Bi;
}

// PENDIENTE: reflexiones (las escribe Andrés).
export const softSkills: SoftSkill[] = [];

// PENDIENTE: caso STAR principal — clase de introducción a la IA, 4.º de secundaria,
// Colegio Nacional Ancón (responsabilidad social, nov. 2026). Segundo caso: trabajo en equipo en MC656.
export const caseStudies: CaseStudy[] = [];
