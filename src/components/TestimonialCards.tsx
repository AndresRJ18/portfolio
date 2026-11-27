import { useState } from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/annexes';
import { useLanguage } from '../context/LanguageContext';

const initials = (name: string) =>
    name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

/**
 * Testimonials in the same visual language as the skills carousel: chamfered, slightly tilted
 * cards on the grain band; the active one turns copper. With few testimonials they sit side by
 * side (stacked on mobile) instead of rotating. Hover, focus or tap brings a card forward —
 * only transform/opacity animate.
 */
export function TestimonialCards() {
    const { t } = useLanguage();
    const [active, setActive] = useState(0);

    return (
        <ul className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-6">
            {testimonials.map((item, i) => {
                const isActive = i === active;
                const tilt = i % 2 === 0 ? -1.5 : 1.5;
                return (
                    <li
                        key={item.author}
                        tabIndex={0}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        className="clip-chamfer relative isolate flex min-h-[22rem] flex-col p-8 outline-offset-4 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:p-9"
                        style={{ transform: `rotate(${isActive ? 0 : tilt}deg) scale(${isActive ? 1 : 0.97})` }}
                    >
                        {/* Two stacked fills so the active swap is an opacity change, not a colour transition. */}
                        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45 backdrop-blur-lg" />
                        <span
                            aria-hidden="true"
                            className={`absolute inset-0 -z-10 bg-accent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                        />

                        <div className={`flex flex-1 flex-col ${isActive ? 'text-void' : 'text-white'}`}>
                            <div className="flex items-center gap-4">
                                <span
                                    aria-hidden="true"
                                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold ${
                                        isActive ? 'bg-void text-accent' : 'bg-white/10 text-white'
                                    }`}
                                >
                                    {initials(item.author)}
                                </span>
                                <Quote size={28} aria-hidden="true" className={isActive ? 'text-void/40' : 'text-white/30'} />
                            </div>

                            <blockquote className="mt-6 flex-1">
                                <p className={`text-[17px] leading-relaxed ${isActive ? 'text-void/90' : 'text-white/85'}`}>“{t(item.quote.es, item.quote.en)}”</p>
                            </blockquote>

                            <p className="mt-6 font-display font-bold">— {item.author}</p>
                            <p className={`text-sm ${isActive ? 'text-void/75' : 'text-white/70'}`}>{t(item.relation.es, item.relation.en)}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
