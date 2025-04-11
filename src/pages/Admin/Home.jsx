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
    { image: "/src/assets/images/imageTestimonial1.png", name: "Thompson Mark", title: "Vicepresidente de Tecnología." },
    { image: "/src/assets/images/imageTestimonial2.png", name: "James Kim", title: "Jefe de ingeniería en DataPro." },
    { image: "/src/assets/images/imageTestimonial3.png", name: "Emily Watson", title: "Responsable de producto." }
  ];

  const testimoniosPendientes = [
    { image: "/src/assets/images/imageTestimonial4.png", name: "Sarah Johnson", title: "Gerente de marketing." },
    { image: "/src/assets/images/imageTestimonial5.png", name: "Richard White", title: "Director de operaciones." },
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
    <div className="h-full m-7 sm:mt-10 md:ml-55 md:mr-15">
      
      {/* En pantallas pequeñas, primero mostrar buscador, saludo y stats */}
      <div className="xl:hidden">
        {/* Buscador */}
        <div className="flex items-center justify-between sm:h-15 mb-4">
          <div className="sm:h-full flex flex-1 items-center">
            <img src={iconSearch} className="h-4 sm:h-5 absolute ml-5" alt="Icono de búsqueda" />
            <input
              type="text"
              className="w-[83%] sm:w-[77%] h-full py-2 pl-13 sm:pl-15 pr-10 rounded-lg bg-black/7"
              style={{ fontFamily: "'Mint Sans', sans-serif" }}
              placeholder="Buscar..."
            />
          </div>
          <div className="flex items-center">
            <img src={iconNotification} className="h-4 sm:h-5 mr-3" alt="Notificaciones" />
            <div className="h-10 w-10 sm:h-15 sm:w-15 rounded-lg bg-black/7"></div>
            <button>
              <img src={iconAnguloAbajo} className="h-2 sm:h-3 ml-1" alt="Icono de menú" />
            </button>
          </div>
        </div>
  
        {/* Saludo */}
        <div className="flex items-center justify-center rounded-lg w-full mt-10 sm:mt-15 h-40 sm:h-51 bg-black/7">
          <div className="ml-12 sm:ml-0 ">
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-[17px] sm:text-3xl">Hola Gloria!</h1>
            <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="font-medium sm:text-lg">Es bueno verte de nuevo.</p>
          </div>
          <div>
            <img src={imagenBienvenida} className="w-100 sm:w-65 mb-8" alt="Imagen bienvenida" />
          </div>
        </div>
  
        {/* Stats */}
        <div className="flex flex-row gap-4">
          <StatCard value="10" label="Testimonios aprobados" />
          <StatCard value="6" label="Testimonios rechazados" />
          <StatCard value="10" label="Noticias publicadas" />
        </div>
      </div>
      
      {/* Contenedor principal que se divide en xl */}
      <div className="xl:flex xl:gap-17">
        
        {/* Columna izquierda en xl */}
        <div className="xl:w-1/2">
          {/* Columna izquierda: Saludo - visible solo en xl+ */}
          <div className="hidden xl:flex items-center justify-center rounded-lg w-full h-51 bg-black/7">
            <div>
              <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold xl:text-3xl">Hola Gloria!</h1>
              <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="font-medium xl:text-[20px] 2xl:text-[23px]">Es bueno verte de nuevo.</p>
            </div>
            <div>
              <img src={imagenBienvenida} className="hidden 2xl:flex 2xl:gap-10 w-65 mb-8" alt="Imagen bienvenida" />
            </div>
          </div>
  
          {/* Sección de agregar noticia */}
          <div className="flex justify-center items-center mt-15 xl:mt-17 w-full h-18 border-2 rounded-lg gap-2">
            <img src={iconMas} className="h-9" alt="Icono de agregar noticia" />
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif", paddingTop: "4px"}} className="text-2xl font-bold">Crear noticia</h1>
          </div>
  
          {/* Sección de testimonios */}
          <div className="w-full h-auto mt-15 xl:mt-17">  
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-2xl">Testimonios</h1>
            <div className="relative flex gap-7 mt-8 font-bold">
              <button 
                ref={(el) => setTabRef("nuevos", el)}
                onClick={() => setActiveTab("nuevos")} 
                style={{ fontFamily: "'Mint Sans', sans-serif" }}
                className={` text-lg ${activeTab === "pendientes" ? "text-[#0000004D]" : "text-black"}`}
              >
                Recientes
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
                animate={getIndicatorStyles}
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
  
        {/* Columna derecha en xl */}
        <div className="xl:w-1/2">
          {/* Barra de búsqueda - solo visible en xl+ */}
          <div className="hidden xl:flex items-center justify-between gap-2 h-15">
            <div className="h-full flex flex-1 items-center">
              <img src={iconSearch} className="h-5 absolute ml-5" alt="Icono de búsqueda" />
              <input
                type="text"
                className="w-[77%] h-full py-2 pl-15 pr-10 rounded-lg bg-black/7"
                style={{ fontFamily: "'Mint Sans', sans-serif" }}
                placeholder="Buscar..."
              />
            </div>
            <div className="flex items-center">
              <img src={iconNotification} className="h-5 mr-3" alt="Notificaciones" />
              <div className="h-15 rounded-lg w-15 bg-black/7"></div>
              <button>
                <img src={iconAnguloAbajo} className="h-3 ml-1" alt="Icono de menú" />
              </button>
            </div>
          </div>
  
          {/* Cuadros de stats - solo visibles en xl+ */}
          <div className="hidden xl:flex xl:flex-row gap-7 mt-4">
            <StatCard value="10" label="Testimonios aprobados" />
            <StatCard value="6" label="Testimonios rechazados" />
            <StatCard value="10" label="Noticias publicadas" />
          </div>
  
          {/* Estadísticas - Solo visible en xl */}
          <div className="hidden xl:flex xl:flex-col mt-25">
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-2xl mb-5"> Estadisticas </h1>
            <h1 style={{ fontFamily: "'Quicksand', sans-serif" }} className=" text-lg mb-5"> Tasa de aprobacion de testimonios </h1>
            <Estadisticas/>
          </div>
        </div>
      </div>
  
      {/* Sección de la barra lateral */}
      <Sidebar />
    </div>
  );  
}  

export default Home;
