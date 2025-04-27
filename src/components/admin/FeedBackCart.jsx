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
    <div className="relative bg-black/7 rounded-3xl shadow-md p-6 md:w-[254px] lg:w-[352px] xl:w-[400px] flex flex-col justify-between gap-4 transition-transform duration-200 ease-in-out hover:scale-105">
      <div className='bg-white absolute md:ml-49 md:h-10 md:w-10 lg:ml-68 lg:w-15 lg:h-15 xl:ml-81 top-0 rounded-full'>
        {/* decorativo */}
      </div>

      <div className="flex items-center gap-3">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-15 w-15 md:h-10 md:w-10 xl:w-20 xl:h-20 rounded-full object-cover"
        />
        <div className='w-40'>
          <h1 className="font-adlam lg:text-2xl ml-2">{name}</h1>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <p className="md:text-[9px] lg:text-[13px] xl:text-[16px] text-[#3E3E3E] font-adlam">
          {position}{company && ` en ${company}`}
        </p>
        <span className={`md:text-[8px] lg:text-[13px] font-semibold px-3 py-2 rounded-full ${statusColors[status]}`}>
          {status}
        </span> 
      </div>

      <div className="flex justify-between items-center md:items-start">
        <p className="md:text-[12px] lg:text-[16px] xl:text-[20px] font-adlam line-clamp-2 text-black w-50 xl:w-60">
          {comment}
        </p>
        <button
          onClick={onView} // <-- aquí está el cambio
          className="bg-black text-white md:text-[8px] md:px-6 md:mt-7 lg:text-[17px] font-semibold px-7 py-1 rounded-full mt-10 transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Ver
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
