import { section } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PendingNotice } from '../components/ui/PendingNotice';

const meta = section('competencias-blandas');

export function SoftSkillsSection() {
    const { t } = useLanguage();

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="bg-panel-alt/30 px-5 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeader id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />
                <PendingNotice
                    phase="F4"
                    items={[
                        'Reflexión sobre habilidades interpersonales (texto de Andrés)',
                        'Caso STAR: clase de introducción a la IA en el Colegio Nacional Ancón',
                        'Caso de trabajo en equipo: MC656',
                    ]}
                />
            </div>
        </section>
    );
}
