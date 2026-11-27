import type { Bi } from './types';

export type ProjectFilter = 'cloud' | 'ia' | 'academico';

export const projectFilters: { id: 'todos' | ProjectFilter; label: Bi }[] = [
    { id: 'todos', label: { es: 'Todos' } },
    { id: 'cloud', label: { es: 'Cloud' } },
    { id: 'ia', label: { es: 'IA / ML' } },
    { id: 'academico', label: { es: 'Académico' } },
];

export interface ProjectLink {
    kind: 'repo' | 'demo' | 'post' | 'web';
    label: Bi;
    href: string;
}

export interface ProjectBadge {
    label: Bi;
    tone: 'award' | 'private' | 'progress';
}

export interface Project {
    id: string;
    /** Big bento card (true) or a row in "Otros proyectos" (false). */
    featured: boolean;
    title: string;
    subtitle: Bi;
    /** Course · institution · term, or event · year. */
    context: Bi;
    categories: ProjectFilter[];
    role?: Bi;
    highlights: Bi[];
    stack: string[];
    badges?: ProjectBadge[];
    links: ProjectLink[];
    note?: Bi;
    image?: { src: string; srcSet: string; width: number; height: number; alt: Bi; position?: string };
    /** YouTube demo — lite embed, iframe only after click. */
    video?: { id: string; title: string };
    /** Extra evidence images shown in the case study (slides, screenshots). */
    gallery?: { src: string; srcSet: string; width: number; height: number; alt: Bi; caption: Bi }[];
    /** Architecture as an ordered flow of stages (rendered as a vertical pipeline diagram). */
    architecture?: { stage: Bi; detail: Bi }[];
    /** Result tables (rendered as real, accessible HTML tables). */
    results?: { caption: Bi; columns: string[]; rows: string[][]; note?: Bi }[];
    /** Evidence still owed by Andrés; rendered as a pending box in preview builds. */
    pendingEvidence?: string[];
}

const img = (name: string, w: number, h: number) => ({
    src: `/media/proj-${name}-1200.webp`,
    srcSet: `/media/proj-${name}-640.webp 640w, /media/proj-${name}-1200.webp 1200w`,
    width: w,
    height: h,
});

/**
 * Order = display order. Featured set chosen by Andrés on 27/11: QUIM-DETECT2, LatamAirQuality,
 * Grafo clínico (UNICAMP), NovA AI, Mellow. MC656 and ACS moved to "Otros proyectos".
 * Sources: Andrés's messages (26–27/11), CV_ANDRES_EN.pdf (Aug 2026), repo READMEs/metadata (checked 27/11).
 */
