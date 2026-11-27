// Turns originals in public/raw/ (git-ignored) into web-ready files in public/media/ (committed).
// Requires ffmpeg on PATH.  Usage: npm run media
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const raw = (f) => `${root}raw/${f}`;
const out = (f) => `${root}media/${f}`;
mkdirSync(out(''), { recursive: true });

function ffmpeg(args, label) {
    const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });
    if (r.status !== 0) {
        console.error(`✖ ${label} falló`);
        process.exit(1);
    }
    const file = args.at(-1);
    console.log(`✔ ${label}: ${(statSync(file).size / 1024).toFixed(0)} KB`);
}

// Hero background video: no audio, 1280w, short GOP for quick start, faststart for progressive playback.
if (existsSync(raw('hero-video.mp4'))) {
    const scale = 'scale=1280:-2:flags=lanczos,fps=24';
    ffmpeg(['-i', raw('hero-video.mp4'), '-an', '-vf', scale, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '42', '-row-mt', '1', '-deadline', 'good', out('hero.webm')], 'hero.webm');
    ffmpeg(['-i', raw('hero-video.mp4'), '-an', '-vf', scale, '-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out('hero.mp4')], 'hero.mp4');
}

// Professional portrait (Acerca de mí): two widths for srcset.
if (existsSync(raw('img-profesional-yo.png'))) {
    for (const w of [480, 800]) {
        ffmpeg(['-i', raw('img-profesional-yo.png'), '-vf', `scale=${w}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '78', out(`profile-${w}.webp`)], `profile-${w}.webp`);
    }
}

// Project screenshots and photos → card-sized WebP.
for (const [name, src] of [
    ['nova', raw('proj-nova.png')],
    ['mellow', raw('proj-mellow.png')], // screenshot of mellow.lat (27/11)
    ['quim', raw('quim detect foto.jpeg')], // prototype photo supplied by Andrés (27/11)
    ['grafo', raw('GRAFO DE CONHECIMENTO.png')], // screenshot of the team's graph viewer (27/11)
    ['grafo-pipeline', raw('grafo-slides/6.png')], // slides from the team presentation (27/11)
    ['grafo-entidades', raw('grafo-slides/7.png')],
    ['grafo-relaciones', raw('grafo-slides/8.png')],
]) {
    if (!existsSync(src)) continue;
    for (const w of [640, 1200]) {
        ffmpeg(['-i', src, '-vf', `scale=${w}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '75', out(`proj-${name}-${w}.webp`)], `proj-${name}-${w}.webp`);
    }
}

// CV page-1 preview (rendered from CV_ANDRES_ES.pdf in Chrome; crop removes the viewer's grey frame).
if (existsSync(raw('cv-preview-raw.png'))) {
    for (const w of [480, 900]) {
        ffmpeg(['-i', raw('cv-preview-raw.png'), '-vf', `crop=1753:2474:10:8,scale=${w}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '80', out(`cv-preview-${w}.webp`)], `cv-preview-${w}.webp`);
    }
}

// Timeline photos (milestone → file in public/raw).
for (const [name, file] of [
    ['cade', 'CADE-YO.jpg'],
    ['veyro', 'hackatonVEYRO.jpeg'],
    ['kiwie', 'SILVERPRICE-KIWIE-TRAYECTORIA.jpg'],
]) {
    if (!existsSync(raw(file))) continue;
    for (const w of [640, 1200]) {
        ffmpeg(['-i', raw(file), '-vf', `scale=${w}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '75', out(`tl-${name}-${w}.webp`)], `tl-${name}-${w}.webp`);
    }
}

// Poster: shown before playback, under prefers-reduced-motion, and as LCP candidate — keep it small.
if (existsSync(raw('hero-poster.png'))) {
    ffmpeg(['-i', raw('hero-poster.png'), '-vf', 'scale=1280:-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '62', out('hero-poster.webp')], 'hero-poster.webp');
    ffmpeg(['-i', raw('hero-poster.png'), '-vf', 'scale=640:-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '62', out('hero-poster-640.webp')], 'hero-poster-640.webp');
}
