import { useState, useEffect } from 'react';

export default function Presupuesto() {
  const [ingresos, setIngresos] = useState([{ id: 1, nombre: '', moneda: 'ARS', montoOriginal: '', cotizacion: 1 }]);
  const [gastos, setGastos] = useState([{ id: 2, nombre: '', moneda: 'ARS', montoOriginal: '', cotizacion: 1 }]);
  const [inversiones, setInversiones] = useState([{ id: 3, nombre: '', moneda: 'USD', montoOriginal: '', cotizacion: '' }]);
  
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false); // <-- Nuevo estado para el mensajito verde

  // 1. CREAMOS LA FUNCIÓN ACÁ (fuera del useEffect para poder reutilizarla)
  const cargarDatos = () => {
    fetch('http://localhost:8081/api/presupuesto')
      .then(res => res.json())
      .then(data => {
        const ing = data.filter(item => item.tipo === 'INGRESO');
        const gas = data.filter(item => item.tipo === 'GASTO');
        const inv = data.filter(item => item.tipo === 'INVERSION');

        if (ing.length > 0) setIngresos(ing);
        if (gas.length > 0) setGastos(gas);
        if (inv.length > 0) setInversiones(inv);
      })
      .catch(error => console.error("Error al cargar presupuesto:", error));
  };

  // 2. EL USE EFFECT AHORA SOLO LLAMA A LA FUNCIÓN (se ejecuta al abrir la página)
  useEffect(() => {
    cargarDatos();
  }, []);

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
  
  const saldoNeto = totalIngresos - totalGastos - totalInversiones;
  
  let colorSaldo = 'black';
  if (saldoNeto > 0) colorSaldo = '#2a9d8f';
  else if (saldoNeto < 0) colorSaldo = '#e63946';

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
      id: Date.now(), 
      nombre: '', 
      moneda: monedaDefault, 
      montoOriginal: '', 
      cotizacion: monedaDefault === 'ARS' ? 1 : '' 
    }]);
  };

  const eliminarFila = (id, lista, setLista) => {
    setLista(lista.filter(item => item.id !== id));
  };

  const guardarPresupuesto = () => {
    setGuardando(true);

    const prepararDatos = (lista, tipoAsignado) => {
      return lista
        .filter(item => item.nombre.trim() !== '')
        .map(item => {
          const { id, ...resto } = item; 
          return { ...resto, tipo: tipoAsignado };
        });
    };

    const ingresosListos = prepararDatos(ingresos, 'INGRESO');
    const gastosListos = prepararDatos(gastos, 'GASTO');
    const inversionesListos = prepararDatos(inversiones, 'INVERSION');

    const presupuestoCompleto = [...ingresosListos, ...gastosListos, ...inversionesListos];

    fetch('http://localhost:8081/api/presupuesto/guardar-todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(presupuestoCompleto)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("El servidor falló al guardar los datos.");
      }
      
      // 3. LA MAGIA AL GUARDAR:
      setGuardando(false);
      setExito(true);
      setTimeout(() => setExito(false), 3000); // El botón vuelve a la normalidad en 3 segs
      
      cargarDatos(); // <-- Llamamos de nuevo a la base de datos de forma invisible (sin recargar la página)
    })
    .catch(error => {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar. No se recargará la página para que no pierdas lo escrito.");
      setGuardando(false);
    });
  };

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

      <div style={{ marginTop: '15px', borderTop: '2px solid black', paddingTop: '10px', textAlign: 'right' }}>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Total: ${total.toLocaleString('es-AR')}</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: 0 }}>Planificación Mensual 📝</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {renderBloque("Ingresos", ingresos, setIngresos, totalIngresos, "ej: Freelance IT", "ARS")}
        {renderBloque("Gastos", gastos, setGastos, totalGastos, "ej: Entradas Wabi, Dermaglós", "ARS")}
        {renderBloque("Inversiones", inversiones, setInversiones, totalInversiones, "ej: DCA IVV, ON Pampa", "USD")}
      </div>

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

      {/* 4. EL BOTÓN AHORA USA EL ESTADO "exito" PARA MOSTRAR EL MENSAJE */}
      <button 
        className="boton-sketch" 
        style={{ alignSelf: 'center', padding: '15px 40px', fontSize: '1.3rem' }}
        onClick={guardarPresupuesto}
        disabled={guardando || exito}
      >
        {guardando ? 'GUARDANDO...' : exito ? '¡PRESUPUESTO GUARDADO!' : 'GUARDAR PRESUPUESTO'}
      </button>

    </div>
  )
}