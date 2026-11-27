import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Fade/slide-in once when scrolled into view. Disabled automatically under reduced motion (MotionConfig). */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
