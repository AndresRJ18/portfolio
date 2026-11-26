import { useEffect, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { useScrollSpy } from '../hooks/useScrollSpy';

const navIds = nav.map((n) => n.id);

export function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeId = useScrollSpy(navIds);

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 50);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    function handleNavClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }
        setMobileOpen(false);
    }

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-[1000] border-b-2 border-neon-green/40 bg-void/90 backdrop-blur-sm transition-shadow duration-300 ${
                scrolled ? 'shadow-[var(--shadow-glow-green)]' : ''
            }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <div className="font-pixel text-sm text-neon-green text-glow-green">
                    <span>&lt;AR/&gt;</span>
                </div>

                <ul className="hidden gap-8 font-mono text-sm md:flex">
                    {nav.map((item) => (
                        <li key={item.id} className="relative">
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => handleNavClick(e, item.id)}
                                className={`pb-1 transition-colors ${
                                    activeId === item.id ? 'text-neon-green' : 'text-text-secondary hover:text-text-primary'
                                }`}
                            >
                                {t(item.label.es, item.label.en)}
                            </a>
                            {activeId === item.id && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-neon-green shadow-[var(--shadow-glow-green)]"
                                />
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                        className="clip-retro-sm border-2 border-neon-cyan bg-panel px-3 py-1 font-mono text-xs font-semibold"
                        aria-label="Change language"
                    >
                        <span className={lang === 'es' ? 'text-neon-cyan' : 'text-text-muted'}>ES</span>
                        <span className="mx-1 text-text-muted">|</span>
                        <span className={lang === 'en' ? 'text-neon-cyan' : 'text-text-muted'}>EN</span>
                    </button>

                    <button
                        className="text-neon-green md:hidden"
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t-2 border-neon-green/40 bg-void font-mono text-sm md:hidden"
                    >
                        {nav.map((item) => (
                            <li key={item.id} className="border-b border-neon-green/10 px-6 py-3">
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                    className={activeId === item.id ? 'text-neon-green' : 'text-text-secondary'}
                                >
                                    {t(item.label.es, item.label.en)}
                                </a>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
}
