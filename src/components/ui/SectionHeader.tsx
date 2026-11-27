interface SectionHeaderProps {
    /** Short line above the title. */
    kicker: string;
    /** Full section name as required by the rubric. */
    title: string;
    /** Section number, e.g. "01". */
    index?: string;
    id?: string;
}

export function SectionHeader({ kicker, title, index, id }: SectionHeaderProps) {
    return (
        <header className="mb-16 md:mb-20">
            <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-text-muted">
                {index && <span className="text-accent">{index}</span>}
                {index && <span aria-hidden="true" className="h-px w-8 bg-hairline" />}
                {kicker}
            </p>
            <h2 id={id} className="mt-5 max-w-5xl break-words font-display text-[clamp(1.75rem,7.4vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-text-primary">
                {title}
            </h2>
        </header>
    );
}
