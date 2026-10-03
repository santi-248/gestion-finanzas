import { useState } from 'react';

export default function FormularioCuenta() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Billetera Virtual');
  const [saldoActual, setSaldoActual] = useState('');

  const guardarCuenta = (e) => {
    e.preventDefault(); // Evita que la página se recargue en blanco

    const nuevaCuenta = {
      nombre: nombre,
      tipo: tipo,
      saldoActual: parseFloat(saldoActual)
    };

    fetch('http://localhost:8081/api/cuentas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaCuenta),
    })
    .then(response => response.json())
    .then(() => {
      // Limpiamos los campos
      setNombre('');
      setSaldoActual('');
      // Recargamos la página rápido para que el gráfico de torta se actualice
      window.location.reload(); 
    })
    .catch(error => console.error('Error al guardar:', error));
  };

  return (
    <div className="caja-sketch" style={{ marginTop: '30px' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Agregar Nueva Cuenta</h2>
      
      <form onSubmit={guardarCuenta} style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        
        <input 
          type="text" 
          placeholder="Nombre (ej: IOL, Efectivo)" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
        />

        <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)}
          style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
        >
          <option value="Billetera Virtual">Billetera Virtual</option>
          <option value="Plataforma Inversión">Plataforma Inversión</option>
          <option value="Efectivo">Efectivo</option>
        </select>

        <input 
          type="number" 
          placeholder="Saldo Actual ($)" 
          value={saldoActual}
          onChange={(e) => setSaldoActual(e.target.value)}
          required
          style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
        />

        <button type="submit" className="boton-sketch">GUARDAR</button>
      </form>
    </div>
  );
}