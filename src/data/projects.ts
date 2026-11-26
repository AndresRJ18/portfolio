import type { Bi } from './content';

export interface ProjectLink {
    icon: string;
    href: string;
    title: string;
}

export interface Project {
    id: string;
    title: string;
    hackathonBadge?: string;
    subtitle: Bi;
    description: Bi;
    image: string;
    gif: string;
    tags: string[];
    links: ProjectLink[];
}

export const projects: Project[] = [
    {
        id: 'nova-ai',
        title: 'NovA AI',
        hackathonBadge: 'Amazon Nova Hackathon',
        subtitle: {
            es: 'Coach de Entrevistas Técnicas Bilingüe para Ingenieros Cloud, DevOps y ML',
            en: 'Bilingual Mock Interview Coach for Cloud, DevOps & ML Engineers',
        },
        description: {
            es: 'Plataforma de entrevistas simuladas con IA sobre Nova 2 Lite y Nova Sonic. Dificultad adaptativa, FastAPI en App Runner, Cognito OAuth, DynamoDB y reportes PDF.',
            en: 'AI-powered mock interview platform built on Amazon Nova 2 Lite (question generation + real-time scoring 0–100) and Nova Sonic (bidirectional voice streaming). Adaptive difficulty, FastAPI on App Runner, Cognito OAuth, DynamoDB, and PDF reports.',
        },
        image: '/img/nova.png',
        gif: '/img/nova.gif',
        tags: ['Nova 2 Lite', 'Nova Sonic', 'App Runner', 'DynamoDB', 'Cognito', 'FastAPI'],
        links: [
            { icon: 'fab fa-github', href: 'https://github.com/AndresRJ18/nova-ai', title: 'GitHub' },
            { icon: 'fab fa-aws', href: 'https://community.aws/content/nova-sonic', title: 'AWS Post' },
        ],
    },
    {
        id: 'issue2secure',
        title: 'Issue2Secure',
        hackathonBadge: 'GitLab Hackathon',
        subtitle: {
            es: 'Agente de Seguridad IA · GitLab Duo Hackathon',
            en: 'AI Security Agent · GitLab Duo Hackathon',
        },
        description: {
            es: 'Agente GitLab Duo que analiza issues de seguridad y genera fixes automáticamente. Claude AI analiza el contexto, propone parches y abre MRs automáticamente.',
            en: 'GitLab Duo Agent that reads security issues and auto-generates fixes. Claude AI analyzes vulnerability context, proposes patches, and opens MRs automatically.',
        },
        image: '/img/gitlab.png',
        gif: '/img/gitlab.gif',
        tags: ['GitLab Duo Agents', 'Claude AI', 'FastAPI', 'PostgreSQL', 'Python'],
        links: [
            { icon: 'fab fa-gitlab', href: 'https://gitlab.com/AndresRJ18/issue2secure', title: 'GitLab' },
        ],
    },
    {
        id: 'acs',
        title: 'ACS',
        subtitle: {
            es: 'Fashion Finder con Visión por Computadora en AWS',
            en: 'Fashion Finder with Computer Vision on AWS',
        },
        description: {
            es: 'Sube una foto → Rekognition detecta la prenda → ACS muestra dónde comprarla. Backend serverless (Lambda + API Gateway + S3) en Terraform. Frontend React 18.',
            en: 'Upload a photo → Rekognition detects the garment → ACS shows where to buy it. Serverless backend (Lambda + API Gateway + S3) provisioned with Terraform. React 18 frontend.',
        },
        image: '/img/style.png',
        gif: '/img/style.gif',
        tags: ['AWS Rekognition', 'Lambda', 'Terraform', 'React 18', 'API Gateway', 'S3'],
        links: [
            { icon: 'fab fa-github', href: 'https://github.com/AndresRJ18/stylematch', title: 'GitHub' },
            { icon: 'fas fa-external-link-alt', href: 'https://acstylematch.vercel.app/', title: 'Live Demo' },
        ],
    },
    {
        id: 'azurely',
        title: 'Azurely',
        hackathonBadge: 'Hackathon',
        subtitle: {
            es: 'Resumen de Reuniones con IA · Azure AI Dev Days 2026',
            en: 'AI Meeting Summarizer · Azure AI Dev Days 2026',
        },
        description: {
            es: 'Sube audio → obtén transcripción + resumen + action items en segundos. Azure Speech SDK para STT, Azure OpenAI (GPT-4o-mini) para análisis. Backend FastAPI con chunk processing.',
            en: 'Upload audio → get transcription + summary + action items in seconds. Azure Speech SDK for STT, Azure OpenAI (GPT-4o-mini) for analysis. FastAPI backend with chunk processing.',
        },
        image: '/img/azurely.png',
        gif: '/img/azurely.gif',
        tags: ['Azure Speech SDK', 'Azure OpenAI', 'GPT-4o-mini', 'FastAPI', 'Python 3.13'],
        links: [
            { icon: 'fab fa-github', href: 'https://github.com/AndresRJ18/Azurely', title: 'GitHub' },
            { icon: 'fas fa-external-link-alt', href: 'https://white-plant-010c18c0f.6.azurestaticapps.net/', title: 'Live Demo' },
        ],
    },
];
