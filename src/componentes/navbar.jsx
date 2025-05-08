import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setIsScrolled(currentScrollY > 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full flex justify-center pt-2 fixed top-0 left-0 z-50">
      <AnimatePresence>
        <motion.nav
          key="navbar"
          initial={{ y: 0 }}
          animate={{ y: showNavbar ? 0 : -120 }}
          exit={{ y: -120 }}
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 15,
            duration: 1,
            bounce: 0.7,
          }}
          className="flex items-center justify-between w-[60%] max-w-6xl border-2 border-black rounded-md px-8 py-3 shadow-md bg-[#E8FFBE]"
        >
          {/* Texto GOD con tooltip */}
          <div className="relative group">
            <div className="flex items-center rounded-md px-2 py-1">
              <span className="font-bold text-black text-lg">GOD</span>
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-[#A4FF00] border-2 border-black rounded-md text-black text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Inicio
            </div>
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-xs font-semibold text-black">
            {["Sobre nosotros", "Testimonios", "Juegos"].map((text, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-inherit hover:underline"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {text}
              </motion.a>
            ))}
          </div>

          {/* Botón Launch */}
          <button
            className="border-2 border-black bg-[#A4FF00] text-black font-bold text-sm px-6 py-2 rounded-md
              shadow-[0px_6px_0px_0px_black] transition-all duration-150 ease-in-out
              hover:bg-gray-100 hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
              active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
          >
            Launch
          </button>
        </motion.nav>
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
