import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { sectionLabels } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';

export function Projects() {
    const { t } = useLanguage();

    return (
        <section id="projects" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    label={t(sectionLabels.projects.label.es, sectionLabels.projects.label.en)}
                    title={t(sectionLabels.projects.title.es, sectionLabels.projects.title.en)}
                />

                <div className="grid gap-8 md:grid-cols-2">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: (i % 2) * 0.12 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
