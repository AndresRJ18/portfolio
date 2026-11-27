import { useEffect, useRef } from 'react';
import { ArrowUpRight, Lock, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { LiteYouTube } from './LiteYouTube';
import { ProjectVisual } from './ProjectVisual';
import { ProjectBadges } from './ProjectBadges';
import { PendingNotice } from './ui/PendingNotice';

interface CaseStudyDialogProps {
    project: Project | null;
    /** Load the video player immediately (opened via "Ver demo"). */
    playVideo: boolean;
    onClose: () => void;
}

/**
 * Case study in a native <dialog>: showModal() gives focus trapping, Esc to close and an inert page
 * behind it for free. Clicking the backdrop also closes. Page scroll is locked while open.
 */
export function CaseStudyDialog({ project, playVideo, onClose }: CaseStudyDialogProps) {
    const { t } = useLanguage();
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (project && !dialog.open) {
            dialog.showModal();
            document.documentElement.style.overflow = 'hidden';
        }
        if (!project && dialog.open) dialog.close();
    }, [project]);

    function handleClose() {
        document.documentElement.style.overflow = '';
        onClose();
    }

    return (
        <dialog
            ref={ref}
            onClose={handleClose}
            onClick={(e) => e.target === ref.current && ref.current?.close()}
            aria-labelledby="case-title"
            className="m-auto max-h-[92svh] w-[min(64rem,94vw)] overflow-y-auto rounded-3xl border border-white/10 bg-panel p-0 text-text-primary backdrop:bg-black/75 backdrop:backdrop-blur-sm"
        >
            {project && (
                <article>
                    <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-hairline bg-panel/95 px-6 py-4 backdrop-blur md:px-10">
                        <p className="truncate font-mono text-sm text-text-muted">{t(project.context.es, project.context.en)}</p>
                        <button
                            type="button"
                            onClick={() => ref.current?.close()}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
                            aria-label="Cerrar caso de estudio"
                        >
                            <X size={20} aria-hidden="true" />
                        </button>
                    </div>

                    <div className="px-6 pb-10 pt-8 md:px-10">
                        <ProjectBadges badges={project.badges} />
                        <h2 id="case-title" className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-tight">
                            {project.title}
                        </h2>
                        <p className="mt-3 max-w-2xl text-lg text-text-secondary">{t(project.subtitle.es, project.subtitle.en)}</p>

                        {/* Main evidence: the demo video when there is one, otherwise the visual. */}
                        <div className="mt-8">
                            {project.video ? (
                                <LiteYouTube id={project.video.id} title={project.video.title} autoLoad={playVideo} />
                            ) : (
                                <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
                                    <ProjectVisual project={project} />
                                </div>
                            )}
                        </div>

                        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_16rem]">
                            <div>
                                {project.role && (
                                    <>
                                        <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted">Mi rol</h3>
                                        <p className="mt-2 text-lg">{t(project.role.es, project.role.en)}</p>
                                    </>
                                )}
                                <h3 className={`font-mono text-sm uppercase tracking-[0.2em] text-text-muted ${project.role ? 'mt-8' : ''}`}>Qué hice y resultados</h3>
                                <ul className="mt-3 space-y-3 text-text-secondary">
                                    {project.highlights.map((h) => (
                                        <li key={h.es} className="flex gap-3">
                                            <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                                            {t(h.es, h.en)}
                                        </li>
                                    ))}
                                </ul>
                                {project.note && <p className="mt-5 text-sm text-text-muted">{t(project.note.es, project.note.en)}</p>}
                                {project.pendingEvidence && (
                                    <div className="mt-8">
                                        <PendingNotice phase="evidencias" items={project.pendingEvidence} />
                                    </div>
                                )}
                            </div>

                            <aside className="space-y-8">
                                <div>
                                    <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted">Stack</h3>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {project.stack.map((s) => (
                                            <li key={s} className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs">
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted">Enlaces</h3>
                                    <ul className="mt-3 space-y-2">
                                        {project.links.map((l) => (
                                            <li key={l.href}>
                                                <a
                                                    href={l.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group inline-flex min-h-11 items-center gap-2 font-medium text-accent hover:underline"
                                                >
                                                    {t(l.label.es, l.label.en)}
                                                    <ArrowUpRight size={16} aria-hidden="true" />
                                                </a>
                                            </li>
                                        ))}
                                        {project.links.length === 0 && (
                                            <li className="flex items-center gap-2 text-text-secondary">
                                                <Lock size={16} aria-hidden="true" /> Código en repositorio privado del equipo
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </aside>
                        </div>

                        {project.architecture && (
                            <section className="mt-12" aria-labelledby="case-arch">
                                <h3 id="case-arch" className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted">
                                    Arquitectura
                                </h3>
                                <ol className="relative mt-5 space-y-3 before:absolute before:bottom-4 before:left-[0.95rem] before:top-4 before:w-px before:bg-white/15">
                                    {project.architecture.map((a, i) => (
                                        <li key={a.stage.es} className="relative flex gap-4">
                                            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-panel font-mono text-xs text-accent">
                                                {i + 1}
                                            </span>
                                            <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                                <p className="font-display font-semibold">{t(a.stage.es, a.stage.en)}</p>
                                                <p className="mt-0.5 font-mono text-[13px] leading-relaxed text-text-secondary">{t(a.detail.es, a.detail.en)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        )}

                        {project.results?.map((r) => (
                            <section key={r.caption.es} className="mt-12">
                                <div className="overflow-x-auto rounded-xl border border-white/10" tabIndex={0} aria-label={t(r.caption.es, r.caption.en)}>
                                    <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                                        <caption className="px-4 pb-3 pt-4 text-left font-mono text-sm uppercase tracking-[0.15em] text-text-muted">
                                            {t(r.caption.es, r.caption.en)}
                                        </caption>
                                        <thead>
                                            <tr className="border-y border-white/10 bg-white/[0.04]">
                                                {r.columns.map((c) => (
                                                    <th key={c} scope="col" className="px-4 py-2.5 font-semibold">
                                                        {c}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {r.rows.map((row, i) => (
                                                <tr key={i} className="border-b border-white/5 last:border-0">
                                                    {row.map((cell, j) =>
                                                        j === 0 ? (
                                                            <th key={j} scope="row" className="px-4 py-2.5 font-medium">
                                                                {cell}
                                                            </th>
                                                        ) : (
                                                            <td key={j} className={`px-4 py-2.5 tabular-nums ${cell.startsWith('−') ? 'text-[#f2a1a1]' : 'text-text-secondary'}`}>
                                                                {cell}
                                                            </td>
                                                        ),
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {r.note && <p className="mt-2 text-sm text-text-muted">{t(r.note.es, r.note.en)}</p>}
                            </section>
                        ))}

                        {project.gallery && (
                            <section className="mt-12" aria-labelledby="case-gallery">
                                <h3 id="case-gallery" className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted">
                                    Evidencias
                                </h3>
                                <div className="mt-5 grid gap-5 md:grid-cols-2">
                                    {project.gallery.map((g, i) => (
                                        <figure key={g.src} className={i === 0 && project.gallery!.length % 2 === 1 ? 'md:col-span-2' : ''}>
                                            <img
                                                src={g.src}
                                                srcSet={g.srcSet}
                                                sizes="(min-width: 768px) 50vw, 90vw"
                                                alt={t(g.alt.es, g.alt.en)}
                                                width={g.width}
                                                height={g.height}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full rounded-xl border border-white/10"
                                            />
                                            <figcaption className="mt-2 text-sm text-text-muted">{t(g.caption.es, g.caption.en)}</figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </article>
            )}
        </dialog>
    );
}
