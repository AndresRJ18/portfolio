import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { ScanlineOverlay } from './components/ScanlineOverlay';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

function BootFlicker() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 450);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="pointer-events-none fixed inset-0 z-[20000] bg-void"
                />
            )}
        </AnimatePresence>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <BootFlicker />
            <ScrollProgressBar />
            <ScanlineOverlay />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </LanguageProvider>
    );
}
