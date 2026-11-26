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
    className?: string;
}

export function Button({ children, href, onClick, variant = 'primary', icon, target, rel, className = '' }: ButtonProps) {
    const base = 'clip-retro-sm inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-semibold border-2 transition-colors duration-200';
    const styles =
        variant === 'primary'
            ? 'bg-neon-green text-void border-neon-green shadow-[var(--shadow-glow-green)]'
            : 'bg-panel text-text-primary border-neon-cyan shadow-[var(--shadow-glow-cyan)] hover:bg-panel-alt';

    const motionProps = {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
    };

    if (href) {
        return (
            <motion.a href={href} target={target} rel={rel} className={`${base} ${styles} ${className}`} {...motionProps}>
                {icon}
                <span>{children}</span>
            </motion.a>
        );
    }

    return (
        <motion.button onClick={onClick} className={`${base} ${styles} ${className}`} {...motionProps}>
            {icon}
            <span>{children}</span>
        </motion.button>
    );
}
