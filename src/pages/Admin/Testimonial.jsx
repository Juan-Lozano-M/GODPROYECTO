import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import TestimonialStat from "../../components/admin/TestimonialStat";
import Search from "../../components/admin/Search";
import FeedbackCard from "../../components/admin/FeedBackCart";
import FilterButton from "../../components/admin/FilterButton";
import TestimonialModal from "../../components/admin/TestimonialModal";
import FiltroModal from "../../components/admin/FiltroModal"; // <- Nuevo modal de filtros

import imageTestimonial1 from "../../assets/images/imageTestimonial1.png";
import imageTestimonial2 from "../../assets/images/imageTestimonial2.png";
import imageTestimonial3 from "../../assets/images/imageTestimonial3.png";
import imageTestimonial4 from "../../assets/images/imageTestimonial4.png";
import imageTestimonial5 from "../../assets/images/imageTestimonial5.png";
import imageTestimonial6 from "../../assets/images/imageTestimonial6.png";
import imageTestimonial7 from "../../assets/images/imageTestimonial7.png";
import iconNotResult from "../../assets/icons/iconNotResult.png";
import filtroTestimonial from "../../assets/icons/filtroTestimonial.png";
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";

function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedTestimonio, setSelectedTestimonio] = useState(null);
  const [isFiltroModalOpen, setIsFiltroModalOpen] = useState(false); // <- Estado modal de filtros

  const [testimonios, setTestimonios] = useState([
/*     {
      id: 1,
      name: "Thompson Mark",
      position: "Vicepresidente de tecnología.",
      status: "Aprobado",
      statusColor: "Green",
      imageUrl: imageTestimonial1,
      titulo: 'Buena experiencia tecnica.',
      comment: 'La escalabilidad y el rendimiento han cambiado las reglas del juego para nuestra organización. Altamente recomendado para cualquier negocio en crecimiento.'
    }, */
    {
      id: 2,
      name: "James Kim",
      position: "Jefe de ingeniería en DataPro.",
      status: "En espera",
      statusColor: "Yellow",
      imageUrl: imageTestimonial2,
      titulo: 'Potencial con margen de mejora.',
      comment: 'El soporte técnico ha sido útil, pero algunas características aún no están totalmente maduras. Con un par de mejoras clave, podría convertirse en una herramienta esencial para nuestro equipo de ingeniería.',
    },
    {
      id: 3,
      name: "Emily Watson",
      position: "Responsable de producto.",
      status: "En espera",
      statusColor: "Yellow",
      imageUrl: imageTestimonial3,
      titulo: 'Necesita más flexibilidad.',
      comment: "Esta solución ha contribuido a mejorar nuestros procesos internos. Sin embargo, esperamos una mayor flexibilidad para integraciones con otras plataformas antes de una adopción completa.",
    },
    {
      id: 4,
      name: "Lisa Elena",
      position: "Técnico de InnovateSphere.",
      status: "Anulado",
      statusColor: "Red",
      imageUrl: imageTestimonial4,
      titulo: 'Diseño amigable, pero insuficiente.',
      comment: "Aunque el diseño es intuitivo, encontramos dificultades en funciones clave para nuestro flujo de trabajo. La experiencia fue limitada y no se alinea con los estándares que manejamos en InnovateSphere.",
    },
    {
      id: 5,
      name: "Jose Rodriguez",
      position: "CTO en InnovateSphere.",
      status: "En espera",
      statusColor: "Yellow",
      imageUrl: imageTestimonial5,
      titulo: 'Limitada en métricas avanzadas.',
      comment: "La implementación fue sencilla y sin errores graves. No obstante, encontramos limitaciones en cuanto a personalización y métricas detalladas que son críticas para nosotros.",
    },
/*     {
      id: 6,
      name: "Michael Jaramillo",
      position: "Tecnologo ADSO.",
      status: "Aprobado",
      statusColor: "Green",
      imageUrl: imageTestimonial6,
      titulo: 'Satisfacción total desde el inicio.',
      comment: "Desde el primer día, ha demostrado ser una herramienta funcional y estable. La implementación fue rápida y la respuesta del equipo técnico ha sido excelente. Muy satisfechos con el resultado.",
    }, */
    {
      id: 7,
      name: "Martin Motta",
      position: "Tecnologo ADSO.",
      status: "En espera",
      statusColor: "Yellow",
      imageUrl: imageTestimonial7,
      titulo: 'Gran diseño, necesita interacción',
      comment: "El mejor diseño es el del portal de noticias, sin duda. Aun así, sentimos que hay espacio para ofrecer más funciones interactivas que mejoren la experiencia del usuario final.",
    },
    {
      id: 8,
      name: "Camilo Giraldo",
      position: "Diseñador grafico 4 semestre.",
      status: "Anulado",
      statusColor: "Red",
      imageUrl: imageTestimonial1,
      titulo: 'Gran diseño, necesita interacción',
      comment: "Mi mejor amigo es el coste… y este sistema no fue competitivo en ese aspecto. El diseño visual cumple, pero las funciones disponibles no justifican la inversión para un proyecto académico.",
    },
  ]);

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
        <h1 className="mt-6 text-3xl md:text-4xl xl:text-5xl font-adlam"> TESTIMONIOS </h1>
      </div>

      <div className="flex flex-wrap sm:flex-row mt-6 gap-5 sm:gap-10 lg:gap-20 h-auto">
        <TestimonialStat
          value={totalAprobados}
          indicator={cambios.Aprobado}
          label="Aprobados"
          iconSrc={getIcon(cambios.Aprobado)}
          bgColor="#9CE840"
        />
        <TestimonialStat
          value={totalAnulados}
          indicator={cambios.Anulado}
          label="Anulados"
          iconSrc={getIcon(cambios.Anulado)}
          bgColor="#EA4335"
        />
        <TestimonialStat
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
            {/* Desktop: mostrar todos los filtros */}
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

            {/* Mobile: solo botón Filtro y Todos */}
            <div className="flex lg:hidden gap-4">
              <FilterButton
                label="Filtro"
                isActive={false}
                onClick={() => setIsFiltroModalOpen(true)}
                iconSrc={filtroTestimonial} // Añade esta línea
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

      <div className="flex flex-wrap justify-start gap-6 sm:gap-7 lg:gap-10 w-full mt-5">
        {testimoniosFiltrados.length === 0 ? (

          // Mensaje de "No hay testimonios" si no hay resultados
          <div className="flex justify-center sm:mt-15 ml-auto mr-auto items-center flex-col gap-4 text-xl text-gray-500 p-4">
            <div>
              <img src={iconNotResult} className="h-25 w-35 sm:h-60 sm:w-80" alt="Imagen de no resultados" />
            </div>
            <div className="text-center font-bold font-adlam text-2xl sm:text-4xl">
              Oops,
            </div>
            <div className="w-70 sm:w-90 text-gray-400 text-center font-light text-lg sm:text-xl font-quicksand">
              No hay resultados para su busqueda. Vamos, intentelo de nuevo!
            </div>
          </div>
        
        ) : (
          testimoniosFiltrados.map((t) => (
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
          ))
        )}
      </div>

      {selectedTestimonio && (
        <TestimonialModal
          isOpen={!!selectedTestimonio}
          onClose={handleCloseModal}
          testimonio={selectedTestimonio}
        />
      )}

      {/* Modal de filtros mobile */}
      {isFiltroModalOpen && (
        <FiltroModal
          filters={filters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onClose={() => setIsFiltroModalOpen(false)}
        />
      )}

      <Sidebar />
    </div>
  );
}

export default Testimonials;
