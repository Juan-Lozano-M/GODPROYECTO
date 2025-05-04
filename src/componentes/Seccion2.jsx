import React from 'react';
import Portal from '../assets/Ellipse 2.png';
import Hand from '../assets/hand.png';
import ArrowIcon from '../assets/ArrowIcon.png'; // Asegúrate de que este nombre y la ruta sean correctos

function Seccion2() {
  const items = [
    { num: '1', text: '50% de los universitarios abandonan la carrera.' },
    { num: '2', text: 'Solo el 18% trabaja en lo que estudió.' },
    { num: '3', text: 'El estrés y la presión afectan su bienestar.' },
  ];

  return (
    <div className='bg-[#E8FFBE] h-screen flex flex-col items-center justify-start p-5'>
      
      {/* TÍTULOS UN POCO MÁS A LA DERECHA */}
      <div className='w-full max-w-5xl text-left font-bold text-4xl md:text-6xl mt-14 pl-10'>
        <h2>Nuevas formas de adaptarnos</h2>
        <div className="flex items-center gap-4 relative mt-2">

          

          {/* Texto al lado */}
          <h2 className='text-[#732bf9] no-underline z-10'>¿A qué nos enfrentamos?</h2>

          {/* CONTENEDOR PARA LA FLECHA (NEGRO + VERDE) */}
          <div className="relative w-12 h-12">
            

            {/* Cuadro verde con flecha */}
            <div className="bg-[#A4FF00] border border-black w-full h-full rounded-md flex items-center justify-center z-10 relative">
              <img src={ArrowIcon} alt="Flecha" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className='relative flex w-full items-center gap-[10rem] justify-center max-w-5xl mt-16'>
        
        {/* PORTAL + MANO */}
        <div className='flex flex-col items-center mr-4 relative max-h-screen'>
          <img 
            src={Portal} 
            alt="portal" 
            className='max-w-[150px] max-h-[150px] object-contain relative z-10' 
          />
          <img 
            src={Hand} 
            alt="hand" 
            className='absolute -top-[180px] -left-[110px] max-w-[400px] max-h-[400px] object-contain z-20' 
          />
        </div>

        {/* LISTA */}
        <div className='flex flex-col gap-6 items-center'>
          {items.map((item, index) => (
            <div key={index} className='relative'>
              
              <div className='relative flex items-center bg-[#A4FF00] p-4 rounded-md border border-black w-[560px] h-[80px]'>
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
