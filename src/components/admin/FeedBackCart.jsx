import React from 'react';

const statusColors = {
  Aprobado: 'bg-[#9CE840] text-black',
  'En espera': 'bg-[#FFBE00] text-black',
  Anulado: 'bg-[#EA4335] text-black',
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
    <div className="relative bg-black/7 rounded-3xl shadow-md p-4 w-full min-[520px]:w-[46%] sm:w-[full] md:w-[45%] lg:w-[45%] xl:w-[30%] 2xl:w-[28%] flex flex-col justify-between gap-2 sm:gap-4 transition-transform duration-200 ease-in-out hover:scale-105">
      <div className='bg-white absolute h-10 w-10 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:w-15 lg:h-15 top-3 right-2 -translate-y-1/2 translate-x-1/2 rounded-full'>
        {/* decorativo */}
      </div>

      <div className="flex items-center gap-3">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-15 w-15 sm:h-15 sm:w-15 md:h-15 md:w-15 xl:w-20 xl:h-20 rounded-full object-cover"
        />
        <div className='w-40'>
          <h1 className="font-adlam text-lg sm:text-xl lg:text-2xl ml-2">{name}</h1>
        </div>
      </div>

      <div className='flex justify-between items-center mt-2'>
        <p className="text-[14px] sm:text-[13px] w-[60%] sm:w-[65%] md:text-[13px] md:w-[65%] lg:text-[14px] xl:text-[15px] xl:w-[60%] text-[#3E3E3E] font-adlam ">
          {position}{company && ` en ${company}`}
        </p>
        <span className={`px-2 py-1 text-[12px] md:text-[10px] lg:text-[13px] font-extrabold sm:px-2 sm:py-1.5 rounded-full ${statusColors[status]}`}>
          {status}
        </span> 
      </div>

      <div className="flex justify-between items-start mt-2">
        <p className=" md:text-[15px] lg:text-[16px] xl:text-[17px] font-adlam line-clamp-2 text-black w-50 sm:w-[60%] md:w-[60%] xl:w-[65%]">
          {comment}
        </p>
        <button
          onClick={onView} // <-- aquí está el cambio
          className="bg-black text-white py-1 px-6 mt-10 text-[12px] sm:px-6 sm:mt-7 md:text-[11px] md:px-5 md:mt-7 lg:text-[17px] font-semibold rounded-full transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Ver
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
