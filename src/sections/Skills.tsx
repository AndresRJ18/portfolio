import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import { sectionLabels } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { RetroPanel } from '../components/ui/RetroPanel';

export function Skills() {
    const { t } = useLanguage();

    return (
        <section id="skills" className="bg-panel-alt/30 px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    label={t(sectionLabels.skills.label.es, sectionLabels.skills.label.en)}
                    title={t(sectionLabels.skills.title.es, sectionLabels.skills.title.en)}
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.title.en}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                            whileHover={{ y: -6 }}
                        >
                            <RetroPanel className="h-full p-6">
                                <div className="clip-retro-sm mb-4 flex h-12 w-12 items-center justify-center border-2 border-neon-green bg-void">
                                    <i className={`${skill.icon} text-xl text-neon-green`} />
                                </div>
                                <h3 className="font-terminal text-xl text-text-primary">{t(skill.title.es, skill.title.en)}</h3>
                                <p className="mt-2 text-sm text-text-secondary">{t(skill.description.es, skill.description.en)}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {skill.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="clip-retro-sm border border-neon-cyan/50 bg-void px-2 py-1 font-mono text-[11px] text-neon-cyan"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </RetroPanel>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
