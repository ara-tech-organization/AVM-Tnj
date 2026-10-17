import { Navigate, useParams } from 'react-router'
import Landing from './Landing'
import ServicePage from './ServicePage'
import { SECTIONS } from '../lib/sections'

// One route for everything under /thanjavur so moving between sections never remounts the page:
//   /thanjavur, /thanjavur/about|services|gallery|contact -> landing page (scrolled to the section)
//   /thanjavur/<service-slug>                              -> service page
export default function Thanjavur(props) {
  const slug = (useParams()['*'] || '').replace(/\/$/, '')
  if (!slug || SECTIONS.includes(slug)) return <Landing {...props} />
  if (slug === 'contact-us') return <Navigate to="/thanjavur/contact" replace />
  return <ServicePage {...props} slug={slug} />
}
