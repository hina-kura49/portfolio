import { sitePath } from '../paths'
import { useRef } from 'react'
import { projects } from '../data/projects'
import { site } from '../data/site'

export function SiteMenu() {
  const dialog = useRef<HTMLDialogElement>(null)
  return (
    <>
      <header className="site-header">
        <button className="menu-button" type="button" aria-label="Open menu" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
          <span /><span /><span />
        </button>
      </header>
      <dialog ref={dialog} className="menu-dialog" aria-labelledby="menu-title">
        <button className="menu-button menu-close" type="button" aria-label="Close menu" onClick={() => dialog.current?.close()} autoFocus>
          <span /><span /><span />
        </button>
        <div className="menu-content">
          <p id="menu-title">{site.title}</p>
          <nav aria-label="Main navigation">
            <a className="menu-home" href={sitePath()}>Home</a>
            {projects.map((project) => <a key={project.id} className="menu-works" href={sitePath(project.projectUrl)}><span>{project.number}</span>{project.title}</a>)}
          </nav>
          <p>Profile, development, security & open source.</p>
        </div>
      </dialog>
    </>
  )
}
