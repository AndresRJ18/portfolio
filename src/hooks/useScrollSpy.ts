import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 200): string {
    const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

    useEffect(() => {
        function handleScroll() {
            const scrollPos = window.pageYOffset + offset;

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (!el) continue;

                const top = el.offsetTop;
                const height = el.offsetHeight;

                if (scrollPos >= top && scrollPos < top + height) {
                    setActiveId(id);
                    break;
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeId;
}
