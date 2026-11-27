import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { I18N_ENABLED } from '../data/site';

export type Lang = 'es' | 'en';

interface LanguageContextValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
    /** Returns `en` only when EN is active and a translation exists; Spanish otherwise. */
    t: (es: string, en?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        // While the toggle is hidden, ignore a stale "en" in localStorage so nobody gets stuck in English.
        if (!I18N_ENABLED) return 'es';
        return localStorage.getItem('language') === 'en' ? 'en' : 'es';
    });

    useEffect(() => {
        document.documentElement.lang = lang;
        if (I18N_ENABLED) localStorage.setItem('language', lang);
    }, [lang]);

    const setLang = (next: Lang) => setLangState(next);
    const t = (es: string, en?: string) => (lang === 'en' && en ? en : es);

    return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
}
