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
    <div className="relative h-[85vh] bg-[#fafafa] overflow-hidden text-center hero-wrapper">
      {/* Imagen grande en esquina inferior derecha */}
      <motion.img
        src={nerdImg}
        alt="Nerd"
        className="absolute bottom-0 right-4 sm:right-[12rem] w-[150px] sm:w-[250px] md:w-[180px] pointer-events-none z-0 opacity-30 sm:opacity-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <div className="relative z-10 flex flex-col gap-2 items-center justify-center h-full px-4 sm:px-6 md:px-16">
        <motion.h1
          className="text-[32px] sm:text-[50px] md:text-[90px] font-extrabold text-[#111] leading-tight hero-title"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        >
          Tu{' '}
          <span
            className="relative inline-block bg-[#9CE840]  text-white px-2 py-1 rounded-md select-none"
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

        <p className="text-black/50 mt-4 text-base sm:text-lg md:text-2xl hero-subtext max-w-md sm:max-w-none">
          Empieza a cambiar tu futuro, con las mejores herramientas
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 12px rgba(111, 207, 0, 0.5)' }}
            whileTap={{ scale: 0.92 }}
            className="bg-[#9CE840] text-white px-8 py-3 sm:px-10 sm:py-4 border rounded-md text-base sm:text-lg md:text-xl font-bold shadow-md transition-colors duration-200 ease-in-out hover:bg-[#7FBF33] w-full sm:w-auto"
          >
            Regístrate →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.92 }}
            className="bg-white text-black px-8 py-3 sm:px-10 sm:py-4 border border-black rounded-md text-base sm:text-lg md:text-xl font-normal shadow-md transition-colors duration-200 ease-in-out hover:bg-gray-100 w-full sm:w-auto"
          >
            Descubre
          </motion.button>
        </div>
      </div>

      {/* Estilos específicos solo para Hero */}
      <style>{`
        /* Control de altura del contenedor para pantallas muy bajas */
        @media (max-height: 500px) {
          .hero-wrapper {
            height: 100vh !important; /* Usar toda la altura disponible */
            min-height: 450px !important; /* Altura mínima para evitar compresión excesiva */
          }
          .hero-title {
            font-size: 1.5rem !important;
            line-height: 1.1 !important;
          }
          .hero-subtext {
            font-size: 0.8rem !important;
            margin-top: 0.5rem !important;
          }
          .hero-wrapper img {
            width: 80px !important;
            right: 0.5rem !important;
            opacity: 0.1 !important;
          }
          /* Botones para pantallas muy bajas */
          .hero-wrapper button {
            padding: 0.5rem 1.5rem !important;
            font-size: 0.75rem !important;
            margin-top: 0.5rem !important;
          }
          .hero-wrapper .mt-6 {
            margin-top: 0.75rem !important;
          }
        }

        /* Pantallas con altura baja (tablets en horizontal, laptops pequeñas) */
        @media (max-height: 600px) {
          .hero-wrapper {
            height: 90vh !important;
            min-height: 500px !important;
          }
          .hero-title {
            font-size: 2rem !important;
            line-height: 1.2 !important;
          }
          .hero-subtext {
            font-size: 0.9rem !important;
            margin-top: 0.75rem !important;
          }
          .hero-wrapper img {
            width: 120px !important;
            right: 2rem !important;
            opacity: 0.2 !important;
          }
          /* Botones para pantallas con altura baja */
          .hero-wrapper button {
            padding: 0.6rem 1.8rem !important;
            font-size: 0.85rem !important;
          }
          .hero-wrapper .mt-6 {
            margin-top: 1rem !important;
          }
        }

        /* Pantallas con altura media-baja */
        @media (max-height: 700px) {
          .hero-wrapper {
            height: 75vh !important;
            
          }
          .hero-title {
            font-size: 3rem !important;
          }
          .hero-subtext {
            font-size: 1.2rem !important;
          }
          .hero-wrapper img {
            width: 150px !important;
            right: 8rem !important;
          }
          /* Botones para pantallas con altura media-baja */
          .hero-wrapper button {
            padding: 0.75rem 2rem !important;
            font-size: 0.95rem !important;
          }
          .hero-wrapper .mt-6 {
            margin-top: 1.25rem !important;
          }
        }

        /* Pantallas con altura normal */
        @media (min-height: 701px) and (max-height: 900px) {
          .hero-wrapper {
            height: 85vh !important;
            min-height: 600px !important;
          }
        }

        /* Pantallas con mucha altura (monitores grandes) */
        @media (min-height: 901px) {
          .hero-wrapper {
            height: 80vh !important;
            max-height: 800px !important; /* Limitar altura máxima */
          }
        }

        /* Pantallas móviles con poca altura (modo horizontal) */
        @media (max-width: 640px) and (max-height: 500px) {
          .hero-wrapper {
            height: 100vh !important;
            min-height: 400px !important;
          }
          .hero-wrapper img {
            width: 60px !important;
            right: 0.5rem !important;
            opacity: 0.1 !important;
          }
          .hero-title {
            font-size: 1.3rem !important;
            line-height: 1.1 !important;
          }
          .hero-subtext {
            font-size: 0.75rem !important;
            line-height: 1.3 !important;
          }
          /* Botones para móviles horizontales con poca altura */
          .hero-wrapper button {
            padding: 0.4rem 1.2rem !important;
            font-size: 0.7rem !important;
            border-radius: 4px !important;
          }
          .hero-wrapper .mt-6 {
            margin-top: 0.5rem !important;
          }
          .hero-wrapper .space-y-3 > * + * {
            margin-top: 0.25rem !important;
          }
        }

        /* Estilos móviles normales */
        @media (max-width: 640px) {
          .hero-wrapper img {
            width: 120px !important;
            right: 1rem !important;
            opacity: 0.2 !important;
          }
          .hero-title {
            font-size: 2rem !important;
            line-height: 1.2 !important;
          }
          .hero-subtext {
            font-size: 0.95rem !important;
            line-height: 1.4 !important;
          }
        }

        @media (max-width: 480px) {
          .hero-wrapper img {
            width: 100px !important;
            right: 0.5rem !important;
            opacity: 0.15 !important;
          }
          .hero-title {
            font-size: 1.8rem !important;
          }
          .hero-subtext {
            font-size: 0.9rem !important;
          }
        }

        /* Pantallas muy grandes */
        @media (min-width: 1600px) {
          .hero-title {
            font-size: 5rem !important;
          }
          .hero-subtext {
            font-size: 1.5rem !important;
          }
          .hero-wrapper img {
            width: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Hero;