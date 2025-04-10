import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMemo } from "react";

// Importando los componentes necesarios
import Sidebar from "../../components/Sidebar";
import TestimonialCard from "../../components/TestimonialCard";
import StatCard from "../../components/StatCard";
import Estadisticas from "../../components/Estadisticas";

// Importando los assets necesarios
import iconFilter from "../../assets/icons/iconFilter.png";
import iconSearch from "../../assets/icons/iconSearch.png";
import iconNotification from "../../assets/icons/iconNotification.png";
import iconAnguloAbajo from "../../assets/icons/iconAnguloAbajo.png";
import iconMas from "../../assets/icons/iconMas.png";
import imagenBienvenida from "../../assets/images/imagenBienvenida.png";

const Home = () => {
  const [activeTab, setActiveTab] = useState("nuevos");
  const [tabRefs, setTabRefs] = useState({

    nuevos: null,
    pendientes: null
  })

  const testimoniosNuevos = [
    { image: "/assets/imageTestimonial1.png", name: "Thompson Mark", title: "Vicepresidente de Tecnología." },
    { image: "/assets/imageTestimonial2.png", name: "James Kim", title: "Jefe de ingeniería en DataPro." },
    { image: "/assets/imageTestimonial3.png", name: "Emily Watson", title: "Responsable de producto." }
  ];

  const testimoniosPendientes = [
    { image: "/assets/imageTestimonial4.png", name: "Sarah Johnson", title: "Gerente de marketing." },
    { image: "/assets/imageTestimonial5.png", name: "Richard White", title: "Director de operaciones." },
  ];

  // Elegir la lista de testimonios según la pestaña activa
  const testimonios = activeTab === "nuevos" ? testimoniosNuevos : testimoniosPendientes;

  // Funcion para establecer las referencias de los botones
  const setTabRef = (tab, element) => {
    if (element && tabRefs[tab] !== element) {
      setTabRefs(prev => ({
        ...prev,
        [tab]: element
      }));
    }
  };
  // Calculo de la pocision y ancho del indicador
  const getIndicatorStyles = useMemo (() => {
    
    if (!tabRefs[activeTab]) return {};
    const activeTabElement = tabRefs[activeTab];
    return {
      width: activeTabElement.offsetWidth,
      left: activeTabElement.offsetLeft,
    };
  }, [activeTab, tabRefs]);

  return (

    <div className="flex gap-17 h-full m-7 mt-10 sm:ml-55 sm:mr-15">
      
  
    {/* Primer contenedor principal */}
    <div className="w-1/2">

      {/* Columna izquierda: Saludo */}
      <div className="flex items-center justify-center rounded-lg w-full h-51 gap-10 bg-black/7 ">
        <div>
          <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-3xl">Hola Gloria!</h1>
          <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="font-medium text-[18px]">Es bueno verte de nuevo.</p>
        </div>
        <div>
          <img src={imagenBienvenida} className="w-65 mb-8" alt="Imagen bienvenida" />
        </div>
      </div>

      {/* Sección de agregar noticia */}
      <div className="flex justify-center items-center mt-17 w-full h-18 border-2 rounded-lg gap-2">
        <img src={iconMas} className="h-9" alt="Icono de agregar noticia" />
        <h1 style={{ fontFamily: "'Mint Sans', sans-serif", paddingTop: "4px"}} className="text-2xl font-bold">Crear noticia</h1>
      </div>

      {/* Sección de testimonios */}
      <div className="w-full h-auto mt-17">  
        <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-2xl">Testimonios</h1>
        <div className="relative flex gap-7 mt-8 font-bold">
          <button 
            ref={(el) => setTabRef("nuevos", el)}
            onClick={() => setActiveTab("nuevos")} 
            style={{ fontFamily: "'Mint Sans', sans-serif" }}
            className={` text-lg ${activeTab === "pendientes" ? "text-[#0000004D]" : "text-black"}`}
          >
            Mas nuevos
          </button>
          <button 
            ref={(el) => setTabRef("pendientes", el)}
            onClick={() => setActiveTab("pendientes")} 
            style={{ fontFamily: "'Mint Sans', sans-serif" }}
            className={`text-lg ${activeTab === "nuevos" ? "text-[#0000004D]" : "text-black"}`}
          >
            Pendientes de revisión
          </button>
          
          {/* Indicador animado */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-[#9CE840]"
            initial={false}
            animate={getIndicatorStyles} // Usamos la versión memorizada
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="flex flex-col mt-4 gap-3">
          {testimonios.map((testimonio, index) => (
            <TestimonialCard key={index} {...testimonio} />
          ))}
        </div>
      </div>
    </div>

    {/* Segundo contenedor principal*/} 
    <div className="w-1/2 ">
    
      {/* Columna derecha: buscador y estadísticas */}
      <div className="flex flex-col gap-4 w-full h-51">

        {/* Barra de búsqueda */}
        <div className="flex items-center justify-between gap-2 h-15">
          <div className="h-full flex flex-1 items-center">
            <img src={iconSearch} className="h-5 absolute ml-5" alt="Icono de búsqueda" />

            <input
              type="text"
              className="w-[77%] h-full py-2 pl-15 pr-10 rounded-lg bg-black/7"
              style={{ fontFamily: "'Mint Sans', sans-serif" }}
              placeholder="Buscar..."
            />
          </div>
          <div className="flex items-center ">
            <img src={iconNotification} className="h-5 mr-3" alt="Notificaciones" />
            <div className="h-15 rounded-lg w-15 bg-black/7"></div>
            <button>
              <img src={iconAnguloAbajo} className="h-3 ml-1" alt="Icono de menú" />
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="flex flex-col h-full sm:flex-row gap-7">
          <StatCard value="10" label="Testimonios aprobados" />
          <StatCard value="6" label="Testimonios rechazados" />
          <StatCard value="10" label="Noticias publicadas" />
        </div>
      </div>

      
          <div className="mt-17">
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-2xl mb-5"> Estadisticas </h1>
            <h1 style={{ fontFamily: "'Quicksand', sans-serif" }} className=" text-lg mb-5"> Tasa de aprobacion de testimonios </h1>
            <Estadisticas/>
          </div>
    </div>
      {/* Sección de la barra lateral */}
      <Sidebar />
    </div>
  );
};

export default Home;
