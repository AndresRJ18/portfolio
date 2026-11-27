import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface RetroPanelProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    className?: string;
    accent?: 'green' | 'cyan';
    as?: ElementType;
}

/**
 * Pixel-cornered panel: wrapper carries the hard offset shadow, the clipped frame layer
 * paints a 2px neon border that also follows the diagonals, the inner element holds content.
 */
export function RetroPanel({ children, className = '', accent = 'green', as: Tag = 'div', ...rest }: RetroPanelProps) {
    const frame = accent === 'cyan' ? 'bg-neon-cyan' : 'bg-neon-green';
    const shadow = accent === 'cyan' ? 'hard-shadow-cyan' : 'hard-shadow-green';

    return (
        <div className={`h-full ${shadow}`}>
            <div className={`clip-retro h-full p-[2px] ${frame}`}>
                <Tag className={`clip-retro-inner h-full bg-panel ${className}`} {...rest}>
                    {children}
                </Tag>
            </div>
        </div>
    );
}
