import { useEffect, useState, type MouseEvent } from 'react'
import { sitePath } from '../paths'
import { contributions } from '../data/content'
import { CcbarScene, CheckScene, JotScene, LiwinScene, TrailScene, UnforgeScene } from '../components/PreviewScenes'
import { CursorRing, ScrollProgress, SplitText, WaveLines } from '../components/Motion'
import {
  about, clients, contact, featured, hero, nav, openSource, organizations, ossResearch, person, securityBand, translations, type Lang,
} from '../data/home'

const LANG_KEY = 'portfolio-lang'

function initialLang(): Lang {
  if (/\/ja(\/|$)/.test(window.location.pathname)) return 'ja'
  const query = new URLSearchParams(window.location.search).get('lang')
  if (query === 'en' || query === 'ja') return query
  const saved = localStorage.getItem(LANG_KEY)
  return saved === 'ja' ? 'ja' : 'en'
}

function Arrow({ up = false }: { up?: boolean }) {
  return up
    ? <svg className="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" /></svg>
    : <svg className="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
}

function GitHubIcon() {
  return <svg viewBox="0 0 16 16" width="26" height="26" aria-hidden="true" fill="currentColor"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.23 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" /></svg>
}

function VendorMark({ logo }: { logo: string }) {
  return <img className="vendor-logo" src={sitePath(logo)} alt="" width="24" height="24" />
}

const BURST_COLORS: Record<string, string[]> = {
  google: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
  meta: ['#0866FF', '#0081FB', '#5AA0FF'],
  openai: ['#000000', '#6B7280', '#10A37F'],
  line: ['#06C755', '#4CD964', '#00B900'],
}

/** Throw a handful of colored dots out of the clicked tile. */
function burst(event: MouseEvent<HTMLElement>, colors: string[]) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const tile = event.currentTarget
  for (let i = 0; i < 14; i++) {
    const dot = document.createElement('span')
    dot.className = 'burst-dot'
    const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4
    const distance = 36 + Math.random() * 36
    dot.style.setProperty('--x', `${Math.cos(angle) * distance}px`)
    dot.style.setProperty('--y', `${Math.sin(angle) * distance}px`)
    dot.style.background = colors[i % colors.length]
    tile.appendChild(dot)
    dot.addEventListener('animationend', () => dot.remove())
  }
}

