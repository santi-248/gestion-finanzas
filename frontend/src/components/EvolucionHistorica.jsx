import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api/axiosConfig';

// Convertidor de número de mes a texto
const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Pasamos el registro que devuelve Java al formato que necesita el gráfico
const mapearRegistro = (registro) => ({
  id: registro.id,
  mes: mesesNombres[registro.mes - 1], // Restamos 1 porque los arrays empiezan en 0
  mesNumero: registro.mes,
  anio: registro.anio,
  total: registro.saldoTotal
});

// Ordenamos cronológicamente para que la línea no se cruce
const ordenarPorFecha = (datos) =>
  [...datos].sort((a, b) => (a.anio - b.anio) || (a.mesNumero - b.mesNumero));

export default function EvolucionHistorica() {
  const [datosHistoricos, setDatosHistoricos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estado del modal de alta
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [monto, setMonto] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  // GET /api/historico (el interceptor de axios agrega el JWT automáticamente)
  const cargarHistorico = () => {
    setCargando(true);
    api.get('/historico')
      .then(({ data }) => {
        setDatosHistoricos(ordenarPorFecha(data.map(mapearRegistro)));
      })
      .catch(error => console.error("Error al cargar histórico:", error))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarHistorico();
  }, []);

  const abrirModal = () => {
    setMes('');
    setAnio(new Date().getFullYear());
    setMonto('');
    setError('');
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    if (guardando) return;
    setModalAbierto(false);
  };

  const guardarRegistro = (e) => {
    e.preventDefault();
    setError('');

    const mesNumero = Number(mes);
    const montoNumerico = Number(monto);

    if (!mesNumero || !Number.isFinite(montoNumerico)) {
      setError('Completá el mes y un monto válido.');
      return;
    }

    setGuardando(true);

    // POST /api/historico con el Bearer token incluido por el interceptor
    api.post('/historico', {
      mes: mesNumero,
      anio: Number(anio),
      saldoTotal: montoNumerico
    })
      .then(({ data }) => {
        // Actualizamos el gráfico en el acto con el registro que devolvió el backend
        setDatosHistoricos(prev => ordenarPorFecha([...prev, mapearRegistro(data)]));
        setModalAbierto(false);
      })
      .catch(err => {
        console.error("Error al guardar el registro histórico:", err);
        setError('No se pudo guardar el registro. Intentá de nuevo.');
      })
      .finally(() => setGuardando(false));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
        <button
          type="button"
          className="boton-sketch"
          style={{ padding: '4px 15px', fontSize: '1rem' }}
          onClick={abrirModal}
        >
          + Agregar mes
        </button>
      </div>

      <div style={{ width: '100%', height: '300px' }}>
        {cargando ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Cargando histórico...</p>
        ) : datosHistoricos.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
            Todavía no hay datos. Agregá tu primer mes.
          </p>
        ) : (
          <ResponsiveContainer>
            <LineChart data={datosHistoricos} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

              <XAxis 
                dataKey="mes" 
                tick={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', fill: 'black' }} 
              />
              <YAxis 
                tick={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', fill: 'black' }}
                tickFormatter={(value) => `$${value / 1000}k`} 
              />

              <Tooltip 
                contentStyle={{ 
                  fontFamily: '"Patrick Hand SC", cursive', 
                  border: '2px solid black',
                  borderRadius: '10px',
                  backgroundColor: '#f9f9f9',
                  fontSize: '1.2rem'
                }}
                itemStyle={{ color: 'black' }}
                labelStyle={{ color: 'black' }}
                labelFormatter={(label, payload) => {
                  const anioRegistro = payload?.[0]?.payload?.anio;
                  return anioRegistro ? `${label} ${anioRegistro}` : label;
                }}
                formatter={(value) => [`$${Number(value).toLocaleString('es-AR')}`, 'Saldo']}
              />

              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#000" 
                strokeWidth={3} 
                dot={{ stroke: '#000', strokeWidth: 2, r: 5, fill: '#fff' }} 
                activeDot={{ r: 8, fill: '#000' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {modalAbierto && (
        <div
          onClick={cerrarModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            className="caja-sketch"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#f9f9f9', width: 'min(420px, 90vw)' }}
          >
            <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Agregar mes al histórico</h2>

            <form onSubmit={guardarRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '1.1rem' }}>
                Mes
                <select
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  required
                  style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
                >
                  <option value="">Elegí un mes</option>
                  {mesesNombres.map((nombre, index) => (
                    <option key={nombre} value={index + 1}>{nombre}</option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '1.1rem' }}>
                Año
                <input
                  type="number"
                  value={anio}
                  onChange={(e) => setAnio(e.target.value)}
                  min="2000"
                  max="2100"
                  required
                  style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '1.1rem' }}>
                Monto
                <input
                  type="number"
                  step="0.01"
                  placeholder="Ej: 1500000"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  required
                  style={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', padding: '5px 10px', border: '2px solid black', borderRadius: '4px', backgroundColor: 'transparent' }}
                />
              </label>

              {error && (
                <p style={{ margin: 0, color: '#e63946', fontSize: '1rem' }}>{error}</p>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '5px' }}>
                <button
                  type="button"
                  className="boton-sketch"
                  style={{ padding: '6px 20px', fontSize: '1.1rem' }}
                  onClick={cerrarModal}
                  disabled={guardando}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="boton-sketch"
                  style={{ padding: '6px 20px', fontSize: '1.1rem' }}
                  disabled={guardando}
                >
                  {guardando ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
