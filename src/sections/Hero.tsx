import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { hero, floatingTech, socials } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { GlitchText } from '../components/ui/GlitchText';
import { Button } from '../components/ui/Button';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 16 } },
};

const floatingPositions: CSSProperties[] = [
    { top: '4%', left: '-6%' },
    { top: '58%', right: '-6%' },
    { bottom: '2%', left: '52%' },
];

export function Hero() {
    const { t } = useLanguage();

    return (
        <section id="home" className="relative flex min-h-screen items-center px-6 pb-20 pt-32">
            <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-2 md:items-center">
                <motion.div variants={container} initial="hidden" animate="show">
                    <motion.div
                        variants={item}
                        className="clip-retro-sm inline-flex items-center gap-2 border-2 border-neon-green bg-panel px-4 py-2 font-mono text-xs text-neon-green shadow-[var(--shadow-glow-green)]"
                    >
                        <span className="h-2 w-2 animate-blink rounded-full bg-neon-green" />
                        {t(hero.badge.es, hero.badge.en)}
                    </motion.div>

                    <motion.div variants={item} className="mt-6">
                        <span className="block font-terminal text-2xl text-text-secondary">
                            {t(hero.greeting.es, hero.greeting.en)}
                        </span>
                        <GlitchText
                            as="span"
                            text={hero.name}
                            className="mt-3 block font-pixel text-xl leading-tight text-neon-green text-glow-green sm:text-2xl md:text-3xl"
                        />
                    </motion.div>

                    <motion.h2 variants={item} className="mt-6 font-terminal text-2xl leading-snug">
                        <span className="block text-text-secondary">{t(hero.roleLine.es, hero.roleLine.en)}</span>
                        <span className="block text-neon-cyan text-glow-cyan">{t(hero.focusLine.es, hero.focusLine.en)}</span>
                    </motion.h2>

                    <motion.p variants={item} className="mt-6 max-w-lg text-text-secondary">
                        {t(hero.description.es, hero.description.en)}
                    </motion.p>

                    <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
                        <Button href={socials.github} target="_blank" rel="noopener noreferrer" variant="primary" icon={<i className="fab fa-github" />}>
                            GitHub
                        </Button>
                        <Button href={socials.linkedin} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<i className="fab fa-linkedin" />}>
                            LinkedIn
                        </Button>
                        <Button href="/CV_Andres_Rodas_upch.pdf" target="_blank" variant="secondary" icon={<i className="fas fa-file-pdf" />}>
                            {t(hero.ctaCV.es, hero.ctaCV.en)}
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 90 }}
                    className="relative mx-auto flex h-72 w-72 items-center justify-center md:h-80 md:w-80"
                >
                    <div className="clip-retro absolute inset-0 translate-x-3 translate-y-3 border-2 border-neon-cyan" />
                    <img
                        src="/img/yo.png"
                        alt="Andrés Rodas"
                        className="clip-retro relative z-10 h-full w-full border-2 border-neon-green object-cover shadow-[var(--shadow-glow-green)]"
                    />

                    {floatingTech.map((icon, i) => (
                        <motion.div
                            key={icon}
                            className="clip-retro-sm absolute flex h-14 w-14 items-center justify-center border-2 border-neon-green bg-panel text-neon-green shadow-[var(--shadow-glow-green)]"
                            style={floatingPositions[i]}
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                        >
                            <i className={`${icon} text-xl`} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
