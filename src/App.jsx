import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { TopBar, Header, Footer, FloatingActions } from './components/Chrome'
import Landing from './pages/Landing'
import ServicePage from './pages/ServicePage'

// After a route change: scroll to the requested section (passed in router state, so the URL stays
// clean with no #hash), otherwise to the top.
function ScrollManager() {
  const { pathname, state } = useLocation()
  const target = state?.scrollTo
  useEffect(() => {
    if (target) {
      const t = setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 80)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, target])
  return null
}

export default function App() {
  // Selected treatment is shared by the service cards and the booking forms.
  const [treatment, setTreatment] = useState('')
  const shared = { treatment, setTreatment }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollManager />
      <TopBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/thanjavur" replace />} />
          <Route path="/thanjavur" element={<Landing {...shared} />} />
          <Route path="/thanjavur/:slug" element={<ServicePage {...shared} />} />
          <Route path="*" element={<Navigate to="/thanjavur" replace />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </BrowserRouter>
  )
}
