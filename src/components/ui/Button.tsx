import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    icon?: ReactNode;
    target?: string;
    rel?: string;
    download?: boolean | string;
    className?: string;
}

export function Button({ children, href, onClick, variant = 'primary', icon, target, rel, download, className = '' }: ButtonProps) {
    const shadow = variant === 'primary' ? 'hard-shadow-sm-green' : 'hard-shadow-sm-cyan';
    const frame = variant === 'primary' ? 'bg-neon-green' : 'bg-neon-cyan';
    const fill =
        variant === 'primary'
            ? 'bg-neon-green text-void'
            : 'bg-panel text-text-primary group-hover:bg-panel-alt';

    const inner = (
        <span className={`clip-retro-sm block p-[2px] ${frame}`}>
            <span
                className={`clip-retro-sm-inner flex min-h-11 items-center gap-2 px-5 py-2.5 font-mono text-sm font-semibold transition-colors duration-200 ${fill}`}
            >
                {icon}
                <span>{children}</span>
            </span>
        </span>
    );

    const common = {
        className: `group inline-block ${shadow} ${className}`,
        whileHover: { x: -1, y: -1 },
        whileTap: { x: 2, y: 2 },
    };

    if (href) {
        return (
            <motion.a href={href} target={target} rel={rel} download={download} {...common}>
                {inner}
            </motion.a>
        );
    }

    return (
        <motion.button type="button" onClick={onClick} {...common}>
            {inner}
        </motion.button>
    );
}
