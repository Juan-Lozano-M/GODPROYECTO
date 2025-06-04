import React from "react";

const stats = [
  {
    title: "Views",
    value: "7,265",
    percentage: "+11.01%",
    isPositive: true,
  },
  {
    title: "Visits", 
    value: "3,671",
    percentage: "-0.03%",
    isPositive: false,
  },
  {
    title: "New Users",
    value: "156", 
    percentage: "+15.03%",
    isPositive: true,
  },
  {
    title: "Active Users",
    value: "2,318",
    percentage: "+6.08%", 
    isPositive: true,
  },
];

export default function ButtonStatics() {
  return (
    <div className="w-full">
      {/* Contenedor principal con flexbox */}
      <div className="flex gap-10 2xl:gap-25 justify-center ">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-lime-400 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between w-full h-30"
          >
            {/* Título */}
            <div>
              <h3 className="text-black font-adlam text-[25px] opacity-80 ml-3">
                {stat.title}
              </h3>
            </div>
            
            {/* Valor principal */}
            <div className="flex gap-3 ml-3">
              <div>
                <p className="text-black text-xl font-adlam">
                  {stat.value}
                </p>
              </div>
              
              {/* Porcentaje con ícono */}
              <div className="flex items-center justify-center">
                <span className={`text-sm font-adlam flex items-center ${
                  stat.isPositive ? 'text-green-700' : 'text-red-600'
                }`}>
                  {stat.isPositive ? (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  {stat.percentage}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}