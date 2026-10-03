import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORES = ['#1a1a1a', '#4d4d4d', '#808080', '#b3b3b3', '#e6e6e6'];

export default function GraficoCuentas() {
  // Inicializamos el estado vacío
  const [datosCuentas, setDatosCuentas] = useState([]);

  // useEffect se ejecuta una sola vez cuando el componente se muestra en pantalla
  useEffect(() => {
    fetch('http://localhost:8081/api/cuentas')
      .then(response => response.json())
      .then(data => {
        // Mapeamos los datos de la base de datos (saldoActual) al formato que espera el gráfico (valor)
        const datosTransformados = data.map(cuenta => ({
          nombre: cuenta.nombre,
          valor: cuenta.saldoActual
        }));
        setDatosCuentas(datosTransformados);
      })
      .catch(error => console.error("Error al cargar las cuentas:", error));
  }, []);

  return (
    <div style={{ width: '100%', height: '350px' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={datosCuentas}
            innerRadius={80}
            outerRadius={120}
            paddingAngle={3}
            dataKey="valor"
            nameKey="nombre"
            stroke="#000"
            strokeWidth={2}
          >
            {datosCuentas.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
            ))}
          </Pie>
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
            formatter={(value) => `$${value.toLocaleString('es-AR')}`}
          />
          <Legend wrapperStyle={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}