function LogoMarquee({ t }: { t: (text: Record<Lang, string>) => string }) {
  // Each track holds the list twice so the loop is seamless.
  const companies = [...securityBand.vendors, ...securityBand.vendors, ...securityBand.vendors]
  const half = Math.ceil(ossResearch.length / 2)
  const ossRows = [ossResearch.slice(0, half), ossResearch.slice(half)]
  return <div className="marquee">
    <div className="marquee-row" aria-label={t(securityBand.companies)}>
      <ul className="marquee-track">
        {[...companies, ...companies].map((vendor, i) => (
          <li key={i} aria-hidden={i >= securityBand.vendors.length || undefined}>
            <button type="button" className="logo-tile" data-vendor={vendor.id} onClick={event => burst(event, BURST_COLORS[vendor.id] ?? ['#1a73e8'])}>
              <VendorMark logo={vendor.logo} />
              <span className="vendor-name" data-vendor={vendor.id}>{vendor.name}</span>
              <span className="logo-count">×{vendor.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
    {ossRows.map((row, r) => (
      <div key={r} className={`marquee-row${r === 0 ? ' reverse' : ' slow'}`} aria-label={t(securityBand.oss)}>
        <ul className="marquee-track">
          {[...row, ...row, ...row, ...row].map((item, i) => (
            <li key={i} aria-hidden={i >= row.length || undefined}>
              <span className="oss-tile">
                {item.logo
                  ? <img className="oss-logo" src={sitePath(item.logo)} alt="" width="28" height="28" />
                  : <span className="oss-logo oss-initial" aria-hidden="true">{item.name[0].toUpperCase()}</span>}
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
}

type Work = (typeof featured.items)[number]

function WorkMedia({ work }: { work: Work }) {
  return <div className="work-window">
    <div className="work-window-bar"><i /><i /><i /></div>
    <div className="work-window-body">
      {work.media.kind === 'gif'
        ? <img src={sitePath(work.media.src)} alt="" loading="lazy" />
        : { jot: <JotScene />, ccbar: <CcbarScene />, liwin: <LiwinScene />, unforge: <UnforgeScene />, check: <CheckScene />, trail: <TrailScene /> }[work.media.scene]}
    </div>
  </div>
}

export function HomePage() {
  const [lang, setLang] = useState<Lang>(initialLang)
  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])
  const t = (text: Record<Lang, string>) => text[lang]
  const [line1, before, colored, after] = hero.title

  return (
    <div className="home">
      <ScrollProgress />
      <CursorRing />
      <header className="home-header">
        <a className="home-logo" href={sitePath()} aria-label={`${person.name} — home`}>
          <img src={sitePath('/images/brand/code-mark.svg')} alt="" width="36" height="36" />
          <span>{person.name}</span>
        </a>
        <nav className="home-nav" aria-label="Sections">
          {nav.map(item => <a key={item.id} href={`#${item.id}`}>{t(item.label)}</a>)}
        </nav>
        <div className="home-actions">
          <a className="icon-link" href={person.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
          <div className="lang-switch" role="group" aria-label="Language">
            {(['en', 'ja'] as const).map(code => (
              <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>{code.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="about-top">
          <WaveLines />
          <div className="hero-copy">
            <div className="hero-badges">
              <span className="status-dot">{t(hero.status)}</span>
            </div>
            <h1 className="hero-title" aria-label={`${line1} ${before}${colored}${after}`}>
              <span aria-hidden="true"><SplitText text={line1} /></span><br />
              <span aria-hidden="true"><SplitText text={before} start={line1.length} /><span className="brand-word"><SplitText text={colored} start={line1.length + before.length} gradient /></span><SplitText text={after} start={line1.length + before.length + colored.length} /></span>
            </h1>
            <p className="hero-lead">{t(hero.lead)}</p>
            <div className="hero-buttons">
              <a className="button button-dark" href="#projects">{t(hero.primary)} <Arrow /></a>
              <a className="button button-light" href="#contact"><svg className="icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="1.5" /><path d="m2 4 6 5 6-5" /></svg>{t(hero.secondary)}</a>
            </div>
          </div>
        </section>

        <section className="security-band fancy" id="security" aria-label={t(securityBand.label)}>
          <div className="band-intro">
            <p className="band-label"><span className="dot" />{t(securityBand.label)}</p>
            <p className="band-total"><strong>{securityBand.vendors.reduce((sum, v) => sum + v.count, 0) + ossResearch.filter(item => item.counted !== false).length}</strong> {t(securityBand.total)}</p>
            <p className="band-note">{t(securityBand.note)}</p>
          </div>
          <LogoMarquee t={t} />
        </section>

        <section className="clients" aria-labelledby="clients-title">
          <div className="clients-copy">
            <p className="band-label"><span className="dot" />{t(clients.label)}</p>
            <h2 id="clients-title">{t(clients.heading)}</h2>
            <p className="band-total"><strong>{clients.items.length}</strong> {t(clients.unit)}</p>
            <p className="band-note">{t(clients.note)}</p>
          </div>
          <div className="client-marquee" aria-hidden="true">
            <ul className="client-track">
              {[...clients.items, ...clients.items].map((client, i) => (
                <li key={i}><img src={sitePath(client.logo)} alt="" width="56" height="56" loading="lazy" /></li>
              ))}
            </ul>
          </div>
        </section>

        <div className="two-col">
          <section id="about" aria-labelledby="about-title">
            <h2 id="about-title" className="section-heading">{t(about.title)}</h2>
            <p className="body-text">{t(about.body)}</p>
            <ul className="tags">{about.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </section>
          <section aria-labelledby="now-title">
            <h2 id="now-title" className="section-heading plain">{t(about.nowTitle)}</h2>
            <ul className="now-list">
              {about.now.map(item => <li key={item.role.en}><strong>{t(item.role)}</strong><span>{t(item.place)}</span></li>)}
            </ul>
          </section>
        </div>

        <section className="wide-section" id="projects" aria-labelledby="projects-title">
          <div className="heading-with-note"><h2 id="projects-title" className="section-heading">{t(featured.title)}</h2><p>{t(featured.note)}</p></div>
          <ul className="works">
            {featured.items.map(work => (
              <li key={work.id}>
                <a className="work" href={work.url} target="_blank" rel="noreferrer">
                  <div className="work-stage"><WorkMedia work={work} /></div>
                  <p className="work-tags">{work.tags[lang].join(' ／ ')}</p>
                  <div className="work-title-row">
                    <h3><img src={sitePath(work.icon)} alt="" width="28" height="28" />{t(work.title)}</h3>
                    <span className="work-arrow" aria-hidden="true"><Arrow /></span>
                  </div>
                  <p className="work-roles">{work.roles[lang].join(' ・ ')}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="wide-section" id="organizations" aria-labelledby="orgs-title">
          <div className="heading-with-note"><h2 id="orgs-title" className="section-heading">{t(organizations.title)}</h2><p>{t(organizations.note)}</p></div>
          <ul className="org-grid">
            {organizations.items.map(org => (
              <li key={org.id}>
                <a className="org-card" href={org.url} target="_blank" rel="noreferrer">
                  <img src={sitePath(org.logo)} alt="" width="64" height="64" />
                  <div><h3>{org.name}</h3><p>{t(org.description)}</p></div>
                  <Arrow up />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="wide-section" id="open-source" aria-labelledby="oss-title">
          <div className="heading-with-note"><h2 id="oss-title" className="section-heading">{t(openSource.title)}</h2><p>{t(openSource.note)}</p></div>
          <ul className="card-grid">
            {contributions.map(item => (
              <li key={item.id}>
                <a className="info-card" href={'pullRequestUrl' in item ? item.pullRequestUrl : item.issueUrl} target="_blank" rel="noreferrer">
                  <span className="card-top"><span className="mono">{item.repository}</span><span className="state" data-status={item.status}>{item.status}</span></span>
                  <span className="card-title">{item.title}</span>
                  <span className="card-meta">{item.date} · {item.languages.join(' / ')}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="wide-section" id="translate" aria-labelledby="translate-title">
          <div className="heading-with-note"><h2 id="translate-title" className="section-heading">{t(translations.title)}</h2><p>{t(translations.note)}</p></div>
          {translations.groups.map(group => (
            <div key={group.org} className="tr-group">
              <p className="tr-group-title"><span>{group.label}</span><span className="tr-count">{group.items.length}</span><span className="tr-org">{group.org}</span></p>
              <ul className="tr-grid">
                {group.items.map(item => (
                  <li key={item.repo}>
                    <a className="tr-item" href={`https://github.com/${group.org}/${item.repo}`} target="_blank" rel="noreferrer">
                      {item.icon
                        ? <img src={sitePath(item.icon)} alt="" width="32" height="32" loading="lazy" />
                        : <span className="tr-initial" aria-hidden="true">{item.title[0]}</span>}
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="wide-section contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="section-heading">{t(contact.title)}</h2>
          <p className="body-text">{t(contact.body)}</p>
          <div className="hero-buttons">
            <a className="button button-dark" href={`mailto:${person.email}`}><svg className="icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="1.5" /><path d="m2 4 6 5 6-5" /></svg>{person.email}</a>
            <a className="button button-light" href={person.githubUrl} target="_blank" rel="noreferrer">GitHub @hina-kura49 <Arrow up /></a>
            <a className="button button-light" href={person.xUrl} target="_blank" rel="noreferrer">X @hkurashina49 <Arrow up /></a>
          </div>
        </section>
      </main>

      <footer className="home-footer"><small>© {new Date().getFullYear()} {person.name}</small></footer>
    </div>
  )
}
