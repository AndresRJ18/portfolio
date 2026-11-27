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
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.85 }, colors: ['#f0b27a', '#9ad7d3', '#fafafa'], disableForReducedMotion: true });
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <footer id="contacto" className="border-t border-hairline bg-panel px-5 pb-10 pt-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
                    <div>
                        <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-none tracking-tight">
                            {t(contact.title.es, contact.title.en)}
                        </h2>
                        <p className="mt-4 max-w-md text-text-secondary">{t(contact.text.es, contact.text.en)}</p>
                        <ul className="mt-8 space-y-3">
                            {contact.methods.map((m) => {
                                const Icon = m.icon;
                                return (
                                    <li key={m.value}>
                                        <a
                                            href={m.href}
                                            target={m.copy ? undefined : '_blank'}
                                            rel={m.copy ? undefined : 'noopener noreferrer'}
                                            onClick={m.copy ? (e) => handleCopy(e, m.value) : undefined}
                                            className="group inline-flex min-h-11 items-center gap-4 text-text-primary"
                                        >
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-accent transition-colors duration-200 group-hover:border-accent/60 group-hover:bg-accent/10">
                                                <Icon size={18} aria-hidden="true" />
                                            </span>
                                            <span>
                                                <span className="block font-mono text-xs uppercase tracking-wider text-text-muted">
                                                    {t(m.label.es, m.label.en)}
                                                    {m.copy && ' · clic para copiar'}
                                                </span>
                                                <span className="break-all transition-colors duration-200 group-hover:text-accent">{m.value}</span>
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <p role="status" className="mt-3 h-6 font-mono text-sm text-accent">
                            {copied ? t(contact.copied.es, contact.copied.en) : ''}
                        </p>
                    </div>

                    <nav aria-label="Secciones">
                        <p className="font-display text-2xl font-extrabold tracking-tight">
                            AR<span className="text-accent">.</span>
                        </p>
                        <p className="mt-2 text-text-muted">{t(footer.tagline.es, footer.tagline.en)}</p>
                        <ul className="mt-6 grid gap-1">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a href={`#${s.id}`} className="inline-flex min-h-11 items-center text-text-secondary transition-colors hover:text-text-primary">
                                        {t(s.title.es, s.title.en)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <p className="mt-14 border-t border-hairline pt-6 text-center font-mono text-xs text-text-muted">
                    &copy; {new Date().getFullYear()} Andrés Rodas. {t(footer.rights.es, footer.rights.en)}
                </p>
            </div>
        </footer>
    );
}
