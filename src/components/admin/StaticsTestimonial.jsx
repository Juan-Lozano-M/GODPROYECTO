import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
} from "recharts";

// Tooltip personalizado
const StaticsTestimonial = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-lime-400 text-black px-3 py-1 rounded-full font-semibold text-sm">
        {payload[0].value}
      </div>
    );
  }
  return null;
};

// Componente de gráfica reutilizable
const StatisticChart = ({ 
  title, 
  data, 
  currentLabel = "Este mes", 
  previousLabel = "Mes pasado",
  color = "#90ff7e",
  highlightPoint = null // { x: "Abr", y: 550 }
}) => {
  const gradientId = `gradiente-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          {/* Definición del gradiente */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            payload={[
              {
                value: currentLabel,
                type: "circle",
                color: color,
              },
              {
                value: previousLabel,
                type: "line",
                color: "#000",
              },
            ]}
          />
          
          {/* Área con degradado para datos actuales */}
          <Area
            type="monotone"
            dataKey="esteMes"
            stroke={color}
            strokeWidth={3}
            fill={`url(#${gradientId})`}
            dot={{ r: 5, stroke: color, strokeWidth: 2, fill: "#fff" }}
          />
          
          {/* Línea punteada para datos anteriores */}
          <Area
            type="monotone"
            dataKey="mesPasado"
            stroke="#000"
            strokeDasharray="5 5"
            strokeWidth={2}
            fill="none"
            dot={false}
          />
          
          {/* Punto destacado opcional */}
          {highlightPoint && (
            <>
              <ReferenceDot 
                x={highlightPoint.x} 
                y={highlightPoint.y} 
                r={6} 
                fill={color} 
                stroke="#000" 
              />
              <ReferenceLine 
                x={highlightPoint.x} 
                stroke="#aaa" 
                strokeDasharray="3 3" 
              />
            </>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaticsTestimonial;