import { useEffect, useRef, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { hero } from '../data/site';
import { useLanguage } from '../context/LanguageContext';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * True once the window `load` event has fired. Starts false on every first render so the
 * hydrated markup matches the prerendered HTML; the effect flips it (immediately if already loaded).
 */
function useWindowLoaded() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (document.readyState === 'complete') {
            setLoaded(true);
            return;
        }
        const onLoad = () => setLoaded(true);
        window.addEventListener('load', onLoad, { once: true });
        return () => window.removeEventListener('load', onLoad);
    }, []);
    return loaded;
}

/**
 * Background media. The poster paints first (preloaded in index.html); the <video> is only mounted
 * after `load`, so its ~1 MB never competes with the JS/CSS/fonts that render the LCP heading, and it
 * fades in once frames are actually playing. Reduced motion → poster only. Paused while off-screen.
 */
function HeroMedia() {
    const reduce = useReducedMotion();
    const loaded = useWindowLoaded();
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { video } = hero;
    const showVideo = loaded && !reduce;

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) el.play().catch(() => {});
            else el.pause();
        });
        io.observe(el);
        return () => io.disconnect();
    }, [showVideo]);

    return (
        <>
            <img
                src={video.poster}
                srcSet={`${video.posterSmall} 640w, ${video.poster} 1280w`}
                sizes="100vw"
                alt=""
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
            />
            {showVideo && (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    tabIndex={-1}
                    onPlaying={() => setPlaying(true)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? 'opacity-100' : 'opacity-0'}`}
                >
                    <source src={video.webm} type="video/webm" />
                    <source src={video.mp4} type="video/mp4" />
                </video>
            )}
        </>
    );
}

export function Hero() {
    const { t } = useLanguage();

    // Name and positioning only translate (never start hidden) so they don't delay LCP.
    const rise = (delay: number, fade = true) => ({
        initial: fade ? { opacity: 0, y: 24 } : { y: 24 },
        animate: fade ? { opacity: 1, y: 0 } : { y: 0 },
        transition: { duration: 0.9, ease, delay },
    });

    return (
        <section id="inicio" aria-labelledby="hero-name" className="relative isolate flex min-h-[640px] items-center overflow-hidden h-svh">
            <HeroMedia />
            {/* Contrast scrim: darker centre band behind the copy, fades into the page at the bottom. */}
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgb(10_10_10/0.72),rgb(10_10_10/0.35))]" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />

            <div className="relative mx-auto w-full max-w-5xl px-5 pt-16 text-center">
                <m.p {...rise(0)} className="font-mono text-xs uppercase tracking-[0.25em] text-white/75">
                    Lima, Perú · UPCH
                </m.p>

                <m.h1
                    id="hero-name"
                    {...rise(0.05, false)}
                    className="mt-5 font-display text-[clamp(2.6rem,8vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-white"
                >
                    {hero.name}
                </m.h1>

                <m.p
                    {...rise(0.15, false)}
                    className="text-gradient mx-auto mt-5 max-w-4xl font-display text-[clamp(1.05rem,2.2vw,1.6rem)] font-bold leading-snug"
                >
                    {/* Each half is an inline-block so the only line break falls at the "|". */}
                    {t(hero.positioning.es, hero.positioning.en)
                        .split(' | ')
                        .map((part, i) => (
                            <span key={part}>
                                {i > 0 && ' '}
                                <span className="inline-block">
                                    {part}
                                    {i === 0 && <>&nbsp;|</>}
                                </span>
                            </span>
                        ))}
                </m.p>

                <m.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={hero.ctaPrimary.href}
                        className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 font-display text-base font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
                    >
                        {t(hero.ctaPrimary.label.es, hero.ctaPrimary.label.en)}
                        <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                    <a
                        href={hero.ctaSecondary.href}
                        className="inline-flex min-h-12 items-center rounded-full border border-white/25 bg-white/5 px-8 font-display text-base font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/15"
                    >
                        {t(hero.ctaSecondary.label.es, hero.ctaSecondary.label.en)}
                    </a>
                </m.div>
            </div>
        </section>
    );
}
