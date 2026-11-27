import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { AboutSection } from './sections/AboutSection';
import { ProfessionalSection } from './sections/ProfessionalSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SoftSkillsSection } from './sections/SoftSkillsSection';
import { AnnexesSection } from './sections/AnnexesSection';

export default function App() {
    return (
        <LanguageProvider>
            <MotionConfig reducedMotion="user">
                <a
                    href="#contenido"
                    className="sr-only z-[2000] bg-neon-green px-4 py-2 font-mono text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
                >
                    Saltar al contenido
                </a>
                <ScrollProgressBar />
                <Navbar />
                <main id="contenido">
                    <Hero />
                    <AboutSection />
                    <ProfessionalSection />
                    <ProjectsSection />
                    <SoftSkillsSection />
                    <AnnexesSection />
                </main>
                <Footer />
            </MotionConfig>
        </LanguageProvider>
    );
}
