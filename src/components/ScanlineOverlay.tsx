export function ScanlineOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] animate-crt-flicker">
            <div
                className="absolute inset-0 opacity-[0.15] animate-scan-move"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)',
                    backgroundSize: '100% 3px',
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
                }}
            />
        </div>
    );
}
