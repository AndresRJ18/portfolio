import { FileText } from 'lucide-react';
import { cv } from '../data/professional';
import { section, socials } from '../data/site';
import { skills } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { RetroPanel } from '../components/ui/RetroPanel';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { PendingNotice } from '../components/ui/PendingNotice';
import { LinkedinIcon } from '../components/ui/BrandIcon';

const meta = section('desarrollo-profesional');

export function ProfessionalSection() {
    const { t } = useLanguage();

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="bg-panel-alt/30 px-5 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeader id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />

                <Reveal className="mb-16 flex flex-col items-center gap-5 text-center">
                    <p className="text-lg text-text-secondary">
                        CV orientado al puesto de <strong className="text-text-primary">{t(cv.targetRole.es, cv.targetRole.en)}</strong>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button href={cv.pdf} target="_blank" rel="noopener" icon={<FileText size={18} aria-hidden="true" />}>
                            Ver CV
                        </Button>
                        <Button href={socials.linkedin} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<LinkedinIcon size={18} />}>
                            Perfil de LinkedIn
                        </Button>
                    </div>
                </Reveal>

                <h3 className="mb-8 font-terminal text-3xl text-text-primary">Habilidades técnicas</h3>
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                            <Reveal key={skill.title.es} delay={(i % 3) * 0.08}>
                                <RetroPanel className="p-6">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center border-2 border-neon-green bg-void text-neon-green">
                                        <Icon size={22} aria-hidden="true" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-text-primary">{t(skill.title.es, skill.title.en)}</h4>
                                    <p className="mt-2 text-text-secondary">{t(skill.description.es, skill.description.en)}</p>
                                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
                                        {skill.tags.map((tag) => (
                                            <li key={tag} className="border border-neon-cyan/50 bg-void px-2 py-1 font-mono text-xs text-neon-cyan">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </RetroPanel>
                            </Reveal>
                        );
                    })}
                </div>

                <div className="mt-16">
                    <PendingNotice
                        phase="F2"
                        items={['Vista previa del CV adaptado (con foto, sin teléfono)', 'Certificaciones con enlace o PDF de evidencia']}
                    />
                </div>
            </div>
        </section>
    );
}
