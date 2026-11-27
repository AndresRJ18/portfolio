import type { ComponentType, SVGProps } from 'react';

/**
 * Bilingual text. Spanish is the primary language; `en` is optional while the
 * EN toggle is hidden — `t()` falls back to `es` when `en` is missing.
 */
export interface Bi {
    es: string;
    en?: string;
}

/** Any icon component (lucide-react or our BrandIcon wrappers). */
export type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

export interface Link {
    label: Bi;
    href: string;
    icon?: Icon;
}

export interface Evidence {
    type: 'image' | 'diagram' | 'video';
    src: string;
    alt: Bi;
    caption?: Bi;
}

/**
 * Marker for content still owed by Andrés. `npm run check:pending` lists every
 * occurrence under src/data; it is wired into the build before the final merge.
 */
export const PENDING = 'PENDIENTE';
