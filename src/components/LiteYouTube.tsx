import { useState } from 'react';
import { Play } from 'lucide-react';

interface LiteYouTubeProps {
    id: string;
    title: string;
    /** Start with the player already loaded (e.g. opened from a "Ver demo" button). */
    autoLoad?: boolean;
}

/**
 * Lightweight YouTube embed: a thumbnail + play button until clicked, then a youtube-nocookie iframe.
 * Nothing from YouTube except one thumbnail image loads before the click.
 */
export function LiteYouTube({ id, title, autoLoad = false }: LiteYouTubeProps) {
    const [active, setActive] = useState(autoLoad);

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
            {active ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full"
                />
            ) : (
                <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 h-full w-full" aria-label={`Reproducir video: ${title}`}>
                    <img
                        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                        alt=""
                        width={1280}
                        height={720}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-80 transition-[transform,opacity] duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
                            <Play size={26} aria-hidden="true" className="translate-x-0.5" fill="currentColor" />
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
}
