import type { ElementType } from 'react';

interface GlitchTextProps {
    text: string;
    as?: ElementType;
    className?: string;
}

export function GlitchText({ text, as: Tag = 'span', className = '' }: GlitchTextProps) {
    return (
        <Tag className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 text-neon-cyan mix-blend-screen animate-glitch-1"
            >
                {text}
            </span>
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 text-neon-magenta mix-blend-screen animate-glitch-2"
            >
                {text}
            </span>
        </Tag>
    );
}
