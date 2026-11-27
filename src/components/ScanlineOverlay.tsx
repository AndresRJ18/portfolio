/**
 * Static CRT texture for the hero only. Sits *behind* the content (z-0) so it never
 * crosses text; no animation, no viewport-wide vignette.
 */
export function ScanlineOverlay() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(to bottom, rgba(57,255,136,0.05) 0px, rgba(57,255,136,0.05) 1px, transparent 1px, transparent 4px)',
                }}
            />
            <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(57,255,136,0.06), transparent 60%)' }}
            />
        </div>
    );
}
