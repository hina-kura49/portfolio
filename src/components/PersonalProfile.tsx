import { sitePath } from '../paths'
import { biography } from '../data/content'
import { TechnologyList } from './TechnologyList'
import { PersonalHero } from './PersonalHero'
import { CveHighlights } from './CaseStudies'

export function PersonalProfile() {
  return (
    <div className="personal-profile" lang="ja">
      <PersonalHero />
      <section className="profile-summary" aria-labelledby="profile-name">
        <img className="profile-photo" src={sitePath(biography.photo.src)} alt={biography.photo.alt} width={biography.photo.width} height={biography.photo.height} decoding="async" />
        <div className="profile-overview">
          <h2 id="profile-name" className="profile-name">Profile</h2>
          <p className="profile-introduction">{biography.introduction}</p>
        <dl className="profile-facts">
          <div><dt>Company</dt><dd>{biography.company.url ? <a href={biography.company.url} target="_blank" rel="noreferrer">{biography.company.name}<span aria-hidden="true"> ↗</span></a> : biography.company.name}</dd></div>
          <div><dt>Building</dt><dd>{biography.product}</dd></div>
          <div><dt>Open Source</dt><dd>{biography.openSource}</dd></div>
          <div><dt>Education</dt><dd>{biography.education}</dd></div>
          <div><dt>Outside of work</dt><dd>{biography.hobby}</dd></div>
        </dl>
        </div>
      </section>

      <CveHighlights />

      <section className="profile-section" aria-labelledby="about-title">
        <div className="profile-section-heading"><h2 id="about-title">About</h2><p>開発を始めたきっかけ</p></div>
        <p>{biography.motivation}</p>
      </section>

      <section className="profile-section" aria-labelledby="experience-title">
        <div className="profile-section-heading"><h2 id="experience-title">Experience</h2><p>これまでの経歴</p></div>
        <ol className="profile-timeline">
          {biography.history.map(item => <li key={item.period}>
            <span className="timeline-period">{item.period}</span>
            <div><h3>{item.title}</h3>{item.detail && <p>{item.detail}</p>}</div>
          </li>)}
        </ol>
      </section>

      <section className="profile-section" aria-labelledby="skills-title">
        <div className="profile-section-heading"><h2 id="skills-title">Skills</h2><p>使用技術・経験</p></div>
        <div className="profile-skills">
          <div><h3>Languages</h3><TechnologyList names={biography.languages} /></div>
          <div><h3>Frameworks</h3><TechnologyList names={biography.frameworks} /></div>
          <div className="security-experience"><h3><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></svg>Vulnerability Research / Burp Suite</h3><p>{biography.security}</p></div>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="interests-title">
        <div className="profile-section-heading"><h2 id="interests-title">What's next</h2><p>これから取り組みたいこと</p></div>
        <div><ul className="profile-tags interest-tags">{biography.interests.map(interest => <li key={interest}>{interest}</li>)}</ul><p>{biography.outlook}</p></div>
      </section>

      <section className="profile-section" aria-labelledby="contact-title">
        <div className="profile-section-heading"><h2 id="contact-title">Contact</h2><p>連絡先・リンク</p></div>
        <div className="profile-contact">
          {biography.email && <a href={`mailto:${biography.email}`}><span>Email</span><span>{biography.email} <span aria-hidden="true">↗</span></span></a>}
          {biography.githubUrl && <a href={biography.githubUrl} target="_blank" rel="noreferrer"><span className="contact-platform"><img src={sitePath("/images/technologies/github.svg")} alt="" width="18" height="18" />GitHub</span><span>{biography.githubUrl.replace('https://github.com/', '@')} <span aria-hidden="true">↗</span></span></a>}
          {biography.xUrl && <a href={biography.xUrl} target="_blank" rel="noreferrer"><span className="contact-platform"><img src={sitePath("/images/technologies/x.svg")} alt="" width="18" height="18" />X</span><span>{biography.xUrl.replace('https://x.com/', '@')} <span aria-hidden="true">↗</span></span></a>}
        </div>
      </section>
    </div>
  )
}
