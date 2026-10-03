import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Presupuesto from './components/Presupuesto'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        
        {/* El Navbar queda afuera de las rutas para que se vea siempre en todas las páginas */}
        <Navbar />

        {/* Acá adentro va a cambiar el contenido dependiendo de dónde hagamos clic */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/presupuesto" element={<Presupuesto />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App