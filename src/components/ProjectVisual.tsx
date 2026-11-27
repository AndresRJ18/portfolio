import type { Project } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

const fallbackTints: Record<string, string> = {
    'quim-detect2': 'radial-gradient(60% 70% at 25% 30%, rgb(240 178 122 / 0.45), transparent 70%), radial-gradient(55% 60% at 85% 80%, rgb(214 90 90 / 0.35), transparent 70%), linear-gradient(135deg, #2a1410, #1c0f0c)',
    'latam-air-quality': 'radial-gradient(60% 70% at 20% 30%, rgb(154 215 211 / 0.4), transparent 70%), radial-gradient(55% 60% at 85% 80%, rgb(120 160 220 / 0.35), transparent 70%), linear-gradient(135deg, #0f2224, #0c1418)',
    'grafo-clinico': 'radial-gradient(60% 70% at 25% 25%, rgb(160 140 230 / 0.4), transparent 70%), radial-gradient(55% 60% at 85% 80%, rgb(154 215 211 / 0.32), transparent 70%), linear-gradient(135deg, #17142a, #0e0d18)',
    mc656: 'radial-gradient(60% 70% at 25% 25%, rgb(160 140 230 / 0.38), transparent 70%), radial-gradient(55% 60% at 85% 80%, rgb(154 215 211 / 0.3), transparent 70%), linear-gradient(135deg, #17142a, #0e0d18)',
};

/**
 * Card/case-study image. Projects without a real screenshot yet get a colour field with the project
 * name set large — clearly a cover, never a fake screenshot.
 */
export function ProjectVisual({ project, className = '', priority = false }: { project: Project; className?: string; priority?: boolean }) {
    const { t } = useLanguage();
    const img = project.image;

    if (img) {
        return (
            <img
                src={img.src}
                srcSet={img.srcSet}
                sizes="(min-width: 1024px) 60vw, 100vw"
                alt={t(img.alt.es, img.alt.en)}
                width={img.width}
                height={img.height}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                style={{ objectPosition: img.position }}
                className={`h-full w-full object-cover ${className}`}
            />
        );
    }

    return (
        <div
            aria-hidden="true"
            className={`bg-grain-cover @container relative flex h-full w-full items-end p-6 ${className}`}
            style={{ background: fallbackTints[project.id] ?? fallbackTints['latam-air-quality'] }}
        >
            {/* Sized to the card's own width (container units) so long names never clip. */}
            <span className="block w-full break-words font-display text-[min(6.5cqw,3rem)] font-extrabold leading-[0.95] tracking-tight text-white/85">
                {project.title}
            </span>
        </div>
    );
}
