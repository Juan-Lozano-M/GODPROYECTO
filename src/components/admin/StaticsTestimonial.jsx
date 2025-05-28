import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Datos de ejemplo para testimonios por plataforma
const testimoniosData = [
  { plataforma: "Linux", valor: 18, color: "#8b5cf6" },
  { plataforma: "Mac", valor: 28, color: "#10b981" },
  { plataforma: "iOS", valor: 22, color: "#1f2937" },
  { plataforma: "Windows", valor: 32, color: "#60a5fa" },
  { plataforma: "Android", valor: 15, color: "#3b82f6" },
  { plataforma: "Other", valor: 25, color: "#84cc16" },
];

const StaticsTestimonial = ({ 
  title = "Testimonios aprobados por mes",
  data = testimoniosData 
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="plataforma" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `${value}K`}
          />
          
          <Bar 
            dataKey="valor" 
            radius={[4, 4, 0, 0]}
            fill={(entry) => entry.color}
          >
            {data.map((entry, index) => (
              <Bar key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaticsTestimonial;