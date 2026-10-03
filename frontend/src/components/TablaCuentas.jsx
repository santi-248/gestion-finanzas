import { useState, useEffect } from 'react';

export default function TablaCuentas() {
  const [cuentas, setCuentas] = useState([]);
  const [guardando, setGuardando] = useState(false); // Estado para saber si está procesando

  useEffect(() => {
    fetch('http://localhost:8081/api/cuentas')
      .then(res => res.json())
      .then(data => setCuentas(data))
      .catch(error => console.error("Error cargando cuentas:", error));
  }, []);

  // NUEVA FUNCIÓN GLOBAL
  const guardarTodosLosSaldos = () => {
    setGuardando(true); // Cambiamos el texto del botón
    
    // Armamos un array con todas las peticiones PUT
    const promesas = cuentas.map(cuenta => {
      return fetch(`http://localhost:8081/api/cuentas/${cuenta.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saldoActual: parseFloat(cuenta.saldoActual) })
      });
    });

    // Promise.all dispara todas las peticiones juntas y espera a que terminen
    Promise.all(promesas)
      .then(() => {
        setGuardando(false);
        window.location.reload(); // Mantenemos el atajo por hoy, pronto lo sacamos
      })
      .catch(error => {
        console.error("Error al guardar todo:", error);
        setGuardando(false);
      });
  };

  const eliminarCuenta = (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta cuenta?")) {
      fetch(`http://localhost:8081/api/cuentas/${id}`, {
        method: 'DELETE'
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const handleCambio = (id, valor) => {
    setCuentas(cuentas.map(c => c.id === id ? { ...c, saldoActual: valor } : c));
  };

  return (
    <div className="caja-sketch" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Actualizar Saldos</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
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
                className="boton-eliminar-sketch" 
                onClick={() => eliminarCuenta(cuenta.id)}
              >
                Eliminar
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* BOTÓN GLOBAL ABAJO DE LA TABLA */}
      <button 
        className="boton-sketch" 
        style={{ alignSelf: 'center', padding: '10px 40px', fontSize: '1.2rem'}}
        onClick={guardarTodosLosSaldos}
        disabled={guardando}
      >
        {guardando ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
      </button>

    </div>
  );
}