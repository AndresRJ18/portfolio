interface SectionHeaderProps {
    label: string;
    title: string;
}

export function SectionHeader({ label, title }: SectionHeaderProps) {
    return (
        <div className="mb-12 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan text-glow-cyan">
                &gt; {label}
            </span>
            <h2 className="mt-3 font-terminal text-4xl text-neon-green text-glow-green md:text-5xl">{title}</h2>
        </div>
    );
}
