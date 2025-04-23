import React from "react";
import Sidebar from "../../components/Sidebar";
import TestimonialStat from "../../components/admin/TestimonialStat";
import Search from "../../components/admin/Search";
import FeedbackCard from "../../components/admin/FeedBackCart";

import imageTestimonial1 from "../../assets/images/imageTestimonial1.png";
import imageTestimonial2 from "../../assets/images/imageTestimonial2.png";
import imageTestimonial3 from "../../assets/images/imageTestimonial3.png";
import imageTestimonial4 from "../../assets/images/imageTestimonial4.png";
import imageTestimonial5 from "../../assets/images/imageTestimonial5.png";


import filtroTestimonial from "../../assets/icons/filtroTestimonial.png"
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png"
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png"

function Testimonials() {
  return (

    <div className="h-full m-7 sm:mt-10 md:ml-55 md:mr-15">

      {/* Buscador */}
      <div className="2xl:ml-210">
        <Search />
      </div>
      
      {/* Titulo */}
        <div className="">
          <h1 className="2xl:text-5xl font-adlam"> TESTIMONIOS </h1>
        </div>

      {/* Estados de los testimonios */}
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

      {/* Seccion testimonios */}
      <div className="flex items-center justify-between mt-10 py-2 w-[31%] h-auto">
        <button>
          <p className="text-4xl font-adlam"> Nuevos testimonios </p>
        </button>
        <div className="flex gap-3">
          <div className="rounded-full p-4 bg-black/7">
            <img src={filtroTestimonial} className="h-7" alt="Icono filtro" />
          </div>
          <button className="flex items-center rounded-full px-2 bg-black/7">
            <p className="font-adlam"> Todos </p>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-10 justify-start">
        <FeedbackCard 
          name="Thompson Mark"
          position="Vicepresidente de tecnologia."
          company=""
          status="Aprobado"
          statusColor="Green" // o puedes manejarlo por lógica
          imageUrl={imageTestimonial1}
          comment="La escabilidad y el rendimiento..."
        />

        <FeedbackCard 
          name="James Kim"
          position="Jefe de ingeniera en DataPro."
          company=""
          status="En espera"
          statusColor="bg-[#9CE840]" // o puedes manejarlo por lógica
          imageUrl={imageTestimonial2}
          comment="Buen soporte  y caracteristicas po.."
        />

        <FeedbackCard 
          name="Emily Watson"
          position="Responsable de producto."
          company=""
          status="En espera"
          statusColor="yellow" // o puedes manejarlo por lógica
          imageUrl={imageTestimonial3}
          comment="Esta solución ha mejorado signifi..."
        />

        <FeedbackCard 
          name="Lisa Elena"
          position="Tecnico de InnovateSphere."
          company=""
          status="Rechazado"
          statusColor="yellow" // o puedes manejarlo por lógica
          imageUrl={imageTestimonial4}
          comment="La atención al detalle y las característi..."
        />


        <FeedbackCard 
          name="Michael Rodriguez"
          position="CTO en InnovateSphere."
          company=""
          status="En espera"
          statusColor="yellow" // o puedes manejarlo por lógica
          imageUrl={imageTestimonial5}
          comment="La implementación fue perfecta y los..."
        />
      </div>

      

      {/* Sección de la barra lateral */}
      <div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Testimonials;