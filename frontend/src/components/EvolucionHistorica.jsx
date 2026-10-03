import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Usamos algunos datos de tu Excel como base de prueba
const datosHistoricos = [
  { mes: 'Ene', total: 31779 },
  { mes: 'Feb', total: 74943 },
  { mes: 'Mar', total: 14581 }, // Ese mes hubo salidas fuertes según el Excel
  { mes: 'Abr', total: 48596 },
  { mes: 'May', total: 80209 },
  { mes: 'Jun', total: 118019 }
];

export default function EvolucionHistorica() {
  return (
    <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
      <ResponsiveContainer>
        <LineChart data={datosHistoricos} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {/* Grilla punteada para que parezca hoja de carpeta */}
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          
          <XAxis 
            dataKey="mes" 
            tick={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', fill: 'black' }} 
          />
          <YAxis 
            tick={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem', fill: 'black' }}
            tickFormatter={(value) => `$${value / 1000}k`} // Formato corto (ej: $74k)
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
          
          {/* La línea rústica negra */}
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