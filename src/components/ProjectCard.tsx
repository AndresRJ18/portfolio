import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { RetroPanel } from './ui/RetroPanel';

export function ProjectCard({ project }: { project: Project }) {
    const { t } = useLanguage();
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            className="relative"
            onHoverStart={() => setExpanded(true)}
            onHoverEnd={() => setExpanded(false)}
            onClick={() => setExpanded((v) => !v)}
            whileHover={{ y: -4 }}
        >
            <RetroPanel className="overflow-hidden">
                <div className="relative h-48 overflow-hidden border-b-2 border-neon-green/40">
                    <img
                        src={expanded ? project.gif : project.image}
                        alt={project.title}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                    />
                    {project.hackathonBadge && (
                        <span className="clip-retro-sm absolute right-2 top-2 bg-neon-green px-2 py-1 font-mono text-[10px] font-bold text-void">
                            <i className="fas fa-trophy mr-1" />
                            {project.hackathonBadge}
                        </span>
                    )}
                </div>

                <div className="p-5">
                    <h3 className="font-terminal text-2xl text-neon-green text-glow-green">{project.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text-secondary">{t(project.subtitle.es, project.subtitle.en)}</p>

                    <AnimatePresence initial={false}>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="mt-3 text-sm text-text-secondary">{t(project.description.es, project.description.en)}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="clip-retro-sm border border-neon-cyan/60 bg-void px-2 py-1 font-mono text-[11px] text-neon-cyan"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 flex gap-3">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={link.title}
                                            onClick={(e) => e.stopPropagation()}
                                            className="clip-retro-sm flex h-9 w-9 items-center justify-center border-2 border-neon-green/60 bg-panel-alt transition-shadow hover:shadow-[var(--shadow-glow-green)]"
                                        >
                                            <i className={link.icon} />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </RetroPanel>
        </motion.div>
    );
}
