// The data the pages render, in the current page's language.
import { lang } from '../paths'
import * as source from './content'
import { projects as sourceProjects } from './projects'
import { biographyEn, caseStudiesEn, contributionsEn, genericStepsEn, projectsEn, termsEn, worksEn } from './en'
import type { CaseStudy } from './content'

const en = lang === 'en'
const steps = ['situation', 'approach', 'finding', 'fix', 'lesson'] as const

/** Display name for a Japanese field/tag value; the value itself stays the filter key. */
export const term = (value: string) => (en ? termsEn[value] ?? value : value)

export const projects = en ? sourceProjects.map(project => ({ ...project, ...projectsEn[project.id] })) : sourceProjects

export const biography = en ? { ...source.biography, ...biographyEn } : source.biography

export const developmentWorks = en ? source.developmentWorks.map(work => ({ ...work, ...worksEn[work.id] })) : source.developmentWorks

export const caseStudies: CaseStudy[] = en ? source.caseStudies.map(study => {
  const text = caseStudiesEn[study.id] ?? {}
  const localized: CaseStudy = { ...study, ...text, tags: study.tags.map(term) }
  // Narrative auto-written on publication has a fixed English counterpart.
  for (const key of steps) if (!text[key] && study[key] && genericStepsEn[study[key]!]) localized[key] = genericStepsEn[study[key]!]
  return localized
}) : source.caseStudies

export const contributions = en ? source.contributions.map(item => ({ ...item, ...contributionsEn[item.id] })) : source.contributions

export const { languages, fields, filterWorks } = source
