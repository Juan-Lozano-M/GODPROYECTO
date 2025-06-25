import { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminProfile from "../../components/admin/AdminProfile";
import DataStat from "../../components/admin/DataStat";
import FeedbackCard from "../../components/admin/FeedBackCart";
import FilterButton from "../../components/admin/FilterButton";
import FiltroModal from "../../components/admin/FiltroModal";
import TestimonialModal from "../../components/admin/TestimonialModal";
import Toast from "../../components/alertas/Toast";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import axiosInstance from "../../config/axiosConfig";

import filtroTestimonial from "../../assets/icons/filtroTestimonial.png";
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import iconNotResult from "../../assets/icons/iconNotResult.png";


function Testimonials() {  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedTestimonio, setSelectedTestimonio] = useState(null);
  const [isFiltroModalOpen, setIsFiltroModalOpen] = useState(false);
  const [testimonios, setTestimonios] = useState([]);  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testimonioToDelete, setTestimonioToDelete] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Estados para tracking de cambios durante la sesión
  const [contadoresIniciales, setContadoresIniciales] = useState({
    Aprobado: 0,
    Anulado: 0,
    "En espera": 0,
  });

  const [cambiosSesion, setCambiosSesion] = useState({
    Aprobado: 0,
    Anulado: 0,
    "En espera": 0,
  });

  // Flag para saber si es la primera carga
  const isFirstLoad = useRef(true);

  // Función para validar y procesar la URL de la imagen
  const processImageUrl = (imageUrl) => {
    if (!imageUrl || imageUrl.trim() === '') {
      return null;
    }
    
    // Si la URL ya es completa, devolverla tal como está
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Si es una URL relativa, construir la URL completa
    // Ajusta esto según tu configuración de servidor
    return imageUrl;
  };
  // Función para obtener testimonios con información del usuario
  const fetchTestimonios = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('Fetching testimonios...');
      
      // Primero intentar con el endpoint que incluye información del usuario
      const response = await axiosInstance.get("/api/testimonials/with-user");
      const data = response.data;
      
      console.log('Raw data from API:', data);
      
      const testimoniosAdaptados = data.map((t) => {
        const processedImageUrl = processImageUrl(t.profile_image);
        
        console.log(`Testimonio ${t.id_tes}:`, {
          nombre: t.nombre_usuario,
          profile_image_original: t.profile_image,
          profile_image_processed: processedImageUrl
        });
        
        return {
          id: t.id_tes,                    
          name: t.nombre_usuario,          
          position: t.cargo_tes,           
          status: t.estado_tes === "aprobado" ? "Aprobado" : 
                  t.estado_tes === "anulado" ? "Anulado" : "En espera", 
          statusColor:
            t.estado_tes === "aprobado"    
              ? "Green"
              : t.estado_tes === "anulado" 
              ? "Red"
              : "Yellow",
          imageUrl: processedImageUrl,
          titulo: t.titulo_tes,            
          comment: t.contenido_tes,        
          fecha: t.fecha_publicacion_tes,  
        };
      });
      
      console.log('Testimonios adaptados:', testimoniosAdaptados);
      setTestimonios(testimoniosAdaptados);

      // Si es la primera carga, establecer contadores iniciales
      if (isFirstLoad.current) {
        const contadoresActuales = {
          Aprobado: testimoniosAdaptados.filter(t => t.status === "Aprobado").length,
          Anulado: testimoniosAdaptados.filter(t => t.status === "Anulado").length,
          "En espera": testimoniosAdaptados.filter(t => t.status === "En espera").length,
        };
        
        console.log('Estableciendo contadores iniciales:', contadoresActuales);
        setContadoresIniciales(contadoresActuales);
        isFirstLoad.current = false;
      }
      
    } catch (error) {
      console.error("Error al obtener testimonios:", error);
      
      // Si falla el endpoint principal, intentar con el endpoint de fallback
      try {
        console.log('Intentando con endpoint de fallback...');
        const fallbackResponse = await axiosInstance.get("/api/testimonials");
        const fallbackData = fallbackResponse.data;
        
        console.log('Fallback data:', fallbackData);
        
        const testimoniosAdaptados = fallbackData.map((t) => {
          const processedImageUrl = processImageUrl(t.profile_image);
          
          return {
            id: t.id_tes,                    
            name: t.nombre_usuario,          
            position: t.cargo_tes,           
            status: t.estado_tes === "aprobado" ? "Aprobado" : 
                    t.estado_tes === "anulado" ? "Anulado" : "En espera", 
            statusColor:
              t.estado_tes === "aprobado"    
                ? "Green"
                : t.estado_tes === "anulado" 
                ? "Red"
                : "Yellow",
            imageUrl: processedImageUrl,
            titulo: t.titulo_tes,            
            comment: t.contenido_tes,        
            fecha: t.fecha_publicacion_tes,  
          };
        });
        
        setTestimonios(testimoniosAdaptados);
        
        // Establecer contadores iniciales si es la primera carga
        if (isFirstLoad.current) {
          const contadoresActuales = {
            Aprobado: testimoniosAdaptados.filter(t => t.status === "Aprobado").length,
            Anulado: testimoniosAdaptados.filter(t => t.status === "Anulado").length,
            "En espera": testimoniosAdaptados.filter(t => t.status === "En espera").length,
          };
          
          setContadoresIniciales(contadoresActuales);
          isFirstLoad.current = false;
        }
        
      } catch (fallbackError) {
        console.error("Error en fallback:", fallbackError);        // Podrías mostrar un mensaje de error al usuario aquí
        alert("Error al cargar los testimonios. Por favor, intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  // Función para cambiar el estado del testimonio
  const cambiarEstadoTestimonio = async (testimonioId, nuevoEstado) => {
    try {
      console.log(`Cambiando estado del testimonio ${testimonioId} a ${nuevoEstado}`);
      
      // Encontrar el testimonio actual para saber su estado anterior
      const testimonioActual = testimonios.find(t => t.id === testimonioId);
      const estadoAnterior = testimonioActual?.status;
      
      console.log(`Estado anterior: ${estadoAnterior}, Nuevo estado: ${nuevoEstado}`);
      
      const response = await axiosInstance.put(
        `/api/testimonials/${testimonioId}/status`,
        { estado: nuevoEstado }
      );
      
      if (response.status === 200) {
        console.log('Estado cambiado exitosamente en backend');
        
        // Actualizar los cambios de la sesión ANTES de actualizar testimonios
        if (estadoAnterior && estadoAnterior !== nuevoEstado) {
          setCambiosSesion(prevCambios => {
            const nuevosCambios = { ...prevCambios };
            
            // Restar del estado anterior
            if (estadoAnterior === "Aprobado") nuevosCambios.Aprobado -= 1;
            else if (estadoAnterior === "Anulado") nuevosCambios.Anulado -= 1;
            else if (estadoAnterior === "En espera") nuevosCambios["En espera"] -= 1;
            
            // Sumar al nuevo estado
            if (nuevoEstado === "aprobado") nuevosCambios.Aprobado += 1;
            else if (nuevoEstado === "anulado") nuevosCambios.Anulado += 1;
            else if (nuevoEstado === "en espera") nuevosCambios["En espera"] += 1;
            
            console.log('Cambios actualizados:', {
              anterior: prevCambios,
              nuevo: nuevosCambios,
              transicion: `${estadoAnterior} -> ${nuevoEstado}`
            });
            
            return nuevosCambios;
          });
        }
        
        // Actualizar la lista de testimonios
        await fetchTestimonios();
        return true;
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      return false;
    }
  };
  // 🗑️ FUNCIÓN PARA ELIMINAR TESTIMONIO PERMANENTEMENTE
  const eliminarTestimonio = async (testimonioId) => {
    try {
      console.log(`Iniciando eliminación del testimonio ${testimonioId}`);
      
      // Mostrar modal de confirmación en lugar de window.confirm
      setTestimonioToDelete(testimonioId);
      setShowDeleteModal(true);
      
      return true; // Retorna true para indicar que el proceso se inició
    } catch (error) {
      console.error('Error al iniciar eliminación:', error);
      return false;
    }
  };

  // Función para confirmar la eliminación desde el modal
  const confirmDeleteTestimonio = async () => {
    if (!testimonioToDelete) return;
    
    try {
      setIsLoading(true);
      console.log(`Eliminando testimonio ${testimonioToDelete} permanentemente`);
      
      const response = await axiosInstance.delete(`/api/testimonials/${testimonioToDelete}`);
        if (response.status === 200 || response.status === 204) {
        console.log('Testimonio eliminado exitosamente');
        
        // Actualizar la lista de testimonios
        await fetchTestimonios();
        
        // Cerrar modal y limpiar estado
        setShowDeleteModal(false);
        setTestimonioToDelete(null);
        
        // Mostrar toast de éxito
        setShowToast(true);
        
        return true;
      }
    } catch (error) {
      console.error('Error al eliminar testimonio:', error);
      alert("❌ Error al eliminar el testimonio. Inténtalo de nuevo.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función mejorada para manejar cambios de estado
  const handleStatusChange = async (testimonioId, nuevoEstado) => {
    try {
      setIsLoading(true);
      const success = await cambiarEstadoTestimonio(testimonioId, nuevoEstado);
      
      if (success) {
        setSelectedTestimonio(null);
        console.log('Estado actualizado y modal cerrado');
      } else {
        console.error('Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error en handleStatusChange:', error);
    } finally {
      setIsLoading(false);
    }
  };    // Cargar datos al montar el componente
  useEffect(() => {
    fetchTestimonios();
  }, [fetchTestimonios]);

  // Cálculo de estadísticas actuales
  const countByStatus = (status) =>
    testimonios.filter((t) => t.status === status).length;

  const totalAprobados = countByStatus("Aprobado");
  const totalAnulados = countByStatus("Anulado");
  const totalEnEspera = countByStatus("En espera");

  const filtroTraducido = {
    Aprobados: "Aprobado",
    Anulados: "Anulado",
    "En espera": "En espera",
    Todos: "Todos",
  };

  const filters = ["Aprobados", "Anulados", "En espera"];

  const testimoniosFiltrados = testimonios.filter((t) => {
    const filtro = filtroTraducido[activeFilter];
    if (filtro === "Todos") return true;
    return t.status === filtro;
  });

  // Función modificada para mostrar solo indicadores positivos
  const getIcon = (cambio) => {
    // Solo mostrar flecha hacia arriba si hay cambios positivos
    return cambio > 0 ? flechaTestimonialArriba : flechaTestimonialArriba;
  };

  // Función para obtener el indicador (solo mostrar si es positivo)
  const getIndicator = (cambio) => {
    return cambio > 0 ? cambio : 0;
  };

  const handleOpenModal = (testimonio) => {
    setSelectedTestimonio(testimonio);
  };

  const handleCloseModal = () => {
    setSelectedTestimonio(null);
  };

  return (
    <div className="h-full m-7 sm:mt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15">
      
      {/* Header con título y AdminProfile en esquinas opuestas */}
      <div className="flex items-center justify-between mt-6 2xl:mt-0">
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-adlam">TESTIMONIOS</h1>
        <AdminProfile />
      </div>

      {/* Indicador de carga */}
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="text-blue-500">Actualizando...</div>
        </div>
      )}

      <div className="flex flex-wrap sm:flex-row mt-6 gap-5 sm:gap-10 lg:gap-20 h-auto">
        <DataStat
          value={totalAprobados}
          indicator={getIndicator(cambiosSesion.Aprobado)}
          label="Aprobados"
          iconSrc={getIcon(cambiosSesion.Aprobado)}
          bgColor="#9CE840"
        />
        <DataStat
          value={totalAnulados}
          indicator={getIndicator(cambiosSesion.Anulado)}
          label="Anulados"
          iconSrc={getIcon(cambiosSesion.Anulado)}
          bgColor="#EA4335"
        />
        <DataStat
          value={totalEnEspera}
          indicator={getIndicator(cambiosSesion["En espera"])}
          label="En espera"
          iconSrc={getIcon(cambiosSesion["En espera"])}
          bgColor="#FFBE00"
        />
      </div>

      <div className="flex items-center justify-between mt-5 md:mt-10 py-2 w-full h-auto">
        <div className="flex items-center gap-4 sm:gap-7 xl:gap-10">
          <p className="text-lg sm:text-3xl lg:text-2xl xl:text-4xl font-adlam"> Nuevos testimonios </p>
          <div className="h-7 w-0.5 sm:h-10 sm:w-0.5 bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex gap-4">
              <FilterButton
                label="Todos"
                isActive={activeFilter === "Todos"}
                onClick={() => setActiveFilter("Todos")}
              />
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>
            <div className="flex lg:hidden gap-4">
              <FilterButton
                label="Filtro"
                isActive={false}
                onClick={() => setIsFiltroModalOpen(true)}
                iconSrc={filtroTestimonial}
              />
              <FilterButton
                label="Todos"
                isActive={activeFilter === "Todos"}
                onClick={() => setActiveFilter("Todos")}
              />
            </div>
          </div>
        </div>
      </div>

      {testimoniosFiltrados.length === 0 ? (
        <div className="w-full flex justify-center items-center mt-10">
          <div className="flex flex-col gap-4 text-xl text-gray-500 p-4 text-center">
            <div>
              <img src={iconNotResult} className="h-40 w-50 sm:h-60 sm:w-80 mx-auto" alt="Imagen de no resultados" />
            </div>
            <div className="font-bold font-adlam text-2xl sm:text-4xl">
              Oops,
            </div>
            <div className="w-70 sm:w-90 text-gray-400 font-light text-lg sm:text-xl font-quicksand">
              No hay testimonios disponibles en esta categoría por el momento.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start gap-6 sm:gap-7 lg:gap-10 w-full mt-5">
          {testimoniosFiltrados.map((t) => {
            return (
              <FeedbackCard
                key={t.id}
                name={t.name}
                position={t.position}
                status={t.status}
                statusColor={t.statusColor}
                imageUrl={t.imageUrl}
                comment={t.comment}
                onView={() => handleOpenModal(t)}
              />
            );
          })}
        </div>
      )}      {selectedTestimonio && (
        <TestimonialModal
          isOpen={!!selectedTestimonio}
          onClose={handleCloseModal}
          testimonio={selectedTestimonio}
          onStatusChange={(nuevoEstado) => handleStatusChange(selectedTestimonio.id, nuevoEstado)}
          onCambiarEstado={cambiarEstadoTestimonio}
          onEliminar={eliminarTestimonio}
        />
      )}      {isFiltroModalOpen && (
        <FiltroModal
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={(filter) => {
            setActiveFilter(filter);
            setIsFiltroModalOpen(false);
          }}
          onClose={() => setIsFiltroModalOpen(false)}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTestimonioToDelete(null);
        }}
        onConfirm={confirmDeleteTestimonio}
        title="Eliminar Testimonio"
        message="¿Estás seguro de que quieres eliminar este testimonio permanentemente? Esta acción NO se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isLoading}
        loadingText="Eliminando..."        variant="danger"
      />

      {/* Toast de confirmación */}
      <Toast 
        title="¡Éxito!"
        message="Testimonio eliminado exitosamente"
        show={showToast}
        setShow={setShowToast}
      />

      <Sidebar />
    </div>
  );
}

export default Testimonials;