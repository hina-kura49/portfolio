export type Project = {
  id: string
  number: string
  title: string
  category: string
  description: string
  imageUrl: string
  projectUrl?: string
  githubUrl?: string
  technologies: string[]
  published: boolean
}

export type Contribution = {
  id: string
  repository: string
  title: string
  description: string
  date: string
  languages: string[]
} & (
  | { pullRequestUrl: string; status: 'open' | 'merged' | 'closed' }
  | { issueUrl: string; resolutionUrl: string; status: 'resolved' }
)
