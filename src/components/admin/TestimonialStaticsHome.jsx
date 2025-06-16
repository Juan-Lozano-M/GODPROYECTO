import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TestimonialStaticsHome() {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stats/testimonials')
      .then((res) => {
        if (res.data.success && res.data.data.trend) {
          // Renombrar claves para que Recharts las entienda: "aprobados" en vez de "count"
          const formatted = res.data.data.trend.map(item => ({
            name: item.month,
            aprobados: item.count
          }));
          setTrendData(formatted);
        } else {
          setTrendData([]);
        }
      })
      .catch((err) => {
        console.error("Error al obtener tendencia de testimonios:", err);
        setTrendData([]);
      });
  }, []);

  return (
    <div className="bg-black/3 p-6 rounded-2xl shadow-md w-full max-w-xl">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid vertical={false} stroke="#EFEFEF" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#888", dy: 10 }}
              axisLine={{ stroke: "#D3D3D3", strokeWidth: 1 }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 20]} // 👈 Rango fijo de 0 a 30
              ticks={[0, 5, 10, 15, 20]} // 👈 Puntos específicos en el eje Y
              tick={{ fill: "#888", dx: -28 }} // Estilo del texto
              axisLine={false}         // Oculta la línea vertical
              tickLine={false}         // Oculta las rayitas pequeñas de cada tick
            />
            <Tooltip />
            <Bar dataKey="aprobados" fill="#9CE840" barSize={20} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
