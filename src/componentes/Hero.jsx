// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import nerdImg from '../assets/nerd.png';

const words = ['Futuro', 'Camino', 'Destino', 'Meta', 'Sueño'];

function AnimatedWord({ word }) {
  return (
    <span className="inline-flex overflow-hidden">
      {[...word].map((char, i) => (
        <motion.span
          key={char + i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: i * 0.1,
            type: 'spring',
            stiffness: 700,
            damping: 10,
          }}
          whileTap={{ scale: 1.1, y: -5 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] bg-white overflow-hidden text-center">
      {/* Imagen grande en esquina inferior derecha */}
      <motion.img
        src={nerdImg}
        alt="Nerd"
        className="absolute bottom-0 right-[12rem] w-[250px] sm:w-[300px] md:w-[180px] pointer-events-none z-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <div className="relative z-10 flex flex-col gap-2 items-center justify-center h-full px-6 md:px-16">
        <motion.h1
          className="text-[40px] sm:text-[50px] md:text-[90px] font-extrabold text-[#111] leading-tight"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        >
          Tu{' '}
          <span
            className="relative inline-block bg-gradient-to-r from-[#9CE840] to-[#6FCF00] text-white px-2 py-1 rounded-md select-none"
            style={{ minWidth: '4ch', maxWidth: '7ch', textAlign: 'center', display: 'inline-block' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={words[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-block' }}
              >
                <AnimatedWord word={words[index]} />
              </motion.span>
            </AnimatePresence>
          </span>{' '}
          tu decisión.
        </motion.h1>

        <p className="text-black/50 mt-4 text-lg md:text-2xl">
          Empieza a cambiar tu futuro, con las mejores herramientas
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 12px rgba(111, 207, 0, 0.5)' }}
            whileTap={{ scale: 0.92 }}
            className="bg-[#9CE840] text-white px-6 py-3 sm:px-10 sm:py-4 border rounded-md text-lg sm:text-xl font-bold shadow-md transition-colors duration-200 ease-in-out hover:bg-[#7FBF33]"
          >
            Regístrate →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.92 }}
            className="bg-white text-black px-6 py-3 sm:px-10 sm:py-4 border border-black rounded-md text-lg sm:text-xl font-normal shadow-md transition-colors duration-200 ease-in-out hover:bg-gray-100"
          >
            Descubre
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
