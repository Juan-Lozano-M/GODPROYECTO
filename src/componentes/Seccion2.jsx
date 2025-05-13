import React, { useState, useEffect } from 'react';
import Portal from '../assets/Ellipse 2.png';
import Hand from '../assets/hand.png';
import ArrowIcon from '../assets/ArrowIcon.png';

function Seccion2() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [scalePortal, setScalePortal] = useState(0.5);  
  const [scaleHand, setScaleHand] = useState(0.5);  
  const [scaleText, setScaleText] = useState(0.5);  
  const [scaleList, setScaleList] = useState(0.5);  

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scrollPos = window.scrollY;

      if (scrollPos > 200) {
        setOpacity(Math.min(1, (scrollPos - 200) / 300)); 
        setScalePortal(Math.min(1, (scrollPos - 200) / 300 + 0.5));  
        setScaleHand(Math.min(1, (scrollPos - 200) / 300 + 0.5));  
        setScaleText(Math.min(1, (scrollPos - 200) / 300 + 0.5));  
        setScaleList(Math.min(1, (scrollPos - 200) / 300 + 0.5));  
      } else {
        setOpacity(0); 
        setScalePortal(0.5);  
        setScaleHand(0.5);  
        setScaleText(0.5);  
        setScaleList(0.5);  
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
    <div className='bg-[#E8FFBE] h-screen xl:h-[90vh] lg:h-[90vh]  flex flex-col items-center justify-center p-5'>
      <div className='w-full max-w-5xl text-center lg:mt-20 lg:text-5xl font-bold text-4xl md:text-6xl pl-4 md:pl-10'
        style={{
          opacity: opacity,
          transform: `scale(${scaleText})`,
          transition: 'transform 0.4s ease-out, opacity 0.4s ease-out'
        }}
      >
        <h2>Nuevas formas de adaptarnos</h2>
        <div className="flex items-center gap-4 relative mt-2">
          <h2 className='text-[#732bf9] no-underline ml-4 md:ml-20 lg:ml-[10rem] text-center z-10'>¿A qué nos enfrentamos?</h2>
          <div className="relative w-12 h-12">
            <div className="bg-[#A4FF00] border border-black w-full h-full rounded-md flex items-center justify-center z-10 relative">
              <img src={ArrowIcon} alt="Flecha" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className='relative flex flex-col md:flex-row w-full items-center justify-center gap-10 md:gap-[10rem] max-w-5xl mt-20'
        style={{
          opacity: opacity,
          transform: `scale(${scaleList})`,
          transition: 'transform 0.4s ease-out, opacity 0.4s ease-out'
        }}
      >
        <div className='flex flex-col items-center mr-4 relative max-h-screen'>
          <img 
            src={Portal} 
            alt="portal" 
            className='max-w-[150px] max-h-[150px] object-contain relative z-10' 
            style={{ 
              opacity: opacity,  
              transform: `scale(${scalePortal})`,  
              transition: 'transform 0.4s ease-out, opacity 0.4s ease-out'
            }}
          />
          <img 
            src={Hand} 
            alt="hand" 
            className='absolute left-0 md:-top-[180px] md:-left-[110px] max-w-[400px] max-h-[400px] object-contain z-20' 
            style={{ 
              opacity: opacity,  
              transform: `scale(${scaleHand})`, 
              transition: 'transform 0.4s ease-out, opacity 0.4s ease-out'
            }}
          />
        </div>

        <div className='flex flex-col gap-6 items-center px-2'>
          {items.map((item, index) => (
            <div key={index} className='relative w-full max-w-[560px]'>
              <div className='relative flex items-center bg-[#A4FF00] p-4 rounded-md border border-black w-full h-[80px]'
                style={{
                  opacity: opacity,
                  transform: `scale(${scaleList})`,
                  transition: 'transform 0.4s ease-out, opacity 0.4s ease-out'
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
