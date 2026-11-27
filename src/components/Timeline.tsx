import { useId, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Award, ChevronDown, FlaskConical, GraduationCap, Sparkles } from 'lucide-react';
import { milestones, type Milestone } from '../data/timeline';
import { useLanguage } from '../context/LanguageContext';

const kindIcon = { academico: GraduationCap, reconocimiento: Award, proyecto: FlaskConical, programa: Sparkles } as const;

/** Shown when collapsed: the featured milestones plus the 2023 → 2027 bookends. */
const isKey = (ms: Milestone) => ms.featured || ms.id === 'ingreso' || ms.id === 'egreso';

function Item({ ms, side }: { ms: Milestone; side: 'left' | 'right' }) {
    const { t } = useLanguage();
    const Icon = kindIcon[ms.kind];
    const big = ms.featured;

    return (
        <m.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[1fr_3rem_1fr] md:gap-8"
        >
            {/* Node on the line */}
            <span
                aria-hidden="true"
                className={`relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-full border md:col-start-2 md:row-start-1 md:mx-auto ${
                    big ? 'border-accent bg-accent text-void' : 'border-white/20 bg-void text-text-secondary'
                }`}
            >
                <Icon size={17} />
            </span>

            <div className={`md:row-start-1 ${side === 'left' ? 'md:col-start-1 md:text-right' : 'md:col-start-3'}`}>
                <p className="font-mono text-sm text-accent">{t(ms.date.es, ms.date.en)}</p>
                <h4 className={`mt-1 font-display font-bold leading-tight ${big ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>{t(ms.title.es, ms.title.en)}</h4>
                {ms.detail && <p className="mt-2 text-text-secondary">{t(ms.detail.es, ms.detail.en)}</p>}

                {ms.photo && (
                    <figure className={`group mt-5 overflow-hidden rounded-2xl border border-white/10 ${side === 'left' ? 'md:ml-auto' : ''} ${big ? '' : 'max-w-sm'}`}>
                        <img
                            src={ms.photo.src}
                            srcSet={ms.photo.srcSet}
                            sizes="(min-width: 768px) 40vw, 85vw"
                            alt={t(ms.photo.alt.es, ms.photo.alt.en)}
                            width={ms.photo.width}
                            height={ms.photo.height}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                    </figure>
                )}
            </div>
        </m.li>
    );
}

/**
 * Career timeline 2023 → 2027, collapsible.
 *  - Collapsed (default): key milestones only. Expanded: all of them. The toggle can be used both ways.
 *  - A copper line draws itself with scroll progress (scaleY — a transform); fully drawn under reduced motion.
 *  - Mobile: single column, line on the left. Desktop: centred line, alternating sides.
 */
export function Timeline() {
    const ref = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const listId = useId();
    const reduce = useReducedMotion();
    const [expanded, setExpanded] = useState(false);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

    const visible = expanded ? milestones : milestones.filter(isKey);
    const hidden = milestones.length - milestones.filter(isKey).length;

    const scrollAfterCollapse = useRef(false);

    function toggle() {
        // After collapsing from deep inside the list, bring the toggle back into view so the reader isn't
        // lost — but only once the exiting milestones are gone, otherwise the button moves after scrolling.
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
            <div ref={ref} className="relative">
                <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2" />
                <m.div
                    aria-hidden="true"
                    style={{ scaleY: reduce ? 1 : scaleY }}
                    className="absolute bottom-0 left-5 top-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-accent to-accent-2 md:left-1/2"
                />

                <ol id={listId} className="relative space-y-12 md:space-y-14">
                    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
                        {visible.map((ms, i) => (
                            <Item key={ms.id} ms={ms} side={i % 2 === 0 ? 'left' : 'right'} />
                        ))}
                    </AnimatePresence>
                </ol>
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    ref={toggleRef}
                    type="button"
                    onClick={toggle}
                    aria-expanded={expanded}
                    aria-controls={listId}
                    className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 font-display text-sm font-semibold backdrop-blur transition-colors duration-200 hover:bg-white/10"
                >
                    {expanded ? 'Mostrar solo los hitos clave' : `Ver trayectoria completa (+${hidden} hitos)`}
                    <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </div>
    );
}
