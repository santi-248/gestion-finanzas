import Navbar from './components/Navbar'
import GraficoCuentas from './components/GraficoCuentas'
import ResumenFinanciero from './components/ResumenFinanciero'
import EvolucionHistorica from './components/EvolucionHistorica' // Importamos el nuevo gráfico
import './index.css'

function App() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
      
      <Navbar />

      <main style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Fila Superior: Torta y Resumen */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
          
          <div className="caja-sketch">
            <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Distribución de Activos</h2>
            <GraficoCuentas />
          </div>

          <div className="caja-sketch" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Panel de Control</h2>
            <ResumenFinanciero />
          </div>

        </div>

        {/* Fila Inferior: Histórico Anual */}
        <div className="caja-sketch">
          <h2 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Evolución Patrimonial (2026)</h2>
          <EvolucionHistorica />
        </div>

      </main>

    </div>
  )
}

export default App