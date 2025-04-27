import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameButton from "../buttons/GameButton";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

function TestimonialModal({ isOpen, onClose, testimonio }) {
  if (!testimonio) return null;

  // Variantes para las animaciones
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 40,
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 40,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
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
    tap: { 
      scale: 0.95 
    },
    initial: { 
      scale: 1 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo con efecto de desenfoque */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Contenedor del modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              className="rounded-2xl bg-white px-10 pt-10 shadow-lg"
              style={{ width: "auto" }} // Manteniendo el estilo original
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar con solo rotación al hover, sin efecto al click */}
              <div className="text-end">
                <motion.button
                  onClick={onClose}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 text-black hover:text-[#9CE840]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Contenedor de contenido con animaciones escalonadas */}
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Sección de perfil */}
                <motion.div variants={itemVariants} className="w-full flex flex-col items-center">
                  <motion.img
                    src={testimonio.imageUrl}
                    alt={testimonio.name}
                    className="w-30 h-30 rounded-full mb-4"
                    variants={itemVariants}
                  />
                  <motion.h3 variants={itemVariants} className="text-4xl font-adlam">
                    {testimonio.name}
                  </motion.h3>
                  <motion.p variants={itemVariants} className="text-lg font-adlam text-[#3E3E3E]">
                    {testimonio.position}
                  </motion.p>
                </motion.div>

                {/* Detalles del testimonio */}
                <motion.div variants={itemVariants} className="h-auto max-w-120">
                  <div className="flex gap-16 mt-10">
                    <motion.h1 
                      variants={itemVariants} 
                      className="text-2xl text-[#505050] font-adlam"
                    >
                      Título
                    </motion.h1>
                    <motion.p 
                      variants={itemVariants} 
                      className="text-lg text-black font-adlam mt-auto"
                    >
                      {testimonio.titulo}
                    </motion.p>
                  </div>

                  <div className="flex gap-9 mt-3 text-start">
                    <motion.h1 
                      variants={itemVariants} 
                      className="text-2xl text-[#505050] font-adlam"
                    >
                      Mensaje
                    </motion.h1>
                    <motion.p 
                      variants={itemVariants} 
                      className="text-lg text-black font-adlam mt-auto"
                    >
                      {testimonio.comment}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Botones de acción */}
                <motion.div 
                  variants={itemVariants} 
                  className="flex justify-center gap-10 mt-7 w-full h-12"
                >
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <GameButton
                      text="Aprobar"
                      buttonClassName="w-55 h-13 bg-[#9CE840]"
                      icon={<CheckIcon className="text-black" strokeWidth={2.5} />}
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <GameButton
                      text="Rechazar"
                      buttonClassName="w-55 h-13 bg-[#EA4335]"
                      icon={<XMarkIcon className="text-black" strokeWidth={2.5} />}
                    />
                  </motion.div>
                </motion.div>

                {/* Información de la fecha */}
                <motion.div 
                  variants={itemVariants} 
                  className="mt-5 pb-5"
                >
                  <p className="font-adlam text-[#7C7C7C] text-lg">
                    Enviado 7 de Abril de 2025
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TestimonialModal;
