import React from 'react';
import { motion } from 'framer-motion';
import Personaje2 from "./personaje2";
import TextoHero from "./textohero";


function Hero() {
  return (
    <div className="relative  md:h-[90vh]  xl:h-[90vh] 2xl:h-[90vh] bg-[#A4FF00] overflow-hidden">
      

      <div className="flex items-center justify-center h-[calc(100vh-80px)] px-6 md:px-16 relative z-10">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <TextoHero />
        </motion.div>
      </div>

      {/* Personaje con animación de entrada lateral */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
        className="absolute bottom-0 -right-10 z-0"
      >
        <Personaje2 />
      </motion.div>
    </div>
  );
}

export default Hero;
