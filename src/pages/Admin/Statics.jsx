import React from "react";
import Sidebar from "../../components/Sidebar";
import EstadisticasDashboard from "../../components/admin/EstadisticasDashboard";

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
          <h1 className="mt-0 text-3xl md:text-4xl xl:text-5xl font-adlam">
            ESTADISTICAS
          </h1>
        </div>

        <EstadisticasDashboard />

      </main>
    </div>
  );
}