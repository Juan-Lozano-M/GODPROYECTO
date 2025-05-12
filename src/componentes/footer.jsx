import React from 'react';

function Foot() {
  return (
    <div className="bg-black text-white font-nunito font-bold h-[500px] gap-10 flex flex-col items-center p-8 items-start py-8">
        <div className='w-full gap-3 flex h-[80%]'>
            <div className='ml-[14rem] text-lg gap-4 p-4 flex flex-col w-[300px] h-[100%]'>
                <p className='text-3xl '>¿Tú buscas?</p>
                <p className="hover:text-[#A4FF00] cursor-pointer transition-all duration-300 ease-in-out">Home</p>
                <p className="hover:text-[#A4FF00] cursor-pointer transition-all duration-300 ease-in-out">Sobre Nosotros</p>
                <p className="hover:text-[#A4FF00] cursor-pointer transition-all duration-300 ease-in-out">Juegos</p>
                <p className="hover:text-[#A4FF00] cursor-pointer transition-all duration-300 ease-in-out">Politica de Privacidad</p>
                

            </div>
            <div className='w-[300px] text-base gap-4 p-4 flex flex-col h-[100%]'>
                <p className='text-3xl text-[#A4FF00]'>Contacto</p>
                <p>gameofdreams@gmail.com</p>
                <p>+420 776 658 505</p>
    
            </div>
        </div>

        <div className=" w-[60%] h-[20%] p-4 flex justify-start border-t-2 border-white">
            <p className='text-sm'>© 2025 Game of Dreams. Todos los derechos reservados.</p>
        
        </div>
      
    </div>
  );
}

export default Foot;

