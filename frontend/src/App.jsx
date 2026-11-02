import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Presupuesto from './components/Presupuesto'
import LandingPage from './components/LandingPage'
import './index.css'

function AppContent() {
  const location = useLocation()
  const isLanding = location.pathname === '/' || location.pathname === '/landing'

  return (
    <div style={isLanding ? { minHeight: '100vh', width: '100%', margin: 0, padding: 0 } : { maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
      {/* El Navbar se muestra en las páginas internas del sistema */}
      {!isLanding && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/presupuesto" element={<Presupuesto />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App