import type { Bi } from './types';

export interface Milestone {
    id: string;
    /** Display date as Andrés confirmed it (month or range only when known). */
    date: Bi;
    /** Group heading. */
    year: number;
    /** Sort key: year + month/100 (no month → .00). */
    order: number;
    title: Bi;
    detail?: Bi;
    kind: 'academico' | 'reconocimiento' | 'proyecto' | 'programa';
    /** Key milestone: highlighted and shown when the timeline is collapsed. */
    featured?: boolean;
}

/** Confirmed by Andrés on 26–27/11/2026. Text only — photos appear once, in Anexos → Reconocimientos. */
export const milestones: Milestone[] = [
    { id: 'ingreso', year: 2023, date: { es: '2023' }, order: 2023.0, kind: 'academico', featured: true, title: { es: 'Ingreso a Ingeniería Informática' }, detail: { es: 'Universidad Peruana Cayetano Heredia, Lima.' } },

    { id: 'veyro', year: 2025, date: { es: '2025' }, order: 2025.0, kind: 'reconocimiento', title: { es: '2.º lugar, hackathon VEYRO' }, detail: { es: 'Seguridad con cámara e IA, en equipo.' } },
    {
        id: 'aws-scholars',
        year: 2025,
        date: { es: '2025' },
        order: 2025.001,
        kind: 'programa',
        title: { es: 'AWS AI & ML Scholars Challenge' },
        detail: { es: 'Seleccionado para el Future AWS Agent Engineer Nanodegree.' },
    },
    {
        id: 'quim-detect2',
        year: 2025,
        date: { es: '2025-II' },
        order: 2025.08,
        kind: 'proyecto',
        featured: true,
        title: { es: 'QUIM-DETECT2: detección de pesticidas en fresas' },
        detail: { es: 'Proyectos de Ingeniería I. Desarrollé el componente de machine learning sobre espectroscopía VIS/NIR (sensor AS7343).' },
    },
    {
        id: 'patente',
        year: 2025,
        date: { es: 'Dic. 2025 · Mar. 2026' },
        order: 2025.12,
        kind: 'reconocimiento',
        title: { es: 'Solicitud de patente ante INDECOPI' },
        detail: { es: 'Modelo de Utilidad a nombre de la UPCH: presentada en dic. 2025 (exp. 003116-2025/DIN) y publicada en mar. 2026 (N.° 2026-0709). En trámite.' },
    },

    { id: 'aspire', year: 2026, date: { es: '2026' }, order: 2026.0, kind: 'programa', title: { es: 'Aspire Leaders Program 2026' }, detail: { es: 'Cohorte 2, 40 horas.' } },
    {
        id: 'upadi',
        year: 2026,
        date: { es: '2026' },
        order: 2026.001,
        kind: 'proyecto',
        // PENDIENTE: mes del hackathon UPADI.
        title: { es: 'Hackathon Internacional de IA UPADI' },
        detail: { es: 'Participación con el equipo SaberLink, en el área de Educación y conocimiento.' },
    },
    { id: 'azurely', year: 2026, date: { es: 'Feb. 2026' }, order: 2026.02, kind: 'proyecto', title: { es: 'Azurely · hackathon' }, detail: { es: 'Resúmenes de reuniones con Azure AI.' } },
    { id: 'issue2secure', year: 2026, date: { es: 'Mar. 2026' }, order: 2026.03, kind: 'proyecto', title: { es: 'Issue2Secure · hackathon GitLab' }, detail: { es: 'Agente de seguridad sobre GitLab Duo.' } },
    {
        id: 'nova-ai',
        year: 2026,
        date: { es: 'Mar. 2026' },
        order: 2026.031,
        kind: 'proyecto',
        title: { es: 'NovA AI · hackathon Amazon Nova' },
        detail: {
            es: 'Coach de entrevistas técnicas bilingüe (ES/EN) para ingenieros Cloud, DevOps y ML de Latinoamérica, con Amazon Nova 2 Lite y Nova Sonic: scoring en tiempo real, dificultad adaptativa y reportes PDF. Publicado en AWS Builder Center el 15 de marzo de 2026.',
        },
    },
    { id: 'cubepath', year: 2026, date: { es: 'Mar. 2026' }, order: 2026.032, kind: 'reconocimiento', title: { es: 'Finalista, hackathon Cubepath 2026' }, detail: { es: 'Proyecto Mellow, en solitario.' } },
    {
        id: 'gci',
        year: 2026,
        date: { es: 'Abr.–Jul. 2026' },
        order: 2026.04,
        kind: 'programa',
        title: { es: 'GCI World, Matsuo-Iwasawa Lab' },
        detail: { es: 'Universidad de Tokio. Programa de data science de 14 semanas; top 20 % en la competencia final.' },
    },
    { id: 'cade', year: 2026, date: { es: 'May. 2026' }, order: 2026.05, kind: 'reconocimiento', featured: true, title: { es: 'CADE Universitario 2026' }, detail: { es: 'Representando a la UPCH.' } },
    {
        id: 'kiwie',
        year: 2026,
        date: { es: 'Jul. 2026' },
        order: 2026.07,
        kind: 'reconocimiento',
        featured: true,
        title: { es: 'Medalla de plata, KIWIE 2026' },
        detail: { es: 'Korea International Women’s Invention Exposition (Corea del Sur), 18 de julio de 2026, por el Sistema de Detección de Pesticidas en Frutas.' },
    },
    {
        id: 'unicamp',
        year: 2026,
        date: { es: 'Ago. 2026' },
        order: 2026.08,
        kind: 'academico',
        featured: true,
        title: { es: 'Intercambio académico en UNICAMP' },
        detail: { es: 'Instituto de Computación, Campinas (Brasil).' },
    },
    {
        id: 'latam-air-quality',
        year: 2026,
        date: { es: '2026-2' },
        order: 2026.081,
        kind: 'proyecto',
        title: { es: 'LatamAirQuality' },
        detail: { es: 'Modelos de calidad del aire (PM2.5) para Campinas, São Paulo, Medellín y Lima, desplegados en AWS ECS Fargate.' },
    },
    {
        id: 'mc656',
        year: 2026,
        date: { es: '2026-2' },
        order: 2026.082,
        kind: 'proyecto',
        title: { es: 'MC656 Ingeniería de Software · UNICAMP' },
        detail: { es: 'QA y testing en un equipo Scrum de 5 personas; sistema electoral alineado al ODS 16.' },
    },
    {
        id: 'grafo-clinico',
        year: 2026,
        date: { es: '2026-2' },
        order: 2026.083,
        kind: 'proyecto',
        title: { es: 'Grafo de conocimiento clínico · PLN, UNICAMP' },
        detail: { es: 'Entidades médicas con un diccionario UMLS y relaciones con un CRF sobre casos clínicos de MultiCaRe; desarrollador en un equipo de 5.' },
    },
    { id: 'ancon', year: 2026, date: { es: 'Nov. 2026' }, order: 2026.11, kind: 'programa', title: { es: 'Clase de introducción a la IA' }, detail: { es: 'Alumnos de 4.º de secundaria, Colegio Nacional Ancón.' } },

    { id: 'egreso', year: 2027, date: { es: 'Dic. 2027' }, order: 2027.12, kind: 'academico', featured: true, title: { es: 'Egreso previsto' } },
].sort((a, b) => a.order - b.order) as Milestone[];
