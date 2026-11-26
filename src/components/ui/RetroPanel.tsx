import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface RetroPanelProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    className?: string;
    glow?: 'green' | 'cyan';
    as?: ElementType;
}

export function RetroPanel({ children, className = '', glow = 'green', as: Tag = 'div', ...rest }: RetroPanelProps) {
    const border = glow === 'cyan' ? 'border-neon-cyan' : 'border-neon-green';
    const shadow = glow === 'cyan' ? 'shadow-[var(--shadow-glow-cyan)]' : 'shadow-[var(--shadow-glow-green)]';

    return (
        <Tag className={`clip-retro border-2 bg-panel ${border} ${shadow} ${className}`} {...rest}>
            {children}
        </Tag>
    );
}
