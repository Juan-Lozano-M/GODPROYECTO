import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import DataStat from "../../components/admin/DataStat";
import Search from "../../components/admin/Search";
import FeedbackCard from "../../components/admin/FeedBackCart";
import FilterButton from "../../components/admin/FilterButton";
import TestimonialModal from "../../components/admin/TestimonialModal";
import FiltroModal from "../../components/admin/FiltroModal";
import iconNotResult from "../../assets/icons/iconNotResult.png";
import filtroTestimonial from "../../assets/icons/filtroTestimonial.png";
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";

function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedTestimonio, setSelectedTestimonio] = useState(null);
  const [isFiltroModalOpen, setIsFiltroModalOpen] = useState(false);
  const [testimonios, setTestimonios] = useState([]);

  // Función para obtener testimonios (puedes llamarla cuando quieras refrescar)
  const fetchTestimonios = () => {
    fetch("http://localhost:5000/api/testimonios")
      .then((res) => res.json())
      .then((data) => {
        const testimoniosAdaptados = data.map((t) => ({
          id: t.id_test,
          name: t.nombre_usuario,
          position: t.cargo_test,
          status: t.estado === "aprobado" ? "Aprobado" : t.estado === "anulado" ? "Anulado" : "En espera",
          statusColor:
            t.estado === "aprobado"
              ? "Green"
              : t.estado === "anulado"
              ? "Red"
              : "Yellow",
          imageUrl: "",
          titulo: t.titulo_test,
          comment: t.contenido_test,
          fecha: t.fecha_creacion_test,
        }));
        setTestimonios(testimoniosAdaptados);

      })
      .catch((error) => {
        console.error("Error al obtener testimonios:", error);
      });
  };

  const handleStatusChange = async () => {
    await fetchTestimonios();
    setSelectedTestimonio(null); // Cierra el modal después de actualizar
  };
  
  // Llama a fetchTestimonios al montar el componente
  useEffect(() => {
    fetchTestimonios();
  }, []);

  const filtroTraducido = {
    Aprobados: "Aprobado",
    Anulados: "Anulado",
    "En espera": "En espera",
    Todos: "Todos",
  };

  const filters = ["Aprobados", "Anulados", "En espera"];

  const testimoniosFiltrados = testimonios.filter((t) => {
    const filtro = filtroTraducido[activeFilter];
    if (filtro === "Todos") return true;
    return t.status === filtro;
  });

  const countByStatus = (status) =>
    testimonios.filter((t) => t.status === status).length;

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
  }, [testimonios]);

  const getIcon = (cambio) =>
    cambio >= 0 ? flechaTestimonialArriba : flechaTestimonialAbajo;

  const handleOpenModal = (testimonio) => {
    setSelectedTestimonio(testimonio);
  };

  const handleCloseModal = () => {
    setSelectedTestimonio(null);
  };

  return (
    <div className="h-full m-7 sm:mt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15">
      <div className="flex w-full items-center">
        <Search />
      </div>
      <div>
        <h1 className="mt-6 2xl:mt-0 text-3xl md:text-4xl xl:text-5xl font-adlam"> TESTIMONIOS </h1>
      </div>
      <div className="flex flex-wrap sm:flex-row mt-6 gap-5 sm:gap-10 lg:gap-20 h-auto">
        <DataStat
          value={totalAprobados}
          indicator={cambios.Aprobado}
          label="Aprobados"
          iconSrc={getIcon(cambios.Aprobado)}
          bgColor="#9CE840"
        />
        <DataStat
          value={totalAnulados}
          indicator={cambios.Anulado}
          label="Anulados"
          iconSrc={getIcon(cambios.Anulado)}
          bgColor="#EA4335"
        />
        <DataStat
          value={totalEnEspera}
          indicator={cambios["En espera"]}
          label="En espera"
          iconSrc={getIcon(cambios["En espera"])}
          bgColor="#FFBE00"
        />
      </div>
      <div className="flex items-center justify-between mt-5 md:mt-10 py-2 w-full h-auto">
        <div className="flex items-center gap-4 sm:gap-7 xl:gap-10">
          <p className="text-lg sm:text-3xl lg:text-2xl xl:text-4xl font-adlam"> Nuevos testimonios </p>
          <div className="h-7 w-0.5 sm:h-10 sm:w-0.5 bg-gray-300"></div>
          <div className="flex items-center gap-4">
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
      {testimoniosFiltrados.length === 0 ? (
        <div className="w-full flex justify-center items-center mt-10">
          <div className="flex flex-col gap-4 text-xl text-gray-500 p-4 text-center">
            <div>
              <img src={iconNotResult} className="h-40 w-50 sm:h-60 sm:w-80 mx-auto" alt="Imagen de no resultados" />
            </div>
            <div className="font-bold font-adlam text-2xl sm:text-4xl">
              Oops,
            </div>
            <div className="w-70 sm:w-90 text-gray-400 font-light text-lg sm:text-xl font-quicksand">
              No hay testimonios disponibles en esta categoría por el momento.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start gap-6 sm:gap-7 lg:gap-10 w-full mt-5">
          {testimoniosFiltrados.map((t) => (
            <FeedbackCard
              key={t.id}
              name={t.name}
              position={t.position}
              status={t.status}
              statusColor={t.statusColor}
              imageUrl={t.imageUrl}
              comment={t.comment}
              onView={() => handleOpenModal(t)}
            />
          ))}
        </div>
      )}
      {selectedTestimonio && (
        <TestimonialModal
          isOpen={!!selectedTestimonio}
          onClose={handleCloseModal}
          testimonio={selectedTestimonio}
          onStatusChange={handleStatusChange}
        />
      )}
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
      <Sidebar />
    </div>
  );
}

export default Testimonials;