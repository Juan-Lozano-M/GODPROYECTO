import React from 'react';

const statusColors = {
  Aprobado: 'bg-[#9CE840] text-black',
  'En espera': 'bg-[#FFBE00] text-black',
  Rechazado: 'bg-[#EA4335] text-black',
};

const FeedbackCard = ({ 
  name, 
  position, 
  company, 
  status, 
  imageUrl, 
  comment, 
  onView // <-- nuevo: callback para abrir modal
}) => {
  return (
    <div className="relative bg-black/7 rounded-3xl shadow-md p-4 w-[100%] min-[450px]:w-[90%] sm:w-[45%] md:w-[45%] lg:w-[45%] xl:w-[30%] 2xl:w-[28%] flex flex-col justify-between gap-2 sm:gap-4 transition-transform duration-200 ease-in-out hover:scale-105">
      <div className='bg-white absolute h-5 w-5 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:w-15 lg:h-15 top-3 right-2 -translate-y-1/2 translate-x-1/2 rounded-full'>
        {/* decorativo */}
      </div>

      <div className="flex items-center gap-3">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-7 w-7 sm:h-15 sm:w-15 md:h-10 md:w-10 xl:w-20 xl:h-20 rounded-full object-cover"
        />
        <div className='w-40'>
          <h1 className="font-adlam text-[10px] sm:text-xl lg:text-2xl ml-2">{name}</h1>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <p className="text-[6px] sm:text-[10px] lg:text-[13px] xl:text-[16px] text-[#3E3E3E] font-adlam">
          {position}{company && ` en ${company}`}
        </p>
        <span className={`px-2 py-1 text-[5px] sm:text-[8px] lg:text-[13px] font-semibold sm:px-3 sm:py-2 rounded-full ${statusColors[status]}`}>
          {status}
        </span> 
      </div>

      <div className="flex justify-between items-start">
        <p className="text-[7px] sm:text-[11px] lg:text-[16px] xl:text-[20px] font-adlam line-clamp-2 text-black w-20 sm:w-38 md:w-50 xl:w-60">
          {comment}
        </p>
        <button
          onClick={onView} // <-- aquí está el cambio
          className="bg-black text-white py-1 px-4 mt-5 text-[5px] sm:text-[8px] sm:px-6 sm:mt-7 md:px-6 md:mt-7 lg:text-[17px] font-semibold rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Ver
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
