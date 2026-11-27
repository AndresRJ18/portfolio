import { Brain, Cloud, Code, Cpu, Network, Workflow } from 'lucide-react';
import type { Bi, Icon } from './types';

export interface Skill {
    icon: Icon;
    title: Bi;
    description: Bi;
    tags: string[];
}

export const skills: Skill[] = [
    {
        icon: Cloud,
        title: { es: 'Plataformas Cloud (AWS & Azure)', en: 'Cloud Platforms (AWS & Azure)' },
        description: {
            es: 'Despliegues multi-cloud diseñados para resiliencia, seguridad de menor privilegio y arquitecturas optimizadas en costo.',
            en: 'Multi-cloud deployments designed for resilience, least-privilege security, and cost-optimized architectures.',
        },
        tags: ['AWS (EC2, S3, IAM, VPC)', 'AWS Lambda & ECS Fargate', 'Azure Functions', 'Azure Static Web Apps', 'GitHub Actions CI/CD'],
    },
    {
        icon: Workflow,
        title: { es: 'Serverless & Arquitectura Cloud', en: 'Serverless & Cloud Architecture' },
        description: {
            es: 'Descomponer problemas en funciones desacopladas que reaccionan a eventos — sin servidores que gestionar, escala bajo demanda.',
            en: 'Decomposing problems into decoupled functions that react to events — no servers to manage, scales on demand.',
        },
        tags: ['Lambda', 'S3 Triggers', 'API Gateway', 'ECS Fargate', 'Event-Driven Design'],
    },
    {
        icon: Network,
        title: { es: 'Fundamentos de Redes (Orientado a DevOps)', en: 'Networking Fundamentals (DevOps-Oriented)' },
        description: {
            es: 'Entender cómo fluye el tráfico — diseño de VPC, límites de seguridad y patrones de enrutamiento resiliente para entornos cloud.',
            en: 'Understanding how traffic flows — VPC design, security boundaries, and resilient routing patterns for cloud environments.',
        },
        tags: ['TCP/IP & DNS', 'HTTP/HTTPS', 'Subnets & Routing', 'Security Groups', 'Load Balancing'],
    },
    {
        icon: Brain,
        title: { es: 'IA & Machine Learning', en: 'AI & Machine Learning' },
        description: {
            es: 'Integrar servicios de IA administrados en productos reales, respaldado por fundamentos sólidos de ML clásico.',
            en: 'Integrating managed AI services into real products, backed by solid classical ML foundations.',
        },
        tags: ['AWS Rekognition', 'Azure OpenAI (GPT-4o-mini)', 'Azure Speech SDK', 'Amazon Polly', 'ML Fundamentals'],
    },
    {
        icon: Cpu,
        title: { es: 'IoT & Proyectos Hardware', en: 'IoT & Hardware Projects' },
        description: {
            es: 'Conectar el mundo físico y el digital — leer datos del mundo real, procesarlos en el dispositivo y actuar sobre ellos.',
            en: 'Bridging the physical and digital worlds — reading real-world data, processing it on-device, and acting on it.',
        },
        tags: ['Arduino', 'Optical Sensors', 'Spectral Analysis', 'Embedded Systems'],
    },
    {
        icon: Code,
        title: { es: 'Ingeniería de Software & IaC', en: 'Software Engineering & IaC' },
        description: {
            es: 'Escribir código limpio, aprovisionar infraestructura como código y entregar servicios containerizados — el ciclo completo de entrega.',
            en: 'Writing clean code, provisioning infra as code, and shipping containerized services — the full delivery cycle.',
        },
        tags: ['Python', 'Terraform (IaC)', 'FastAPI', 'Docker', 'Linux', 'Git / GitHub', 'React'],
    },
];
