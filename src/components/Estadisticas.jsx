import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { name: 'Ene', aprobados: 30, total: 50 },
    { name: 'Feb', aprobados: 35, total: 50 },
    { name: 'Mar', aprobados: 28, total: 50 },
    { name: 'Abr', aprobados: 38, total: 50 },
    { name: 'May', aprobados: 32, total: 50 },
    { name: 'Jun', aprobados: 36, total: 50 },
  ];
  
  export default function Estadisticas() {
    return (
      <div className="bg-black/3 p-6 rounded-2xl shadow-md w-full max-w-xl">

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <CartesianGrid 
                vertical={false} 
                stroke="#EFEFEF" // <- color personalizado
                />
              <XAxis
                dataKey="name"
                tick={{ fill: "#888", dy: 10 }}
                axisLine={{ stroke: "#D3D3D3", strokeWidth: 1 }}  // color y grosor
                tickLine={false}
                />
              <YAxis
                tick={{ fill: "#888", dx: -28 }}  // color de los números
                axisLine={false}         // oculta la línea vertical
                tickLine={false}       // oculta las rayitas pequeñas de cada tick
                />
              <Tooltip />
             
              <Bar dataKey="aprobados" fill="#9CE840" barSize={20} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  