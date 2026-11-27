import { Clock, Lock, Trophy } from 'lucide-react';
import type { ProjectBadge } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

const tones = {
    award: { cls: 'bg-accent text-void', Icon: Trophy },
    private: { cls: 'bg-white/10 text-white border border-white/20', Icon: Lock },
    progress: { cls: 'bg-accent-2/15 text-accent-2 border border-accent-2/40', Icon: Clock },
} as const;

export function ProjectBadges({ badges, className = '' }: { badges?: ProjectBadge[]; className?: string }) {
    const { t } = useLanguage();
    if (!badges?.length) return null;
    return (
        <ul className={`flex flex-wrap gap-2 ${className}`}>
            {badges.map((b) => {
                const { cls, Icon } = tones[b.tone];
                return (
                    <li key={b.label.es} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
                        <Icon size={13} aria-hidden="true" />
                        {t(b.label.es, b.label.en)}
                    </li>
                );
            })}
        </ul>
    );
}
