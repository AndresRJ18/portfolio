import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { skills } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';

const AUTOPLAY_MS = 5000;

/**
 * Stacked, tilted card carousel (after MusicWave's testimonials). Cards are absolutely positioned
 * around the centre; only transform/opacity change, via CSS transitions (collapsed to ~0 under
 * prefers-reduced-motion by the global rule). All cards stay in the DOM in reading order, so screen
 * readers get every skill regardless of which one is in front.
 */
export function SkillsCarousel() {
    const { t } = useLanguage();
    const reduce = useReducedMotion();
    const n = skills.length;
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [inView, setInView] = useState(false);
    const dragX = useRef<number | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const go = useCallback((delta: number) => setActive((a) => (a + delta + n) % n), [n]);

    // Only rotate while on screen, so visitors always arrive at the first card.
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Autoplay: off under reduced motion, while hovered/focused, off-screen, or when the tab is hidden.
    useEffect(() => {
        if (reduce || paused || !inView) return;
        const id = window.setInterval(() => {
            if (document.visibilityState === 'visible') go(1);
        }, AUTOPLAY_MS);
        return () => window.clearInterval(id);
    }, [reduce, paused, inView, go]);

    function onPointerDown(e: PointerEvent) {
        dragX.current = e.clientX;
    }
    function onPointerUp(e: PointerEvent) {
        if (dragX.current === null) return;
        const dx = e.clientX - dragX.current;
        dragX.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    }

    return (
        <div
            ref={rootRef}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Habilidades técnicas"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <div
                className="relative h-[460px] touch-pan-y select-none overflow-hidden sm:h-[500px]"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={() => (dragX.current = null)}
            >
                {skills.map((skill, i) => {
                    // Signed distance from the active card, wrapped to [-n/2, n/2).
                    const rel = ((i - active + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
                    const abs = Math.abs(rel);
                    const isActive = rel === 0;
                    const x = rel * 74; // % of the card's own width — enough spread that only edges overlap
                    const y = isActive ? -6 : abs % 2 ? 4 : 0; // %
                    const rotate = isActive ? 0 : rel % 2 ? 2.5 : -2.5;
                    const scale = isActive ? 1 : 0.94;
                    const Icon = skill.icon;

                    return (
                        <article
                            key={skill.title.es}
                            aria-roledescription="diapositiva"
                            aria-label={`${i + 1} de ${n}: ${t(skill.title.es, skill.title.en)}`}
                            onClick={() => !isActive && setActive(i)}
                            className={`clip-chamfer isolate absolute left-1/2 top-1/2 flex h-[380px] w-[min(82vw,340px)] flex-col p-7 transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] sm:h-[400px] sm:w-[360px] ${
                                isActive ? '' : 'cursor-pointer'
                            }`}
                            style={{
                                transform: `translate(calc(-50% + ${x}%), calc(-50% + ${y}%)) rotate(${rotate}deg) scale(${scale})`,
                                opacity: abs > 2 ? 0 : 1,
                                zIndex: 10 - abs,
                            }}
                        >
                            {/* Two stacked fills so the active swap is an opacity change, not a colour transition. */}
                            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-black/50 backdrop-blur-lg" />
                            <span
                                aria-hidden="true"
                                className={`absolute inset-0 -z-10 bg-accent transition-opacity duration-[600ms] ${isActive ? 'opacity-100' : 'opacity-0'}`}
                            />

                            <div className={`flex h-full flex-col transition-opacity duration-[600ms] ${isActive ? 'text-void' : 'text-white opacity-75'}`}>
                                <span
                                    className={`flex h-12 w-12 items-center justify-center rounded-full ${isActive ? 'bg-void/10' : 'bg-white/10'}`}
                                >
                                    <Icon size={22} aria-hidden="true" />
                                </span>
                                <h4 className="mt-5 font-display text-xl font-bold leading-tight">{t(skill.title.es, skill.title.en)}</h4>
                                <p className={`mt-3 text-[15px] leading-relaxed ${isActive ? 'text-void/80' : 'text-white/80'}`}>
                                    {t(skill.description.es, skill.description.en)}
                                </p>
                                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Tecnologías">
                                    {skill.tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className={`rounded-full px-2.5 py-1 font-mono text-xs ${
                                                isActive ? 'bg-void/10 text-void' : 'border border-white/20 text-white/85'
                                            }`}
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Habilidad anterior"
                    className="flex h-14 w-14 items-center justify-center bg-void text-white transition-colors duration-200 hover:bg-white/15"
                >
                    <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <p className="w-20 text-center font-mono text-sm text-white/85" aria-live={paused || reduce ? 'polite' : 'off'} aria-atomic="true">
                    {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </p>
                <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Habilidad siguiente"
                    className="flex h-14 w-14 items-center justify-center bg-void text-white transition-colors duration-200 hover:bg-white/15"
                >
                    <ChevronRight size={22} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
