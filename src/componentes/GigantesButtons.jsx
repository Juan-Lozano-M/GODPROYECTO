import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const FraseBlock = ({ children, href = "#", bgColor = "bg-pink-400", textColor = "text-black" }) => (
  <a
    href={href}
    className={`inline-flex items-center px-3 py-1 rounded-md ${bgColor} ${textColor} font-bold mx-1 text-3xl transition-transform duration-200 transform hover:scale-110 cursor-pointer`}
  >
    <ArrowRightIcon className="mr-1 w-5 h-5" />
    {children}
  </a>
);

const GigantesButtons = () => {
  return (
    <motion.div
      className="flex flex-col gap-4 text-white text-3xl font-bold leading-tight mt-10 ml-[-4rem]"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
    >
      <p>
        SOMOS <FraseBlock bgColor="bg-[#08cc7c]" href="#home">GAME OF DREAMS</FraseBlock>
      </p>

      <p>
        ENCUENTRA TU CAMINO CON <FraseBlock bgColor="bg-green-500" href="#juegos">JUEGOS</FraseBlock>
      </p>

      <p>
        LEÉ <FraseBlock bgColor="bg-blue-400" href="#testimonios">TESTIMONIOS</FraseBlock> O <FraseBlock bgColor="bg-blue-400" href="#testimonios">NOTICIAS</FraseBlock>
      </p>

      <p>
      ¿TENÉS PREGUNTAS? <FraseBlock bgColor="bg-red-500" href="#contacto">CONTACTANOS</FraseBlock>
      </p>
    </motion.div>
  );
};

export default GigantesButtons;
