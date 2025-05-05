import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Search from "../../components/admin/Search";
import DataStat from "../../components/admin/DataStat";
import Sidebar from "../../components/Sidebar";
import CartoonButton from "../../components/buttons/CartoonButton";
import FilterButton from "../../components/admin/FilterButton"; // Asegúrate de tener este componente
import filtroTestimonial from "../../assets/icons/filtroTestimonial.png"; // Asegúrate de tener este icono
import TestimonialCard from "../../components/TestimonialCard";
import StatCard from "../../components/StatCard";

import imageNotice from "../../assets/images/imagenNotice.png";
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";

function Notices() {
  // Estado de noticias simuladas
  const [noticias, setNoticias] = useState([
    { id: 1, status: "Publicadas" },
    { id: 2, status: "Eliminadas" },
    { id: 3, status: "Archivadas" },
  ]);

  // Filtros
  const filters = ["Publicadas", "Eliminadas", "Archivadas"];
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isFiltroModalOpen, setIsFiltroModalOpen] = useState(false);

  const countByStatus = (status) =>
    noticias.filter((n) => n.status === status).length;

  const totalAprobados = countByStatus("Aprobado");
  const totalAnulados = countByStatus("Anulado");
  const totalEnEspera = countByStatus("En espera");

  const prevCounts = useRef({
    Aprobado: totalAprobados,
    Anulado: totalAnulados,
    "En espera": totalEnEspera,
  });

  const [cambios, setCambios] = useState({
    Aprobado: 0,
    Anulado: 0,
    "En espera": 0,
  });

  useEffect(() => {
    setCambios({
      Aprobado: totalAprobados - prevCounts.current.Aprobado,
      Anulado: totalAnulados - prevCounts.current.Anulado,
      "En espera": totalEnEspera - prevCounts.current["En espera"],
    });

    prevCounts.current = {
      Aprobado: totalAprobados,
      Anulado: totalAnulados,
      "En espera": totalEnEspera,
    };
  }, [noticias]);

  const getIcon = (cambio) =>
    cambio >= 0 ? flechaTestimonialArriba : flechaTestimonialAbajo;

  return (
    <div className="h-full m-7 sm:mt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15">
      <div className="flex w-full items-center">
        <Search />
      </div>

      <div>
        <h1 className=" text-3xl md:text-4xl xl:text-5xl font-adlam"> NOTICIAS </h1>
      </div>

      <div className="flex flex-wrap sm:flex-row mt-6 gap-5 sm:gap-10 lg:gap-20 h-auto">
        <DataStat
          value={totalAprobados}
          indicator={cambios.Aprobado}
          label="Publicadas"
          iconSrc={getIcon(cambios.Aprobado)}
          bgColor="#9CE840"
        />
        <DataStat
          value={totalAnulados}
          indicator={cambios.Anulado}
          label="Eliminadas"
          iconSrc={getIcon(cambios.Anulado)}
          bgColor="#EA4335"
        />
        <DataStat
          value={totalEnEspera}
          indicator={cambios["En espera"]}
          label="Archivadas"
          iconSrc={getIcon(cambios["En espera"])}
          bgColor="#FFBE00"
        />
      </div>

      {/* Sección de agregar noticia */}
      <div className="mt-10 w-full gap-2 lg:w-190">
        <Link to={"/home/newscreate"}>
          <CartoonButton />
        </Link>
      </div>

      {/* Filtros de testimonios */}
      <div className="flex items-center justify-between mt-5 md:mt-10 py-2 w-full h-auto">
        <div className="flex items-center gap-4 sm:gap-7 xl:gap-10">
          <p className="text-lg sm:text-3xl lg:text-2xl xl:text-4xl font-adlam"> Ultimas noticias </p>
          <div className="h-7 w-0.5 sm:h-10 sm:w-0.5 bg-gray-300"></div>

          <div className="flex items-center gap-4">
            {/* Desktop */}
            <div className="hidden lg:flex gap-4">
              <FilterButton
                label="Todas"
                isActive={activeFilter === "Todas"}
                onClick={() => setActiveFilter("Todas")}
              />
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden gap-4">
              <FilterButton
                label="Filtro"
                isActive={false}
                onClick={() => setIsFiltroModalOpen(true)}
                iconSrc={filtroTestimonial}
              />
              <FilterButton
                label="Todas"
                isActive={activeFilter === "Todas"}
                onClick={() => setActiveFilter("Todas")}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Seccion de noticias */}
      <section className="w-full h-auto mt-5 flex gap-15">  
        <div className="flex flex-col gap-3 w-[65%]">
          <TestimonialCard/>
        </div>
        <div className="h-auto w-[35%] flex flex-col gap-5">
          <img src={imageNotice} className="rounded-xl hidden xl:block" alt="Imagen de Noticia" />
          <div className="rounded-lg w-full h-24 mt-10 sm:mt-15 xl:mt-0 flex items-center justify-center bg-black/7">
            <h1 className="text-[18px] sm:text-3xl xl:text-[33px] 2xl:text-[40px] font-black mt-3 xl:mt-5 2xl:mt-3"></h1>
            <h1 className="text-[13px] sm:text-lg xl:text-[17px] mx-2 font-black flex 2xl:mx-11 mb-3 xl:mb-4"></h1>
          </div>
        </div>
      </section>

      <Sidebar />
    </div>
  );
}

export default Notices;
