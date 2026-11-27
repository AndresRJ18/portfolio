import { m, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 });

    return (
        <m.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-[10000] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
            style={{ scaleX }}
        />
    );
}
