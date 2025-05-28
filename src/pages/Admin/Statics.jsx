import React from "react";
import Sidebar from "../../components/Sidebar";
import StaticsTestimonial from "../../components/admin/StaticsTestimonial";
import Search from "../../components/admin/Search";

// Datos para cada estadística
const visualizacionesData = [
  { mes: "Ene", esteMes: 100, mesPasado: 150 },
  { mes: "Feb", esteMes: 200, mesPasado: 250 },
  { mes: "Mar", esteMes: 400, mesPasado: 350 },
  { mes: "Abr", esteMes: 550, mesPasado: 500 },
  { mes: "May", esteMes: 300, mesPasado: 600 },
  { mes: "Jun", esteMes: 450, mesPasado: 350 },
  { mes: "Jul", esteMes: 600, mesPasado: 700 },
];

const testimoniosData = [
  { mes: "Ene", esteMes: 25, mesPasado: 30 },
  { mes: "Feb", esteMes: 45, mesPasado: 35 },
  { mes: "Mar", esteMes: 60, mesPasado: 50 },
  { mes: "Abr", esteMes: 80, mesPasado: 65 },
  { mes: "May", esteMes: 95, mesPasado: 85 },
  { mes: "Jun", esteMes: 120, mesPasado: 100 },
  { mes: "Jul", esteMes: 140, mesPasado: 115 },
];

const noticiasData = [
  { mes: "Ene", esteMes: 15, mesPasado: 20 },
  { mes: "Feb", esteMes: 30, mesPasado: 25 },
  { mes: "Mar", esteMes: 45, mesPasado: 40 },
  { mes: "Abr", esteMes: 60, mesPasado: 55 },
  { mes: "May", esteMes: 75, mesPasado: 70 },
  { mes: "Jun", esteMes: 90, mesPasado: 80 },
  { mes: "Jul", esteMes: 105, mesPasado: 95 },
];

function Statics() {
  return (
    <div className="h-full m-7 sm:mt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15">
      <Sidebar />
      <main>

          {/* Barra de búsqueda */}
        <div className="flex w-full items-center">
          <Search />
        </div>

        {/* Título */}
        <div>
          <h1 className="mt-6 2xl:mt-0 text-3xl md:text-4xl xl:text-5xl font-adlam"> ESTADISTICAS </h1>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Gráfica de Visualizaciones */}
          <StaticsTestimonial
            title="Visualizaciones por mes"
            data={visualizacionesData}
            currentLabel="Este mes"
            previousLabel="Mes pasado"
            color="#90ff7e"
            highlightPoint={{ x: "Abr", y: 550 }}
          />
          
          {/* Gráfica de Testimonios */}
          <StaticsTestimonial
            title="Testimonios por mes"
            data={testimoniosData}
            currentLabel="Este mes"
            previousLabel="Mes pasado"
            color="#60a5fa" // Azul
            highlightPoint={{ x: "Jun", y: 120 }}
          />
          
          {/* Gráfica de Noticias */}
          <StaticsTestimonial
            title="Noticias publicadas por mes"
            data={noticiasData}
            currentLabel="Este mes"
            previousLabel="Mes pasado"
            color="#f97316" // Naranja
            highlightPoint={{ x: "Jul", y: 105 }}
          />
          
          {/* También puedes crear una vista en grid para 2 columnas */}
          {/* 
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StatisticChart
              title="Testimonios por mes"
              data={testimoniosData}
              color="#60a5fa"
            />
            <StatisticChart
              title="Noticias por mes"
              data={noticiasData}
              color="#f97316"
            />
          </div>
          */}
          
        </div>
      </main>
    </div>
  );
}

export default Statics;