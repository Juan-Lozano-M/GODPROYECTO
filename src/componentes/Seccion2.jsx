import React, { useState, useEffect } from 'react';
import Portal from '../assets/Ellipse 2.png';
import Hand from '../assets/hand.png';
import ArrowIcon from '../assets/ArrowIcon.png';

function Seccion2() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      setScrollY(scrollPos);
      if (scrollPos > 200) {
        const scaleValue = Math.min(1, (scrollPos - 200) / 300 + 0.5);
        setOpacity(Math.min(1, (scrollPos - 200) / 300));
        setScale(scaleValue);
      } else {
        setOpacity(0);
        setScale(0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = [
    { num: '1', text: '50% de los universitarios abandonan la carrera.' },
    { num: '2', text: 'Solo el 18% trabaja en lo que estudió.' },
    { num: '3', text: 'El estrés y la presión afectan su bienestar.' },
  ];

  return (
    <div className='bg-[#E8FFBE] sm-height:mt-[7rem] h-screen xl:h-[100vh] 2xl:h-[75vh] lg:h-[75vh] flex flex-col items-center justify-center xl:mt-[2rem] p-5'>
      <div
        className='w-full max-w-3xl mx-auto text-left font-bold transition-all duration-500'
        style={{
          opacity: opacity,
          transform: `scale(${scale})`,
        }}
      >
        <h2 className=" text-[1.8rem] md:text-[2.8rem] lg:text-[3.2rem] text-center">Nuevas formas de adaptarnos</h2>

        <div className="flex flex-row sm:flex-row items-center justify-center gap-2 mt-2">
          <h2 className='text-[#732bf9] text-[1.6rem] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3.2rem] z-10 text-center sm:text-left'>
            ¿A qué nos enfrentamos?
          </h2>
          <div className="relative w-8 h-8 sm:w-12 sm:h-12">
            <div className="bg-[#A4FF00] border border-black w-full h-full rounded-md flex items-center justify-center z-10 relative">
              <img src={ArrowIcon} alt="Flecha" className="w-3 h-3 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>

      <div
        className='relative flex flex-col md:flex-row w-full items-center justify-start gap-5 md:gap-[2rem] max-w-5xl mt-[2.8rem]'
        style={{
          opacity: opacity,
          transform: `scale(${scale})`,
          transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
        }}
      >
        {/* Contenedor imagen: mano y portal ocultos en móvil */}
        <div className='relative hidden sm:flex flex-col items-center justify-center w-full sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px]'>
          {/* Portal */}
          <img
            src={Portal}
            alt="portal"
            className='absolute w-[15%] object-contain z-10'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          {/* Mano */}
          <img
            src={Hand}
            alt="hand"
            className='relative w-[120px] sm:absolute sm:w-[160%] object-contain z-20 sm:top-[35%] sm:left-[70%] sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2'
          />
        </div>

        {/* Lista de elementos */}
        <div className='flex flex-col gap-6 items-center px-2'>
          {items.map((item, index) => (
            <div key={index} className='relative w-full max-w-[560px]'>
              <div
                className='relative flex items-center bg-[#A4FF00] p-4 rounded-md border border-black w-full h-[80px]'
                style={{
                  opacity: opacity,
                  transform: `scale(${scale})`,
                  transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
                }}
              >
                <div className='text-black font-black text-3xl w-8 flex-shrink-0 text-center'>{item.num}</div>
                <p className='text-black font-bold text-sm md:text-xl ml-4'>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Seccion2;
