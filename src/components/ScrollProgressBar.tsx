import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 origin-left z-[10000] bg-neon-green shadow-[var(--shadow-glow-green)]"
            style={{ scaleX }}
        />
    );
}
