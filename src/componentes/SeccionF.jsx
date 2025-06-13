import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Gallo from '../assets/gallina.png';
import Face from '../assets/Facebook.png';
import Insta from '../assets/Instagram.png';

function SeccionF() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transition = { duration: 0.5, ease: 'easeOut' };

  return (
    <>
      <section
        id="seccionF"
        ref={sectionRef}
        className=" bg-transparent px-4 sm:px-6 py-16 sm:py-20 md:py-16 lg:py-20 xl:py-24 2xl:py-28 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
          minHeight: 'auto',
          marginTop: '4rem',
          marginBottom: '4rem',
        }}
      >
        {/* Imagen Gallina - Izquierda en desktop, abajo en móvil */}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={visible ? { scale: 1 } : { scale: 0.5 }}
          transition={transition}
          className="flex justify-center items-center mt-4 sm:mt-0 sm:mr-8 flex-shrink-0 order-2 sm:order-1"
        >
          <img
            src={Gallo}
            alt="Gallina representativa"
            className="w-[280px] xs:w-[320px] sm:w-[450px] md:w-[520px] lg:w-[580px] xl:w-[650px] 2xl:w-[720px] h-auto max-w-full"
          />
        </motion.div>

        {/* Texto y botón - Después de gallina en móvil, derecha en desktop */}
        <motion.article
          initial={{ scale: 0.5 }}
          animate={visible ? { scale: 1 } : { scale: 0.5 }}
          transition={transition}
          className="flex flex-col items-center text-center gap-3 sm:gap-2 max-w-[520px] w-full order-1 sm:order-2"
        >
          <p className="text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11rem] font-bold text-gray-900 leading-tight mb-1">
            Únete a
          </p>
          <p className="bg-[#9CE840] px-5 xs:px-6 py-3 sm:py-4 rounded-md text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-extrabold text-black tracking-wide mb-2">
            Game of Dreams
          </p>
          <p className="mt-0 text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-gray-700 font-medium leading-relaxed px-2">
            Miles de estudiantes ya están <br className="hidden xs:block" /> 
            <span className="xs:hidden">transformando su futuro.</span>
            <span className="hidden xs:inline">transformando su futuro.</span>
          </p>

          {/* Botón */}
          <Link to="/contacto" className="mt-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white text-black px-8 py-4 xs:px-10 xs:py-5 sm:px-12 sm:py-5 md:px-14 md:py-6 lg:px-16 lg:py-7 xl:px-20 xl:py-9 2xl:px-24 2xl:py-10 border border-black rounded-md text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
              ¡Contáctanos!
            </motion.button>
          </Link>

          {/* Redes Sociales */}
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl mt-4 sm:mt-6 text-gray-800 font-semibold tracking-wide">
            Redes:
          </p>

          <motion.div
            initial={{ scale: 0.5 }}
            animate={visible ? { scale: 1 } : { scale: 0.5 }}
            transition={transition}
            className="flex gap-4 sm:gap-6 items-center justify-center"
          >
            <img
              src={Face}
              alt="Facebook"
              className="w-[48px] xs:w-[52px] sm:w-[70px] md:w-[80px] lg:w-[90px] xl:w-[100px] 2xl:w-[110px] h-auto cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
            />
            <img
              src={Insta}
              alt="Instagram"
              className="w-[48px] xs:w-[52px] sm:w-[70px] md:w-[80px] lg:w-[90px] xl:w-[100px] 2xl:w-[110px] h-auto cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
            />
          </motion.div>
        </motion.article>
      </section>

      {/* Estilos para media queries */}
      <style>{`
        /* Extra small devices (hasta 475px) */
        @media (max-width: 475px) {
          #seccionF {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            min-height: auto !important;
            margin-top: 2.5rem !important;
            margin-bottom: 2.5rem !important;
          }
          
          #seccionF img[alt="Gallina representativa"] {
            max-width: 260px !important;
            height: auto !important;
          }
          
          #seccionF p:first-child {
            font-size: 2.25rem !important;
            line-height: 1.2 !important;
            margin-bottom: 0.5rem !important;
          }
          
          #seccionF .bg-\\[\\#9CE840\\] {
            font-size: 2.25rem !important;
            padding: 0.75rem 1.25rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          #seccionF button {
            font-size: 1.125rem !important;
            padding: 1rem 2rem !important;
          }
        }

        /* Dispositivos con altura pequeña */
        @media (max-height: 700px) {
          #seccionF {
            min-height: auto !important;
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
            margin-top: 2rem !important;
            margin-bottom: 2rem !important;
          }
          
          #seccionF > div:first-child {
            margin-bottom: 1rem !important;
          }
          
          #seccionF img[alt="Gallina representativa"] {
            max-width: 320px !important;
          }
          
          #seccionF p:first-child {
            font-size: 2rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          #seccionF .bg-\\[\\#9CE840\\] {
            font-size: 2rem !important;
            padding: 0.5rem 1rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          #seccionF p:not(:first-child):not(.bg-\\[\\#9CE840\\]):not(:last-of-type) {
            font-size: 1rem !important;
            margin-top: 0.25rem !important;
          }
          
          #seccionF button {
            font-size: 1rem !important;
            padding: 0.5rem 1.5rem !important;
          }
          
          #seccionF .flex.gap-4 img, 
          #seccionF .flex.gap-6 img {
            width: 50px !important;
          }
        }

        /* Dispositivos muy pequeños con altura limitada */
        @media (max-width: 380px) and (max-height: 700px) {
          #seccionF {
            padding: 1.5rem 0.75rem !important;
            gap: 0.75rem !important;
            margin-top: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          #seccionF img[alt="Gallina representativa"] {
            max-width: 240px !important;
          }
          
          #seccionF p:first-child {
            font-size: 1.875rem !important;
          }
          
          #seccionF .bg-\\[\\#9CE840\\] {
            font-size: 1.875rem !important;
            padding: 0.5rem 1rem !important;
          }
        }

        /* Tablets y pantallas medianas */
        @media (min-width: 640px) and (max-width: 1024px) {
          #seccionF {
            margin-top: 5rem !important;
            margin-bottom: 5rem !important;
          }
        }

        /* Pantallas grandes (desktop) - Menos espacio entre secciones */
        @media (min-width: 1024px) {
          #seccionF {
            margin-top: 3rem !important;
            margin-bottom: 3rem !important;
          }
        }

        /* Pantallas extra grandes - Menos espacio entre secciones */
        @media (min-width: 1536px) {
          #seccionF {
            margin-top: 4rem !important;
            margin-bottom: 4rem !important;
          }
        }

        /* Breakpoint personalizado para xs */
        @media (min-width: 376px) {
          .xs\\:w-\\[320px\\] { width: 320px; }
          .xs\\:w-\\[52px\\] { width: 52px; }
          .xs\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .xs\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .xs\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .xs\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .xs\\:px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
          .xs\\:py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
          .xs\\:block { display: block; }
          .xs\\:hidden { display: none; }
          .xs\\:inline { display: inline; }
        }
      `}</style>
    </>
  );
}

export default SeccionF;