import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Datos de prueba simulando tus cuentas
const datosCuentas = [
  { nombre: 'Binance', valor: 250000 },
  { nombre: 'IOL', valor: 180000 },
  { nombre: 'Mercado Pago', valor: 108500 },
  { nombre: 'Naranja', valor: 3500 },
  { nombre: 'Efectivo', valor: 20000 }
];

// Paleta de grises/negros para mantener el estilo sketch
const COLORES = ['#1a1a1a', '#4d4d4d', '#808080', '#b3b3b3', '#e6e6e6'];

export default function GraficoCuentas() {
  return (
    <div style={{ width: '100%', height: '350px' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={datosCuentas}
            innerRadius={80} // Esto lo hace tipo "dona"
            outerRadius={120}
            paddingAngle={3}
            dataKey="valor"
            nameKey="nombre"
            stroke="#000" // Borde negro rústico
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
            itemStyle={{ color: 'black' }} /* Fuerza el valor numérico a negro */
            labelStyle={{ color: 'black' }} /* Fuerza el título a negro */
            formatter={(value) => `$${value.toLocaleString('es-AR')}`}
          />
          <Legend wrapperStyle={{ fontFamily: '"Patrick Hand SC", cursive', fontSize: '1.2rem' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}