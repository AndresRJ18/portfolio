import { useEffect, useState } from 'react';

/**
 * Returns the id of the section crossing a horizontal band near the top of the viewport
 * (between 35% and 45% of its height), or '' when none does (e.g. while on the hero).
 */
export function useScrollSpy(sectionIds: readonly string[]): string {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const visible = new Set<string>();
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) visible.add(entry.target.id);
                    else visible.delete(entry.target.id);
                }
                setActiveId(sectionIds.find((id) => visible.has(id)) ?? '');
            },
            { rootMargin: '-35% 0px -55% 0px' },
        );

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }
        return () => observer.disconnect();
    }, [sectionIds]);

    return activeId;
}
