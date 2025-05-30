import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Datos de ejemplo para noticias más vistas por país
const noticiasData = [
  { pais: "United States", valor: 52.1, color: "#1f2937" },
  { pais: "Canada", valor: 22.8, color: "#60a5fa" },
  { pais: "Mexico", valor: 15.9, color: "#10b981" },
  { pais: "Other", valor: 11.2, color: "#e5e7eb" },
];

// Componente personalizado para la leyenda
const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-col space-y-2 ml-8">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between w-48">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-3"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">{entry.value}</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {entry.payload.valor}%
          </span>
        </div>
      ))}
    </div>
  );
};

const StaticsNotice = ({ 
  data = noticiasData 
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="valor"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              content={<CustomLegend />}
              verticalAlign="middle"
              align="right"
              layout="vertical"
              wrapperStyle={{
                paddingLeft: "20px",
                lineHeight: "24px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StaticsNotice;