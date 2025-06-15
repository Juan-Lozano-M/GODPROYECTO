import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import GameButton from "../buttons/GameButton";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

function TestimonialModal({ isOpen, onClose, testimonio, onStatusChange, onCambiarEstado }) {

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
      await axios.put(`http://localhost:5000/api/testimonials/${testimonio.id}/status`, {
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
      await axios.put(`http://localhost:5000/api/testimonials/${testimonio.id}/status`, {
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
        >
          <motion.div
            className="md:ml-34 2xl:ml-0 rounded-2xl bg-white px-7 pt-7 sm:px-10 sm:pt-10 shadow-2xl max-h-[90vh] overflow-y-auto z-50"
            style={{ 
              width: "auto",
              maxWidth: "min(90vw, 600px)",
              maxHeight: "90vh",
              // Ocultar completamente cualquier scrollbar
              overflow: "hidden",
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
            </div>

            {/* Contenido */}
            <motion.div
              className="flex flex-col items-center text-center"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div variants={itemVariants} className="w-full flex flex-col items-center">
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
              </motion.div>

              <motion.div variants={itemVariants} className="h-auto sm:max-w-120">
                <div className="flex gap-13 text-start sm:gap-16 mt-10">
                  <motion.h1 variants={itemVariants} className="text-[13px] sm:text-2xl text-[#505050] font-adlam">
                    Título
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-[13px] w-40 sm:w-full text-sm sm:text-lg text-black font-adlam mt-auto"
                  >
                    {testimonio.titulo}
                  </motion.p>
                </div>

                <div className="flex gap-9 mt-3 text-start">
                  <motion.h1 variants={itemVariants} className="text-[13px] sm:text-2xl text-[#505050] font-adlam">
                    Mensaje
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-[13px] w-45 sm:w-full sm:text-lg text-black font-adlam mt-auto"
                  >
                    {testimonio.comment}
                  </motion.p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-center gap-8 sm:gap-10 mt-7 w-full">
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
              </motion.div>

              <motion.div variants={itemVariants} className="mt-5 pb-5">
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