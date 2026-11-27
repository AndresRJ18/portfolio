import { stack, type StackItem } from '../data/stack';

function Item({ item }: { item: StackItem }) {
    return (
        <li className="flex shrink-0 items-center gap-2.5 text-text-muted transition-colors duration-200 hover:text-text-primary">
            {item.path ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                    <path d={item.path} />
                </svg>
            ) : null}
            <span className={item.path ? 'text-base' : 'font-display text-lg font-bold tracking-tight'}>{item.name}</span>
        </li>
    );
}

/**
 * Infinite logo strip. The list is rendered twice and the track slides -50%, so the loop is seamless.
 * Hover pauses it. Under prefers-reduced-motion the duplicate is dropped and the list wraps, static and centred.
 */
export function StackMarquee() {
    return (
        <section aria-label="Tecnologías con las que trabajo" className="border-y border-hairline bg-void py-7">
            <div className="group mask-fade-x overflow-hidden motion-reduce:[mask-image:none]">
                <div className="flex w-max animate-marquee gap-14 pr-14 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center motion-reduce:px-5">
                    <ul className="flex shrink-0 items-center gap-14 motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-5">
                        {stack.map((item) => (
                            <Item key={item.name} item={item} />
                        ))}
                    </ul>
                    <ul aria-hidden="true" className="flex shrink-0 items-center gap-14 motion-reduce:hidden">
                        {stack.map((item) => (
                            <Item key={item.name} item={item} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
