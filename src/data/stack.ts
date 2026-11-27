import { siArduino, siDocker, siFastapi, siGit, siGithub, siGithubactions, siLinux, siPython, siReact, siTerraform } from 'simple-icons';

export interface StackItem {
    name: string;
    /** simple-icons SVG path (24×24 viewBox). AWS and Azure have none: simple-icons removed them at the trademark owners' request, so they render as text. */
    path?: string;
}

/** Marquee under the hero — tools from skills.ts plus the core cloud platforms. */
export const stack: StackItem[] = [
    { name: 'AWS' },
    { name: 'Azure' },
    { name: 'Docker', path: siDocker.path },
    { name: 'Terraform', path: siTerraform.path },
    { name: 'Python', path: siPython.path },
    { name: 'Linux', path: siLinux.path },
    { name: 'GitHub Actions', path: siGithubactions.path },
    { name: 'FastAPI', path: siFastapi.path },
    { name: 'Git', path: siGit.path },
    { name: 'GitHub', path: siGithub.path },
    { name: 'React', path: siReact.path },
    { name: 'Arduino', path: siArduino.path },
];
