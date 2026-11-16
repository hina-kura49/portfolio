import { pagePath, sitePath } from '../paths'
import type { Project } from '../types/project'

type ProjectRowProps = {
  project: Project
  hoveredProject: Project | null
  onHover: (project: Project | null) => void
}

export function ProjectRow({ project, hoveredProject, onHover }: ProjectRowProps) {
  return (
    <li
      className={`project-row${hoveredProject && hoveredProject.id !== project.id ? ' is-inactive' : ''}`}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
    >
      <a
        href={pagePath(project.projectUrl)}
        className="project-trigger"
        aria-label={`${project.title} — ${project.description}`}
        onFocus={() => onHover(project)}
        onBlur={() => onHover(null)}
        onKeyDown={(event) => { if (event.key === 'Escape') onHover(null) }}
      />
      <span className="project-number">{project.number}:</span>
      <img className="project-icon" src={sitePath(project.imageUrl)} alt="" width="36" height="36" />
      <h2 className="project-title">
        {project.title}<span className="project-punctuation">;</span>
      </h2>
      <span className="project-category">{project.category}</span>
    </li>
  )
}
