import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import axios from "../../config/axiosConfig";
import GameButton from "../buttons/GameButton";

// Estilos CSS para el scrollbar personalizado
const scrollbarStyles = `
  .testimonial-scroll::-webkit-scrollbar {
    width: 6px;
  }
  
  .testimonial-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .testimonial-scroll::-webkit-scrollbar-thumb {
    background: #9CE840;
    border-radius: 10px;
    transition: background 0.3s ease;
  }
  
  .testimonial-scroll::-webkit-scrollbar-thumb:hover {
    background: #8BD635;
  }
`;

// Inyectar los estilos CSS
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = scrollbarStyles;
  if (!document.head.querySelector('style[data-testimonial-scrollbar]')) {
    styleSheet.setAttribute('data-testimonial-scrollbar', 'true');
    document.head.appendChild(styleSheet);
  }
}

function TestimonialModal({ isOpen, onClose, testimonio, onStatusChange, onCambiarEstado, onEliminar }) {

  const inicial = testimonio?.name ? testimonio.name.charAt(0).toUpperCase() : "?";
  const imageUrl = testimonio?.imageUrl;

  useEffect(() => {
    if (isOpen) {
      // Aplicar overflow hidden inmediatamente y forzar el reflow
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Evita el shift del contenido
      document.documentElement.style.overflow = "hidden"; // También en html
    } else {
      // Restaurar scroll con un pequeño delay para evitar parpadeos
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.documentElement.style.overflow = "";
      }, 100);
    }
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup function
    return () => {
      if (isOpen) {
        window.removeEventListener("keydown", handleKeyDown);
      }
      // Solo restaurar si el componente se desmonta mientras está abierto
      if (isOpen) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [isOpen, onClose]);

const handleAprobar = async () => {
  try {
    // Usar la función proporcionada por el componente padre
    if (onCambiarEstado) {
      const success = await onCambiarEstado(testimonio.id, "aprobado");
      if (success && onStatusChange) {
        await onStatusChange();
      }
    } else {
      // Fallback al método anterior (corrigiendo la URL y parámetro)
      await axios.put(`/api/testimonials/${testimonio.id}/status`, {
        estado: "aprobado"  // Cambiado de 'status' a 'estado'
      });
      if (onStatusChange) await onStatusChange();
    }
    
    // Cerrar el modal automáticamente después de aprobar
    onClose();
  } catch (error) {
    console.error("Error al aprobar:", error.response?.data || error.message);
  }
};

const handleRechazar = async () => {
  try {
    // Usar la función proporcionada por el componente padre
    if (onCambiarEstado) {
      const success = await onCambiarEstado(testimonio.id, "anulado");
      if (success && onStatusChange) {
        await onStatusChange();
      }
    } else {
      // Fallback al método anterior (corrigiendo la URL y parámetro)
      await axios.put(`/api/testimonials/${testimonio.id}/status`, {
        estado: "anulado"  // Cambiado de 'status' a 'estado'
      });
      if (onStatusChange) await onStatusChange();
    }
    
    // Cerrar el modal automáticamente después de rechazar
    onClose();
  } catch (error) {
    console.error("Error al rechazar:", error.response?.data || error.message);
  }
};

const handleEliminar = async () => {
  try {
    if (onEliminar) {
      const success = await onEliminar(testimonio.id);
      if (success) {
        onClose();
      }
    }
  } catch (error) {
    console.error("Error al eliminar:", error.response?.data || error.message);
  }
};

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      } 
    },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 400, 
        duration: 0.3 
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: 0.1 
      } 
    },
    exit: {
      opacity: 0,
      transition: { 
        staggerChildren: 0.03, 
        staggerDirection: -1, 
        when: "afterChildren" 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 300,
        duration: 0.3
      },
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      transition: { duration: 0.15 } 
    },
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { scale: 0.95 },
    initial: { scale: 1 },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && testimonio && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{
            // Asegurar que el modal ocupe toda la pantalla sin causar overflow
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden'
          }}
        >          <motion.div
            className="md:ml-34 2xl:ml-0 rounded-2xl bg-white px-7 pt-7 sm:px-10 sm:pt-10 shadow-2xl z-50 flex flex-col"
            style={{ 
              width: "auto",
              maxWidth: "min(90vw, 600px)",
              maxHeight: "90vh",
              contain: "layout"
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <div className="text-end">
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="hover:bg-gray-100 rounded-full p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-black hover:text-[#9CE840]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>            {/* Contenido */}
            <motion.div
              className="flex flex-col items-center text-center flex-1 min-h-0"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={itemVariants} className="w-full flex flex-col items-center flex-shrink-0">
                {imageUrl ? (
                  <motion.img
                    src={imageUrl}
                    alt={testimonio.name}
                    className="h-15 w-15 sm:w-30 sm:h-30 rounded-full mb-4 object-cover"
                    variants={itemVariants}
                  />
                ) : (
                  <div className="flex items-center justify-center rounded-full bg-gray-600 text-white font-bold text-3xl h-15 w-15 sm:w-30 sm:h-30 mb-4">
                    {inicial}
                  </div>
                )}
                <motion.h3 variants={itemVariants} className="text-xl sm:text-4xl font-adlam">
                  {testimonio.name}
                </motion.h3>
                <motion.p variants={itemVariants} className="text-sm sm:text-lg font-adlam text-[#3E3E3E]">
                  {testimonio.position}
                </motion.p>
              </motion.div>              {/* Sección scrolleable para el contenido del testimonio */}
              <motion.div 
                variants={itemVariants} 
                className="flex-1 overflow-y-auto min-h-0 w-full px-2 testimonial-scroll"
                style={{
                  maxHeight: 'calc(90vh - 300px)', // Reserva espacio para header y botones
                }}
              >
                <div className="h-auto sm:max-w-120 mx-auto">
                  <div className="flex gap-13 text-start sm:gap-16 mt-10">
                    <motion.h1 variants={itemVariants} className="text-[13px] sm:text-2xl text-[#505050] font-adlam flex-shrink-0">
                      Título
                    </motion.h1>
                    <motion.p
                      variants={itemVariants}
                      className="text-[13px] w-40 sm:w-full text-sm sm:text-lg text-black font-adlam mt-auto"
                    >
                      {testimonio.titulo}
                    </motion.p>
                  </div>

                  <div className="flex gap-9 mt-3 text-start">                    <motion.h1 variants={itemVariants} className="text-[13px] sm:text-2xl text-[#505050] font-adlam flex-shrink-0">
                      Mensaje
                    </motion.h1>
                    <motion.p
                      variants={itemVariants}
                      className="text-[13px] w-45 sm:w-full sm:text-lg text-black font-adlam mt-auto"
                    >
                      {testimonio.comment}
                    </motion.p>
                  </div>
                </div>
              </motion.div>              {/* Botones fijos en la parte inferior */}
              <motion.div variants={itemVariants} className="flex justify-center gap-4 sm:gap-6 mt-7 w-full flex-shrink-0">
                {testimonio.status === "Anulado" ? (
                  // Para testimonios anulados: mostrar botón de aprobar (por si se equivocó) y eliminar
                  <>
                    <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                      <GameButton
                        text="Aprobar"
                        buttonClassName="w-27 sm:w-55 sm:h-13 bg-[#9CE840] hover:bg-[#8BD635] transition-colors"
                        icon={<CheckIcon className="text-black" strokeWidth={2.5} />}
                        onClick={handleAprobar}
                      />
                    </motion.div>
                    <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                      <GameButton
                        text="Eliminar"
                        buttonClassName="w-27 sm:w-55 sm:h-13 bg-[#DC2626] hover:bg-[#B91C1C] transition-colors"
                        icon={<TrashIcon className="text-white" strokeWidth={2.5} />}
                        onClick={handleEliminar}
                      />
                    </motion.div>
                  </>
                ) : (
                  // Mostrar botones de aprobar y rechazar para otros estados
                  <>
                    <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                      <GameButton
                        text="Aprobar"
                        buttonClassName="w-27 sm:w-55 sm:h-13 bg-[#9CE840] hover:bg-[#8BD635] transition-colors"
                        icon={<CheckIcon className="text-black" strokeWidth={2.5} />}
                        onClick={handleAprobar}
                      />
                    </motion.div>
                    <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
                      <GameButton
                        text="Rechazar"
                        buttonClassName="w-27 sm:w-55 sm:h-13 bg-[#EA4335] hover:bg-[#D33B2C] transition-colors"
                        icon={<XMarkIcon className="text-black" strokeWidth={2.5} />}
                        onClick={handleRechazar}
                      />
                    </motion.div>
                  </>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="mt-5 pb-5 flex-shrink-0">
                <p className="font-adlam text-[#7C7C7C] text-sm sm:text-lg">
                  {testimonio.fecha
                    ? (() => {
                        const fechaFormateada = new Date(testimonio.fecha).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        });
                        // Capitaliza la primera letra del mes
                        return `Enviado ${fechaFormateada.replace(
                          / de ([a-z])/,
                          (match, p1) => " de " + p1.toUpperCase()
                        )}`;
                      })()
                    : "Sin fecha"}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TestimonialModal;1