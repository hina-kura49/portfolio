/** Resolve local assets beneath Vite's deployment base. */
export function sitePath(path: string = '/') {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export type Lang = 'en' | 'ja'

/** Path below the deployment base, including any /ja prefix. */
function basePath() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const pathname = window.location.pathname
  const local = base && (pathname === base || pathname.startsWith(`${base}/`))
    ? pathname.slice(base.length) : pathname
  return local.replace(/\/$/, '') || '/'
}

const JA = /^\/ja(?=\/|$)/

/** English is the default at the root; Japanese lives under /ja/. */
export const lang: Lang = JA.test(basePath()) ? 'ja' : 'en'

/** Route without the language prefix, e.g. "/personal". */
export function currentPath() {
  return basePath().replace(JA, '') || '/'
}

/** Link to a page in the given language (the current one by default). */
export function pagePath(path: string = '/', to: Lang = lang) {
  if (to === 'en') return sitePath(path)
  return sitePath(path === '/' ? '/ja/' : `/ja${path}`)
}

/** Pick the English or Japanese variant for the current page. */
export const t = <T,>(en: T, ja: T): T => (lang === 'ja' ? ja : en)
