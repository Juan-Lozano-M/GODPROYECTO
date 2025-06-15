// Importamos motion para animaciones, hooks de React, y Link para navegación entre rutas
import { motion } from "framer-motion";
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Importamos axios

// Importando los componentes necesarios
import AdminProfile from "../../components/admin/AdminProfile";
import CartoonButton from "../../components/buttons/CartoonButton";
import TestimonialStatic from "../../components/admin/StaticsTestimonial";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import TestimonialCard from "../../components/TestimonialCard";
import TestimonialModal from "../../components/admin/TestimonialModal";

// Importando el hook personalizado para estadísticas
import useTestimonialStats from "../../components/admin/useTestimonialStats";

// Importando los assets necesarios
import imagenBienvenida from "../../assets/images/imagenBienvenida.png";

// Componente principal de la página de inicio del administrador
const Home = () => {
  const [activeTab, setActiveTab] = useState("nuevos");
  const [tabRefs, setTabRefs] = useState({ nuevos: null, pendientes: null });
  const [testimonios, setTestimonios] = useState([]);
  const [selectedTestimonio, setSelectedTestimonio] = useState(null);
  const [loading, setLoading] = useState(false);

  // ← USAR EL HOOK PERSONALIZADO PARA ESTADÍSTICAS
  const { stats, loading: statsLoading, error: statsError, refreshStats } = useTestimonialStats();

  useEffect(() => {
    fetchTestimonios();
  }, []);

  // Función auxiliar para mapear el estado
  const mapearEstado = (estado) => {
    if (!estado) return "En espera"; // Estado por defecto
    
    const estadoLower = estado.toString().toLowerCase();
    
    switch (estadoLower) {
      case "aprobado":
      case "approved":
        return "Aprobado";
      case "anulado":
      case "rechazado":
      case "rejected":
        return "Anulado";
      case "pendiente":
      case "en espera":
      case "pending":
        return "En espera";
      default:
        return "En espera";
    }
  };
  
  const fetchTestimonios = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/testimonials");
      
      // Validar que la respuesta tenga datos
      if (!response.data || !Array.isArray(response.data)) {
        console.error("La respuesta de la API no es válida:", response.data);
        setTestimonios([]);
        return;
      }

      console.log("Respuesta completa de la API:", response.data);
      
      const testimoniosAdaptados = response.data
        .filter(t => t && typeof t === 'object') // Filtrar elementos válidos
        .map((t) => {
          // CORRECCIÓN: Usar los nombres de campo que envía el backend
          const testimonioAdaptado = {
            id: t.id_tes || Math.random().toString(36), // ← CORREGIDO: usar 'id_tes'
            name: t.nombre_usuario || "Usuario sin nombre", // ✓ Ya estaba bien
            position: t.cargo_tes || "Sin cargo", // ← CORREGIDO: usar 'cargo_tes'
            status: mapearEstado(t.estado_tes), // ← CORREGIDO: usar 'estado_tes'
            imageUrl: t.imagen_url || t.imagen || "",
            titulo: t.titulo_tes || "", // ← CORREGIDO: usar 'titulo_tes'
            comment: t.contenido_tes || "", // ← CORREGIDO: usar 'contenido_tes'
            fecha: t.fecha_publicacion_tes || new Date().toISOString(), // ← CORREGIDO: usar 'fecha_publicacion_tes'
          };
          
          console.log("Testimonio original:", t);
          console.log("Testimonio adaptado:", testimonioAdaptado);
          
          return testimonioAdaptado;
        });
      
      console.log("Testimonios adaptados finales:", testimoniosAdaptados);
      setTestimonios(testimoniosAdaptados);
      
      // ← REFRESCAR ESTADÍSTICAS DESPUÉS DE CARGAR TESTIMONIOS
      refreshStats();
      
    } catch (error) {
      console.error("Error al obtener testimonios:", error);
      // En caso de error, establecer array vacío para evitar crashes
      setTestimonios([]);
    } finally {
      setLoading(false);
    }
  };

