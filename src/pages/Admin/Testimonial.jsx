import React, { useState } from "react";

import Sidebar from "../../components/Sidebar";
import TestimonialStat from "../../components/admin/TestimonialStat";
import Search from "../../components/admin/Search";
import FeedbackCard from "../../components/admin/FeedBackCart";
import FilterButton from "../../components/admin/FilterButton";

import imageTestimonial1 from "../../assets/images/imageTestimonial1.png";
import imageTestimonial2 from "../../assets/images/imageTestimonial2.png";
import imageTestimonial3 from "../../assets/images/imageTestimonial3.png";
import imageTestimonial4 from "../../assets/images/imageTestimonial4.png";
import imageTestimonial5 from "../../assets/images/imageTestimonial5.png";
import imageTestimonial6 from "../../assets/images/imageTestimonial6.png";

import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";

function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtroTraducido = {
    Aprobados: "Aprobado",
    Rechazados: "Rechazado",
    "En espera": "En espera",
    Todos: "Todos",
  };

  const filters = ["Todos", "Aprobados", "Rechazados", "En espera"];

  const testimonios = [
    {
      id: 1,
      name: "Thompson Mark",
      position: "Vicepresidente de tecnología.",
      status: "Aprobado",
      statusColor: "Green",
      imageUrl: imageTestimonial1,
      comment: "La escalabilidad y el rendimiento...",
    },
    {
      id: 2,
      name: "James Kim",
      position: "Jefe de ingeniería en DataPro.",
      status: "En espera",
      statusColor: "bg-[#9CE840]",
      imageUrl: imageTestimonial2,
      comment: "Buen soporte y características po...",
    },
    {
      id: 3,
      name: "Emily Watson",
      position: "Responsable de producto.",
      status: "En espera",
      statusColor: "yellow",
      imageUrl: imageTestimonial3,
      comment: "Esta solución ha mejorado signifi...",
    },
    {
      id: 4,
      name: "Lisa Elena",
      position: "Técnico de InnovateSphere.",
      status: "Rechazado",
      statusColor: "yellow",
      imageUrl: imageTestimonial4,
      comment: "La atención al detalle y las característi...",
    },
    {
      id: 5,
      name: "Michael Rodriguez",
      position: "CTO en InnovateSphere.",
      status: "En espera",
      statusColor: "yellow",
      imageUrl: imageTestimonial5,
      comment: "La implementación fue perfecta y los...",
    },
    {
      id: 6,
      name: "Michael Jaramillo",
      position: "Tecnologo ADSO.",
      status: "Aprobado",
      statusColor: "Green",
      imageUrl: imageTestimonial6,
      comment: "Martin ama a Camilo en secreto...",
    },
  ];

  const testimoniosFiltrados = testimonios.filter((t) => {
    const filtro = filtroTraducido[activeFilter];
    if (filtro === "Todos") return true;
    return t.status === filtro;
  });

  return (
    <div className="h-full m-7 sm:mt-10 md:ml-55 md:mr-15">

      {/* Buscador */}
      <div className="2xl:ml-210">
        <Search />
      </div>

      {/* Título */}
      <div>
        <h1 className="2xl:text-5xl font-adlam"> TESTIMONIOS </h1>
      </div>

      {/* Estadísticas */}
      <div className="flex mt-10 gap-20 h-auto w-[59%]">
        <TestimonialStat
          value={10}
          indicator={2}
          label="Aprobados"
          iconSrc={flechaTestimonialArriba}
          bgColor="#9CE840"
        />
        <TestimonialStat
          value={5}
          indicator={1}
          label="Rechazados"
          iconSrc={flechaTestimonialAbajo}
          bgColor="#EA4335"
        />
        <TestimonialStat
          value={4}
          indicator={2}
          label="En espera"
          iconSrc={flechaTestimonialArriba}
          bgColor="#FFBE00"
        />
      </div>

      {/* Filtros */}
      <div className="flex items-center justify-between mt-10 py-2 w-[57%] h-auto">
        <p className="text-4xl font-adlam"> Nuevos testimonios </p>
        <div className="h-10 w-0.5 bg-gray-300"></div>

        <div className="flex gap-6">
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>

      {/* Testimonios */}
      <div className="flex flex-wrap gap-10 justify-start mt-5">
        {testimoniosFiltrados.length === 0 ? (
          <p className="text-xl font-adlam text-gray-500 italic bg-yellow-100 p-4 rounded-lg shadow-md">
          No hay testimonios disponibles para este filtro.
        </p>
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
            />
          ))
        )}
      </div>

      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Testimonials;
