import { useState, useEffect } from 'react';

export default function ResumenFinanciero() {
  // Inicializamos el objetivo leyendo la memoria del navegador (si no hay nada, arranca en 200.000)
  const [objetivoAnual, setObjetivoAnual] = useState(() => {
    const guardado = localStorage.getItem('objetivoAnual');
    return guardado ? Number(guardado) : 200000;
  });
  
  const [editando, setEditando] = useState(false);
  const [inputValor, setInputValor] = useState(objetivoAnual);
  
  const [saldoActual, setSaldoActual] = useState(0);
  const [saldoUltimoMes, setSaldoUltimoMes] = useState(0); // Nuevo estado

  useEffect(() => {
    // 1. Buscamos el saldo actual en vivo
    fetch('http://localhost:8081/api/cuentas')
      .then(res => res.json())
      .then(data => {
        const total = data.reduce((acumulador, cuenta) => acumulador + cuenta.saldoActual, 0);
        setSaldoActual(total);
      })
      .catch(error => console.error("Error al calcular el saldo total:", error));

    // 2. Buscamos el historial para ver cuánto tenías el mes pasado
    fetch('http://localhost:8081/api/historico')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          // Tomamos el último registro guardado en la base de datos
          const ultimoRegistro = data[data.length - 1];
          setSaldoUltimoMes(ultimoRegistro.saldoTotal);
        }
      })
      .catch(error => console.error("Error al cargar historial:", error));
  }, []);

  // ¡La matemática en acción!
  const beneficioMensual = saldoActual - saldoUltimoMes;

  const porcentaje = Math.min((saldoActual / objetivoAnual) * 100, 100).toFixed(1);

  const obtenerColorDeProgreso = (pct) => {
    if (pct < 60) return '#e63946'; 
    if (pct < 100) return '#f4a261'; 
    return '#2a9d8f'; 
  };

  const colorActual = obtenerColorDeProgreso(porcentaje);

  const guardarNuevoObjetivo = () => {
    const nuevoValor = Number(inputValor);
    setObjetivoAnual(nuevoValor);
    // Guardamos en la memoria del navegador para que sobreviva al F5
    localStorage.setItem('objetivoAnual', nuevoValor);
    setEditando(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      
      <div style={{ border: '2px solid black', borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px', padding: '15px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Rendimiento del Mes</h3>
        <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: beneficioMensual >= 0 ? '#2a9d8f' : '#e63946' }}>
          {beneficioMensual >= 0 ? '+' : '-'}${Math.abs(beneficioMensual).toLocaleString('es-AR')}
        </p>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>vs. último cierre</span>
      </div>

      <div style={{ border: '2px solid black', borderRadius: '225px 15px 255px 15px/15px 255px 15px 225px', padding: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ margin: 0 }}>Objetivo Anual</h3>
          
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