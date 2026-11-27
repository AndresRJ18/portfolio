import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Lock, Play } from 'lucide-react';
import { projectFilters, projects, type Project, type ProjectFilter } from '../data/projects';
import { section } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectVisual } from '../components/ProjectVisual';
import { ProjectBadges } from '../components/ProjectBadges';
import { CaseStudyDialog } from '../components/CaseStudyDialog';

const meta = section('proyectos');

/** Bento spans on a 6-column grid: large + narrow, two halves, then full width. */
const SPANS = ['md:col-span-4', 'md:col-span-2', 'md:col-span-3', 'md:col-span-3', 'md:col-span-6'];
const HEIGHTS = ['md:h-80', 'md:h-80', 'md:h-72', 'md:h-72', 'md:h-96'];

type Filter = 'todos' | ProjectFilter;

function FeaturedCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project, play: boolean) => void }) {
    const { t } = useLanguage();
    const repo = project.links.find((l) => l.kind === 'repo');
    const demo = project.links.find((l) => l.kind === 'demo');
    const isPrivate = project.badges?.some((b) => b.tone === 'private');

    return (
        <m.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={`group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel ${SPANS[index % SPANS.length]}`}
        >
            <div className={`relative h-56 overflow-hidden ${HEIGHTS[index % HEIGHTS.length]}`}>
                {/* Mouse shortcut only — keyboard/AT users get the explicit "Ver caso de estudio" button below. */}
                <div aria-hidden="true" onClick={() => onOpen(project, false)} className="h-full cursor-pointer">
                    <ProjectVisual project={project} className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </div>
                <ProjectBadges badges={project.badges} className="pointer-events-none absolute left-4 top-4" />
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">{t(project.context.es, project.context.en)}</p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{project.title}</h3>
                <p className="mt-2 text-text-secondary">{t(project.subtitle.es, project.subtitle.en)}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                    {project.stack.slice(0, 5).map((s) => (
                        <li key={s} className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-xs text-text-secondary">
                            {s}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    <button
                        type="button"
                        onClick={() => onOpen(project, false)}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 font-display text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
                    >
                        Ver caso de estudio <ArrowRight size={16} aria-hidden="true" />
                    </button>
                    {project.video && (
                        <button
                            type="button"
                            onClick={() => onOpen(project, true)}
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 font-display text-sm font-semibold hover:bg-white/10"
                        >
                            <Play size={15} aria-hidden="true" fill="currentColor" /> Ver demo
                        </button>
                    )}
                    {demo && !project.video && (
                        <a
                            href={demo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/20 px-5 font-display text-sm font-semibold hover:bg-white/10"
                        >
                            Ver demo <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                    )}
                    {repo && (
                        <a
                            href={repo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 px-3 text-sm font-medium text-accent hover:underline"
                        >
                            Repositorio <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                    )}
                    {isPrivate && !repo && (
                        <span className="inline-flex min-h-11 items-center gap-1.5 px-3 text-sm text-text-muted">
                            <Lock size={14} aria-hidden="true" /> Código privado
                        </span>
                    )}
                </div>
            </div>
        </m.article>
    );
}

export function ProjectsSection() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState<Filter>('todos');
    const [open, setOpen] = useState<{ project: Project; play: boolean } | null>(null);

    const matches = (cats: ProjectFilter[]) => filter === 'todos' || cats.includes(filter);
    const featured = projects.filter((p) => p.featured && matches(p.categories));
    const others = projects.filter((p) => !p.featured && matches(p.categories));

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="px-5 py-28 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-7xl">
                <SectionHeader index="03" id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />

                <div role="group" aria-label="Filtrar proyectos" className="mb-10 flex flex-wrap gap-2">
                    {projectFilters.map((f) => {
                        const active = filter === f.id;
                        return (
                            <button
                                key={f.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setFilter(f.id)}
                                className={`min-h-11 rounded-full px-5 font-display text-sm font-semibold transition-colors duration-200 ${
                                    active ? 'bg-white text-black' : 'border border-white/15 text-text-secondary hover:border-white/35 hover:text-white'
                                }`}
                            >
                                {t(f.label.es, f.label.en)}
                            </button>
                        );
                    })}
                </div>

                <p className="sr-only" aria-live="polite">
                    {featured.length + others.length} proyectos
                </p>

                <AnimatePresence mode="wait" initial={false}>
                    <m.div key={filter} exit={{ opacity: 0, transition: { duration: 0.15 } }} className="grid gap-5 md:grid-cols-6">
                        {featured.map((p, i) => (
                            <FeaturedCard key={p.id} project={p} index={i} onOpen={(project, play) => setOpen({ project, play })} />
                        ))}
                    </m.div>
                </AnimatePresence>

                {others.length > 0 && (
                    <div className="mt-20">
                        <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted">Otros proyectos</h3>
                        <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                            {others.map((p) => (
                                <li key={p.id} className="grid gap-3 py-6 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-8">
                                    <div>
                                        <p className="font-display text-lg font-bold">{p.title}</p>
                                        <p className="mt-1 text-sm text-text-muted">{t(p.context.es, p.context.en)}</p>
                                    </div>
                                    <div>
                                        <ProjectBadges badges={p.badges} className="mb-2" />
                                        <p className="text-text-secondary">{t(p.subtitle.es, p.subtitle.en)}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4">
                                        {p.video && (
                                            <button
                                                type="button"
                                                onClick={() => setOpen({ project: p, play: true })}
                                                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                                            >
                                                <Play size={13} aria-hidden="true" fill="currentColor" /> Ver demo
                                            </button>
                                        )}
                                        {p.links.map((l) => (
                                            <a
                                                key={l.href}
                                                href={l.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent hover:underline"
                                            >
                                                {t(l.label.es, l.label.en)} <ArrowUpRight size={14} aria-hidden="true" />
                                            </a>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <CaseStudyDialog project={open?.project ?? null} playVideo={open?.play ?? false} onClose={() => setOpen(null)} />
        </section>
    );
}
