import type { ReactNode } from 'react';
import { m } from 'framer-motion';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    /** Render as a list item when used directly inside <ul>/<ol>. */
    as?: 'div' | 'li';
}

/** Fade/slide-in once when scrolled into view. Disabled automatically under reduced motion (MotionConfig). */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
    const Tag = as === 'li' ? m.li : m.div;
    return (
        <Tag
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </Tag>
    );
}
