import { useState } from 'react';

export default function ResumenFinanciero() {
  // Guardamos el objetivo en el estado. Le puse 200.000 de base como tenías en tu Excel.
  const [objetivoAnual, setObjetivoAnual] = useState(200000);
  
  // Estados para manejar el modo edición
  const [editando, setEditando] = useState(false);
  const [inputValor, setInputValor] = useState(200000);

  // Simulamos un saldo total actual y un beneficio mensual para la vista
  const saldoActual = 145000; 
  const beneficioMensual = 44528;

  // Lógica matemática: calculamos el porcentaje (tope de 100% para que la barra no se desborde)
  const porcentaje = Math.min((saldoActual / objetivoAnual) * 100, 100).toFixed(1);

  // Condicionales de color basados en porcentaje
  const obtenerColorDeProgreso = (pct) => {
    if (pct < 60) return '#e63946'; // Rojo rústico (falta bastante)
    if (pct < 100) return '#f4a261'; // Naranja/Amarillo clarito rústico (cerca)
    return '#2a9d8f'; // Verde rústico (objetivo cumplido o superado)
  };

  const colorActual = obtenerColorDeProgreso(porcentaje);

  // Función para guardar el nuevo objetivo
  const guardarNuevoObjetivo = () => {
    setObjetivoAnual(Number(inputValor));
    setEditando(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      
      {/* Tarjeta 1: Beneficio del Mes */}
      <div style={{ border: '2px solid black', borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px', padding: '15px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Beneficio del Mes</h3>
        <p style={{ 
          margin: 0, 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: beneficioMensual >= 0 ? '#2a9d8f' : '#e63946' 
        }}>
          {beneficioMensual >= 0 ? '+' : '-'}${Math.abs(beneficioMensual).toLocaleString('es-AR')}
        </p>
      </div>

      {/* Tarjeta 2: Progreso del Objetivo */}
      <div style={{ border: '2px solid black', borderRadius: '225px 15px 255px 15px/15px 255px 15px 225px', padding: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ margin: 0 }}>Objetivo Anual</h3>
          
          {/* Lógica de renderizado: si está editando muestra input, si no, muestra el botón */}
          {editando ? (
            <div style={{ display: 'flex', gap: '5px' }}>
              <input 
                type="number" 
                value={inputValor} 
                onChange={(e) => setInputValor(e.target.value)}
                style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1rem', width: '80px', border: '2px solid black', borderRadius: '4px' }}
              />
              <button className="boton-sketch" style={{ padding: '2px 10px', fontSize: '1rem' }} onClick={guardarNuevoObjetivo}>OK</button>
            </div>
          ) : (
            <button className="boton-sketch" style={{ padding: '2px 10px', fontSize: '1rem' }} onClick={() => setEditando(true)}>Editar</button>
          )}
        </div>

        <p style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>
          ${saldoActual.toLocaleString('es-AR')} / <strong>${objetivoAnual.toLocaleString('es-AR')}</strong>
        </p>

        {/* La Barra de Progreso estilo Sketch */}
        <div style={{ width: '100%', height: '25px', border: '2px solid black', borderRadius: '10px', overflow: 'hidden', backgroundColor: 'transparent' }}>
          <div style={{ 
            width: `${porcentaje}%`, 
            height: '100%', 
            backgroundColor: colorActual,
            transition: 'width 0.5s ease-in-out, background-color 0.5s ease-in-out',
            borderRight: porcentaje > 0 ? '2px solid black' : 'none'
          }}></div>
        </div>
        <p style={{ textAlign: 'right', margin: '5px 0 0 0', fontWeight: 'bold', color: colorActual }}>
          {porcentaje}%
        </p>
      </div>

    </div>
  );
}