import { AnimatePresence, motion } from "framer-motion";
import FilterButton from "./FilterButton";

const FiltroModal = ({
  filters,
  activeFilter,
  onFilterChange, // Cambiado de setActiveFilter a onFilterChange
  onClose,
  title = "Selecciona un filtro",
}) => {
  // Variantes para las animaciones
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300, duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 40,
      transition: { type: "spring", damping: 25, stiffness: 300, duration: 0.4 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 300 }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <motion.div
          className="bg-white p-6 rounded-xl w-80 shadow-lg"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-end mb-4">
            <motion.button
              onClick={onClose}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              aria-label="Cerrar modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 text-black hover:text-[#9CE840]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          <motion.div
            className="flex flex-col gap-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-adlam text-center">
              {title}
            </motion.h2>

            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter}
                  onClick={() => onFilterChange(filter)} // Cambiado aquí
                />
              ))}
            </motion.div>

            <motion.button
              variants={itemVariants}
              onClick={onClose}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-adlam transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cerrar
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FiltroModal;