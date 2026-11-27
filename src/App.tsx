import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { StackMarquee } from './components/StackMarquee';
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
            {/* `strict`: any full `motion.*` import throws, so the lighter `m.*` + domAnimation bundle is enforced. */}
            <LazyMotion features={domAnimation} strict>
                <MotionConfig reducedMotion="user">
                    <a
                        href="#contenido"
                        className="sr-only z-[2000] rounded-full bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
                    >
                        Saltar al contenido
                    </a>
                    <ScrollProgressBar />
                    <Navbar />
                    <main id="contenido">
                        <Hero />
                        <StackMarquee />
                        <AboutSection />
                        <ProfessionalSection />
                        <ProjectsSection />
                        <SoftSkillsSection />
                        <AnnexesSection />
                    </main>
                    <Footer />
                </MotionConfig>
            </LazyMotion>
        </LanguageProvider>
    );
}
