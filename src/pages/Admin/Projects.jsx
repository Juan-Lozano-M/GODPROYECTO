import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AdminProfile from "../../components/admin/AdminProfile";
import DataStat from "../../components/admin/DataStat";
import FilterButton from "../../components/admin/FilterButton";
import FiltroModal from "../../components/admin/FiltroModal";
import CartoonButton from "../../components/buttons/CartoonButton";
import ProjectCard from "../../components/cards/CartoonCard"; // Necesitarás crear este componente
import Sidebar from "../../components/Sidebar";

import filtroTestimonial from "../../assets/icons/filtroTestimonial.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import iconNotResult from "../../assets/icons/iconNotResult.png";

function Projects() {  
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  // Cambia los filtros: solo 'En progreso' y 'Completado'
  const filters = ["En progreso", "Completado"];
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isFiltroModalOpen, setIsFiltroModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/projects/get-all-admin")
      .then((response) => {
        if (response.data.status === "success") {
          setProyectos(response.data.projects);
        } else {
          setProyectos([]);
        }
      })
      .catch(() => setProyectos([]))
      .finally(() => setLoading(false));
  }, []);

  // Cambia los contadores y lógica de estado
  const countByStatus = (status) => proyectos.filter((p) => p.estado === status).length;
  const totalEnProgreso = countByStatus("en progreso");
  const totalCompletados = countByStatus("completado");

  const prevCounts = useRef({
    "En progreso": totalEnProgreso,
    Completado: totalCompletados,
  });

  const [cambios, setCambios] = useState({
    "En progreso": 0,
    Completado: 0,
  });

  useEffect(() => {
    setCambios({
      "En progreso": totalEnProgreso - prevCounts.current["En progreso"],
      Completado: totalCompletados - prevCounts.current.Completado,
    });
    prevCounts.current = {
      "En progreso": totalEnProgreso,
      Completado: totalCompletados,
    };
  }, [proyectos]);

  // Reinicia los indicadores a 0 después de 5 segundos
  useEffect(() => {
    if (
      cambios["En progreso"] !== 0 ||
      cambios.Completado !== 0
    ) {
      const timeout = setTimeout(() => {
        setCambios({ "En progreso": 0, Completado: 0 });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [cambios]);

  const getIcon = (cambio) =>
    cambio >= 0 ? flechaTestimonialArriba : flechaTestimonialAbajo;

  // Filtrado según activeFilter; "Todos" muestra todo
  const proyectosFiltrados =
    activeFilter === "Todos"
      ? proyectos
      : proyectos.filter((p) =>
          activeFilter === "En progreso"
            ? p.estado === "en progreso"
            : p.estado === "completado"
        );

  // Cambiar estado del proyecto seleccionado
  const handleStatusChange = async (nuevoEstado) => {
    if (!selectedProjectId) return;
    setLoading(true);
    try {
      console.log("Estado enviado:", nuevoEstado);
      await axios.patch(`http://localhost:5000/api/projects/update-project/${selectedProjectId}`, {
        estado: nuevoEstado,
      });
      setProyectos((prev) =>
        prev.map((p) =>
          p.id_proyecto === selectedProjectId ? { ...p, estado: nuevoEstado } : p
        )
      );
      setSelectedProjectId(null);
    } catch (err) {
      alert('Error al actualizar el estado del proyecto.');
    } finally {
      setLoading(false);
    }
  };

  const handleInProgress = () => handleStatusChange('en progreso');
  const handleComplete = () => handleStatusChange('completado');

  return (
    <div className="h-screen flex flex-col overflow-hidden px-6 md:p-0 md:pt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15 pt-10">
      {/* Header con estadísticas */}
      <div className="flex-none mb-2">

      <div className="flex items-center justify-between mt-6 2xl:mt-0">
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-adlam">PROYECTOS</h1>
        <AdminProfile />
      </div>

        <div className="flex flex-wrap mt-4 sm:mt-6 gap-5 sm:gap-10 lg:gap-20 xl:mt-4 xl:gap-12 2xl:gap-20 h-auto">
          <DataStat
            value={totalEnProgreso}
            indicator={cambios["En progreso"]}
            label="En progreso"
            iconSrc={getIcon(cambios["En progreso"])}
            bgColor="#9CE840"
          />
          <DataStat
            value={totalCompletados}
            indicator={cambios.Completado}
            label="Completados"
            iconSrc={getIcon(cambios.Completado)}
            bgColor="#4285F4"
          />
        </div>
        {/* Botón de creación */}
        <div className="mt-10 xl:mt-8 2xl:mt-10 w-full lg:w-200 xl:w-160 2xl:w-200">
          <Link to="/home/projectcreate">
            <CartoonButton text="Crear proyecto" />
          </Link>
        </div>
        {/* Filtros */}
        <div className="flex items-center justify-between mt-5 md:mt-10 xl:mt-8 2xl:mt-10 py-2 w-full">
          <div className="flex items-center gap-4 sm:gap-7 xl:gap-8 2xl:gap-10">
            <p className="text-lg sm:text-3xl xl:text-3xl 2xl:text-4xl font-adlam">
              Últimos proyectos
            </p>
            <div className="h-7 w-0.5 sm:h-10 xl:h-9 2xl:h-10 bg-gray-300"></div>
            <div className="flex items-center gap-4">
              {/* Filtros grandes: mostramos Todos + filtros */}
              <div className="hidden lg:flex gap-4">
                <FilterButton
                  label="Todos"
                  isActive={activeFilter === "Todos"}
                  onClick={() => setActiveFilter("Todos")}
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
              {/* Filtros móviles: botón que abre modal con solo los filtros (sin "Todos") + botón "Todos" fuera */}
              <div className="flex lg:hidden gap-4">
                <FilterButton
                  label="Filtro"
                  isActive={false}
                  onClick={() => setIsFiltroModalOpen(true)}
                  iconSrc={filtroTestimonial}
                />
                <FilterButton
                  label="Todos"
                  isActive={activeFilter === "Todos"}
                  onClick={() => setActiveFilter("Todos")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Acciones sobre el proyecto seleccionado */}
      {selectedProjectId && (
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 mb-2">
          <button
            className="bg-[#9CE840] text-black px-3 sm:px-4 py-2 rounded font-bold hover:bg-lime-500 transition text-sm sm:text-base"
            onClick={handleInProgress}
            disabled={loading}
          >
            En progreso
          </button>
          <button
            className="bg-[#4285F4] text-white px-3 sm:px-4 py-2 rounded font-bold hover:bg-blue-600 transition text-sm sm:text-base"
            onClick={handleComplete}
            disabled={loading}
          >
            Completar
          </button>
        </div>
      )}
      {/* Lista de proyectos */}
      <div className="flex-grow flex gap-8 sm:mt-5 xl:mt-4 2xl:mt-5 overflow-hidden">
        <div className="w-full 2xl:w-[90%] overflow-y-auto pr-4 pb-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="flex flex-col gap-6 xl:gap-4 2xl:gap-6">
            {loading ? (
              <div className="text-center py-20 text-gray-400">Cargando proyectos...</div>
            ) : proyectosFiltrados.length > 0 ? (
              proyectosFiltrados.map((proyecto) => (
                <ProjectCard
                  key={proyecto.id_proyecto}
                  image={proyecto.imagen_url}
                  title={proyecto.titulo}
                  manager={proyecto.gerente?.nombre || proyecto.manager || "Gerente desconocido"}
                  startDate={proyecto.fecha_inicio?.split("T")[0] || proyecto.startDate}
                  endDate={proyecto.fecha_fin?.split("T")[0] || proyecto.endDate}
                  description={proyecto.descripcion}
                  progress={proyecto.progreso || 0}
                  status={
                    proyecto.estado === "en progreso"
                      ? "En progreso"
                      : proyecto.estado === "completado"
                      ? "Completado"
                      : ""
                  }
                  isSelected={selectedProjectId === proyecto.id_proyecto}
                  onSelect={() => setSelectedProjectId(proyecto.id_proyecto)}
                  slug={proyecto.slug}
                  projectId={proyecto.id_proyecto}
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
                  Parece que no hay proyectos que coincidan con este filtro. Prueba con otra opción.
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

export default Projects;