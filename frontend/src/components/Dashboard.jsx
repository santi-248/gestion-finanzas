import { useState } from 'react';
import GraficoCuentas from './GraficoCuentas'
import ResumenFinanciero from './ResumenFinanciero'
import EvolucionHistorica from './EvolucionHistorica'
import FormularioCuenta from './FormularioCuenta'
import TablaCuentas from './TablaCuentas'

export default function Dashboard() {
  // Este es nuestro coordinador invisible
  const [actualizador, setActualizador] = useState(0);

  const notificarCambio = () => {
    setActualizador(prev => prev + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
        <div className="caja-sketch">
          <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Distribución de Activos</h2>
          {/* El atributo key hace la magia de recargarlos */}
          <GraficoCuentas key={`grafico-${actualizador}`} />
        </div>

        <div className="caja-sketch" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Panel de Control</h2>
          <ResumenFinanciero key={`resumen-${actualizador}`} />
        </div>
      </div>

      <div className="caja-sketch">
        <h2 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Evolución Patrimonial (2026)</h2>
        <EvolucionHistorica />
      </div>

      {/* Le pasamos la función a los formularios */}
      <FormularioCuenta onGuardado={notificarCambio} />
      <TablaCuentas key={`tabla-${actualizador}`} onGuardado={notificarCambio} />

    </div>
  )
}