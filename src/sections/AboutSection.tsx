import { about } from '../data/about';
import { section } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { PendingNotice } from '../components/ui/PendingNotice';

const meta = section('acerca-de-mi');

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="px-5 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeader id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />

                <Reveal className="mx-auto max-w-3xl space-y-5 text-lg text-text-secondary">
                    <p className="font-terminal text-3xl text-text-primary">{about.fullName}</p>
                    {about.intro.map((p, i) => (
                        <p key={i}>{t(p.es, p.en)}</p>
                    ))}
                </Reveal>

                <div className="mt-12">
                    <PendingNotice phase="F2" items={['Propósito del portafolio', 'Plan de carrera (corto, mediano y largo plazo)', 'Pasatiempos e información adicional']} />
                </div>
            </div>
        </section>
    );
}
