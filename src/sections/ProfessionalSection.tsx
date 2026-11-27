import { ArrowUpRight, Download, Eye } from 'lucide-react';
import { cv } from '../data/professional';
import { section, socials } from '../data/site';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Reveal } from '../components/ui/Reveal';
import { LinkedinIcon } from '../components/ui/BrandIcon';
import { SkillsCarousel } from '../components/SkillsCarousel';
import { Timeline } from '../components/Timeline';

const meta = section('desarrollo-profesional');

export function ProfessionalSection() {
    const { t } = useLanguage();

    return (
        <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="py-28 lg:py-36">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <SectionHeader index="02" id={`${meta.id}-title`} kicker={t(meta.kicker.es, meta.kicker.en)} title={t(meta.title.es, meta.title.en)} />

                {/* CV: page-1 preview (opens the PDF) + target role and actions. */}
                <div className="grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
                    <Reveal>
                        <a
                            href={cv.pdf}
                            target="_blank"
                            rel="noopener"
                            className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]"
                            aria-label="Abrir el CV completo en PDF (2 páginas)"
                        >
                            <img
                                src={cv.preview.src}
                                srcSet={cv.preview.srcSet}
                                sizes="(min-width: 768px) 22rem, 90vw"
                                alt="Vista previa de la primera página del CV de Andrés Rodas"
                                width={cv.preview.width}
                                height={cv.preview.height}
                                loading="lazy"
                                decoding="async"
                                className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            />
                            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 to-transparent pb-4 pt-12 font-display text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                                <Eye size={16} aria-hidden="true" /> Ver CV completo
                            </span>
                        </a>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted">Currículum Vitae · {t(cv.updated.es, cv.updated.en)}</p>
                        <p className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight">
                            Adaptado al puesto de <span className="text-accent">{t(cv.targetRole.es, cv.targetRole.en)}</span>
                        </p>
                        <p className="mt-4 max-w-xl text-lg text-text-secondary">
                            {cv.pages} páginas: perfil, educación, experiencia, proyectos, becas y reconocimientos, certificaciones y habilidades.
                        </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={cv.pdf}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-display font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
                        >
                            <Eye size={18} aria-hidden="true" />
                            Ver CV
                        </a>
                        <a
                            href={cv.pdf}
                            download="CV_Andres_Rodas.pdf"
                            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 font-display font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                        >
                            <Download size={18} aria-hidden="true" />
                            Descargar
                        </a>
                        <a
                            href={socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/20 px-6 font-display font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                        >
                            <LinkedinIcon size={18} />
                            LinkedIn
                            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </div>
                    </Reveal>
                </div>

                <div className="mt-24 lg:mt-32">
                    <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold leading-tight">Trayectoria</h3>
                    <p className="mt-3 max-w-xl text-text-secondary">De mi ingreso a la UPCH en 2023 al egreso previsto en diciembre de 2027.</p>
                    <div className="mt-14">
                        <Timeline />
                    </div>
                </div>
            </div>

            {/* Full-bleed colour band for the skills carousel. */}
            <div className="bg-grain-field mt-20 py-24 lg:mt-28">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold leading-tight text-white">Habilidades técnicas</h3>
                    <p className="mt-3 max-w-xl text-white/80">Lo que uso para llevar modelos e infraestructura a producción.</p>
                </div>
                <div className="mt-10">
                    <SkillsCarousel />
                </div>
            </div>

        </section>
    );
}
