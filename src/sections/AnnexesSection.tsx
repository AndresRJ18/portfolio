import { Award } from 'lucide-react';
import { section } from '../data/site';
import { recognitions } from '../data/annexes';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { TestimonialCards } from '../components/TestimonialCards';

const meta = section('anexos');

export function AnnexesSection() {
    const { t } = useLanguage();
    const withPhoto = recognitions.filter((r) => r.photo);
    const rest = recognitions.filter((r) => !r.photo);

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="py-28 lg:py-36">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <SectionHeader index="05" id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />

                {/* Recognitions — the three with photos as large cards, the rest as a compact list. */}
                <h3 className="font-display break-words text-[clamp(1.35rem,5.5vw,2.6rem)] font-extrabold leading-tight">Reconocimientos</h3>
                <ul className="mt-10 grid gap-5 md:grid-cols-3">
                    {withPhoto.map((r, i) => (
                        <Reveal as="li" key={r.title.es} delay={i * 0.08} className="group overflow-hidden rounded-3xl border border-white/10 bg-panel">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={r.photo!.src}
                                    srcSet={r.photo!.srcSet}
                                    sizes="(min-width: 768px) 33vw, 90vw"
                                    alt={t(r.photo!.alt.es, r.photo!.alt.en)}
                                    width={r.photo!.width}
                                    height={r.photo!.height}
                                    loading="lazy"
                                    decoding="async"
                                    style={{ objectPosition: r.photo!.position }}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                />
                            </div>
                            <div className="p-6">
                                <p className="font-mono text-sm text-accent">{r.date}</p>
                                <h4 className="mt-1 font-display text-xl font-bold leading-tight">{t(r.title.es, r.title.en)}</h4>
                                <p className="mt-2 text-text-secondary">{t(r.detail.es, r.detail.en)}</p>
                            </div>
                        </Reveal>
                    ))}
                </ul>

                <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
                    {rest.map((r) => (
                        <li key={r.title.es} className="grid grid-cols-[2.5rem_1fr] items-start gap-4 py-5 md:grid-cols-[2.5rem_6rem_1fr] md:items-center">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                                <Award size={18} aria-hidden="true" />
                            </span>
                            <p className="hidden font-mono text-sm text-accent md:block">{r.date}</p>
                            <div>
                                <p className="font-display font-semibold">
                                    {t(r.title.es, r.title.en)} <span className="font-mono text-sm font-normal text-accent md:hidden">· {r.date}</span>
                                </p>
                                <p className="text-text-secondary">{t(r.detail.es, r.detail.en)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Testimonials on the same grain band as "Habilidades técnicas". */}
            <div className="bg-grain-field mt-24 py-24 lg:mt-32">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <h3 className="font-display break-words text-[clamp(1.35rem,5.5vw,2.6rem)] font-extrabold leading-tight text-white">Testimonios</h3>
                    <p className="mt-3 max-w-xl text-white/80">Lo que dicen quienes han trabajado y compartido conmigo.</p>
                    <div className="mt-12">
                        <TestimonialCards />
                    </div>
                </div>
            </div>
        </section>
    );
}
