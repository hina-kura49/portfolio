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
    <svg className="hero-waves" viewBox="0 0 1536 480" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="wave-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f1dfcf" stopOpacity=".75" /><stop offset="1" stopColor="#f1dfcf" stopOpacity="0" /></linearGradient>
        <linearGradient id="wave-right" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f5d8c4" stopOpacity=".6" /><stop offset="1" stopColor="#f5d8c4" stopOpacity="0" /></linearGradient>
      </defs>
      <path d="M0 300 C 170 270 320 330 480 380 C 640 430 820 420 1000 440 L 1000 480 L 0 480 Z" fill="url(#wave-left)" />
      <path d="M700 470 C 900 400 1100 430 1280 380 C 1400 350 1470 300 1536 270 L 1536 480 L 700 480 Z" fill="url(#wave-right)" />
    </svg>
    <p className="hero-tagline" aria-hidden="true">Build<br />A Safer<br />Tomorrow.</p>
    <img className="hero-art" src={sitePath('/images/hero/rust-hero-art.jpg')} alt="Rustのロゴの前で、カニのFerrisとコーヒーに囲まれ、ノートPCに突っ伏して眠る自分のイラスト" width={992} height={710} decoding="async" fetchPriority="high" />
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
