import { sitePath } from '../paths'
import { useEffect, useState } from 'react'
import { ProjectRow } from '../components/ProjectRow'
import { ProjectPreview } from '../components/ProjectPreview'
import { Pointer } from '../components/Pointer'
import { SiteMenu } from '../components/SiteMenu'
import { projects } from '../data/projects'
import { site } from '../data/site'
import type { Project } from '../types/project'

export function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    // Two frames ensure the browser paints the starting pose before transitioning.
    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setEntered(true))
    })
    const clearPreview = () => setHoveredProject(null)
    window.addEventListener('blur', clearPreview)
    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
      window.removeEventListener('blur', clearPreview)
    }
  }, [])

  return (
    <div className={`projects-page home-page${entered ? ' has-entered' : ''}`} data-preview={hoveredProject?.id}>
      <ProjectPreview projects={projects} hoveredProject={hoveredProject} />
      <SiteMenu />

      <main className="works-container home-main" aria-labelledby="portfolio-title">
        <div className="works-content">
          <div className="home-brand">
            <img className="brand-mark" src={sitePath("/images/brand/hk.svg")} alt="" width="128" height="96" />
            <div className="brand-copy">
              <p className="brand-role">{site.role}</p>
              <h1 id="portfolio-title" className="home-title">
                <span>{site.name}</span>{' '}<span className="brand-label">Portfolio</span>
              </h1>
            </div>
          </div>
          <ul className="projects-list">
            {projects.map((project) => <ProjectRow key={project.id} project={project} hoveredProject={hoveredProject} onHover={setHoveredProject} />)}
          </ul>
        </div>
      </main>

      <footer className="site-footer">
        <small>©{new Date().getFullYear()} {site.name} All rights reserved</small>
      </footer>
      <Pointer />
    </div>
  )
}
