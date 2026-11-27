import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { cvHref, floatingTech, hero, socials } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { GlitchText } from '../components/ui/GlitchText';
import { Button } from '../components/ui/Button';
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcon';
import { ScanlineOverlay } from '../components/ScanlineOverlay';

// Text slides in but is never hidden (opacity stays 1) so it doesn't delay LCP.
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
    hidden: { y: 14 },
    show: { y: 0, transition: { type: 'spring' as const, stiffness: 140, damping: 18 } },
};

const floatingPositions: CSSProperties[] = [
    { top: '4%', left: '-6%' },
    { top: '58%', right: '-6%' },
    { bottom: '2%', left: '52%' },
];

export function Hero() {
    const { t } = useLanguage();

    return (
        <section id="inicio" aria-labelledby="hero-name" className="relative flex min-h-svh items-center overflow-hidden px-5 pb-20 pt-28">
            <ScanlineOverlay />

            <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[1.2fr_1fr] md:items-center">
                <motion.div variants={container} initial="hidden" animate="show">
                    <motion.p
                        variants={item}
                        className="inline-flex items-center gap-2 border-2 border-neon-green bg-panel px-4 py-2 font-mono text-sm text-neon-green"
                    >
                        <span className="h-2 w-2 animate-blink rounded-full bg-neon-green" aria-hidden="true" />
                        {t(hero.badge.es, hero.badge.en)}
                    </motion.p>

                    <motion.div variants={item} className="mt-6">
                        <p className="font-terminal text-2xl text-text-secondary">{t(hero.greeting.es, hero.greeting.en)}</p>
                        <GlitchText
                            as="h1"
                            id="hero-name"
                            text={hero.name}
                            className="mt-3 font-pixel text-2xl leading-tight text-neon-green text-glow-green sm:text-3xl md:text-4xl"
                        />
                    </motion.div>

                    <motion.p variants={item} className="mt-6 font-terminal text-3xl leading-tight text-neon-cyan">
                        {t(hero.positioning.es, hero.positioning.en)}
                    </motion.p>

                    <motion.p variants={item} className="mt-5 max-w-xl text-lg text-text-secondary">
                        {t(hero.description.es, hero.description.en)}
                    </motion.p>

                    <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
                        <Button href={cvHref} target="_blank" rel="noopener" variant="primary" icon={<FileText size={18} aria-hidden="true" />}>
                            {t(hero.ctaCV.es, hero.ctaCV.en)}
                        </Button>
                        <Button href={socials.linkedin} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<LinkedinIcon size={18} />}>
                            LinkedIn
                        </Button>
                        <Button href={socials.github} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<GithubIcon size={18} />}>
                            GitHub
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.92 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 90 }}
                    className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80"
                >
                    <div className="hard-shadow-cyan h-full w-full">
                        <div className="clip-retro h-full w-full bg-neon-green p-[2px]">
                            <img
                                src="/img/yo.png"
                                alt="Fotografía de Andrés Rodas"
                                width={320}
                                height={320}
                                fetchPriority="high"
                                className="clip-retro-inner h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {floatingTech.map((Icon, i) => (
                        <motion.div
                            key={i}
                            aria-hidden="true"
                            className="hard-shadow-sm-green absolute"
                            style={floatingPositions[i]}
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                        >
                            <div className="clip-retro-sm bg-neon-green p-[2px]">
                                <div className="clip-retro-sm-inner flex h-12 w-12 items-center justify-center bg-panel text-neon-green">
                                    <Icon size={22} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
