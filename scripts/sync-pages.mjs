import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const repoRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = resolve(repoRoot, 'dist');
const rootIndex = resolve(repoRoot, 'index.html');
const root404 = resolve(repoRoot, '404.html');
const rootAssets = resolve(repoRoot, 'assets');
const rootFavicon = resolve(repoRoot, 'favicon.svg');
const rootLawLogo = resolve(repoRoot, 'law.png');
const rootNoJekyll = resolve(repoRoot, '.nojekyll');

await rm(rootAssets, { recursive: true, force: true });
await cp(resolve(distDir, 'assets'), rootAssets, { recursive: true });
await cp(resolve(distDir, 'favicon.svg'), rootFavicon);
await cp(resolve(distDir, 'law.png'), rootLawLogo);
await cp(resolve(distDir, 'index.html'), rootIndex);

const indexHtml = await readFile(rootIndex, 'utf8');
await writeFile(root404, indexHtml);
await writeFile(rootNoJekyll, '');
