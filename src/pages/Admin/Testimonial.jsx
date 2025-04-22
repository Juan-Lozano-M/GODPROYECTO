import React from "react";
import Sidebar from "../../components/Sidebar";

import flechaTestimonial from "../../assets/icons/flechaTestimonial.png"
import Search from "../../components/admin/Search"

function Testimonials() {
  return (

    <div className="h-full m-7 sm:mt-10 md:ml-55 md:mr-15">

      {/* Buscador */}
        <Search/>

        <div className="mb-5">
          <h1 className="text-3xl font-bold"> TESTIMONIOS </h1>
        </div>

      <div className="flex gap-3 h-20 w-full bg-gray-200">
        <div className="bg-amber-600 h-full w-20">

          <div className="flex gap-3">
              <p className="text-4xl"> 10 </p>
              <div className="bg-[#9CE840] w-8 h-5 rounded-full"></div>
          </div>
          <div>

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