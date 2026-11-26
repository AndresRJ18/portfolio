import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'es' | 'en';

interface LanguageContextValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (es: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        const saved = localStorage.getItem('language');
        return saved === 'en' ? 'en' : 'es';
    });

    useEffect(() => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
    }, [lang]);

    const setLang = (next: Lang) => setLangState(next);
    const t = (es: string, en: string) => (lang === 'es' ? es : en);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
}
