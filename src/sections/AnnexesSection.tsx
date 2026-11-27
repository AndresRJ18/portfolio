import { section } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PendingNotice } from '../components/ui/PendingNotice';

const meta = section('anexos');

export function AnnexesSection() {
    const { t } = useLanguage();

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="px-5 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeader id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />
                <PendingNotice phase="F4" items={['Testimonios de compañeros o mentores', 'Reconocimientos con su evidencia']} />
            </div>
        </section>
    );
}
