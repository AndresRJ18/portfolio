import { ExternalLink, Newspaper } from 'lucide-react';
import { GithubIcon, GitlabIcon } from '../components/ui/BrandIcon';
import type { Bi, Evidence, Link } from './types';

export type ProjectCategory = 'academico' | 'profesional';

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    subtitle: Bi;
    description: Bi;
    tags: string[];
    links: Link[];
    /** Course + institution, or hackathon/event. */
    context?: Bi;
    year?: number;
    role?: Bi;
    teamSize?: number;
    problem?: Bi;
    outcome?: Bi;
    award?: Bi;
    /** Poster image always shown; `gif` is the legacy hover preview (replaced by video in F3). */
    image?: string;
    gif?: string;
    evidence?: Evidence[];
    /** Featured card vs. compact "Otros proyectos" list. */
    featured: boolean;
}

/**
 * F1: legacy entries migrated to the new schema unchanged in content.
 * F3: approved set — Pesticidas, LatamAirQuality, MC656, NovA AI, ACS (featured);
 * MultiCaRe, Azurely, Issue2Secure, URL Shortener (otros proyectos).
 */
export const projects: Project[] = [
    {
        id: 'nova-ai',
        title: 'NovA AI',
        category: 'profesional',
        award: { es: 'Amazon Nova Hackathon' },
        subtitle: {
            es: 'Coach de entrevistas técnicas bilingüe para ingenieros Cloud, DevOps y ML',
            en: 'Bilingual Mock Interview Coach for Cloud, DevOps & ML Engineers',
        },
        description: {
            es: 'Plataforma de entrevistas simuladas con IA sobre Nova 2 Lite y Nova Sonic. Dificultad adaptativa, FastAPI en App Runner, Cognito OAuth, DynamoDB y reportes PDF.',
            en: 'AI-powered mock interview platform built on Amazon Nova 2 Lite and Nova Sonic. Adaptive difficulty, FastAPI on App Runner, Cognito OAuth, DynamoDB, and PDF reports.',
        },
        image: '/img/nova.png',
        gif: '/img/nova.gif',
        tags: ['Nova 2 Lite', 'Nova Sonic', 'App Runner', 'DynamoDB', 'Cognito', 'FastAPI'],
        links: [
            { icon: GithubIcon, href: 'https://github.com/AndresRJ18/nova-ai', label: { es: 'Repositorio en GitHub' } },
            // PENDIENTE: verificar que este enlace apunte a la publicación real
            { icon: Newspaper, href: 'https://community.aws/content/nova-sonic', label: { es: 'Publicación en AWS' } },
        ],
        featured: true,
    },
    {
        id: 'issue2secure',
        title: 'Issue2Secure',
        category: 'profesional',
        award: { es: 'GitLab Duo Hackathon' },
        subtitle: {
            es: 'Agente de seguridad con IA · GitLab Duo Hackathon',
            en: 'AI Security Agent · GitLab Duo Hackathon',
        },
        description: {
            es: 'Agente de GitLab Duo que analiza issues de seguridad y genera correcciones. Claude analiza el contexto de la vulnerabilidad, propone parches y abre merge requests automáticamente.',
            en: 'GitLab Duo Agent that reads security issues and auto-generates fixes. Claude analyzes vulnerability context, proposes patches, and opens MRs automatically.',
        },
        image: '/img/gitlab.png',
        gif: '/img/gitlab.gif',
        tags: ['GitLab Duo Agents', 'Claude', 'FastAPI', 'PostgreSQL', 'Python'],
        links: [{ icon: GitlabIcon, href: 'https://gitlab.com/AndresRJ18/issue2secure', label: { es: 'Repositorio en GitLab' } }],
        featured: false,
    },
    {
        id: 'acs',
        title: 'ACS',
        category: 'profesional',
        subtitle: {
            es: 'Buscador de moda con visión por computadora en AWS',
            en: 'Fashion Finder with Computer Vision on AWS',
        },
        description: {
            es: 'Sube una foto, Rekognition detecta la prenda y ACS muestra dónde comprarla. Backend serverless (Lambda, API Gateway y S3) aprovisionado con Terraform; frontend en React 18.',
            en: 'Upload a photo → Rekognition detects the garment → ACS shows where to buy it. Serverless backend (Lambda + API Gateway + S3) provisioned with Terraform. React 18 frontend.',
        },
        image: '/img/style.png',
        gif: '/img/style.gif',
        tags: ['AWS Rekognition', 'Lambda', 'Terraform', 'React 18', 'API Gateway', 'S3'],
        links: [
            { icon: GithubIcon, href: 'https://github.com/AndresRJ18/stylematch', label: { es: 'Repositorio en GitHub' } },
            { icon: ExternalLink, href: 'https://acstylematch.vercel.app/', label: { es: 'Demo en vivo' } },
        ],
        featured: true,
    },
    {
        id: 'azurely',
        title: 'Azurely',
        category: 'profesional',
        // PENDIENTE: confirmar si fue hackathon (participación) antes de mostrar badge
        subtitle: {
            es: 'Resumen de reuniones con IA · Azure AI Dev Days 2026',
            en: 'AI Meeting Summarizer · Azure AI Dev Days 2026',
        },
        description: {
            es: 'Sube un audio y obtén transcripción, resumen y tareas pendientes en segundos. Azure Speech SDK para la transcripción y Azure OpenAI (GPT-4o-mini) para el análisis. Backend FastAPI con procesamiento por fragmentos.',
            en: 'Upload audio → get transcription + summary + action items in seconds. Azure Speech SDK for STT, Azure OpenAI (GPT-4o-mini) for analysis. FastAPI backend with chunk processing.',
        },
        image: '/img/azurely.png',
        gif: '/img/azurely.gif',
        tags: ['Azure Speech SDK', 'Azure OpenAI', 'GPT-4o-mini', 'FastAPI', 'Python 3.13'],
        links: [
            { icon: GithubIcon, href: 'https://github.com/AndresRJ18/Azurely', label: { es: 'Repositorio en GitHub' } },
            { icon: ExternalLink, href: 'https://white-plant-010c18c0f.6.azurestaticapps.net/', label: { es: 'Demo en vivo' } },
        ],
        featured: false,
    },
];
