// Promote embargoed case studies to 'published' once their advisory is public.
//
// Responsible disclosure: embargoed entries in src/data/case-studies.json hold
// only identifiers (advisory/cve) — never the write-up. This script polls the
// public advisory databases and, only once an advisory is public, fills the
// case study from that now-public advisory and flips it to 'published'. Nothing
// sensitive lives in the repo before disclosure.
import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const DATA = 'src/data/case-studies.json'

const SEVERITY = { critical: 'critical', high: 'high', medium: 'medium', moderate: 'medium', low: 'low' }

// Fill the 5-step detail for a freshly published case study from its public
// advisory. The headline (finding) comes verbatim from the advisory summary;
// the surrounding narrative is intentionally generic and can be polished by
// hand afterwards (the write-up is not needed to publish on disclosure).
function detailsFrom(summary) {
  return {
    situation: 'AI・Webの脆弱性診断の一環として、許可された対象のOSSを精査して見つけた脆弱性です。責任ある開示の手順で報告しました。',
    approach: 'ソースコードを精査して危険な箇所を特定し、手元の環境で実証（PoC）して影響を確認しました。',
    finding: summary,
    fix: '詳しい内容と修正は、公開されたアドバイザリ（下のリンク）を参照してください。',
    lesson: '守り（セキュリティ機能）そのものを検証すること、そしてPoCで事実として示すことが、信頼される報告につながると実感しました。',
  }
}

// resolve(entry) -> null (not public yet) | { severity, cve?, url, summary }
export function promoteEntries(entries, resolve) {
  const promoted = []
  const next = entries.map((entry) => {
    if (entry.status !== 'embargoed') return entry
    const pub = resolve(entry)
    if (!pub) return entry
    promoted.push(entry.id)
    return {
      ...entry,
      status: 'published',
      severity: SEVERITY[pub.severity] ?? entry.severity,
      ...(pub.cve ? { cve: pub.cve } : {}),
      ...(pub.cvss ? { cvss: pub.cvss } : {}),
      url: pub.url ?? entry.url,
      ...detailsFrom(pub.summary ?? entry.title),
    }
  })
  return { next, promoted }
}

const gh = (path) =>
  fetch(`https://api.github.com${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
      ...(process.env.GITHUB_TOKEN && { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
    },
  })

// Network resolver: a GHSA id is public once it appears in the global advisory
// database; a CVE once OSV knows it. A private draft advisory returns 404, so an
// embargoed entry simply stays embargoed until it is actually published.
async function resolvePublic(entry) {
  if (entry.advisory) {
    const res = await gh(`/advisories/${entry.advisory}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`${entry.advisory}: GitHub API responded ${res.status}`)
    const a = await res.json()
    return { severity: a.severity, cve: a.cve_id ?? undefined, cvss: a.cvss_severities?.cvss_v4?.score || a.cvss_severities?.cvss_v3?.score || a.cvss?.score || undefined, url: a.html_url, summary: a.summary }
  }
  if (entry.cve) {
    const res = await fetch(`https://api.osv.dev/v1/vulns/${entry.cve}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`${entry.cve}: OSV responded ${res.status}`)
    const v = await res.json()
    const ref = (v.references ?? []).find((r) => r.url)?.url
    return {
      severity: (v.database_specific?.severity ?? '').toLowerCase() || entry.severity,
      cve: entry.cve,
      url: ref ?? `https://nvd.nist.gov/vuln/detail/${entry.cve}`,
      summary: v.summary ?? v.details ?? entry.title,
    }
  }
  return null
}

async function main() {
  const source = await readFile(DATA, 'utf8')
  const entries = JSON.parse(source)
  const results = await Promise.all(
    entries.map(async (e) => (e.status === 'embargoed' ? await resolvePublic(e).catch((err) => { console.error(err.message); return null }) : null)),
  )
  const { next, promoted } = promoteEntries(entries, (e) => results[entries.indexOf(e)])
  if (promoted.length === 0) {
    console.log('No case studies to promote.')
    return
  }
  await writeFile(DATA, JSON.stringify(next, null, 2) + '\n')
  console.log(`Promoted to published: ${promoted.join(', ')}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
