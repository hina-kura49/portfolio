import { sitePath } from '../paths'
import { useState } from 'react'
import { SiteMenu } from '../components/SiteMenu'
import { TopNav } from '../components/TopNav'
import { Pointer } from '../components/Pointer'
import { PersonalProfile } from '../components/PersonalProfile'
import { CaseStudies, CaseStudyDetail, findCaseStudy } from '../components/CaseStudies'
import { Contributions } from '../components/Contributions'
import { projects } from '../data/projects'
import { site } from '../data/site'
import { developmentWorks, fields, filterWorks, languages } from '../data/content'

function Development() {
  const [language, setLanguage] = useState('')
  const [field, setField] = useState('')
  const visibleWorks = filterWorks(developmentWorks, language, field)
  const allLanguages = [...new Set([...languages, ...developmentWorks.flatMap(work => work.languages)])]
  const allFields = [...new Set([...fields, ...developmentWorks.flatMap(work => work.fields)])]
  return <>
    <div className="filters">
      <label htmlFor="language-filter">言語<select id="language-filter" aria-label="言語" value={language} onChange={event => setLanguage(event.target.value)}><option value="">すべての言語</option>{allLanguages.map(item => <option key={item}>{item}</option>)}</select></label>
      <label htmlFor="field-filter">分野<select id="field-filter" aria-label="分野" value={field} onChange={event => setField(event.target.value)}><option value="">すべての分野</option>{allFields.map(item => <option key={item}>{item}</option>)}</select></label>
      <button className="text-button" onClick={() => { setLanguage(''); setField('') }}>絞り込みを解除</button>
    </div>
    <p className="result-count" aria-live="polite">{visibleWorks.length} projects</p>
    {visibleWorks.length ? <ul className="content-list">{visibleWorks.map(work => <li key={work.id} className="development-work">
      {work.imageUrl && <img className="work-icon" src={sitePath(work.imageUrl)} alt={`${work.title} アプリアイコン`} width="88" height="88" loading="lazy" />}
      <div className="work-copy"><h2>{work.url ? <a href={work.url}>{work.title}</a> : work.title}</h2><p>{work.description}</p><p className="content-meta">{[...work.languages, ...work.fields].join(' / ')}</p></div>
    </li>)}</ul> : <p className="empty-state">{developmentWorks.length ? '条件に合う作品はありません。' : '作品はこれから追加していきます。'}</p>}
  </>
}

export function SectionPage({ pathname }: { pathname: string }) {
  const caseStudy = findCaseStudy(pathname)
  const project = projects.find(item => item.projectUrl === (caseStudy ? '/case-study' : pathname))
  if (!project) return <main className="not-found"><h1>Page not found</h1><a href={sitePath()}>Back to index</a></main>
  return <div className="projects-page has-entered detail-page" data-preview={project.id}>
    <SiteMenu />
    <TopNav current={project.projectUrl} />
    <main className="works-container">
      <section className="works-content">
        {caseStudy ? <>
          <a className="back-link" href={sitePath(project.projectUrl)}>← {project.title}</a>
          <CaseStudyDetail study={caseStudy} />
        </> : <>
          {project.id !== 'personal-portfolio' && <a className="back-link" href={sitePath()}>← Home</a>}
          {/* Personal opens with its own hero, which carries the page heading. */}
          {project.id !== 'personal-portfolio' && <>
            <div className="section-title"><img src={sitePath(project.imageUrl)} alt="" width="64" height="64" /><h1>{project.title}</h1></div>
            <p className="section-description">{project.description}</p>
          </>}
          {project.id === 'development' && <Development />}
          {project.id === 'personal-portfolio' && <PersonalProfile />}
          {project.id === 'case-study' && <CaseStudies />}
          {project.id === 'open-source' && <Contributions />}
        </>}
      </section>
    </main>
    <footer className="site-footer"><small>©{new Date().getFullYear()} {site.name} All rights reserved</small></footer>
    <Pointer />
  </div>
}
