export interface Bi {
    es: string;
    en: string;
}

export const nav: { id: string; label: Bi }[] = [
    { id: 'home', label: { es: 'Inicio', en: 'Home' } },
    { id: 'about', label: { es: 'Sobre mí', en: 'About' } },
    { id: 'skills', label: { es: 'Habilidades', en: 'Skills' } },
    { id: 'projects', label: { es: 'Proyectos', en: 'Projects' } },
    { id: 'contact', label: { es: 'Contacto', en: 'Contact' } },
];

export const hero = {
    badge: { es: 'Disponible para Oportunidades', en: 'Available for Opportunities' } as Bi,
    greeting: { es: 'Hola, soy', en: "Hi, I'm" } as Bi,
    name: 'Andrés Rodas',
    roleLine: { es: 'Estudiante de Ingeniería Informática', en: 'Computer Engineering Student' } as Bi,
    focusLine: { es: 'Entusiasta de Cloud & IA', en: 'Cloud & AI Enthusiast' } as Bi,
    description: {
        es: 'Estudiante de Ingeniería Informática que ya lleva sistemas a producción. Diseño infraestructura cloud, modelos ML y agentes de IA — todo mientras todavía curso la carrera en la UPCH.',
        en: 'Informatics Engineering student already shipping systems to production. I design cloud infrastructure, ML models, and AI agents — all while still finishing my degree at UPCH.',
    } as Bi,
    ctaCV: { es: 'Descargar CV', en: 'Download CV' } as Bi,
};

export const floatingTech = ['fab fa-aws', 'fas fa-brain', 'fas fa-cloud'];

export const sectionLabels = {
    about: { label: { es: 'Conóceme', en: 'Get to know me' } as Bi, title: { es: 'Sobre Mí', en: 'About Me' } as Bi },
    skills: { label: { es: 'Lo que sé', en: 'What I know' } as Bi, title: { es: 'Experiencia Técnica', en: 'Technical Expertise' } as Bi },
    projects: { label: { es: 'Mi trabajo', en: 'My work' } as Bi, title: { es: 'Proyectos Destacados', en: 'Featured Projects' } as Bi },
    contact: { label: { es: 'Ponte en contacto', en: 'Get in touch' } as Bi, title: { es: 'Contáctame', en: 'Contact Me' } as Bi },
};

export const about = {
    paragraphs: [
        {
            es: 'Apasionado por la computación en la nube y el machine learning. Enfocado en infraestructura AWS, sistemas distribuidos y proyectos de ingeniería aplicada que transforman conceptos teóricos en soluciones tangibles.',
            en: 'Passionate about cloud computing and machine learning. Focused on AWS infrastructure, distributed systems, and applied engineering projects that transform theoretical concepts into tangible solutions.',
        },
        {
            es: 'Diseño y despliego sistemas cloud-native con AWS Lambda, ECS Fargate y API Gateway — aprovisionados con Terraform y entregados vía GitHub Actions CI/CD. En Azure trabajo con Functions, Static Web Apps y el ecosistema de Azure OpenAI.',
            en: 'I design and deploy cloud-native systems with AWS Lambda, ECS Fargate, and API Gateway — provisioned with Terraform and delivered via GitHub Actions CI/CD. On Azure I work with Functions, Static Web Apps, and the Azure OpenAI ecosystem.',
        },
        {
            es: 'He construido productos con IA integrando Amazon Nova, AWS Rekognition, Azure Speech SDK y GPT-4o-mini — y he competido en hackathons como Amazon Nova Hackathon, GitLab Duo Hackathon y Azure AI Dev Days 2026.',
            en: "I've shipped AI-powered products integrating Amazon Nova, AWS Rekognition, Azure Speech SDK, and GPT-4o-mini — and competed in hackathons like the Amazon Nova Hackathon, GitLab Duo Hackathon, and Azure AI Dev Days 2026.",
        },
    ] as Bi[],
    stats: [
        { icon: 'fas fa-cloud', number: '2+', label: { es: 'Años en Cloud', en: 'Years in Cloud' } as Bi },
        { icon: 'fas fa-layer-group', number: '+10', label: { es: 'Proyectos Entregados', en: 'Projects Shipped' } as Bi },
    ],
};

export const contact = {
    text: {
        es: 'Siempre estoy abierto a discutir nuevos proyectos, oportunidades o colaboraciones. ¡No dudes en contactarme!',
        en: "I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out!",
    } as Bi,
    methods: [
        { icon: 'fas fa-envelope', label: { es: 'Correo', en: 'Email' } as Bi, value: 'me@andresrodas.cloud', href: 'mailto:me@andresrodas.cloud', copy: true },
        { icon: 'fab fa-linkedin', label: { es: 'LinkedIn', en: 'LinkedIn' } as Bi, value: 'andres-rodas-802309272', href: 'https://www.linkedin.com/in/andres-rodas-802309272', copy: false },
        { icon: 'fab fa-github', label: { es: 'GitHub', en: 'GitHub' } as Bi, value: 'AndresRJ18', href: 'https://github.com/AndresRJ18', copy: false },
    ],
};

export const footer = {
    tagline: { es: 'Construyendo el futuro con cloud & ML', en: 'Building the future with cloud & ML' } as Bi,
    hostedOn: { es: 'Alojado en Vercel', en: 'Hosted on Vercel' } as Bi,
    rights: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' } as Bi,
};

export const socials = {
    github: 'https://github.com/AndresRJ18',
    linkedin: 'https://www.linkedin.com/in/andres-rodas-802309272',
};
