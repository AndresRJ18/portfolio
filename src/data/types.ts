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

// Content still owed by Andrés is flagged with a pending-marker comment in src/data;
// `npm run check:pending` (scripts/check-pending.mjs) lists every occurrence.
