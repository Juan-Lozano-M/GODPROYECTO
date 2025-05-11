import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
      summary: "Una iniciativa para fortalecer ideas de negocio...",
    },
    {
      id: 2,
      status: "Eliminadas",
      image: imageNotice2,
      title: "Reunión de líderes estudiantiles",
      author: "Carlos Peña",
      date: "24/04/2025",
      summary: "Discusión sobre nuevas propuestas académicas...",
    },
    {
      id: 3,
      status: "Archivadas",
      image: imageNotice3,
      title: "Feria de ciencias 2025",
      author: "Laura Rodríguez",
      date: "23/04/2025",
      summary: "Estudiantes presentan proyectos científicos...",
    },
    {
      id: 4,
      status: "Publicadas",
      image: imageNotice4,
      title: "Campaña de reciclaje en el campus",
      author: "Ana Torres",
      date: "22/04/2025",
      summary: "Promoviendo la conciencia ambiental...",
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
    <div className="h-full m-7 sm:mt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15">
      <div className="flex w-full items-center">
        <Search />
      </div>

      <h1 className="text-3xl md:text-4xl xl:text-5xl font-adlam mt-5">NOTICIAS</h1>

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
          <p className="text-lg sm:text-3xl lg:text-2xl xl:text-4xl font-adlam">Últimas noticias</p>
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

      {/* Lista de noticias y panel derecho */}
      <section className="w-full h-[calc(100vh-180px)] mt-5 flex gap-15 overflow-hidden">
        {/* Scroll solo aquí */}
        <div className="flex flex-col gap-6 w-[60%] h-full overflow-y-auto pr-3">
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

        {/* Panel fijo */}
        <div className="hidden lg:flex flex-col gap-6 w-[45%]">
          <div className="hidden xl:flex flex-col sticky top-28 h-[300px] w-full justify-center items-center gap-5 bg-black/7 overflow-hidden rounded-lg">
            <img src={imageNotice} alt="Imagen de noticia" className="w-75 object-cover rounded-lg" />
          </div>
          <div className="hidden xl:flex sticky top-[350px] h-[30%] w-full justify-center items-center 2xl:gap-4 bg-black/7 font-adlam rounded-lg">
            <h1 className="text-3xl 2xl:text-5xl">10</h1>
            <h1 className="text-2xl 2xl:text-4xl">Noticias publicadas hoy</h1>
          </div>
        </div>
      </section>

      <Sidebar />
    </div>
  );
}

export default Notices;
