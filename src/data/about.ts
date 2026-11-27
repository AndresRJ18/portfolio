import { Guitar, PawPrint, Sparkles, Users } from 'lucide-react';
import type { Bi, Icon } from './types';

export interface CareerStep {
    horizon: Bi;
    range: Bi;
    goals: Bi[];
}

export interface Hobby {
    icon: Icon;
    label: Bi;
}

/** All copy below is Andrés's own text (27/11), used verbatim — only formatting is ours. */
export const about = {
    fullName: 'Andrés Steven Rodas Janampa',
    /** Professional portrait (public/raw/img-profesional-yo.png → npm run media). 3:4. */
    photo: {
        src: '/media/profile-800.webp',
        srcSet: '/media/profile-480.webp 480w, /media/profile-800.webp 800w',
        width: 800,
        height: 1068,
        alt: 'Andrés Rodas con traje oscuro y corbata roja, frente a los Laboratorios de Investigación de la Universidad Peruana Cayetano Heredia',
    } as { src: string; srcSet: string; width: number; height: number; alt: string } | undefined,
    purposeTitle: { es: 'Propósito del portafolio' } as Bi,
    purpose: {
        es: 'Este portafolio reúne mi formación como estudiante de Ingeniería Informática en la Universidad Peruana Cayetano Heredia, con énfasis en Cloud Computing e Inteligencia Artificial. Aquí muestro los proyectos, certificaciones y reconocimientos que reflejan cómo llevo modelos de machine learning desde la idea hasta su despliegue en la nube, y las competencias que he fortalecido en el camino.',
    } as Bi,


    careerTitle: { es: 'Plan de carrera' } as Bi,
    careerPlan: [
        {
            horizon: { es: 'Corto plazo' },
            range: { es: '1–2 años' },
            goals: [
                { es: 'Culminar la carrera, incluyendo mi intercambio académico en UNICAMP (Brasil).' },
                { es: 'Desarrollar y sustentar mi tesis de pregrado.' },
                { es: 'Conseguir prácticas preprofesionales en Cloud/IA, llevando modelos de ML a producción.' },
            ],
        },
        {
            horizon: { es: 'Mediano plazo' },
            range: { es: '2–5 años' },
            goals: [
                { es: 'Consolidar experiencia profesional en Cloud e Inteligencia Artificial.' },
                { es: 'Dar el salto a la investigación en el extranjero, en centros como CNPEM (Brasil), DESY (Alemania) o CERN (Suiza).' },
            ],
        },
        {
            horizon: { es: 'Largo plazo' },
            range: { es: '5+ años' },
            goals: [
                {
                    es: 'Liderar proyectos de IA aplicada y cloud que resuelvan problemas reales de Latinoamérica, conectando la investigación con soluciones en producción.',
                },
            ],
        },
    ] as CareerStep[],

    hobbiesTitle: { es: 'Pasatiempos' } as Bi,
    hobbies: [
        { icon: Guitar, label: { es: 'Tocar guitarra' } },
        { icon: PawPrint, label: { es: 'Pasar tiempo con mis gatos y perros' } },
        { icon: Users, label: { es: 'Salir con amigos' } },
        { icon: Sparkles, label: { es: 'Experimentar con IA: diseñar prompts y flujos con Claude' } },
    ] as Hobby[],
};
