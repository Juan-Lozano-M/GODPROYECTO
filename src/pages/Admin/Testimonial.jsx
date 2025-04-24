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

import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";

function Testimonials() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filters = ["Todos", "Aprobados", "Rechazados", "En espera"];

  return (
    <div className="h-full m-7 sm:mt-10 md:ml-55 md:mr-15">

      {/* Buscador */}
      <div className="2xl:ml-210">
        <Search />
      </div>

      {/* Título */}
      <div className="">
        <h1 className="2xl:text-5xl font-adlam"> TESTIMONIOS </h1>
      </div>

      {/* Estadísticas de testimonios */}
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

      {/* Filtros de testimonios */}
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
        <FeedbackCard
          name="Thompson Mark"
          position="Vicepresidente de tecnología."
          status="Aprobado"
          statusColor="Green"
          imageUrl={imageTestimonial1}
          comment="La escalabilidad y el rendimiento..."
        />

        <FeedbackCard
          name="James Kim"
          position="Jefe de ingeniería en DataPro."
          status="En espera"
          statusColor="bg-[#9CE840]"
          imageUrl={imageTestimonial2}
          comment="Buen soporte y características po..."
        />

        <FeedbackCard
          name="Emily Watson"
          position="Responsable de producto."
          status="En espera"
          statusColor="yellow"
          imageUrl={imageTestimonial3}
          comment="Esta solución ha mejorado signifi..."
        />

        <FeedbackCard
          name="Lisa Elena"
          position="Técnico de InnovateSphere."
          status="Rechazado"
          statusColor="yellow"
          imageUrl={imageTestimonial4}
          comment="La atención al detalle y las característi..."
        />

        <FeedbackCard
          name="Michael Rodriguez"
          position="CTO en InnovateSphere."
          status="En espera"
          statusColor="yellow"
          imageUrl={imageTestimonial5}
          comment="La implementación fue perfecta y los..."
        />
      </div>

      {/* Barra lateral */}
      <div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Testimonials;
