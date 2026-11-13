import { sitePath } from '../paths'
import { caseStudies, type CaseStudy } from '../data/content'

const steps = [
  ['situation', '状況'],
  ['approach', '調べ方'],
  ['finding', '見つけたこと'],
  ['fix', '直し方'],
  ['lesson', '学び'],
] as const

const severityLabel: Record<CaseStudy['severity'], string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

/** Case numbers follow array order, so new cases go at the end to keep URLs stable. */
export const caseStudyPath = (number: number) => `/case-study/${number}`
export const findCaseStudy = (pathname: string) => {
  const match = pathname.match(/^\/case-study\/(\d+)$/)
  const study = match ? caseStudies[Number(match[1]) - 1] : undefined
  // Embargoed cases have no detail page until their advisory is public.
  return study && study.status === 'published' ? study : undefined
}

function CaseMeta({ study }: { study: CaseStudy }) {
  return <p className="case-meta">
    <span className="case-target">{study.target}</span>
    <time dateTime={study.date}>{study.date}</time>
    {study.tags.map(tag => <span key={tag} className="case-tag">{tag}</span>)}
  </p>
}

function CaseBadges({ study }: { study: CaseStudy }) {
  const reference = study.advisory ?? study.cve
  return <div className="case-badges">
    <span className="case-severity" data-severity={study.severity}>{severityLabel[study.severity]}</span>
    {study.status === 'embargoed'
      ? <span className="case-status" data-status="embargoed">開示調整中{reference ? ` · ${reference}` : ''}</span>
      : reference && <span className="case-status" data-status="published">{reference}</span>}
  </div>
}

const caseNumber = (study: CaseStudy) => caseStudies.indexOf(study) + 1

/** Public CVEs, highest score first. New CVEs appear here automatically once the sync publishes them. */
export const publishedCves = caseStudies
  .filter(study => study.status === 'published' && study.cve)
  .sort((a, b) => (b.cvss ?? 0) - (a.cvss ?? 0))

export function CveHighlights() {
  if (!publishedCves.length) return null
  const reported = caseStudies.filter(study => study.status === 'embargoed').length
  return <section className="cve-highlights" aria-labelledby="cve-highlights-title">
    <div className="cve-highlights-heading">
      <h2 id="cve-highlights-title"><span className="cve-count">{String(publishedCves.length).padStart(2, '0')}</span><span className="cve-slash" aria-hidden="true">/</span> CVEs published</h2>
      <p>許可された範囲で OSS を調べ、PoC（攻撃が実際に成立するかの確認）を作ってから報告{reported ? <>。ほかに<strong>{reported}件</strong>が開示調整中です</> : null}。</p>
    </div>
    <ul className="cve-cards">
      {publishedCves.map(study => <li key={study.id} data-severity={study.severity}>
        <a href={sitePath(caseStudyPath(caseNumber(study)))}>
          <span className="cve-id">{study.cve}</span>
          <span className="cve-score"><strong>{study.cvss?.toFixed(1) ?? '—'}</strong> {severityLabel[study.severity]}</span>
          <span className="cve-product">{study.target.split('（')[0]}</span>
          <span className="cve-title">{study.title.replace(new RegExp(`^${study.target.split('（')[0]}\\s*の?\\s*`), '')}</span>
        </a>
      </li>)}
    </ul>
  </section>
}

export function CaseStudies() {
  return <>
    <CveHighlights />
    <p className="case-disclaimer">許可された環境（オープンソースの公開コード・学習用ラボ・匿名化した対応記録）での調査です。報告した脆弱性は、修正が公開されるまで攻撃手順を伏せています。</p>
    {caseStudies.length ? <ol className="content-list case-list">
      {caseStudies.map((study, index) => <li key={study.id}>
        <article aria-labelledby={`case-${study.id}`}>
          <CaseBadges study={study} />
          <h2 id={`case-${study.id}`}>{study.status === 'published'
            ? <a href={sitePath(caseStudyPath(index + 1))}>{study.title}</a>
            : study.title}</h2>
          <CaseMeta study={study} />
          {study.situation && <p className="case-summary">{study.situation}</p>}
          {study.status === 'published' && <a className="case-link" href={sitePath(caseStudyPath(index + 1))}>詳しい記録を読む <span aria-hidden="true">→</span></a>}
        </article>
      </li>)}
    </ol> : <p className="empty-state">公開できる事例はこれから追加していきます。</p>}
  </>
}

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  return <article className="case-detail" aria-labelledby="case-title">
    <CaseBadges study={study} />
    <h1 id="case-title">{study.title}</h1>
    <CaseMeta study={study} />
    <dl className="case-steps">
      {steps.map(([key, label]) => study[key] && <div key={key}><dt>{label}</dt><dd>{study[key]}</dd></div>)}
    </dl>
    {study.url && <a className="case-link" href={study.url} target="_blank" rel="noreferrer">参考リンク <span aria-hidden="true">↗</span></a>}
  </article>
}
