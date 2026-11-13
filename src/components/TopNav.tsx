import { sitePath } from '../paths'
import { projects } from '../data/projects'
import { biography } from '../data/content'
import { site } from '../data/site'

const navLabel: Record<string, string> = { 'personal-portfolio': 'Personal', development: 'Projects', 'case-study': 'Security' }

/** Desktop navigation bar for the section pages; small screens keep the circular menu button. */
export function TopNav({ current }: { current?: string }) {
  return <nav className="top-nav" aria-label="Section navigation">
    <a className="top-nav-brand" href={sitePath()}>{site.name}</a>
    <ul className="top-nav-links">
      <li><a href={sitePath()}>Home</a></li>
      {projects.map(project => <li key={project.id}>
        <a href={sitePath(project.projectUrl)} aria-current={project.projectUrl === current ? 'page' : undefined}>{navLabel[project.id] ?? project.title}</a>
      </li>)}
    </ul>
    <div className="top-nav-social">
      {biography.githubUrl && <a href={biography.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><img src={sitePath('/images/technologies/github.svg')} alt="" width="20" height="20" /></a>}
      {biography.xUrl && <a href={biography.xUrl} target="_blank" rel="noreferrer" aria-label="X"><img src={sitePath('/images/technologies/x.svg')} alt="" width="18" height="18" /></a>}
    </div>
  </nav>
}
