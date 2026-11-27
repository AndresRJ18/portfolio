import { PENDING, type Bi } from './types';

export interface CareerStep {
    horizon: Bi;
    goal: Bi;
}

export const about = {
    fullName: 'Andrés Steven Rodas Janampa',
    /** Rendered in F1 as the interim intro; rewritten in F2. */
    intro: [
        {
            es: 'Me apasionan la computación en la nube y el machine learning. Me enfoco en infraestructura AWS, sistemas distribuidos y proyectos de ingeniería aplicada que convierten conceptos teóricos en soluciones tangibles.',
        },
        {
            es: 'Diseño y despliego sistemas cloud-native con AWS Lambda, ECS Fargate y API Gateway, aprovisionados con Terraform y entregados mediante CI/CD con GitHub Actions. En Azure trabajo con Functions, Static Web Apps y Azure OpenAI.',
        },
    ] as Bi[],
    purpose: { es: PENDING } as Bi,
    careerPlan: [
        {
            horizon: { es: 'Corto plazo (1–2 años)' },
            goal: {
                es: 'Terminar la carrera, incluido el intercambio en UNICAMP; sustentar la tesis y conseguir prácticas en Cloud & AI llevando modelos de machine learning a producción.',
            },
        },
        {
            horizon: { es: 'Mediano plazo (2–5 años)' },
            goal: {
                es: 'Consolidar experiencia profesional en Cloud & AI y luego hacer investigación en el extranjero, en centros como CNPEM, DESY o CERN.',
            },
        },
        { horizon: { es: 'Largo plazo' }, goal: { es: PENDING } },
    ] as CareerStep[],
    hobbies: [] as Bi[], // PENDIENTE: 3–5 pasatiempos reales
};
