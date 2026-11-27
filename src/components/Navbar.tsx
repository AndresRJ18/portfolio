import { useEffect, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { I18N_ENABLED, sections } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { useScrollSpy } from '../hooks/useScrollSpy';

const sectionIds = sections.map((s) => s.id);

export function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeId = useScrollSpy(sectionIds);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [mobileOpen]);

    const close = () => setMobileOpen(false);

    /**
     * Closing the menu in the same click cancels Chrome's native hash scroll, so scroll explicitly
     * after the state update. scrollIntoView honours `scroll-margin-top` and CSS `scroll-behavior`
     * (smooth, or instant under prefers-reduced-motion).
     */
    function goToFromMenu(e: MouseEvent<HTMLAnchorElement>, id: string) {
        e.preventDefault();
        close();
        requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView();
            history.pushState(null, '', `#${id}`);
        });
    }

    return (
        <nav
            aria-label="Principal"
            className={`fixed inset-x-0 top-0 z-[1000] border-b-2 bg-void/95 backdrop-blur-sm transition-colors duration-300 ${
                scrolled ? 'border-neon-green/60' : 'border-neon-green/25'
            }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
                <a href="#inicio" onClick={close} className="font-pixel text-sm text-neon-green text-glow-green">
                    <span aria-hidden="true">&lt;AR/&gt;</span>
                    <span className="sr-only">Andrés Rodas, ir al inicio</span>
                </a>

                <ul className="hidden items-center gap-7 font-mono text-sm lg:flex">
                    {sections.map((s) => {
                        const active = activeId === s.id;
                        return (
                            <li key={s.id} className="relative">
                                <a
                                    href={`#${s.id}`}
                                    aria-current={active ? 'location' : undefined}
                                    className={`block py-2 transition-colors ${active ? 'text-neon-green' : 'text-text-secondary hover:text-text-primary'}`}
                                >
                                    {t(s.label.es, s.label.en)}
                                </a>
                                {active && (
                                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green" />
                                )}
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-3">
                    {I18N_ENABLED && (
                        <button
                            type="button"
                            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                            className="border-2 border-neon-cyan bg-panel px-3 py-1.5 font-mono text-xs font-semibold"
                            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
                        >
                            <span className={lang === 'es' ? 'text-neon-cyan' : 'text-text-muted'}>ES</span>
                            <span className="mx-1 text-text-muted">|</span>
                            <span className={lang === 'en' ? 'text-neon-cyan' : 'text-text-muted'}>EN</span>
                        </button>
                    )}

                    <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center text-neon-green lg:hidden"
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.ul
                        id="mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t-2 border-neon-green/40 bg-void font-mono lg:hidden"
                    >
                        {sections.map((s) => (
                            <li key={s.id} className="border-b border-neon-green/10">
                                <a
                                    href={`#${s.id}`}
                                    onClick={(e) => goToFromMenu(e, s.id)}
                                    aria-current={activeId === s.id ? 'location' : undefined}
                                    className={`block px-6 py-3.5 ${activeId === s.id ? 'text-neon-green' : 'text-text-secondary'}`}
                                >
                                    {t(s.title.es, s.title.en)}
                                </a>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
}
