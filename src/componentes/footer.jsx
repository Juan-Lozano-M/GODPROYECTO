import React from 'react';



function Foot() {
  return (
    <div className="bg-black text-white font-nunito font-bold min-h-[500px] flex flex-col gap-10 px-8 py-8">
      
      {/* Contenedor principal */}
      <div className='w-full flex flex-col lg:flex-row gap-6 h-full'>
        
        {/* Columna 1: Tú buscas */}
        <div className='lg:ml-[14rem] text-lg gap-4 p-4 flex flex-col w-full max-w-[300px] h-full'>
          <p className='text-3xl'>¿Tú buscas?</p>
          <p className="hover:text-[#A4FF00] cursor-pointer transition-all duration-300">Home</p>
          <p className="hover:text-[#A4FF00] cursor-pointer transition-all duration-300">Sobre Nosotros</p>
          <p className="hover:text-[#A4FF00] cursor-pointer transition-all duration-300">Juegos</p>
          <p className="hover:text-[#A4FF00] cursor-pointer transition-all duration-300">Política de Privacidad</p>
        </div>

        {/* Columna 2: Contacto */}
        <div className='w-full max-w-[300px] text-base gap-4 p-4 flex flex-col h-full'>
          <p className='text-3xl text-[#A4FF00]'>Contacto</p>
          <p>gameofdreams@gmail.com</p>
          <p>+420 776 658 505</p>
        </div>
      </div>

      {/* Pie de página */}
      <div className="w-full lg:w-[60%] p-4 flex mt-[4rem] justify-start border-t-2 border-white mx-auto">
        <p className='text-sm'>© 2025 Game of Dreams. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}

export default Foot;