// Función auxiliar para ordenar por fecha de forma segura
  const ordenarPorFecha = (a, b) => {
    try {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      
      // Verificar que las fechas sean válidas
      if (isNaN(fechaA.getTime()) || isNaN(fechaB.getTime())) {
        return 0; // Si alguna fecha es inválida, mantener orden original
      }
      
      return fechaB - fechaA; // Más reciente primero
    } catch (error) {
      console.error("Error al ordenar por fecha:", error);
      return 0;
    }
  };

  // Testimonios recientes (aprobados y anulados) - máximo 3
  const testimoniosRecientes = useMemo(() => {
    if (!Array.isArray(testimonios) || testimonios.length === 0) {
      return [];
    }
    
    return testimonios
      .filter(t => t && (t.status === "Aprobado" || t.status === "Anulado"))
      .sort(ordenarPorFecha)
      .slice(0, 3);
  }, [testimonios]);

  // Testimonios pendientes de revisión - máximo 3
  const testimoniosPendientes = useMemo(() => {
    if (!Array.isArray(testimonios) || testimonios.length === 0) {
      return [];
    }
    
    return testimonios
      .filter(t => t && t.status === "En espera")
      .sort(ordenarPorFecha)
      .slice(0, 3);
  }, [testimonios]);

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

  // ← FUNCIÓN PARA MANEJAR CAMBIOS DE ESTADO EN TESTIMONIOS
  const handleTestimonialStatusChange = async () => {
    await fetchTestimonios(); // Refrescar testimonios
    refreshStats(); // Refrescar estadísticas
    setSelectedTestimonio(null);
  };

   return (
    <>
      <div className="relative h-full m-7 sm:mt-10 md:ml-55 md:mr-15 cursor-guante">
      
        {/* AdminProfile para pantallas pequeñas - Ahora dentro del contenedor principal */}
        <div className="xl:hidden flex justify-end mb-4">
          <AdminProfile />
        </div>
      
        {/* En pantallas pequeñas, mostrar saludo y stats */}
        <div className="xl:hidden">
          {/* Saludo */}
          <div className="flex items-center justify-center rounded-lg w-full h-40 sm:h-51 bg-black/7">
            <div className="ml-8 sm:ml-0 ">
              <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold basis-[10px] sm:text-3xl shrink-0">Hola Gloria!</h1>
              <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="font-medium text-[15px]">Es bueno verte de nuevo.</p>
            </div>
            <div>
              <img src={imagenBienvenida} className="max-w-[212px] sm:max-w-[257px] shrink-0 grow-0 object-contain mb-8 sm:flex sm:w-65 " alt="Imagen bienvenida" />
            </div>
          </div>
    
          {/* Stats para pantallas pequeñas */}
          <div className="flex flex-row gap-4 mt-5">
            <StatCard 
              value={statsLoading ? "..." : stats.testimonios_aprobados.toString()} 
              label="Testimonios aprobados" 
            />
            <StatCard 
              value={statsLoading ? "..." : stats.testimonios_rechazados.toString()} 
              label="Testimonios anulados" 
            />
            <StatCard 
              value="10" 
              label="Noticias publicadas" 
            />
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
    
              {/* Contenido de testimonios */}
              <div className="flex flex-col mt-4 gap-3">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="text-gray-500">
                      Cargando testimonios...
                    </p>
                  </div>
                ) : testimoniosMostrados.length > 0 ? (
                  testimoniosMostrados.map((testimonio) => (
                    <TestimonialCard
                      key={testimonio.id}
                      name={testimonio.name}
                      position={testimonio.position}
                      imageUrl={testimonio.imageUrl}
                      comment={testimonio.comment}
                      status={testimonio.status}
                      onView={() => setSelectedTestimonio(testimonio)}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-32 bg-black/7 rounded-lg">
                    <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="text-gray-500">
                      {activeTab === "nuevos" 
                        ? "No hay testimonios recientes" 
                        : "No hay testimonios pendientes de revisión"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
    
          {/* Columna derecha en xl */}
          <div className="xl:w-1/2">

            {/* AdminProfile para pantallas grandes - Posición normal dentro del flujo */}
            <div className="hidden xl:flex xl:justify-end mb-4">
              <AdminProfile />
            </div>

            {/* Cuadros de stats - solo visibles en xl+ - ← USAR ESTADÍSTICAS DINÁMICAS */}
            <div className="hidden xl:flex xl:flex-row gap-7">
              <StatCard 
                value={statsLoading ? "..." : stats.testimonios_aprobados.toString()} 
                label="Testimonios aprobados" 
              />
              <StatCard 
                value={statsLoading ? "..." : stats.testimonios_rechazados.toString()} 
                label="Testimonios anulados" 
              />
              <StatCard 
                value="10" 
                label="Noticias publicadas" 
              />
            </div>
    
            {/* Estadísticas - Solo visible en xl */}
            <div className="hidden xl:flex xl:flex-col mt-17">
              <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="font-bold text-2xl mb-5"> Estadísticas </h1>
              <h1 style={{ fontFamily: "'Quicksand', sans-serif" }} className=" text-lg mb-5"> Tasa de aprobación de testimonios </h1>
              <TestimonialStatic/>
            </div>
          </div>
        </div>                                                        
        
        {/* Modal para ver testimonio */}
        {selectedTestimonio && (                                                                                                                                                          
          <TestimonialModal
            isOpen={!!selectedTestimonio}
            onClose={() => setSelectedTestimonio(null)}
            testimonio={selectedTestimonio}
            onStatusChange={handleTestimonialStatusChange}
          />
        )}
        
        {/* Sección de la barra lateral */}
        <Sidebar />
      </div>
    </>
  );  
}  

export default Home;