import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Convertidor de número de mes a texto
const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function EvolucionHistorica() {
  const [datosHistoricos, setDatosHistoricos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/historico')
      .then(res => res.json())
      .then(data => {
        // Mapeamos los datos de Java al formato que necesita el gráfico
        const datosTransformados = data.map(registro => ({
          mes: mesesNombres[registro.mes - 1], // Restamos 1 porque los arrays empiezan en 0
          total: registro.saldoTotal
        }));
        setDatosHistoricos(datosTransformados);
      })
      .catch(error => console.error("Error al cargar histórico:", error));
  }, []);

  return (
    <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
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
            formatter={(value) => `$${value.toLocaleString('es-AR')}`}
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
    </div>
  );
}