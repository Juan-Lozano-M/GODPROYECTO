import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import DataStat from "../../components/admin/DataStat";
import FilterButton from "../../components/admin/FilterButton";
import FiltroModal from "../../components/admin/FiltroModal";
import CartoonButton from "../../components/buttons/CartoonButton";
import NoticeCard from "../../components/NoticeCard";
import Sidebar from "../../components/Sidebar";

import filtroTestimonial from "../../assets/icons/filtroTestimonial.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import iconNotResult from "../../assets/icons/iconNotResult.png";

function Notices() {  
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = ["Publicada", "Eliminada", "Archivada"];
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [isFiltroModalOpen, setIsFiltroModalOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/news/get-all-admin")
      .then((response) => {
        if (response.data.status === "success") {
          setNoticias(response.data.news);
        } else {
          setNoticias([]);
        }
      })
      .catch(() => setNoticias([]))
      .finally(() => setLoading(false));
  }, []);

  const countByStatus = (status) => noticias.filter((n) => n.es_publicada === status).length;
  const totalPublicadas = countByStatus("publicada");
  const totalEliminadas = countByStatus("eliminada");
  const totalArchivadas = countByStatus("archivada");

  const prevCounts = useRef({
    Publicada: totalPublicadas,
    Eliminada: totalEliminadas,
    Archivada: totalArchivadas,
  });

  const [cambios, setCambios] = useState({
    Publicada: 0,
    Eliminada: 0,
    Archivada: 0,
  });

  useEffect(() => {
    setCambios({
      Publicada: totalPublicadas - prevCounts.current.Publicada,
      Eliminada: totalEliminadas - prevCounts.current.Eliminada,
      Archivada: totalArchivadas - prevCounts.current.Archivada,
    });
    prevCounts.current = {
      Publicada: totalPublicadas,
      Eliminada: totalEliminadas,
      Archivada: totalArchivadas,
    };
  }, [noticias]);

  // Reinicia los indicadores a 0 después de 5 segundos
  useEffect(() => {
    if (
      cambios.Publicada !== 0 ||
      cambios.Eliminada !== 0 ||
      cambios.Archivada !== 0
    ) {
      const timeout = setTimeout(() => {
        setCambios({ Publicada: 0, Eliminada: 0, Archivada: 0 });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [cambios]);

  const getIcon = (cambio) =>
    cambio >= 0 ? flechaTestimonialArriba : flechaTestimonialAbajo;

  // Filtrado según activeFilter; "Todas" muestra todo
  const noticiasFiltradas =
    activeFilter === "Todas"
      ? noticias
      : noticias.filter((n) => n.es_publicada === activeFilter.toLowerCase());

  // Cambiar estado de la noticia seleccionada
  const handleStatusChange = async (nuevoEstado) => {
    if (!selectedNoticeId) return;
    setLoading(true);
    try {
      console.log("Estado enviado:", nuevoEstado);
      await axios.patch(`http://localhost:5000/api/news/update-news/${selectedNoticeId}`, {
        es_publicada: nuevoEstado,
      });
      setNoticias((prev) =>
        prev.map((n) =>
          n.id_noticia === selectedNoticeId ? { ...n, es_publicada: nuevoEstado } : n
        )
      );
      setSelectedNoticeId(null);
    } catch (err) {
      alert('Error al actualizar el estado de la noticia.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => handleStatusChange('eliminada');
  const handlePublish = () => handleStatusChange('publicada');
  const handleArchive = () => handleStatusChange('archivada');

  return (
    <div className="h-screen flex flex-col overflow-hidden px-6 md:p-0 md:pt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15 pt-10">
      {/* Header con buscador y estadísticas */}
      <div className="flex-none mb-2">
        <div className="flex w-full items-center">
       
        </div>
        <h1 className="mt-6 2xl:mt-0 text-3xl md:mt-5 md:text-4xl lg:text-5xl xl:mt-1 xl:text-[42px] 2xl:text-5xl font-adlam">
          NOTICIAS
        </h1>
        <div className="flex flex-wrap mt-4 sm:mt-6 gap-5 sm:gap-10 lg:gap-20 xl:mt-4 xl:gap-12 2xl:gap-20 h-auto">
          <DataStat
            value={totalPublicadas}
            indicator={cambios.Publicada}
            label="Publicadas"
            iconSrc={getIcon(cambios.Publicada)}
            bgColor="#9CE840"
          />
          <DataStat
            value={totalEliminadas}
            indicator={cambios.Eliminada}
            label="Eliminadas"
            iconSrc={getIcon(cambios.Eliminada)}
            bgColor="#EA4335"
          />
          <DataStat
            value={totalArchivadas}
            indicator={cambios.Archivada}
            label="Archivadas"
            iconSrc={getIcon(cambios.Archivada)}
            bgColor="#FFBE00"
          />
        </div>
        {/* Botón de creación */}
        <div className="mt-10 xl:mt-8 2xl:mt-10 w-full lg:w-200 xl:w-160 2xl:w-200">
          <Link to="/home/newscreate">
            <CartoonButton />
          </Link>
        </div>
        {/* Filtros */}
        <div className="flex items-center justify-between mt-5 md:mt-10 xl:mt-8 2xl:mt-10 py-2 w-full">
          <div className="flex items-center gap-4 sm:gap-7 xl:gap-8 2xl:gap-10">
            <p className="text-lg sm:text-3xl xl:text-3xl 2xl:text-4xl font-adlam">
              Últimas noticias
            </p>
            <div className="h-7 w-0.5 sm:h-10 xl:h-9 2xl:h-10 bg-gray-300"></div>
            <div className="flex items-center gap-4">
              {/* Filtros grandes: mostramos Todas + filtros */}
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
              {/* Filtros móviles: botón que abre modal con solo los filtros (sin "Todas") + botón "Todas" fuera */}
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
      {/* Acciones sobre la noticia seleccionada */}
      {selectedNoticeId && (
        <div className="flex gap-4 mt-4 mb-2">
          <button
            className="bg-[#EA4335] text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition"
            onClick={handleDelete}
            disabled={loading}
          >
            Eliminar
          </button>
          <button
            className="bg-[#9CE840] text-black px-4 py-2 rounded font-bold hover:bg-lime-500 transition"
            onClick={handlePublish}
            disabled={loading}
          >
            Publicar
          </button>
          <button
            className="bg-[#FFBE00] text-black px-4 py-2 rounded font-bold hover:bg-yellow-400 transition"
            onClick={handleArchive}
            disabled={loading}
          >
            Archivar
          </button>
        </div>
      )}
      {/* Lista de noticias y panel lateral */}
      <div className="flex-grow flex gap-8 sm:mt-5 xl:mt-4 2xl:mt-5 overflow-hidden">
        <div className="w-full 2xl:w-[90%] overflow-y-auto pr-4 pb-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="flex flex-col gap-6 xl:gap-4 2xl:gap-6">
            {loading ? (
              <div className="text-center py-20 text-gray-400">Cargando noticias...</div>
            ) : noticiasFiltradas.length > 0 ? (              noticiasFiltradas.map((noticia) => (
                <NoticeCard
                  key={noticia.id_noticia}
                  image={noticia.imagen_url}
                  title={noticia.titulo}
                  author={noticia.autor?.nombre || noticia.author || "Autor desconocido"}
                  date={noticia.fecha_creacion?.split("T")[0] || noticia.date}
                  summary={noticia.descripcion}
                  status={
                    noticia.es_publicada === "publicada"
                      ? "Publicada"
                      : noticia.es_publicada === "eliminada"
                      ? "Eliminada"
                      : noticia.es_publicada === "archivada"
                      ? "Archivada"
                      : ""
                  }
                  isSelected={selectedNoticeId === noticia.id_noticia}
                  onSelect={() => setSelectedNoticeId(noticia.id_noticia)}
                  slug={noticia.slug}
                  newsId={noticia.id_noticia}
                />
              ))
            ) : (
              <div className="flex flex-col items-center mt-20 text-center text-gray-400 gap-6">
                <img
                  src={iconNotResult}
                  className="w-32 sm:w-48 md:w-52"
                  alt="Sin resultados"
                />
                <h2 className="font-bold font-adlam text-2xl sm:text-4xl">
                  Oops,
                </h2>
                <p className="w-70 sm:w-90 text-gray-400 font-light text-lg sm:text-xl font-quicksand">
                  Parece que no hay noticias que coincidan con este filtro. Prueba con otra opción.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal de filtros para móviles */}
      {isFiltroModalOpen && (
        <FiltroModal
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={(filter) => {
            setActiveFilter(filter);
            setIsFiltroModalOpen(false);
          }}
          onClose={() => setIsFiltroModalOpen(false)}
        />
      )}
      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default Notices;
