import type { ElementType } from 'react';

interface GlitchTextProps {
    text: string;
    as?: ElementType;
    id?: string;
    className?: string;
}

/**
 * Chromatic-aberration heading. The cyan/magenta copies are ::before/::after reading `data-text`,
 * so the DOM text (and the h1 crawlers/screen readers see) appears only once.
 * Use only on short display text (hero name).
 */
export function GlitchText({ text, as: Tag = 'span', id, className = '' }: GlitchTextProps) {
    return (
        <Tag
            id={id}
            data-text={text}
            className={`relative isolate ${className}
                before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:text-neon-cyan before:mix-blend-screen before:content-[attr(data-text)] before:animate-glitch-1
                after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:text-neon-magenta after:mix-blend-screen after:content-[attr(data-text)] after:animate-glitch-2`}
        >
            {text}
        </Tag>
    );
}
