import { ArrowUpRight, Briefcase, Camera, CircleCheck, GraduationCap, Rocket } from 'lucide-react';
import { about } from '../data/about';
import { section, socials } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { LinkedinIcon } from '../components/ui/BrandIcon';

const meta = section('acerca-de-mi');

function BlockLabel({ children }: { children: string }) {
    return <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-white/70">{children}</h3>;
}

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="bg-grain-field bg-grain-warm px-5 py-28 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-7xl">
                <SectionHeader index="01" id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />

                {/* Identity — photo (5/12) beside name, purpose and LinkedIn (7/12). */}
                <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-5">
                        <figure className="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-panel shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)] lg:max-w-none">
                            {about.photo ? (
                                <img
                                    src={about.photo.src}
                                    srcSet={about.photo.srcSet}
                                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 384px, 90vw"
                                    alt={about.photo.alt}
                                    width={about.photo.width}
                                    height={about.photo.height}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                />
                            ) : (
                                // Visible slot until the professional photo arrives (tracked as PENDIENTE in data/about.ts).
                                <div className="flex h-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,rgb(240_178_122/0.12),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(154_215_211/0.1),transparent_55%)] text-text-muted">
                                    <Camera size={32} aria-hidden="true" />
                                    <span className="font-mono text-sm uppercase tracking-[0.2em]">Foto profesional</span>
                                </div>
                            )}
                        </figure>
                    </Reveal>

                    <Reveal delay={0.1} className="lg:col-span-7">
                        <p className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.01em]">{about.fullName}</p>
                        <p className="mt-3 text-text-secondary">Ingeniería Informática · Universidad Peruana Cayetano Heredia · Lima, Perú</p>

                        <div className="mt-10">
                            <BlockLabel>{t(about.purposeTitle.es, about.purposeTitle.en)}</BlockLabel>
                            <p className="mt-4 text-lg leading-relaxed text-text-secondary">{t(about.purpose.es, about.purpose.en)}</p>
                        </div>

                        <a
                            href={socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-8 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/15 px-5 font-medium text-text-primary transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
                        >
                            <LinkedinIcon size={18} />
                            Ver perfil de LinkedIn
                            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </Reveal>
                </div>

                {/* Career plan — three horizons as glass cards joined by a progress road (desktop). */}
                <div className="mt-24 lg:mt-32">
                    <BlockLabel>{t(about.careerTitle.es, about.careerTitle.en)}</BlockLabel>

                    <div aria-hidden="true" className="relative mt-10 hidden h-3 md:block">
                        <div className="absolute inset-x-[16.66%] top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-accent via-accent/60 to-accent-2/70" />
                        {[16.66, 50, 83.33].map((x, i) => (
                            <span
                                key={x}
                                style={{ left: `${x}%` }}
                                className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-[#2c1810] ${i === 0 ? 'bg-accent' : i === 1 ? 'bg-accent/70' : 'bg-accent-2'}`}
                            />
                        ))}
                    </div>

                    <ol className="mt-6 grid gap-5 md:mt-8 md:grid-cols-3">
                        {about.careerPlan.map((step, i) => {
                            const Icon = [GraduationCap, Briefcase, Rocket][i] ?? Rocket;
                            return (
                                <Reveal
                                    as="li"
                                    key={step.horizon.es}
                                    delay={i * 0.1}
                                    className="flex flex-col rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <span
                                            aria-hidden="true"
                                            className="font-display text-6xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-accent)]"
                                        >
                                            0{i + 1}
                                        </span>
                                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                                            <Icon size={22} aria-hidden="true" />
                                        </span>
                                    </div>
                                    <h4 className="mt-6 font-display text-2xl font-bold">{t(step.horizon.es, step.horizon.en)}</h4>
                                    <p className="mt-2 w-fit rounded-full border border-accent/40 px-3 py-0.5 font-mono text-sm text-accent">
                                        {t(step.range.es, step.range.en)}
                                    </p>
                                    <ul className="mt-5 space-y-3 text-text-secondary">
                                        {step.goals.map((goal) => (
                                            <li key={goal.es} className="flex gap-3">
                                                <CircleCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                                                {t(goal.es, goal.en)}
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            );
                        })}
                    </ol>
                </div>

                {/* Hobbies */}
                <div className="mt-20 lg:mt-28">
                    <BlockLabel>{t(about.hobbiesTitle.es, about.hobbiesTitle.en)}</BlockLabel>
                    <ul className="mt-8 flex flex-wrap gap-3">
                        {about.hobbies.map(({ icon: Icon, label }) => (
                            <li
                                key={label.es}
                                className="flex min-h-12 items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 text-text-primary transition-colors duration-300 hover:border-white/25"
                            >
                                <Icon size={18} aria-hidden="true" className="text-accent" />
                                {t(label.es, label.en)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
