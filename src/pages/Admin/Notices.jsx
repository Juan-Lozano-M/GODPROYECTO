import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Search from "../../components/admin/Search";
import DataStat from "../../components/admin/DataStat";
import Sidebar from "../../components/Sidebar";
import CartoonButton from "../../components/buttons/CartoonButton";
import FilterButton from "../../components/admin/FilterButton"; // Asegúrate de tener este componente
import filtroTestimonial from "../../assets/icons/filtroTestimonial.png"; // Asegúrate de tener este icono
import NoticeCard from "../../components/NoticeCard";

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
        <div className="flex flex-col gap-6 w-[80%]">
          <NoticeCard/>
          <NoticeCard/>
          <NoticeCard/>
        </div>
        <div className="hidden lg:flex flex-col gap-6 w-[45%]">
        <div className="h-[300px] w-full flex flex-col gap-5 bg-black/7 overflow-hidden rounded-lg">
          <img 
            src={imageNotice} 
            alt="Imagen de noticia" 
            className="w-full h-full object-contain" 
          />
        </div>
          <div className="h-[30%] w-full flex justify-center items-center gap-4 bg-black/7 font-adlam rounded-lg">
              <h1 className="text-5xl"> 10 </h1>
              <h1 className="text-3xl"> Noticias publicadas hoy </h1>
          </div>
        </div>
      </section>

      <Sidebar />
    </div>
  );
}

export default Notices;
