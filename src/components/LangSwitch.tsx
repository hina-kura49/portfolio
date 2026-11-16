import { currentPath, lang, pagePath, type Lang } from '../paths'

const labels: Record<Lang, { short: string; name: string }> = { en: { short: 'EN', name: 'English' }, ja: { short: 'JA', name: '日本語' } }

/** Links to the same page in English and Japanese. */
export function LangSwitch({ className = '' }: { className?: string }) {
  return <p className={`lang-switch ${className}`.trim()}>
    {(['en', 'ja'] as const).map(to => to === lang
      ? <span key={to} aria-current="true" lang={to} title={labels[to].name}>{labels[to].short}</span>
      : <a key={to} href={pagePath(currentPath(), to)} hrefLang={to} lang={to} aria-label={labels[to].name}>{labels[to].short}</a>)}
  </p>
}
