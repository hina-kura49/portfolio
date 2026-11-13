import { useEffect, useState } from 'react'
import { sitePath } from '../paths'
import { biography, caseStudies, contributions } from '../data/content'
import { site } from '../data/site'
import { publishedCves } from './CaseStudies'
import { SecurityLabel } from './SecurityLabel'

const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/** Counts up from 0 once the hero has faded in; shows the final value straight away under reduced motion. */
function CountUp({ to, delay = 1100 }: { to: number; delay?: number }) {
  const [value, setValue] = useState(() => (reducedMotion() ? to : 0))
  useEffect(() => {
    if (reducedMotion()) return setValue(to)
    let frame = 0
    const timer = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 900, 1)
        setValue(Math.round(to * (1 - (1 - progress) ** 3)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(frame) }
  }, [to, delay])
  return <>{value}</>
}

export function PersonalHero() {
  const reported = caseStudies.filter(study => study.status === 'embargoed').length
  const rustMerged = contributions.filter(item => item.repository === 'rust-lang/rust' && item.status === 'merged').length
  const stats = [
    { label: 'CVEs published', value: publishedCves.length, unit: '' },
    { label: '開示調整中の報告', value: reported, unit: '件' },
    { label: 'rustc にマージ', value: rustMerged, unit: 'PR' },
  ]

  return <section className="personal-hero" aria-labelledby="hero-name">
    <picture className="hero-art">
      <source media="(max-width: 700px)" srcSet={sitePath('/images/hero/rust-hero-900.jpg')} />
      <img src={sitePath('/images/hero/rust-hero.jpg')} alt="Rustのロゴの前で、カニのFerrisとコーヒーに囲まれ、ノートPCに突っ伏して眠る自分のイラスト" width={1672} height={941} decoding="async" fetchPriority="high" />
    </picture>
    <div className="hero-copy">
      <p className="hero-role">{biography.role.split(' / ').slice(0, 2).join(' / ')}</p>
      <h1 id="hero-name" className="hero-name">{site.name}</h1>
      <SecurityLabel />
      <p className="hero-lead">Rust と Web のセキュリティ。<br />見つけて、証明して、直るところまで。</p>
      <dl className="hero-stats">
        {stats.map(stat => <div key={stat.label}>
          <dt>{stat.label}</dt>
          <dd><CountUp to={stat.value} />{stat.unit && <small>{stat.unit}</small>}</dd>
        </div>)}
      </dl>
      <div className="hero-actions">
        <a className="hero-button" href={sitePath('/case-study')}>脆弱性の記録を見る <span aria-hidden="true">→</span></a>
        {biography.githubUrl && <a className="hero-button is-ghost" href={biography.githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>}
      </div>
    </div>
  </section>
}
