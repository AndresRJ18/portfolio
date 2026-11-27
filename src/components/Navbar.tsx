import { useEffect, useState, type MouseEvent } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { cvCta, cvHref, I18N_ENABLED, sections } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { useScrollSpy } from '../hooks/useScrollSpy';

const sectionIds = sections.map((s) => s.id);

export function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeId = useScrollSpy(sectionIds);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
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
     * after the state update. scrollIntoView honours `scroll-margin-top` and CSS `scroll-behavior`.
     */
    function goToFromMenu(e: MouseEvent<HTMLAnchorElement>, id: string) {
        e.preventDefault();
        close();
        requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView();
            history.pushState(null, '', `#${id}`);
        });
    }

    const solid = scrolled || mobileOpen;

    return (
        <nav
            aria-label="Principal"
            className={`fixed inset-x-0 top-0 z-[1000] border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
                solid ? 'border-hairline bg-black/40 backdrop-blur-[40px]' : 'border-transparent bg-transparent'
            }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
                <a href="#inicio" onClick={close} className="font-display text-2xl font-extrabold tracking-tight text-white">
                    <span aria-hidden="true">
                        AR<span className="text-accent">.</span>
                    </span>
                    <span className="sr-only">Andrés Rodas, ir al inicio</span>
                </a>

                <ul className="hidden items-center gap-1 lg:flex">
                    {sections.map((s) => {
                        const active = activeId === s.id;
                        return (
                            <li key={s.id}>
                                <a
                                    href={`#${s.id}`}
                                    aria-current={active ? 'location' : undefined}
                                    className={`relative block rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${
                                        active ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    {t(s.label.es, s.label.en)}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-2">
                    {I18N_ENABLED && (
                        <button
                            type="button"
                            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                            className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80"
                            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
                        >
                            {lang === 'es' ? 'EN' : 'ES'}
                        </button>
                    )}

                    <a
                        href={cvHref}
                        download
                        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 font-display text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.04] sm:px-5"
                    >
                        <Download size={16} aria-hidden="true" />
                        <span className="sm:hidden">CV</span>
                        <span className="hidden sm:inline">{t(cvCta.es, cvCta.en)}</span>
                    </a>

                    <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-full text-white lg:hidden"
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
                    <m.ul
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-hairline px-5 pb-6 pt-2 lg:hidden"
                    >
                        {sections.map((s) => (
                            <li key={s.id}>
                                <a
                                    href={`#${s.id}`}
                                    onClick={(e) => goToFromMenu(e, s.id)}
                                    aria-current={activeId === s.id ? 'location' : undefined}
                                    className={`block border-b border-hairline py-4 font-display text-xl font-semibold ${
                                        activeId === s.id ? 'text-accent' : 'text-white'
                                    }`}
                                >
                                    {t(s.title.es, s.title.en)}
                                </a>
                            </li>
                        ))}
                    </m.ul>
                )}
            </AnimatePresence>
        </nav>
    );
}
