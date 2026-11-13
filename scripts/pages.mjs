import { mkdir, copyFile, readFile } from 'node:fs/promises'

// Read the case studies as plain JSON so this script needs no TS/JSON loader.
const caseStudies = JSON.parse(await readFile(new URL('../src/data/case-studies.json', import.meta.url), 'utf8'))

// Detail pages exist only for published cases; embargoed ones stay list-only.
// Route numbers follow the full array order (see caseStudyPath) to keep URLs stable.
const caseRoutes = caseStudies
  .map((study, index) => (study.status === 'published' ? `case-study/${index + 1}` : null))
  .filter(Boolean)

// Real HTML entry points support direct links and reloads on static hosting.
const routes = ['personal', 'development', 'case-study', 'open-source', ...caseRoutes]
for (const route of routes) {
  await mkdir(`dist/${route}`, { recursive: true })
  await copyFile('dist/index.html', `dist/${route}/index.html`)
}
