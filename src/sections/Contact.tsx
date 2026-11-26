import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { contact, sectionLabels } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { RetroPanel } from '../components/ui/RetroPanel';

export function Contact() {
    const { t, lang } = useLanguage();
    const [copied, setCopied] = useState(false);

    function handleCopy(e: MouseEvent, value: string, copy?: boolean) {
        if (!copy || !navigator.clipboard) return;
        e.preventDefault();
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.7 },
                colors: ['#39ff88', '#4deeea', '#ff2bd6'],
            });
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <section id="contact" className="bg-panel-alt/30 px-6 py-24">
            <div className="mx-auto max-w-4xl">
                <SectionHeader
                    label={t(sectionLabels.contact.label.es, sectionLabels.contact.label.en)}
                    title={t(sectionLabels.contact.title.es, sectionLabels.contact.title.en)}
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 text-center text-lg text-text-secondary"
                >
                    {t(contact.text.es, contact.text.en)}
                </motion.p>

                <div className="grid gap-4 sm:grid-cols-3">
                    {contact.methods.map((method, i) => (
                        <motion.a
                            key={method.value}
                            href={method.href}
                            target={method.copy ? undefined : '_blank'}
                            rel={method.copy ? undefined : 'noopener noreferrer'}
                            onClick={(e) => handleCopy(e, method.value, method.copy)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="block"
                        >
                            <RetroPanel glow="cyan" className="flex h-full flex-col items-center gap-2 p-6 text-center">
                                <i className={`${method.icon} text-2xl text-neon-cyan`} />
                                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                                    {t(method.label.es, method.label.en)}
                                </span>
                                <span className="break-all text-sm text-text-primary">{method.value}</span>
                            </RetroPanel>
                        </motion.a>
                    ))}
                </div>

                {copied && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center font-mono text-sm text-neon-green"
                    >
                        {lang === 'es' ? '¡Email copiado!' : 'Email copied!'}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
