import { Construction } from 'lucide-react';

interface PendingNoticeProps {
    phase: string;
    items: string[];
}

/** Visible placeholder for preview builds only — `npm run check:pending` + final review guarantee none ship. */
export function PendingNotice({ phase, items }: PendingNoticeProps) {
    return (
        <div className="mx-auto max-w-2xl border-2 border-dashed border-text-muted/60 p-6 text-text-secondary">
            <p className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-text-muted">
                <Construction size={18} aria-hidden="true" /> En construcción · {phase}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
