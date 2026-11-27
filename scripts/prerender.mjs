// Injects the server-rendered app into dist/index.html, then removes the temporary SSR bundle.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (see package.json).
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = `${root}dist/index.html`;
const placeholder = '<!--app-html-->';

const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href);
const html = readFileSync(htmlPath, 'utf8');

if (!html.includes(placeholder)) {
    console.error(`✖ ${placeholder} no está en dist/index.html`);
    process.exit(1);
}

writeFileSync(htmlPath, html.replace(placeholder, render()));
rmSync(`${root}dist-ssr`, { recursive: true, force: true });
console.log('✔ dist/index.html prerenderizado');
