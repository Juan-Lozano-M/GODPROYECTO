import React from "react";
import Sidebar from "../../components/Sidebar";

import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png"
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png"

import Search from "../../components/admin/Search"

function Testimonials() {
  return (

    <div className="h-full m-7 sm:mt-10 md:ml-55 md:mr-15">

      {/* Buscador */}
      <div className="2xl:ml-170">
        <Search/>
      </div>
      
        <div className="">
          <h1 className="2xl:text-5xl font-bold"> TESTIMONIOS </h1>
        </div>

      <div className="flex mt-10 gap-15 h-auto w-[59%]">
        <div className="flex h-auto w-45">
          <div className="w-auto">
            <h1 className="font-adlam text-6xl"> 10 </h1>
          </div>
          <div className="flex flex-col items-end h-full w-auto ml-3 mt-2">
            <div className="flex justify-center items-center gap-1 bg-[#9CE840] rounded-full w-10">
              <img src={flechaTestimonialArriba} className="h-3" alt="" />
              <p className="text-[15px] font-adlam"> 2 </p>
            </div>
            <p className="font-adlam text-[20px]"> Aprobados </p>
          </div>
        </div>

        <div className="flex h-auto w-45">
          <div className="w-auto">
            <h1 className="font-adlam text-6xl"> 5 </h1>
          </div>
          <div className="flex flex-col items-end h-full w-auto ml-3 mt-2">
            <div className="flex justify-center items-center gap-1 bg-[#EA4335] rounded-full w-10">
              <img src={flechaTestimonialAbajo} className="h-3" alt="" />
              <p className="text-[15px] font-adlam"> 2 </p>
            </div>
            <p className="font-adlam text-[20px]"> Aprobados </p>
          </div>
        </div>

        <div className="flex h-auto w-45">
          <div className="w-auto">
            <h1 className="font-adlam text-6xl"> 4 </h1>
          </div>
          <div className="flex flex-col items-end h-full w-auto ml-3 mt-2">
            <div className="flex justify-center items-center gap-1 bg-[#FFBE00] rounded-full w-10">
              <img src={flechaTestimonialArriba} className="h-3" alt="" />
              <p className="text-[15px] font-adlam"> 2 </p>
            </div>
            <p className="font-adlam text-[20px]"> Aprobados </p>
          </div>
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