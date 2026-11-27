import { useId, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Award, ChevronDown, FlaskConical, GraduationCap, Sparkles } from 'lucide-react';
import { milestones, type Milestone } from '../data/timeline';
import { useLanguage } from '../context/LanguageContext';

const kindIcon = { academico: GraduationCap, reconocimiento: Award, proyecto: FlaskConical, programa: Sparkles } as const;

function Item({ ms }: { ms: Milestone }) {
    const { t } = useLanguage();
    const Icon = kindIcon[ms.kind];
    const key = ms.featured;

    return (
        <m.li
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-[2.5rem_1fr] gap-4"
        >
            <span
                aria-hidden="true"
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border ${
                    key ? 'border-accent bg-accent text-void' : 'border-white/20 bg-void text-text-secondary'
                }`}
            >
                <Icon size={17} />
            </span>
            <div className="pb-1 pt-1.5">
                <p className="font-mono text-sm text-accent">{t(ms.date.es, ms.date.en)}</p>
                <h5 className={`mt-0.5 font-display font-bold leading-snug ${key ? 'text-xl md:text-2xl' : 'text-lg'}`}>{t(ms.title.es, ms.title.en)}</h5>
                {ms.detail && <p className="mt-1.5 max-w-2xl text-text-secondary">{t(ms.detail.es, ms.detail.en)}</p>}
            </div>
        </m.li>
    );
}

/**
 * Career timeline 2023 → 2027, grouped by year.
 *  - Collapsed (default): key milestones only; expanded: everything. Toggle works both ways.
 *  - A copper line draws itself with scroll progress (scaleY only); fully drawn under reduced motion.
 *  - Desktop: year column (sticky) + items; mobile: year heading above its items.
 *  - Text only: photos appear once, in Anexos → Reconocimientos.
 */
export function Timeline() {
    const ref = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const scrollAfterCollapse = useRef(false);
    const listId = useId();
    const reduce = useReducedMotion();
    const [expanded, setExpanded] = useState(false);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

    const visible = expanded ? milestones : milestones.filter((ms) => ms.featured);
    const hidden = milestones.length - milestones.filter((ms) => ms.featured).length;
    const years = [...new Set(visible.map((ms) => ms.year))];

    function toggle() {
        if (expanded) scrollAfterCollapse.current = true;
        setExpanded(!expanded);
    }

    function onExitComplete() {
        if (!scrollAfterCollapse.current) return;
        scrollAfterCollapse.current = false;
        // onExitComplete fires before React commits the removal; wait two frames so layout is final.
        requestAnimationFrame(() => requestAnimationFrame(() => toggleRef.current?.scrollIntoView({ block: 'center' })));
    }

    return (
        <div>
            <div ref={ref} id={listId} className="relative">
                {/* Track + progress line, aligned with the item nodes. */}
                <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-white/10 md:left-[11.25rem]" />
                <m.div
                    aria-hidden="true"
                    style={{ scaleY: reduce ? 1 : scaleY }}
                    className="absolute bottom-0 left-5 top-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-accent to-accent-2 md:left-[11.25rem]"
                />

                <div className="relative space-y-12">
                    {years.map((year) => (
                        <section key={year} aria-labelledby={`tl-${year}`} className="grid gap-5 md:grid-cols-[8rem_1fr] md:gap-8">
                            <h4
                                id={`tl-${year}`}
                                className="pl-14 font-display text-3xl font-extrabold leading-none text-white/90 md:sticky md:top-24 md:self-start md:pl-0 md:pt-2 md:text-right md:text-4xl"
                            >
                                {year}
                            </h4>
                            <ol className="space-y-7">
                                <AnimatePresence initial={false} onExitComplete={onExitComplete}>
                                    {visible
                                        .filter((ms) => ms.year === year)
                                        .map((ms) => (
                                            <Item key={ms.id} ms={ms} />
                                        ))}
                                </AnimatePresence>
                            </ol>
                        </section>
                    ))}
                </div>
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    ref={toggleRef}
                    type="button"
                    onClick={toggle}
                    aria-expanded={expanded}
                    aria-controls={listId}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 font-display text-sm font-semibold backdrop-blur transition-colors duration-200 hover:bg-white/10"
                >
                    {expanded ? 'Mostrar solo los hitos clave' : `Ver trayectoria completa (+${hidden} hitos)`}
                    <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

        </div>
    );
}
