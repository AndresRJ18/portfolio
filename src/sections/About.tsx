import { motion } from 'framer-motion';
import { about, sectionLabels } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { RetroPanel } from '../components/ui/RetroPanel';

export function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    label={t(sectionLabels.about.label.es, sectionLabels.about.label.en)}
                    title={t(sectionLabels.about.title.es, sectionLabels.about.title.en)}
                />

                <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-5 text-text-secondary"
                    >
                        {about.paragraphs.map((p, i) => (
                            <p key={i}>{t(p.es, p.en)}</p>
                        ))}
                    </motion.div>

                    <div className="flex flex-col gap-6">
                        {about.stats.map((stat, i) => (
                            <motion.div
                                key={stat.number}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <RetroPanel glow="cyan" className="p-6 text-center">
                                    <i className={`${stat.icon} mb-3 text-3xl text-neon-cyan`} />
                                    <div className="font-terminal text-4xl text-neon-green text-glow-green">{stat.number}</div>
                                    <div className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted">
                                        {t(stat.label.es, stat.label.en)}
                                    </div>
                                </RetroPanel>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
