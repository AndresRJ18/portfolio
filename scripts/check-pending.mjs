// Lists every "PENDIENTE" marker under src/data and exits 1 if any remain.
// Run manually during development; added to `build` before the final merge to main.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../src/data/', import.meta.url));
const hits = [];

for (const file of readdirSync(dir)) {
    if (file === 'types.ts') continue; // defines the marker itself
    readFileSync(join(dir, file), 'utf8')
        .split('\n')
        .forEach((line, i) => {
            if (line.includes('PENDIENTE') || /\bPENDING\b/.test(line)) hits.push(`src/data/${file}:${i + 1}  ${line.trim()}`);
        });
}

if (hits.length) {
    console.error(`✖ ${hits.length} pendiente(s):\n` + hits.join('\n'));
    process.exit(1);
}
console.log('✔ Sin pendientes en src/data');
