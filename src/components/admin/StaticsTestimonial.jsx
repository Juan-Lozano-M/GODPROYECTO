import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Datos de ejemplo para testimonios por plataforma
const testimoniosData = [
  { mes: "Enero", valor: 18, color: "#9F9FF8" },
  { mes: "Febrero", valor: 28, color: "#96E2D6" },
  { mes: "Marzo", valor: 22, color: "#000000" },
  { mes: "Abril", valor: 32, color: "#92BFFF" },
  { mes: "Mayo", valor: 15, color: "#AEC7ED" },
  { mes: "Junio", valor: 25, color: "#B9FF65" },
];

const StaticsTestimonial = ({ 
  data = testimoniosData 
}) => {
  return (
    <div className="w-130">
      <div className="bg-gray-100 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={250}>
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
              dataKey="mes" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#bdbdbd' }}
            />
            <Bar 
              dataKey="valor" 
              radius={[4, 4, 0, 0]}
              barSize={24}
              fill={(entry) => entry.color}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StaticsTestimonial;