import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import cabezaImg from '../assets/personajeGOD2_cabeza.png';
import pupilasImg from '../assets/personajeGOD2_pupilas.png';
import cuerpoImg from '../assets/personajeGOD2cuerpo.png';

const Personaje = () => {
  const containerRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const smoothX = useSpring(rawX, { stiffness: 100, damping: 15 });
  const smoothY = useSpring(rawY, { stiffness: 100, damping: 15 });

  const headX = useTransform(smoothX, (v) => v * 0.6);
  const headY = useTransform(smoothY, (v) => v * 0.6);
  const eyeX = useTransform(smoothX, (v) => v * 1.0);
  const eyeY = useTransform(smoothY, (v) => v * 1.0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      rawX.set(Math.min(Math.max(dx * 0.15, -10), 10));
      rawY.set(Math.min(Math.max(dy * 0.15, -10), 10));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 10, duration: 1.5 }}
      className="w-full max-w-[345px] aspect-square ml-20 mx-auto mt-0 -translate-y-4 "
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <div ref={containerRef} className="relative w-full h-full">
        
          {/* Cuerpo */}
          <img
            src={cuerpoImg}
            alt="cuerpo"
            className="absolute w-full h-auto top-0 left-0"
          />

          {/* Cabeza */}
          <motion.img
            src={cabezaImg}
            alt="cabeza"
            className="absolute w-full"
            style={{
              x: headX,
              y: headY,
              top: '0px',
              left: '0px',
            }}
          />

          {/* Pupilas */}
          <motion.img
            src={pupilasImg}
            alt="pupilas"
            className="absolute w-full"
            style={{
              x: eyeX,
              y: eyeY,
              top: '0px',
              left: '0px',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Personaje;
