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

// Datos de ejemplo para visualizaciones
const visualizacionesData = [
  { mes: "Ene", esteMes: 100, mesPasado: 80 },
  { mes: "Feb", esteMes: 200, mesPasado: 150 },
  { mes: "Mar", esteMes: 350, mesPasado: 200 },
  { mes: "Abr", esteMes: 250, mesPasado: 280 },
  { mes: "May", esteMes: 450, mesPasado: 320 },
  { mes: "Jun", esteMes: 550, mesPasado: 180 },
  { mes: "Jul", esteMes: 300, mesPasado: 400 },
  { mes: "Ago", esteMes: 400, mesPasado: 350 },
  { mes: "Sep", esteMes: 500, mesPasado: 450 },
];

// Tooltip personalizado
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-lime-400 text-black px-3 py-1 rounded-full font-semibold text-sm">
        {payload[0].value}
      </div>
    );
  }
  return null;
};

// Componente personalizado para la leyenda
const CustomLegend = ({ payload }) => {
  return (
    <div className="flex justify-center space-x-6 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div 
            className={`w-3 h-3 mr-2 ${entry.type === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-700">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const StaticsViews = ({ 
  title = "Visualizaciones por mes",
  data = visualizacionesData,
  highlightPoint = { mes: "Jun", valor: 550 },
  color = "#B4EF45", // Color por defecto
}) => {
  const gradientId = `gradiente-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg 2xl:w-180">
      <h2 className="text-xl font-bold mb-4"></h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          {/* Definición del gradiente */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          {/* Grid de fondo */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          
          {/* Ejes */}
          <XAxis dataKey="mes" />
          <YAxis />
          
          {/* Tooltip personalizado */}
          <Tooltip content={<CustomTooltip />} />
          
          {/* Leyenda personalizada */}
          <Legend 
            content={<CustomLegend />}
            payload={[
              {
                value: "Este mes",
                type: "circle",
                color: color,
              },
              {
                value: "Mes pasado",
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
                x={highlightPoint.mes}
                y={highlightPoint.valor}
                r={6}
                fill={color}
                stroke="#000"
              />
              <ReferenceLine
                x={highlightPoint.mes}
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

export default StaticsViews;