import { section } from '../data/site';
import { softSkills, softSkillsIntro, starCase } from '../data/softSkills';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { PendingNotice } from '../components/ui/PendingNotice';

const meta = section('competencias-blandas');

const STAR = [
    { key: 'situation', letter: 'S', label: 'Situación' },
    { key: 'task', letter: 'T', label: 'Tarea' },
    { key: 'action', letter: 'A', label: 'Acción' },
    { key: 'result', letter: 'R', label: 'Resultado' },
] as const;

export function SoftSkillsSection() {
    const { t } = useLanguage();
    const missingReflections = softSkills.filter((s) => !s.reflection).map((s) => s.name.es);

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="px-5 py-28 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-7xl">
                <SectionHeader index="04" id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />

                {softSkillsIntro && (
                    <Reveal className="mb-14 max-w-3xl">
                        <p className="text-lg leading-relaxed text-text-secondary md:text-xl">{t(softSkillsIntro.es, softSkillsIntro.en)}</p>
                    </Reveal>
                )}

                {/* Reflection — one card per skill, with where it was applied. */}
                <ul className="grid gap-5 md:grid-cols-2">
                    {softSkills.map(({ id, icon: Icon, name, evidence, reflection }, i) => (
                        <Reveal
                            as="li"
                            key={id}
                            delay={(i % 2) * 0.08}
                            className="flex flex-col rounded-3xl border border-white/10 bg-panel p-7 transition-colors duration-300 hover:border-white/25"
                        >
                            <div className="flex items-center gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-2/15 text-accent-2">
                                    <Icon size={22} aria-hidden="true" />
                                </span>
                                <h3 className="font-display text-2xl font-bold">{t(name.es, name.en)}</h3>
                            </div>
                            {reflection && <p className="mt-5 leading-relaxed text-text-primary">{t(reflection.es, reflection.en)}</p>}
                            <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-text-secondary">
                                <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">Dónde la apliqué · </span>
                                {t(evidence.es, evidence.en)}
                            </p>
                        </Reveal>
                    ))}
                </ul>

                {/* Practical example in STAR format. */}
                <Reveal className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-grain-field bg-grain-warm p-7 md:p-10">
                    <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/70">Ejemplo práctico · {t(starCase.skill.es, starCase.skill.en)}</p>
                    <h3 className="mt-3 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight">{t(starCase.title.es, starCase.title.en)}</h3>
                    <p className="mt-2 text-white/75">{t(starCase.context.es, starCase.context.en)}</p>

                    <ol className="mt-8 grid gap-4 md:grid-cols-2">
                        {STAR.map(({ key, letter, label }) => {
                            const text = starCase[key];
                            return (
                                <li key={key} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                                    <p className="flex items-center gap-3">
                                        <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display font-extrabold text-void">
                                            {letter}
                                        </span>
                                        <span className="font-display text-lg font-semibold">{label}</span>
                                    </p>
                                    {text ? (
                                        <p className="mt-3 leading-relaxed text-white/85">{t(text.es, text.en)}</p>
                                    ) : (
                                        <p className="mt-3 text-sm italic text-white/70">Texto pendiente (lo escribe Andrés).</p>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </Reveal>

                {(missingReflections.length > 0 || !softSkillsIntro) && (
                    <div className="mt-14">
                        <PendingNotice
                            phase="F4"
                            items={[
                                ...(!softSkillsIntro ? ['Reflexión general sobre tus competencias blandas (3–5 líneas)'] : []),
                                ...(missingReflections.length ? [`Reflexión breve para: ${missingReflections.join(', ')}`] : []),
                                'Caso STAR de la clase en Ancón: situación, tarea, acción y resultado',
                            ]}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
