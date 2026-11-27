import { projects } from '../data/projects';
import { section } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/ui/Reveal';
import { PendingNotice } from '../components/ui/PendingNotice';

const meta = section('proyectos');

export function ProjectsSection() {
    const { t } = useLanguage();

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="px-5 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeader id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />

                <div className="mb-14">
                    <PendingNotice
                        phase="F3"
                        items={[
                            'Proyectos aprobados: Pesticidas (VIS/NIR), LatamAirQuality, MC656, NovA AI y ACS',
                            'Evidencias: capturas, diagramas de arquitectura y contexto académico',
                            'Lista de “Otros proyectos”: MultiCaRe, Azurely, Issue2Secure y URL Shortener',
                        ]}
                    />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {projects.map((project, i) => (
                        <Reveal key={project.id} delay={(i % 2) * 0.1}>
                            <ProjectCard project={project} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
