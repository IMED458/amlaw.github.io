import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const repoRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = resolve(repoRoot, 'dist');
const rootIndex = resolve(repoRoot, 'index.html');
const root404 = resolve(repoRoot, '404.html');
const rootAssets = resolve(repoRoot, 'assets');
const rootNoJekyll = resolve(repoRoot, '.nojekyll');

await rm(rootAssets, { recursive: true, force: true });
await cp(resolve(distDir, 'assets'), rootAssets, { recursive: true });
await cp(resolve(distDir, 'index.html'), rootIndex);

const distEntries = await readdir(distDir, { withFileTypes: true });
for (const entry of distEntries) {
  if (!entry.isFile() || entry.name === 'index.html') {
    continue;
  }

  await cp(resolve(distDir, entry.name), resolve(repoRoot, entry.name));
}

const indexHtml = await readFile(rootIndex, 'utf8');
await writeFile(root404, indexHtml);
await writeFile(rootNoJekyll, '');
