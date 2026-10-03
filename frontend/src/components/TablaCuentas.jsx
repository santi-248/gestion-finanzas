import { useState, useEffect } from 'react';

export default function TablaCuentas() {
  const [cuentas, setCuentas] = useState([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/api/cuentas')
      .then(res => res.json())
      .then(data => {
        const cuentasPreparadas = data.map(c => ({
          ...c,
          moneda: 'ARS',
          montoIngresado: c.saldoActual,
          cotizacion: 1
        }));
        setCuentas(cuentasPreparadas);
      })
      .catch(error => console.error("Error cargando cuentas:", error));
  }, []);

  const guardarTodosLosSaldos = () => {
    setGuardando(true);
    
    const promesas = cuentas.map(cuenta => {
      const saldoCalculado = parseFloat(cuenta.montoIngresado) * parseFloat(cuenta.cotizacion);
      return fetch(`http://localhost:8081/api/cuentas/${cuenta.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saldoActual: saldoCalculado })
      });
    });

    Promise.all(promesas)
      .then(() => {
        setGuardando(false);
        window.location.reload(); 
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

  const handleCambioFila = (id, campo, valor) => {
    setCuentas(cuentas.map(c => {
      if (c.id === id) {
        const cuentaActualizada = { ...c, [campo]: valor };
        if (campo === 'moneda' && valor === 'ARS') {
          cuentaActualizada.cotizacion = 1;
        }
        return cuentaActualizada;
      }
      return c;
    }));
  };

  return (
    <div className="caja-sketch" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Actualizar Saldos</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
        {cuentas.map(cuenta => {
          const totalEnPesos = (parseFloat(cuenta.montoIngresado || 0) * parseFloat(cuenta.cotizacion || 1)).toLocaleString('es-AR');

          return (
            <div key={cuenta.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed black', paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
              
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold', width: '150px' }}>{cuenta.nombre}</span>
              
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                
                <select 
                  value={cuenta.moneda} 
                  onChange={(e) => handleCambioFila(cuenta.id, 'moneda', e.target.value)}
                  style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1rem', padding: '2px 5px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
                >
                  <option value="ARS">ARS</option>
                  <option value="USD">USD</option>
                  <option value="OTRO">Otro</option>
                </select>

                <input 
                  type="number" 
                  value={cuenta.montoIngresado} 
                  onChange={(e) => handleCambioFila(cuenta.id, 'montoIngresado', e.target.value)}
                  style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.1rem', width: '100px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
                />

                {/* ACÁ ESTÁ LA MAGIA: Metimos la cotización y el total verde dentro del mismo condicional */}
                {cuenta.moneda !== 'ARS' && (
                  <>
                    <span style={{ fontSize: '1rem' }}>x</span>
                    <input 
                      type="number" 
                      placeholder="Cotización"
                      value={cuenta.cotizacion} 
                      onChange={(e) => handleCambioFila(cuenta.id, 'cotizacion', e.target.value)}
                      style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.1rem', width: '80px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
                    />
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2a9d8f', minWidth: '120px', textAlign: 'right' }}>
                      {'=> $'} {totalEnPesos}
                    </span>
                  </>
                )}

                <button 
                  className="boton-eliminar-sketch" 
                  onClick={() => eliminarCuenta(cuenta.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Eliminar
                </button>
              </div>

            </div>
          );
        })}
      </div>

      <button 
        className="boton-sketch" 
        style={{ alignSelf: 'center', padding: '10px 40px', fontSize: '1.2rem' }}
        onClick={guardarTodosLosSaldos}
        disabled={guardando}
      >
        {guardando ? 'GUARDANDO...' : 'GUARDAR TODOS LOS CAMBIOS'}
      </button>

    </div>
  );
}