interface SectionHeaderProps {
    /** Short line above the title. */
    kicker: string;
    /** Full section name as required by the rubric. */
    title: string;
    id?: string;
}

export function SectionHeader({ kicker, title, id }: SectionHeaderProps) {
    return (
        <header className="mb-12 text-center">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-neon-cyan">&gt; {kicker}</p>
            <h2 id={id} className="mt-3 font-terminal text-4xl leading-none text-neon-green text-glow-green sm:text-5xl md:text-6xl">
                {title}
            </h2>
        </header>
    );
}
