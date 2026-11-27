import { Globe, MessageSquare, Users, Target } from 'lucide-react';
import type { Bi, Icon } from './types';

export interface SoftSkill {
    id: string;
    icon: Icon;
    name: Bi;
    /** Where it was applied — verifiable facts only (from Andrés's confirmed data). */
    evidence: Bi;
    /** Andrés's own reflection — formatted and proofread, never rewritten. PENDIENTE while undefined. */
    reflection?: Bi;
}

export interface StarCase {
    title: Bi;
    context: Bi;
    skill: Bi;
    /** Situation / Task / Action / Result — Andrés's own words, used verbatim. */
    situation?: Bi;
    task?: Bi;
    action?: Bi;
    result?: Bi;
}

/** Intro reflection for the whole section — Andrés's text. PENDIENTE while undefined. */
export const softSkillsIntro: Bi | undefined = undefined;

// PENDIENTE: reflexión de Andrés para cada competencia (2–4 líneas cada una).
export const softSkills: SoftSkill[] = [
    {
        id: 'liderazgo',
        icon: Target,
        name: { es: 'Liderazgo' },
        evidence: { es: 'Wilmer Herrera, con quien trabajo en proyectos universitarios desde hace cuatro años, me describe como “un excelente líder de proyectos” (ver Testimonios).' },
    },
    {
        id: 'equipo',
        icon: Users,
        name: { es: 'Trabajo en equipo' },
        evidence: { es: 'Fui responsable de QA y testing en un equipo Scrum de 5 en MC656 (UNICAMP), desarrollador en el grafo de conocimiento clínico (equipo de 5) y desarrollé el componente de ML de QUIM-DETECT en un equipo de 6.' },
    },
    {
        id: 'comunicacion',
        icon: MessageSquare,
        name: { es: 'Comunicación' },
        evidence: { es: 'Dicté una clase de introducción a la IA a alumnos de 4.º de secundaria del Colegio Nacional Ancón y representé a la UPCH en CADE Universitario 2026.' },
    },
    {
        id: 'adaptabilidad',
        icon: Globe,
        name: { es: 'Adaptabilidad' },
        evidence: { es: 'Cursé el semestre 2026-2 de intercambio en UNICAMP (Brasil), en otro idioma y con otro sistema académico.' },
    },
];

/** STAR text written by Andrés (27/11), used verbatim. */
export const starCase: StarCase = {
    title: { es: 'Clase de introducción a la IA en el Colegio Nacional Ancón' },
    context: { es: 'Actividad de responsabilidad social · C1342 Desarrollo Profesional II · noviembre de 2026' },
    skill: { es: 'Comunicación' },
    situation: {
        es: 'Como parte de la actividad de responsabilidad social del curso Desarrollo Profesional II, se organizó una clase virtual para alumnos de 4.º de secundaria del Colegio Nacional Ancón, muchos sin contacto previo con la inteligencia artificial.',
    },
    task: { es: 'En una sesión de una hora, presentar la IA de forma comprensible y útil, y despertar su interés sin quedarme en la teoría.' },
    action: {
        es: 'En lugar de una exposición tradicional, usé IA en vivo para mostrar qué puede hacer y también dónde se equivoca y cuáles son sus límites. Luego hice que los alumnos la probaran ellos mismos en el modo avanzado (Pro) de distintas herramientas, para que la experimentaran de primera mano.',
    },
    result: {
        es: 'Los alumnos pasaron de observar a participar. Al final me hicieron preguntas sobre el futuro de la IA y su impacto en sus vidas, señal de que la clase despertó curiosidad real. Para mí fue una práctica valiosa de comunicación: aprendí a adaptar un tema técnico a un público no especializado y a convertir una clase en una experiencia interactiva.',
    },
};
