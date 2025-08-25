import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';
import axios from '../../config/axiosConfig';

export default function TestimonialStaticsHome() {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    axios.get('/api/stats/testimonials', {
      withCredentials: false  // No necesitamos credenciales para estadísticas públicas
    })
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
    <div className="bg-black/3 p-6 rounded-2xl shadow-md w-full">
      <div style={{ width: '100%', minHeight: '300px' }}> 
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={trendData}
            barCategoryGap={24}  // ajusta el espacio entre barras
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }} // mejor distribución
          >
            <CartesianGrid vertical={false} stroke="#EFEFEF" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#888", dy: 10 }}
              axisLine={{ stroke: "#D3D3D3", strokeWidth: 1 }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 30]}
              ticks={[0, 6, 12, 18, 24, 30]}
              tick={{ fill: "#888", dx: -28 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar dataKey="aprobados" fill="#9CE840" barSize={20} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
