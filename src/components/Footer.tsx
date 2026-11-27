import { useState, type MouseEvent } from 'react';
import confetti from 'canvas-confetti';
import { contact, footer, sections } from '../data/site';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    function handleCopy(e: MouseEvent, value: string) {
        if (!navigator.clipboard) return; // fall through to mailto:
        e.preventDefault();
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.85 }, colors: ['#39ff88', '#4deeea'], disableForReducedMotion: true });
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <footer id="contacto" className="border-t-2 border-neon-green/30 bg-panel px-5 pb-10 pt-16">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
                    <div>
                        <h2 className="font-terminal text-4xl text-neon-green">{t(contact.title.es, contact.title.en)}</h2>
                        <p className="mt-3 max-w-md text-text-secondary">{t(contact.text.es, contact.text.en)}</p>
                        <ul className="mt-6 space-y-3">
                            {contact.methods.map((m) => {
                                const Icon = m.icon;
                                return (
                                    <li key={m.value}>
                                        <a
                                            href={m.href}
                                            target={m.copy ? undefined : '_blank'}
                                            rel={m.copy ? undefined : 'noopener noreferrer'}
                                            onClick={m.copy ? (e) => handleCopy(e, m.value) : undefined}
                                            className="group inline-flex min-h-11 items-center gap-3 text-text-primary"
                                        >
                                            <span className="flex h-10 w-10 items-center justify-center border-2 border-neon-cyan/70 bg-void text-neon-cyan group-hover:border-neon-cyan">
                                                <Icon size={18} aria-hidden="true" />
                                            </span>
                                            <span>
                                                <span className="block font-mono text-xs uppercase tracking-wider text-text-muted">
                                                    {t(m.label.es, m.label.en)}
                                                    {m.copy && ' · clic para copiar'}
                                                </span>
                                                <span className="break-all group-hover:text-neon-cyan">{m.value}</span>
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <p role="status" className="mt-3 h-6 font-mono text-sm text-neon-green">
                            {copied ? t(contact.copied.es, contact.copied.en) : ''}
                        </p>
                    </div>

                    <nav aria-label="Secciones">
                        <p className="font-pixel text-xs text-neon-green">&lt;AR/&gt;</p>
                        <p className="mt-2 text-text-muted">{t(footer.tagline.es, footer.tagline.en)}</p>
                        <ul className="mt-6 grid gap-2 font-mono text-sm">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a href={`#${s.id}`} className="inline-block py-1 text-text-secondary transition-colors hover:text-neon-green">
                                        {t(s.title.es, s.title.en)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <p className="mt-12 border-t border-neon-green/15 pt-6 text-center font-mono text-xs text-text-muted">
                    &copy; {new Date().getFullYear()} Andrés Rodas. {t(footer.rights.es, footer.rights.en)}
                </p>
            </div>
        </footer>
    );
}
