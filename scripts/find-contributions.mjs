import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const AUTHOR = 'h-kurashina'
const PORTFOLIO = 'hina-kura49/portfolio'
const LABEL = 'new-contribution'
// Own repositories, company work and friends' shared projects are not open source contributions.
const EXCLUDED_OWNERS = ['h-kurashina', 'Beaulab-jp', 'tunakan11']

/** Pull requests to other people's repositories that are neither listed nor already announced. */
export function findNew(pulls, source, announcedBodies) {
  return pulls.filter(pull => {
    const owner = pull.repository.split('/')[0]
    return !EXCLUDED_OWNERS.some(excluded => excluded.toLowerCase() === owner.toLowerCase())
      && !source.includes(`'${pull.url}'`)
      && !announcedBodies.some(body => body.includes(pull.url))
  })
}

export function issueFor(pull) {
  const [owner, repo] = pull.repository.split('/')
  const entry = `  {
    id: '${repo}-${pull.number}',
    repository: '${pull.repository}',
    pullRequestUrl: '${pull.url}',
    title: '${pull.title.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
    description: '（説明を書く）',
    status: '${pull.status}',
    date: '${pull.date}',
    languages: [${pull.language ? `'${pull.language}'` : ''}],
  },`
  return {
    title: `Open Source に追加: ${owner}/${repo}#${pull.number}`,
    body: `新しいコントリビュートが見つかりました。\n\n- ${pull.url}\n- ${pull.title}\n- 状態: ${pull.status} / 作成日: ${pull.date}\n\n\`src/data/content.ts\` の \`contributions\` に、説明文を書いて追加してください。\n\n\`\`\`ts\n${entry}\n\`\`\`\n`,
  }
}

async function github(path, init = {}, authenticated = true) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: { accept: 'application/vnd.github+json', ...(authenticated && { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }), ...init.headers },
  })
  if (!response.ok && response.status !== 422) throw new Error(`${path}: GitHub API responded ${response.status}`)
  return response.json()
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const source = await readFile('src/data/content.ts', 'utf8')
  const query = encodeURIComponent(`is:pr author:${AUTHOR} ${EXCLUDED_OWNERS.map(owner => `-user:${owner}`).join(' ')}`)
  // The Actions token only searches repositories it can access, so search public pull requests anonymously.
  const { items } = await github(`/search/issues?q=${query}&per_page=100`, {}, false)
  const pulls = await Promise.all(items.map(async item => {
    const repository = item.repository_url.replace('https://api.github.com/repos/', '')
    const { language } = await github(`/repos/${repository}`)
    return {
      repository, number: item.number, url: item.html_url, title: item.title, language,
      status: item.pull_request?.merged_at ? 'merged' : item.state,
      date: item.created_at.slice(0, 10),
    }
  }))
  const announced = await github(`/repos/${PORTFOLIO}/issues?labels=${LABEL}&state=all&per_page=100`)
  const found = findNew(pulls, source, announced.map(issue => issue.body ?? ''))
  if (!found.length) console.log(`No new contributions (${pulls.length} pull requests checked).`)
  if (found.length && !process.env.DRY_RUN) await github(`/repos/${PORTFOLIO}/labels`, { method: 'POST', body: JSON.stringify({ name: LABEL, color: 'c5def5' }) })
  for (const pull of found) {
    const issue = issueFor(pull)
    console.log(`${process.env.DRY_RUN ? '[dry run] ' : ''}${issue.title}`)
    if (!process.env.DRY_RUN) await github(`/repos/${PORTFOLIO}/issues`, { method: 'POST', body: JSON.stringify({ ...issue, labels: [LABEL] }) })
  }
}
