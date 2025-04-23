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
  comment 
}) => {
    return (
        <div className="relative bg-black/7 rounded-3xl shadow-md p-6 w-[400px] flex flex-col justify-between gap-4 mt-3 transition-transform duration-200 ease-in-out hover:scale-105">
          
          <div className='bg-white absolute ml-79 top-0 h-15 w-17 rounded-full'>

          </div>
      
          <div className="flex items-center gap-3">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className='w-40'>
              <h1 className="font-adlam text-2xl ml-2">{name}</h1>
            </div>
          </div>
      
          <div className='flex justify-between items-center'>
            <p className="text-[16px] text-[#3E3E3E] font-adlam">
              {position}{company && ` en ${company}`}
            </p>
            <span className={`text-[13px] font-semibold px-3 py-2 rounded-full ${statusColors[status]}`}>
              {status}
            </span> 
          </div>
      
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-adlam line-clamp-2 text-black w-60">
              {comment}
            </p>
            <button className="bg-black text-white text-[17px] font-semibold px-7 py-1 rounded-full mt-10 transition-transform duration-200 ease-in-out hover:scale-105">
              Ver
            </button>
          </div>
        </div>
      );
}
export default FeedbackCard;
