import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import Search from "../../components/admin/Search";
import DataStat from "../../components/admin/DataStat";
import Sidebar from "../../components/Sidebar";
import CartoonButton from "../../components/buttons/CartoonButton";
import FilterButton from "../../components/admin/FilterButton";

import filtroTestimonial from "../../assets/icons/filtroTestimonial.png";
import imageNotice from "../../assets/images/imagenNotice.png";
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";
import NoticeCard from "../../components/NoticeCard";
import imageNotice1 from "../../assets/images/imageNotice1.png";
import imageNotice2 from "../../assets/images/imageNotice2.png";
import imageNotice3 from "../../assets/images/imageNotice3.png";
import imageNotice4 from "../../assets/images/imageNotice4.png";

function Notices() {
  const [noticias, setNoticias] = useState([
    {
      id: 1,
      status: "Publicadas",
      image: imageNotice1,
      title: "Semana del emprendimiento 2025",
      author: "Gloria Valero",
      date: "25/04/2025",
      summary: "Un evento pensado para motivar a los estudiantes a crear sus propios negocios, con charlas, talleres y actividades dinámicas.",
    },
    {
      id: 2,
      status: "Eliminadas",
      image: imageNotice2,
      title: "Reunión de líderes estudiantiles",
      author: "Carlos Peña",
      date: "24/04/2025",
      summary: "Espacio donde se discutieron nuevas ideas y propuestas para mejorar la vida académica y la convivencia escolar.",
    },
    {
      id: 3,
      status: "Archivadas",
      image: imageNotice3,
      title: "Feria de ciencias 2025",
      author: "Laura Rodríguez",
      date: "23/04/2025",
      summary: "Los estudiantes presentaron sus proyectos científicos con gran creatividad, abordando temas de medio ambiente y tecnología.",
    },
    {
      id: 4,
      status: "Publicadas",
      image: imageNotice4,
      title: "Campaña de reciclaje en el campus",
      author: "Ana Torres",
      date: "22/04/2025",
      summary: "Se promovieron hábitos sostenibles mediante actividades de reciclaje y educación ambiental para toda la comunidad escolar.",
    },
  ]);

  const filters = ["Publicadas", "Eliminadas", "Archivadas"];
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [isFiltroModalOpen, setIsFiltroModalOpen] = useState(false);

  const countByStatus = (status) => noticias.filter((n) => n.status === status).length;

  const totalPublicadas = countByStatus("Publicadas");
  const totalEliminadas = countByStatus("Eliminadas");
  const totalArchivadas = countByStatus("Archivadas");

  const prevCounts = useRef({
    Publicadas: totalPublicadas,
    Eliminadas: totalEliminadas,
    Archivadas: totalArchivadas,
  });

  const [cambios, setCambios] = useState({
    Publicadas: 0,
    Eliminadas: 0,
    Archivadas: 0,
  });

  useEffect(() => {
    setCambios({
      Publicadas: totalPublicadas - prevCounts.current.Publicadas,
      Eliminadas: totalEliminadas - prevCounts.current.Eliminadas,
      Archivadas: totalArchivadas - prevCounts.current.Archivadas,
    });

    prevCounts.current = {
      Publicadas: totalPublicadas,
      Eliminadas: totalEliminadas,
      Archivadas: totalArchivadas,
    };
  }, [noticias]);

  const getIcon = (cambio) => (cambio >= 0 ? flechaTestimonialArriba : flechaTestimonialAbajo);

  const noticiasFiltradas =
    activeFilter === "Todas" ? noticias : noticias.filter((n) => n.status === activeFilter);

  return (
    <div className="h-screen flex flex-col overflow-hidden lg:ml-50 md:mr-10 lg:mr-15 pt-10">
      {/* Sección superior - Estática */}
      <div className="flex-none mb-2">
        <div className="flex w-full items-center">
          <Search />
        </div>

        <h1 className="text-3xl md:text-4xl lg:mt-5 lg:text-5xl font-adlam">NOTICIAS</h1>

        <div className="flex flex-wrap mt-6 gap-5 sm:gap-10 lg:gap-20 h-auto">
          <DataStat
            value={totalPublicadas}
            indicator={cambios.Publicadas}
            label="Publicadas"
            iconSrc={getIcon(cambios.Publicadas)}
            bgColor="#9CE840"
          />
          <DataStat
            value={totalEliminadas}
            indicator={cambios.Eliminadas}
            label="Eliminadas"
            iconSrc={getIcon(cambios.Eliminadas)}
            bgColor="#EA4335"
          />
          <DataStat
            value={totalArchivadas}
            indicator={cambios.Archivadas}
            label="Archivadas"
            iconSrc={getIcon(cambios.Archivadas)}
            bgColor="#FFBE00"
          />
        </div>

        <div className="mt-10 w-full lg:w-190">
          <Link to="/home/newscreate">
            <CartoonButton />
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex items-center justify-between mt-5 md:mt-10 py-2 w-full">
          <div className="flex items-center gap-4 sm:gap-7 xl:gap-10">
            <p className="text-lg sm:text-3xl lg:text-3xl xl:text-4xl font-adlam">Últimas noticias</p>
            <div className="h-7 w-0.5 sm:h-10 bg-gray-300"></div>

            <div className="flex items-center gap-4">
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
      </div>

      {/* Sección de contenido - Con scroll en la lista de noticias */}
      <div className="flex-grow flex gap-8 mt-5 overflow-hidden">
        {/* Lista de noticias - Con scroll */}
        <div className="w-full 2xl:w-[60%] overflow-y-auto pr-4 pb-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="flex flex-col gap-6">
            {noticiasFiltradas.map((noticia) => (
              <NoticeCard
                key={noticia.id}
                image={noticia.image}
                title={noticia.title}
                author={noticia.author}
                date={noticia.date}
                summary={noticia.summary}
                status={noticia.status.slice(0, -1)}
              />
            ))}
          </div>
        </div>

        {/* Panel lateral derecho - Con ancho y alto fijos */}
        <div className="hidden xl:flex flex-col gap-8 w-80 h-auto flex-shrink-0">
          {/* Primer contenedor con alto y ancho fijo */}
          <div className="hidden xl:flex flex-col justify-center items-center gap-5 bg-black/5 overflow-hidden rounded-lg p-4 w-full h-68">
            <img src={imageNotice} className="w-full h-full object-cover" alt="Imagen de noticia" />
          </div>
          
          {/* Segundo contenedor con alto y ancho fijo */}
          <div className="hidden 2xl:flex h-20 w-full justify-center items-center 2xl:gap-4 bg-black/5 font-adlam rounded-lg p-4">
            <h1 className="text-3xl xl:text-lg 2xl:text-5xl">10</h1>
            <h1 className="text-2xl xl:text-lg 2xl:text-4xl">Noticias publicadas hoy</h1>
          </div>
        </div>
      </div>

      <Sidebar />
    </div>
  );
}

export default Notices;