import { useState } from 'react';

export default function FormularioCuenta() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('Billetera Virtual');

  // Nuevos estados para la lógica bimonetaria
  const [moneda, setMoneda] = useState('ARS');
  const [montoOriginal, setMontoOriginal] = useState('');
  const [cotizacion, setCotizacion] = useState(1);

  const guardarCuenta = (e) => {
    e.preventDefault();

    // Hacemos la multiplicación tal cual lo hacías en Excel
    const saldoCalculado = parseFloat(montoOriginal) * parseFloat(cotizacion);

    const nuevaCuenta = {
      nombre: nombre,
      tipo: tipo,
      saldoActual: saldoCalculado // Mandamos el total convertido a Java
    };

    fetch('http://localhost:8081/api/cuentas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCuenta),
    })
    .then(response => response.json())
    .then(() => {
      // Limpiamos todo
      setNombre('');
      setMontoOriginal('');
      setMoneda('ARS');
      setCotizacion(1);
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
          placeholder="Nombre (ej: Binance)" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent', width: '180px' }}
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

        {/* El nuevo selector de moneda */}
        <select 
          value={moneda} 
          onChange={(e) => {
            const nuevaMoneda = e.target.value;
            setMoneda(nuevaMoneda);
            if (nuevaMoneda === 'ARS') {
              setCotizacion(1); // Pesos es siempre 1:1
            } else {
              setCotizacion(''); // Limpiamos para que el usuario escriba
            }
          }}
          style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
        >
          <option value="ARS">Pesos (ARS)</option>
          <option value="USD">Dólares (USD)</option>
          <option value="OTRO">Otro</option>
        </select>

        <input 
          type="number" 
          placeholder={moneda === 'ARS' ? "Monto Total" : "Monto Original"} 
          value={montoOriginal}
          onChange={(e) => setMontoOriginal(e.target.value)}
          required
          style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent', width: '140px' }}
        />

        {/* Renderizado condicional: Solo aparece si NO es peso argentino */}
        {moneda !== 'ARS' && (
          <input 
            type="number" 
            placeholder="Cotización" 
            value={cotizacion}
            onChange={(e) => setCotizacion(e.target.value)}
            required
            style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent', width: '110px' }}
          />
        )}

        <button type="submit" className="boton-sketch">GUARDAR</button>
      </form>
    </div>
  );
}