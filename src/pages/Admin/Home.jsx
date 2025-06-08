// Importamos motion para animaciones, hooks de React, y Link para navegación entre rutas
import { motion } from "framer-motion";
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Add this import

// Importando los componentes necesarios
import Search from "../../components/admin/Search";
import CartoonButton from "../../components/buttons/CartoonButton";
import Estadisticas from "../../components/Estadisticas";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import TestimonialCard from "../../components/TestimonialCard";
import TestimonialModal from "../../components/admin/TestimonialModal";

// Importando los assets necesarios
import iconAnguloAbajo from "../../assets/icons/iconAnguloAbajo.png";
import iconNotification from "../../assets/icons/iconNotification.png";
import iconSearch from "../../assets/icons/iconSearch.png";
import imagenBienvenida from "../../assets/images/imagenBienvenida.png";
import imagePerfil from "../../assets/images/imagePerfil.png";

// Componente principal de la página de inicio del administrador
const Home = () => {

  const [activeTab, setActiveTab] = useState("nuevos");
  const [tabRefs, setTabRefs] = useState({ nuevos: null, pendientes: null });
  const [testimonios, setTestimonios] = useState([]);
  const [selectedTestimonio, setSelectedTestimonio] = useState(null);

  useEffect(() => {
    fetchTestimonios();
  }, []);

  const fetchTestimonios = async () => {
    const res = await fetch("http://localhost:5000/api/testimonios");
    const data = await res.json();
    const testimoniosAdaptados = data.map((t) => ({
      id: t.id_test,
      name: t.nombre_usuario,
      position: t.cargo_test,
      status: t.estado === "aprobado" ? "Aprobado" : t.estado === "anulado" ? "Anulado" : "En espera",
      imageUrl: t.imagen_url || "",
      titulo: t.titulo_test,
      comment: t.contenido_test,
      fecha: t.fecha_creacion_test,
    }));
    setTestimonios(testimoniosAdaptados);
  };

  const testimoniosRecientes = testimonios
    .filter(t => t.status === "Aprobado" || t.status === "Anulado")
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 3); 

  const testimoniosPendientes = testimonios
    .filter(t => t.status === "En espera")
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 3);

  const testimoniosMostrados = activeTab === "nuevos" ? testimoniosRecientes : testimoniosPendientes;

  const setTabRef = (tab, element) => {
    if (element && tabRefs[tab] !== element) {
      setTabRefs(prev => ({
        ...prev,
        [tab]: element
      }));
    }
  };

  const getIndicatorStyles = useMemo(() => {
    if (!tabRefs[activeTab]) return {};
    const activeTabElement = tabRefs[activeTab];
    return {
      width: activeTabElement.offsetWidth,
      left: activeTabElement.offsetLeft,
    };
  }, [activeTab, tabRefs]);

  return (
    <div className="h-full m-7 sm:mt-10 md:ml-55 md:mr-15 cursor-guante">
      
      {/* En pantallas pequeñas, primero mostrar buscador, saludo y stats */}
      <div className="xl:hidden">
        
        {/* Buscador */}
        <div className="flex w-full items-center">
          <Search />
        </div>

        {/* Saludo */}
        <div className="flex items-center justify-center rounded-lg w-full mt-10 sm:mt-15 h-40 sm:h-51 bg-black/7">
          <div className="ml-8 sm:ml-0 ">
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold basis-[10px] sm:text-3xl shrink-0">Hola Gloria!</h1>
            <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="font-medium text-[15px]">Es bueno verte de nuevo.</p>
          </div>
          <div>
            <img src={imagenBienvenida} className="max-w-[212px] sm:max-w-[257px] shrink-0 grow-0 object-contain mb-8 sm:flex sm:w-65 " alt="Imagen bienvenida" />
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
            <div className="ml-15">
              <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold xl:text-[23px] 2xl:text-[25px]">Hola Gloria!</h1>
              <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="font-medium xl:text-[17px] 2xl:text-[20px]">Es bueno verte de nuevo.</p>
            </div>
            <div>
              <img src={imagenBienvenida} className="max-w-[212px] sm:max-w-[257px] shrink-0 grow-0 object-contain flex 2xl:gap-10 w-65 mb-8" alt="Imagen bienvenida" />
            </div>
          </div>
  
          {/* Sección de agregar noticia */}
          <div className="mt-10 sm:mt-15 xl:mt-17 w-full h-14 sm:h-18 gap-2">
            <Link to={"/home/newscreate"}>
              <CartoonButton />
            </Link>
          </div>
  
          {/* Sección de testimonios */}
          <div className="w-full h-auto mt-10 sm:mt-15 xl:mt-17">  
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-xl sm:text-2xl">Testimonios</h1>
            <div className="relative flex gap-7 mt-4 sm:mt-8 font-bold">
              <button 
                ref={(el) => setTabRef("nuevos", el)}
                onClick={() => setActiveTab("nuevos")} 
                style={{ fontFamily: "'Mint Sans', sans-serif" }}
                className={` sm:text-lg ${activeTab === "pendientes" ? "text-[#0000004D]" : "text-black"}`}
              >
                Recientes
              </button>
              <button 
                ref={(el) => setTabRef("pendientes", el)}
                onClick={() => setActiveTab("pendientes")} 
                style={{ fontFamily: "'Mint Sans', sans-serif" }}
                className={` sm:text-lg ${activeTab === "nuevos" ? "text-[#0000004D]" : "text-black"}`}
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
              {testimoniosMostrados.map((testimonio) => (
                <TestimonialCard
                  key={testimonio.id}
                  name={testimonio.name}
                  position={testimonio.position}
                  imageUrl={testimonio.imageUrl}
                  comment={testimonio.comment}
                  status={testimonio.status}
                  onView={() => setSelectedTestimonio(testimonio)}
                />
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
              <div className="h-15 rounded-lg w-15 bg-black/7">
                <img src={imagePerfil} alt="Imagen de perfil"/>
              </div>
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
          <div className="hidden xl:flex xl:flex-col mt-17">
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-2xl mb-5"> Estadisticas </h1>
            <h1 style={{ fontFamily: "'Quicksand', sans-serif" }} className=" text-lg mb-5"> Tasa de aprobacion de testimonios </h1>
            <Estadisticas/>
          </div>
        </div>
      </div>
      
      {/* Modal para ver testimonio */}
      {selectedTestimonio && (
        <TestimonialModal
          isOpen={!!selectedTestimonio}
          onClose={() => setSelectedTestimonio(null)}
          testimonio={selectedTestimonio}
          onStatusChange={async () => {
            await fetchTestimonios();
            setSelectedTestimonio(null);
          }}
        />
      )}
      {/* Sección de la barra lateral */}
      <Sidebar />
    </div>
  );  
}  

export default Home;
