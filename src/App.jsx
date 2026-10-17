import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { TopBar, Header, Footer, FloatingActions } from './components/Chrome'
import Thanjavur from './pages/Thanjavur'
import ThankYou from './pages/ThankYou'
import { sectionIdFor, scrollToSection } from './lib/sections'

// After a route change: scroll to the section named in the path (/thanjavur/contact), else to the top.
function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    const id = sectionIdFor(pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), ''))
    if (id && id !== 'home') {
      // second pass: lazy images and fonts can shift the layout after the first scroll
      const settle = () => {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top !== undefined && Math.abs(top - 88) > 16) scrollToSection(id)
      }
      const t1 = setTimeout(() => scrollToSection(id), 80)
      const t2 = setTimeout(settle, 1100)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    window.scrollTo(0, 0)
  }, [pathname])
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
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/thanjavur/*" element={<Thanjavur {...shared} />} />
          <Route path="*" element={<Navigate to="/thanjavur" replace />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </BrowserRouter>
  )
}
