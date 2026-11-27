import { copyFile, mkdir } from 'node:fs/promises'

// The site is a single page, so dist/index.html is the only entry point.
// Unknown paths fall back to it through GitHub Pages' 404 handling.
await copyFile('dist/index.html', 'dist/404.html')
// Old links to the Japanese version (/ja/) keep working and open in Japanese.
await mkdir('dist/ja', { recursive: true })
await copyFile('dist/index.html', 'dist/ja/index.html')
