import React from "react";
import Sidebar from "../../components/Sidebar";
import TestimonialStat from "../../components/admin/TestimonialStat";
import Search from "../../components/admin/Search";

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
          <h1 className="2xl:text-5xl font-bold"> TESTIMONIOS </h1>
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
      <div className="flex items-center justify-between mt-15 py-2 w-[31%] h-auto">
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

      

      {/* Sección de la barra lateral */}
      <div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Testimonials;