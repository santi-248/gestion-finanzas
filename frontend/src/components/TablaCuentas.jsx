import { useState, useEffect } from 'react';

export default function TablaCuentas() {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/cuentas')
      .then(res => res.json())
      .then(data => setCuentas(data))
      .catch(error => console.error("Error cargando cuentas:", error));
  }, []);

  // Función que llama al nuevo método PUT de Java
  const actualizarSaldo = (id, nuevoSaldo) => {
    fetch(`http://localhost:8081/api/cuentas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ saldoActual: parseFloat(nuevoSaldo) })
    }).then(() => {
      window.location.reload(); // Recarga rápida para actualizar la torta y los totales
    });
  };

  // Maneja el cambio de números en el input antes de guardar
  const handleCambio = (id, valor) => {
    setCuentas(cuentas.map(c => c.id === id ? { ...c, saldoActual: valor } : c));
  };

  return (
    <div className="caja-sketch" style={{ marginTop: '30px' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Actualizar Saldos</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {cuentas.map(cuenta => (
          <div key={cuenta.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed black', paddingBottom: '10px' }}>
            
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{cuenta.nombre}</span>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem', alignSelf: 'center' }}>$</span>
              <input 
                type="number" 
                value={cuenta.saldoActual} 
                onChange={(e) => handleCambio(cuenta.id, e.target.value)}
                style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', width: '120px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
              />
              <button 
                className="boton-sketch" 
                style={{ padding: '2px 10px', fontSize: '1rem' }} 
                onClick={() => actualizarSaldo(cuenta.id, cuenta.saldoActual)}
              >
                Modificar
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}