export const projects: Project[] = [
    {
        id: 'quim-detect2',
        featured: true,
        title: 'QUIM-DETECT2',
        subtitle: { es: 'Sistema portátil de detección de pesticidas en fresas mediante espectroscopía VIS/NIR' },
        context: { es: 'Proyectos de Ingeniería I · UPCH · 2025-II' },
        categories: ['ia', 'academico'],
        role: { es: 'Desarrollador del componente de machine learning en un equipo interdisciplinario de 6 personas' },
        highlights: [
            {
                es: 'Preprocesamiento, PCA y clasificadores SVM, Random Forest y redes neuronales sobre las lecturas del sensor AS7343 (18 canales, 350–1000 nm) para detectar profenofos en fresas (ODS 12.4).',
            },
            { es: 'Resultados validados frente a un espectrómetro comercial y metodologías de referencia.' },
            { es: 'Solicitud de patente (Modelo de Utilidad) ante INDECOPI a nombre de la UPCH, exp. 003116-2025/DIN — en trámite.' },
        ],
        stack: ['Python', 'scikit-learn', 'PCA', 'SVM', 'Random Forest', 'Redes neuronales', 'AS7343'],
        badges: [{ label: { es: 'Medalla de plata · KIWIE 2026' }, tone: 'award' }],
        links: [{ kind: 'repo', label: { es: 'Repositorio' }, href: 'https://github.com/AndresRJ18/QUIM-DETECT2' }],
        note: { es: 'El repositorio público contiene una parte del trabajo; el código completo está en un repositorio institucional privado.' },
        image: {
            src: '/media/proj-quim-1200.webp',
            srcSet: '/media/proj-quim-640.webp 640w, /media/proj-quim-1200.webp 1200w',
            width: 1200,
            height: 670,
            alt: { es: 'Prototipo de QUIM-DETECT: carcasa roja con forma de fresa junto a una laptop con la aplicación lista para analizar' },
            position: '50% 55%',
        },
        pendingEvidence: ['Diagrama del pipeline sensor → modelo'],
    },
    {
        id: 'latam-air-quality',
        featured: true,
        title: 'LatamAirQuality',
        subtitle: { es: 'Predicción de calidad del aire (PM2.5) para cuatro ciudades de Latinoamérica' },
        context: { es: 'Proyecto personal · 2026' },
        categories: ['cloud', 'ia'],
        highlights: [
            {
                es: 'Pipeline de ML de punta a punta con LightGBM: un modelo por ciudad que pronostica PM2.5 a 6 h y 24 h para Campinas, São Paulo, Medellín y Lima, con rezagos de 1/3/6/24 h, ventanas móviles de 6/24 h y codificación de hora y día.',
            },
            {
                es: 'Skill score de hasta +29,8 % frente a un baseline de persistencia en un split temporal 90/10; la re-evaluación walk-forward muestra el rango real por ciudad y horizonte (abajo).',
            },
            { es: 'Desplegado en AWS ECS Fargate con S3, ECR e IAM, aprovisionado con Terraform, en contenedores Docker y con ingesta automática cada hora por ciudad.' },
        ],
        stack: ['Python', 'LightGBM', 'FastAPI', 'Docker', 'Terraform', 'ECS Fargate', 'S3', 'ECR', 'APScheduler'],
        links: [{ kind: 'repo', label: { es: 'Repositorio' }, href: 'https://github.com/AndresRJ18/LatamAirQuality' }],
        architecture: [
            { stage: { es: 'Ingesta histórica' }, detail: { es: 'OpenAQ API → fetch_openaq.py por ciudad → CSV de PM2.5' } },
            { stage: { es: 'Feature engineering' }, detail: { es: 'Rezagos 1/3/6/24 h · medias móviles 6/24 h · codificación de hora y día' } },
            { stage: { es: 'Entrenamiento' }, detail: { es: 'LightGBM por ciudad (split temporal 90/10) · objetivos a 6 h y 24 h' } },
            { stage: { es: 'Almacenamiento' }, detail: { es: 'Modelos .joblib y lecturas .parquet por ciudad (sistema local ↔ S3)' } },
            { stage: { es: 'API' }, detail: { es: 'FastAPI /predict?city=X&horizon=6|24, empaquetada en Docker' } },
            { stage: { es: 'Despliegue' }, detail: { es: 'Imagen en ECR → ECS Fargate (0,5 vCPU / 1 GB, IP pública) ↔ bucket S3' } },
            { stage: { es: 'Actualización continua' }, detail: { es: 'APScheduler cada hora por ciudad → lecturas nuevas desde AQICN API' } },
        ],
        results: [
            {
                caption: { es: 'Resultados en split temporal único (90/10)' },
                columns: ['Ciudad', 'MAE 6 h', 'MAE 24 h', 'Skill 6 h', 'Skill 24 h', 'Features'],
                rows: [
                    ['Campinas', '5,18 µg/m³', '5,37 µg/m³', '+17,0 %', '+17,6 %', '22 (PM2.5 + CO + NO₂ + O₃)'],
                    ['São Paulo', '6,56 µg/m³', '7,01 µg/m³', '+29,8 %', '+11,5 %', '19 (PM2.5 + NO₂ + O₃)'],
                    ['Medellín', '5,48 µg/m³', '5,22 µg/m³', '+29,5 %', '+23,5 %', '13 (solo PM2.5)'],
                    ['Lima', '9,14 µg/m³', '9,30 µg/m³', '+20,0 %', '−4,1 %', '13 (solo PM2.5)'],
                ],
                note: { es: 'Skill score medido contra un baseline de persistencia.' },
            },
            {
                caption: { es: 'Estabilidad en el tiempo: re-evaluación walk-forward (media de skill por pliegue)' },
                columns: ['Ciudad', 'Horizonte', 'Pliegues', 'Rango de skill', 'Media'],
                rows: [
                    ['Campinas', '6 h', '11', '+7,6 % a +30,3 %', '+19,6 %'],
                    ['Campinas', '24 h', '11', '−11,0 % a +23,7 %', '+11,8 %'],
                    ['São Paulo', '6 h', '5', '−40,3 % a +35,2 %', '+11,8 %'],
                    ['São Paulo', '24 h', '5', '−10,2 % a +12,9 %', '+1,6 %'],
                    ['Medellín', '6 h', '5', '−17,7 % a +32,4 %', '+13,5 %'],
                    ['Medellín', '24 h', '5', '−37,6 % a +25,5 %', '+1,4 %'],
                    ['Lima', '6 h', '8', '−11,6 % a +43,1 %', '+18,7 %'],
                    ['Lima', '24 h', '8', '−110,2 % a +22,1 %', '−20,2 %'],
                ],
                note: {
                    es: 'El split único es el extremo optimista de un rango más amplio. Pliegues con embargo igual al horizonte, para que ningún objetivo de entrenamiento se filtre en la ventana de prueba.',
                },
            },
        ],
    },
    {
        id: 'grafo-clinico',
        featured: true,
        title: 'Grafo de conocimiento clínico',
        subtitle: { es: 'Análisis clínico a partir de texto: entidades y relaciones médicas sobre casos de MultiCaRe' },
        context: { es: 'Procesamiento de Lenguaje Natural · UNICAMP · 2026-2' },
        categories: ['ia', 'academico'],
        role: { es: 'Desarrollador en un equipo de 5 personas' },
        highlights: [
            { es: 'Limpieza y auditoría del corpus: 56 filas de origen que correspondían en realidad a 50 pacientes.' },
            {
                es: 'Extracción de entidades con un diccionario UMLS 2026AA (coincidencia más larga en ventana de 6 tokens): 3.134 entidades de tipo tratamiento, hallazgo, diagnóstico, parte del cuerpo, examen y síntoma.',
            },
            {
                es: 'Extracción de relaciones tipadas con un CRF linear-chain y decodificación Viterbi: 849 relaciones documentadas de 8 tipos (LOCATED_IN, TREATED_WITH, HAS_DIAGNOSIS…), con 39 tests automatizados pasando.',
            },
            { es: 'Visualizador interactivo con Streamlit y Cytoscape.js; exportación a JSON, GraphML y CSV.' },
        ],
        stack: ['Python', 'UMLS', 'CRF', 'Viterbi', 'Streamlit', 'Cytoscape.js', 'MultiCaRe'],
        links: [
            {
                kind: 'repo',
                label: { es: 'Repositorio del equipo' },
                href: 'https://github.com/JaocHatter/Projeto-de-Natural-Language-Processing---Knowledge-Graph',
            },
        ],
        image: {
            ...img('grafo', 1200, 778),
            alt: { es: 'Visualizador del grafo: un paciente de MultiCaRe conectado a diagnósticos, hallazgos, exámenes y tratamientos' },
            position: 'center 45%',
        },
        gallery: [
            {
                ...img('grafo-pipeline', 1200, 676),
                alt: { es: 'Diapositiva del pipeline: casos crudos y UMLS convergen en la extracción de entidades, relaciones y el grafo' },
                caption: { es: 'Pipeline: dos entradas (casos clínicos y UMLS) hacia un mismo grafo.' },
            },
            {
                ...img('grafo-entidades', 1200, 676),
                alt: { es: 'Diapositiva con 3.134 entidades extraídas por tipo' },
                caption: { es: 'Extracción de entidades: 3.134 entidades en 50 pacientes.' },
            },
            {
                ...img('grafo-relaciones', 1200, 676),
                alt: { es: 'Diapositiva con 849 relaciones tipadas y su distribución por tipo' },
                caption: { es: 'Extracción de relaciones: 849 relaciones de 8 tipos y 39 tests.' },
            },
        ],
    },
    {
        id: 'nova-ai',
        featured: true,
        title: 'NovA AI',
        subtitle: { es: 'Coach de entrevistas técnicas bilingüe para ingenieros Cloud, DevOps y ML de Latinoamérica' },
        context: { es: 'Amazon Nova Hackathon · marzo de 2026' },
        categories: ['cloud', 'ia'],
        highlights: [
            { es: 'Entrevistas simuladas en español e inglés con Amazon Nova 2 Lite: scoring en tiempo real, dificultad adaptativa y reportes PDF.' },
            { es: 'Voz en tiempo real vía WebSockets con Amazon Nova Sonic (streaming de audio PCM).' },
            { es: 'Backend FastAPI en AWS App Runner con DynamoDB y autenticación Cognito (PKCE).' },
            { es: 'Publicado en AWS Builder Center el 15 de marzo de 2026.' },
        ],
        stack: ['Nova 2 Lite', 'Nova Sonic', 'FastAPI', 'App Runner', 'DynamoDB', 'Cognito'],
        links: [
            { kind: 'repo', label: { es: 'Repositorio' }, href: 'https://github.com/AndresRJ18/NOVA_AWS' },
            {
                kind: 'post',
                label: { es: 'Artículo en AWS Builder' },
                href: 'https://builder.aws.com/content/3AzMqq6TGrDrxgbn2eJz1cGwfwl/nova-ai-mock-interview-coach-for-tech-professionals',
            },
        ],
        image: {
            src: '/media/proj-nova-1200.webp',
            srcSet: '/media/proj-nova-640.webp 640w, /media/proj-nova-1200.webp 1200w',
            width: 1200,
            height: 1200,
            alt: { es: 'Portada de NovA AI, coach de entrevistas técnicas con IA' },
            position: 'center 8%',
        },
    },
    {
        id: 'mellow',
        featured: true,
        title: 'Mellow',
        subtitle: { es: 'Descubrimiento musical con IA a partir de cómo te sientes' },
        context: { es: 'Hackathon Cubepath 2026 · en solitario' },
        categories: ['cloud', 'ia'],
        highlights: [
            { es: 'Describes tu estado emocional en lenguaje natural y AWS Bedrock (Nova Lite) lo convierte en parámetros musicales.' },
            { es: 'Búsqueda en la API de Spotify, con respaldo en Deezer para las vistas previas, y refinamiento en hasta 3 rondas según tus likes y dislikes.' },
            { es: 'Backend FastAPI y frontend React + Vite con Docker Compose y Nginx en un VPS; IA en AWS Bedrock y persistencia opcional en Supabase.' },
        ],
        stack: ['AWS Bedrock', 'Nova Lite', 'FastAPI', 'React', 'Docker', 'Nginx', 'Spotify API', 'Supabase'],
        badges: [{ label: { es: 'Finalista · Cubepath 2026' }, tone: 'award' }],
        links: [
            { kind: 'repo', label: { es: 'Repositorio' }, href: 'https://github.com/AndresRJ18/Mellow' },
            { kind: 'demo', label: { es: 'mellow.lat' }, href: 'https://mellow.lat' },
        ],
        image: {
            src: '/media/proj-mellow-1200.webp',
            srcSet: '/media/proj-mellow-640.webp 640w, /media/proj-mellow-1200.webp 1200w',
            width: 1200,
            height: 750,
            alt: { es: 'Página de inicio de Mellow: "Encuentra la música que eres ahora mismo"' },
            position: 'center 18%',
        },
    },

    // ── Otros proyectos ────────────────────────────────────────────────
    {
        id: 'mc656',
        featured: false,
        title: 'Plataforma de decisión colectiva',
        subtitle: { es: 'Sistema de procesos electorales con FastAPI y React. Rol: testing y QA con SonarCloud y GitHub Actions.' },
        context: { es: 'MC656 Ingeniería de Software · UNICAMP · 2026-2' },
        categories: ['academico'],
        role: { es: 'Testing y aseguramiento de calidad (QA) en un equipo Scrum de 5 personas' },
        highlights: [
            { es: 'Plataforma de votación para procesos de decisión colectiva, alineada con el ODS 16 (paz, justicia e instituciones sólidas).' },
            { es: 'Me encargué de las pruebas y la calidad: análisis de código y cobertura de tests con SonarCloud.' },
            { es: 'Flujo de trabajo en GitHub con workflows de GitHub Actions y pull requests.' },
        ],
        stack: ['FastAPI', 'React', 'SonarCloud', 'GitHub Actions'],
        badges: [{ label: { es: 'Repositorio privado (equipo)' }, tone: 'private' }],
        links: [],
        video: { id: 'qq2MpNf7r0U', title: 'Collective Decision Platform: Voting System Demo with FastAPI and React | Unicamp' },
    },
    {
        id: 'acs',
        featured: false,
        title: 'ACS',
        subtitle: { es: 'Sube una foto, AWS Rekognition identifica la prenda y la app muestra dónde comprarla. Serverless con Lambda, API Gateway y Terraform.' },
        context: { es: 'Proyecto personal · 2026' },
        categories: ['cloud', 'ia'],
        highlights: [],
        stack: [],
        links: [
            { kind: 'repo', label: { es: 'Repositorio' }, href: 'https://github.com/AndresRJ18/stylematch' },
            { kind: 'demo', label: { es: 'Demo' }, href: 'https://acstylematch.vercel.app/' },
        ],
    },
    {
        id: 'azurely',
        featured: false,
        title: 'Azurely',
        subtitle: { es: 'Sube un audio de reunión y obtén transcripción, resumen y tareas pendientes con Azure Speech y Azure OpenAI.' },
        context: { es: 'Azure AI Dev Days · 2026' },
        categories: ['cloud', 'ia'],
        highlights: [],
        stack: [],
        links: [
            { kind: 'repo', label: { es: 'Repositorio' }, href: 'https://github.com/AndresRJ18/Azurely' },
            { kind: 'demo', label: { es: 'Demo' }, href: 'https://white-plant-010c18c0f.6.azurestaticapps.net/' },
        ],
    },
    {
        id: 'issue2secure',
        featured: false,
        title: 'Issue2Secure',
        subtitle: { es: 'Sistema multiagente que convierte un issue de seguridad de GitLab en un merge request con la corrección.' },
        context: { es: 'GitLab Duo Agents Hackathon · 2026' },
        categories: ['ia'],
        highlights: [],
        stack: [],
        links: [
            { kind: 'repo', label: { es: 'Repositorio' }, href: 'https://github.com/AndresRJ18/Issue2Secure' },
            { kind: 'web', label: { es: 'Página del hackathon' }, href: 'https://gitlab.com/gitlab-ai-hackathon/participants/35015819' },
        ],
    },
    {
        id: 'url-shortener',
        featured: false,
        title: 'URL Shortener',
        subtitle: { es: 'Acortador con FastAPI, Redis y Nginx, desplegado en AWS ECS Fargate con Terraform y CI/CD en GitHub Actions.' },
        context: { es: 'Proyecto personal · 2025' },
        categories: ['cloud'],
        highlights: [],
        stack: [],
        links: [{ kind: 'repo', label: { es: 'Repositorio' }, href: 'https://github.com/AndresRJ18/url-shortener' }],
    },
];
