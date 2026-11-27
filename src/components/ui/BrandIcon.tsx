import type { SVGProps } from 'react';

/**
 * Brand marks not shipped by lucide-react v1.
 * GitHub path: simple-icons (CC0). LinkedIn: simplified "in" mark drawn from primitives.
 */
type Props = SVGProps<SVGSVGElement> & { size?: number | string };

function base({ size = 24, ...rest }: Props) {
    return { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, ...rest };
}

export function GithubIcon(props: Props) {
    return (
        <svg {...base(props)}>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
    );
}

export function LinkedinIcon(props: Props) {
    return (
        <svg {...base(props)}>
            <path
                fillRule="evenodd"
                d="M3 1h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Zm2.5 8.5V19h3V9.5h-3ZM7 4.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM10.5 9.5V19h3v-5c0-1.4.8-2.2 1.9-2.2 1.1 0 1.6.8 1.6 2.2v5h3v-5.8c0-2.6-1.4-3.9-3.4-3.9-1.5 0-2.5.7-3.1 1.6V9.5h-3Z"
            />
        </svg>
    );
}
