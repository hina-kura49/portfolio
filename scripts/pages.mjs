import { mkdir, readFile, writeFile } from 'node:fs/promises'

// Read the case studies as plain JSON so this script needs no TS/JSON loader.
const caseStudies = JSON.parse(await readFile(new URL('../src/data/case-studies.json', import.meta.url), 'utf8'))

// Detail pages exist only for published cases; embargoed ones stay list-only.
// Route numbers follow the full array order (see caseStudyPath) to keep URLs stable.
const caseRoutes = caseStudies
  .map((study, index) => (study.status === 'published' ? `case-study/${index + 1}` : null))
  .filter(Boolean)

const SITE = 'https://hina-kura49.github.io/portfolio/'
const DESCRIPTION_JA = 'h.kurashina — 開発者。プロフィール、開発した作品、セキュリティ研究、オープンソースへの貢献。'

// English is the default at the root; Japanese mirrors every route under /ja/.
// Real HTML entry points support direct links and reloads on static hosting.
const template = await readFile('dist/index.html', 'utf8')
const routes = ['', 'personal', 'development', 'case-study', 'open-source', ...caseRoutes]
for (const route of routes) {
  const alternates = ['en', 'ja', 'x-default']
    .map(lang => `<link rel="alternate" hreflang="${lang}" href="${SITE}${lang === 'ja' ? 'ja/' : ''}${route}" />`)
    .join('\n    ')
  const page = lang => {
    let html = template.replace('</head>', `  ${alternates}\n  </head>`)
    if (lang === 'ja') html = html.replace('<html lang="en">', '<html lang="ja">').replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${DESCRIPTION_JA}"`)
    return html
  }
  for (const [dir, lang] of [[route, 'en'], [`ja/${route}`, 'ja']]) {
    await mkdir(`dist/${dir}`, { recursive: true })
    await writeFile(`dist/${dir}/index.html`.replace('//', '/'), page(lang))
  }
}
