import { contributions } from '../data/content'
import type { Contribution } from '../types/project'

const statuses: Record<Contribution['status'], string> = { open: 'Open', merged: 'Merged', closed: 'Closed', resolved: '報告・解決済み' }

export function Contributions() {
  if (!contributions.length) return <p className="empty-state">コントリビュートはこれから追加していきます。</p>

  return <ul className="content-list contributions-list">
    {contributions.map(contribution => <li key={contribution.id}>
      <article aria-labelledby={`contribution-${contribution.id}`}>
        <div className="contribution-top">
          <span className="contribution-repository">{contribution.repository}</span>
          <span className="contribution-status" data-status={contribution.status}>{statuses[contribution.status]}</span>
        </div>
        <h2 id={`contribution-${contribution.id}`}><a href={'issueUrl' in contribution ? contribution.issueUrl : contribution.pullRequestUrl} target="_blank" rel="noreferrer">{contribution.title}</a></h2>
        <p className="contribution-description">{contribution.description}</p>
        {'resolutionUrl' in contribution && <p><a href={contribution.resolutionUrl} target="_blank" rel="noreferrer">対応した修正PR（マージ済み） ↗</a></p>}
        <p className="content-meta"><time dateTime={contribution.date}>{contribution.date}</time> / {contribution.languages.join(' / ')}</p>
      </article>
    </li>)}
  </ul>
}
