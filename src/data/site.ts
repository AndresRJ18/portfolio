import { Brain, Cloud, Mail, Server } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcon';
import type { Bi, Icon } from './types';

/** Hidden until every section has an English version (decision 26/11). */
export const I18N_ENABLED = false;

export const socials = {
    github: 'https://github.com/AndresRJ18',
    linkedin: 'https://www.linkedin.com/in/andres-rodas-802309272',
    email: 'me@andresrodas.cloud',
};

/** CV currently served. Replaced in F2 by the web version without phone number. */
export const cvHref = '/CV_Andres_Rodas_upch.pdf';

/** The five mandatory sections, in rubric order. `label` = short navbar text, `title` = full section heading. */
export const sections = [
    { id: 'acerca-de-mi', label: { es: 'Acerca de mí', en: 'About me' }, title: { es: 'Acerca de mí', en: 'About me' }, kicker: { es: 'Quién soy', en: 'Who I am' } },
    { id: 'desarrollo-profesional', label: { es: 'Desarrollo', en: 'Career' }, title: { es: 'Desarrollo Profesional', en: 'Professional Development' }, kicker: { es: 'CV, habilidades y certificaciones', en: 'CV, skills & certifications' } },
    { id: 'proyectos', label: { es: 'Proyectos', en: 'Projects' }, title: { es: 'Proyectos Académicos y Profesionales', en: 'Academic & Professional Projects' }, kicker: { es: 'Lo que he construido', en: "What I've built" } },
    { id: 'competencias-blandas', label: { es: 'Competencias', en: 'Soft skills' }, title: { es: 'Competencias Blandas', en: 'Soft Skills' }, kicker: { es: 'Cómo trabajo con otros', en: 'How I work with others' } },
    { id: 'anexos', label: { es: 'Anexos', en: 'Annexes' }, title: { es: 'Anexos', en: 'Annexes' }, kicker: { es: 'Testimonios y reconocimientos', en: 'Testimonials & recognitions' } },
] as const satisfies readonly { id: string; label: Bi; title: Bi; kicker: Bi }[];

export type SectionId = (typeof sections)[number]['id'];

export function section(id: SectionId) {
    return sections.find((s) => s.id === id)!;
}

export const hero = {
    badge: { es: 'Disponible para oportunidades', en: 'Available for opportunities' } as Bi,
    greeting: { es: 'Hola, soy', en: "Hi, I'm" } as Bi,
    name: 'Andrés Rodas',
    positioning: { es: 'Estudiante de Ingeniería Informática | Cloud & AI', en: 'Informatics Engineering Student | Cloud & AI' } as Bi,
    description: {
        es: 'Estudio Ingeniería Informática en la UPCH y llevo modelos de machine learning a la nube. Mis modelos de predicción de calidad del aire para cuatro ciudades de Latinoamérica están desplegados en AWS Fargate.',
    } as Bi,
    ctaCV: { es: 'Ver CV', en: 'View CV' } as Bi,
};

export const floatingTech: Icon[] = [Cloud, Brain, Server];

export const contact = {
    title: { es: 'Contacto', en: 'Contact' } as Bi,
    text: {
        es: 'Estoy abierto a prácticas, proyectos y colaboraciones en Cloud & AI. Escríbeme por cualquiera de estos medios.',
    } as Bi,
    copied: { es: '¡Correo copiado!', en: 'Email copied!' } as Bi,
    methods: [
        { icon: Mail as Icon, label: { es: 'Correo', en: 'Email' } as Bi, value: socials.email, href: `mailto:${socials.email}`, copy: true },
        { icon: LinkedinIcon as Icon, label: { es: 'LinkedIn', en: 'LinkedIn' } as Bi, value: 'andres-rodas-802309272', href: socials.linkedin, copy: false },
        { icon: GithubIcon as Icon, label: { es: 'GitHub', en: 'GitHub' } as Bi, value: 'AndresRJ18', href: socials.github, copy: false },
    ],
};

export const footer = {
    tagline: { es: 'Cloud & AI desde Lima, Perú', en: 'Cloud & AI from Lima, Peru' } as Bi,
    rights: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' } as Bi,
};
