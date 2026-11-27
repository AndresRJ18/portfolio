import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy } from 'lucide-react';
import type { Project } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { RetroPanel } from './ui/RetroPanel';

/**
 * Interim card (F1): links always visible, keyboard-accessible details toggle, static poster only
 * (the 4–37 MB GIF swap is gone until F3 replaces it with lightweight video).
 */
export function ProjectCard({ project }: { project: Project }) {
    const { t } = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const detailsId = useId();

    return (
        <RetroPanel as="article" className="flex flex-col overflow-hidden">
            {project.image && (
                <div className="relative aspect-video overflow-hidden border-b-2 border-neon-green/40 bg-void">
                    <img
                        src={project.image}
                        alt={`Captura de ${project.title}`}
                        width={640}
                        height={360}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                    />
                    {project.award && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 bg-neon-green px-2 py-1 font-mono text-xs font-semibold text-void">
                            <Trophy size={14} aria-hidden="true" />
                            {t(project.award.es, project.award.en)}
                        </span>
                    )}
                </div>
            )}

            <div className="flex flex-1 flex-col p-6">
                <h3 className="font-terminal text-3xl leading-none text-neon-green">{project.title}</h3>
                <p className="mt-2 text-text-secondary">{t(project.subtitle.es, project.subtitle.en)}</p>

                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    className="mt-4 inline-flex min-h-11 items-center gap-1 self-start font-mono text-sm text-neon-cyan hover:underline"
                >
                    {expanded ? 'Ocultar detalles' : 'Ver detalles'}
                    <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            id={detailsId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <p className="mt-2 text-text-secondary">{t(project.description.es, project.description.en)}</p>
                            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
                                {project.tags.map((tag) => (
                                    <li key={tag} className="border border-neon-cyan/60 bg-void px-2 py-1 font-mono text-xs text-neon-cyan">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-auto flex flex-wrap gap-3 pt-5">
                    {project.links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center gap-2 border-2 border-neon-green/70 bg-panel-alt px-3 py-2 font-mono text-sm text-text-primary transition-colors hover:border-neon-green hover:text-neon-green"
                            >
                                {Icon && <Icon size={16} aria-hidden="true" />}
                                {t(link.label.es, link.label.en)}
                            </a>
                        );
                    })}
                </div>
            </div>
        </RetroPanel>
    );
}
