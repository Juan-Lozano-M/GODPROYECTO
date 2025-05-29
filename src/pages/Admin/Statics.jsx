import React from "react";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/admin/Search";
import StaticsViews from "../../components/admin/StaticsViews";
import StaticsTestimonial from "../../components/admin/StaticsTestimonial";
import StaticsNotice from "../../components/admin/StaticsNotice";
import ButtonStatics from "../../components/admin/ButtonStatics";

// Datos
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
  { plataforma: "Linux", valor: 18, color: "#8b5cf6" },
  { plataforma: "Mac", valor: 28, color: "#10b981" },
  { plataforma: "iOS", valor: 22, color: "#1f2937" },
  { plataforma: "Windows", valor: 32, color: "#60a5fa" },
  { plataforma: "Android", valor: 15, color: "#3b82f6" },
  { plataforma: "Other", valor: 25, color: "#84cc16" },
];

const noticiasData = [
  { pais: "United States", valor: 52.1, color: "#1f2937" },
  { pais: "Canada", valor: 22.8, color: "#60a5fa" },
  { pais: "Mexico", valor: 15.9, color: "#10b981" },
  { pais: "Other", valor: 11.2, color: "#e5e7eb" },
];

export default function Statics() {
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
          <h1 className="mt-6 2xl:mt-0 text-3xl md:text-4xl xl:text-5xl font-adlam">
            ESTADISTICAS
          </h1>
        </div>

        {/* Contenedor principal de estadísticas */}
        <div className="max-w-7xl mx-auto mt-10">

          {/* Contenedor para gráfica de Visualizaciones + Botones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-adlam text-3xl">Visualizaciones</h2>
              <StaticsViews
                title="Visualizaciones por mes"
                data={visualizacionesData}
                highlightPoint={{ mes: "Abr", valor: 550 }}
              />
            </div>
            <div>
              <ButtonStatics />
            </div>
          </div>

          {/* Grid para Testimonios y Noticias lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="mb-4 font-adlam text-3xl">Testimonios</h2>
              <StaticsTestimonial
                title="Testimonios aprobados por mes"
                data={testimoniosData}
              />
            </div>
            <div>
              <h2 className="mb-4 font-adlam text-3xl">Noticias</h2>
              <StaticsNotice
                title="Noticias más vistas"
                data={noticiasData}
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
