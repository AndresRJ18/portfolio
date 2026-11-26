import { footer, nav, socials } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t-2 border-neon-green/30 bg-panel px-6 py-12 font-mono text-sm">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-start gap-8 text-center md:grid-cols-3 md:text-left">
                    <div>
                        <div className="mb-2 font-pixel text-xs text-neon-green">&lt;AR/&gt;</div>
                        <p className="text-text-muted">{t(footer.tagline.es, footer.tagline.en)}</p>
                    </div>

                    <ul className="flex flex-wrap justify-center gap-6">
                        {nav.map((item) => (
                            <li key={item.id}>
                                <a href={`#${item.id}`} className="text-text-secondary transition-colors hover:text-neon-green">
                                    {t(item.label.es, item.label.en)}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center gap-3 md:justify-end">
                        <a
                            href={socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="clip-retro-sm flex h-10 w-10 items-center justify-center border-2 border-neon-green/60 bg-void transition-shadow hover:shadow-[var(--shadow-glow-green)]"
                        >
                            <i className="fab fa-github" />
                        </a>
                        <a
                            href={socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="clip-retro-sm flex h-10 w-10 items-center justify-center border-2 border-neon-green/60 bg-void transition-shadow hover:shadow-[var(--shadow-glow-green)]"
                        >
                            <i className="fab fa-linkedin" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-neon-green/10 pt-6 text-xs text-text-muted md:flex-row">
                    <p>&copy; 2026 Andrés Rodas. {t(footer.rights.es, footer.rights.en)}</p>
                    <p className="flex items-center gap-1">
                        <i className="fas fa-server text-neon-green" /> {t(footer.hostedOn.es, footer.hostedOn.en)}
                    </p>
                </div>
            </div>
        </footer>
    );
}
