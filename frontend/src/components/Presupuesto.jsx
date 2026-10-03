import { useState } from 'react';

export default function Presupuesto() {
  // Estados iniciales para cada categoría (con una fila vacía por defecto)
  const [ingresos, setIngresos] = useState([
    { id: 1, nombre: '', moneda: 'ARS', montoOriginal: '', cotizacion: 1 }
  ]);
  const [gastos, setGastos] = useState([
    { id: 2, nombre: '', moneda: 'ARS', montoOriginal: '', cotizacion: 1 }
  ]);
  const [inversiones, setInversiones] = useState([
    { id: 3, nombre: '', moneda: 'USD', montoOriginal: '', cotizacion: '' }
  ]);

  // Función matemática que suma los totales multiplicando por cotización
  const calcularTotal = (lista) => {
    return lista.reduce((acumulador, item) => {
      const monto = parseFloat(item.montoOriginal) || 0;
      const cotiz = parseFloat(item.cotizacion) || 1;
      return acumulador + (monto * cotiz);
    }, 0);
  };

  const totalIngresos = calcularTotal(ingresos);
  const totalGastos = calcularTotal(gastos);
  const totalInversiones = calcularTotal(inversiones);
  
  // Cálculo del cuadro final (Beneficio/Pérdida)
  const saldoNeto = totalIngresos - totalGastos - totalInversiones;
  
  let colorSaldo = 'black';
  if (saldoNeto > 0) colorSaldo = '#2a9d8f'; // Verde si sobra plata
  else if (saldoNeto < 0) colorSaldo = '#e63946'; // Rojo si gastamos de más

  // Funciones unificadas para manejar las filas de cualquier lista
  const manejarCambio = (id, campo, valor, lista, setLista) => {
    setLista(lista.map(item => {
      if (item.id === id) {
        const modificado = { ...item, [campo]: valor };
        if (campo === 'moneda' && valor === 'ARS') {
          modificado.cotizacion = 1;
        }
        return modificado;
      }
      return item;
    }));
  };

  const agregarFila = (lista, setLista, monedaDefault = 'ARS') => {
    setLista([...lista, { 
      id: Date.now(), // Generamos un ID único rápido
      nombre: '', 
      moneda: monedaDefault, 
      montoOriginal: '', 
      cotizacion: monedaDefault === 'ARS' ? 1 : '' 
    }]);
  };

  const eliminarFila = (id, lista, setLista) => {
    setLista(lista.filter(item => item.id !== id));
  };

  // ------------------------------------------------------------------
  // COMPONENTE INTERNO: Molde para dibujar cada columna (Ingresos/Gastos)
  // ------------------------------------------------------------------
  const renderBloque = (titulo, lista, setLista, total, placeholderNombre, monedaDefault) => (
    <div className="caja-sketch" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>{titulo}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {lista.map(item => (
          <div key={item.id} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
            
            <input 
              type="text" 
              placeholder={placeholderNombre}
              value={item.nombre}
              onChange={(e) => manejarCambio(item.id, 'nombre', e.target.value, lista, setLista)}
              style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.1rem', flex: '1 1 100px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
            />
            
            <select 
              value={item.moneda}
              onChange={(e) => manejarCambio(item.id, 'moneda', e.target.value, lista, setLista)}
              style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1rem', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
            >
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
              <option value="OTRO">Otro</option>
            </select>

            <input 
              type="number" 
              placeholder="Monto"
              value={item.montoOriginal}
              onChange={(e) => manejarCambio(item.id, 'montoOriginal', e.target.value, lista, setLista)}
              style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.1rem', width: '80px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
            />

            {item.moneda !== 'ARS' && (
              <>
                <span style={{ fontSize: '0.9rem' }}>x</span>
                <input 
                  type="number" 
                  placeholder="Cotiz."
                  value={item.cotizacion}
                  onChange={(e) => manejarCambio(item.id, 'cotizacion', e.target.value, lista, setLista)}
                  style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.1rem', width: '70px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
                />
              </>
            )}

            <button 
              className="boton-eliminar-sketch"
              style={{ padding: '0 8px', fontSize: '1rem' }}
              onClick={() => eliminarFila(item.id, lista, setLista)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button 
        className="boton-sketch" 
        style={{ marginTop: '15px', alignSelf: 'center', fontSize: '1rem', padding: '5px 15px' }}
        onClick={() => agregarFila(lista, setLista, monedaDefault)}
      >
        + Agregar {titulo}
      </button>

      {/* Recuadro de Total de la categoría */}
      <div style={{ marginTop: '15px', borderTop: '2px solid black', paddingTop: '10px', textAlign: 'right' }}>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Total: ${total.toLocaleString('es-AR')}</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: 0 }}>Organización</h2>

      {/* FILA 1: Las 3 columnas de listas */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {renderBloque("Ingresos", ingresos, setIngresos, totalIngresos, "ej: Sueldo, Freelance", "ARS")}
        {renderBloque("Gastos", gastos, setGastos, totalGastos, "ej: Salidas, Tortitas", "ARS")}
        {renderBloque("Inversiones", inversiones, setInversiones, totalInversiones, "ej: DCA SPY, BTC", "USD")}
      </div>

      {/* FILA 2: El resumen de Cierre (Flujo de Caja) */}
      <div className="caja-sketch" style={{ alignSelf: 'center', minWidth: '350px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Flujo de Caja (Ingresos - Gastos - Inversiones)</h3>
        
        <div style={{ 
          border: `3px solid ${colorSaldo}`, 
          borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px', 
          padding: '20px',
          backgroundColor: colorSaldo === 'black' ? 'transparent' : `${colorSaldo}15`
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: colorSaldo }}>
            {saldoNeto > 0 ? '+' : ''}${saldoNeto.toLocaleString('es-AR')}
          </span>
        </div>
        
        <p style={{ marginTop: '15px', fontSize: '1.1rem' }}>
          Este es tu efectivo sobrante real a fin de mes.
        </p>
      </div>

      <button className="boton-sketch" style={{ alignSelf: 'center', padding: '15px 40px', fontSize: '1.3rem' }}>
        GUARDAR PRESUPUESTO
      </button>

    </div>
  )
}