/** Resolve local assets and navigation beneath Vite's deployment base. */
export function sitePath(path: string = '/') {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
