// Landing page sections that have their own URL: /thanjavur/about, /thanjavur/services, ...
export const SECTIONS = ['about', 'services', 'gallery', 'contact']

const base = () => import.meta.env.BASE_URL.replace(/\/$/, '')

// "/thanjavur" or "/thanjavur/<section>" -> the section's element id ("home" for the top), else null.
export function sectionIdFor(path) {
  const parts = path.replace(/\/$/, '').split('/').filter(Boolean)
  if (parts[0] !== 'thanjavur') return null
  if (parts.length === 1) return 'home'
  return parts.length === 2 && SECTIONS.includes(parts[1]) ? parts[1] : null
}

// Reflect the section in the address bar without adding history entries or re-rendering routes.
export function syncUrl(id) {
  const url = `${base()}/thanjavur/${id === 'home' ? '' : id}`
  if (window.location.pathname !== url) window.history.replaceState(window.history.state, '', url)
}

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
