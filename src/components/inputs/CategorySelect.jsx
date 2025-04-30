import React, { useState } from 'react';

const CategorySelect = ({ className = "w-[200px]", onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  
  return (
    <div className="relative mt-4">
      <div className={`relative group overflow-hidden rounded-lg ${className}`}>
        <select 
          value={value}
          onChange={handleChange}
          className="text-base px-4 py-2.5 border-none rounded-lg bg-[#f8f8f8] 
            shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full text-gray-700
            transition-all duration-300 ease-in-out
            hover:bg-[#f2f2f2]
            focus:outline-none focus:bg-white focus:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
            appearance-none cursor-pointer"
        >
          <option value="" disabled>Selecciona una categoría</option>
          <option value="tecnologia">Tecnología</option>
          <option value="ciencia">Ciencia</option>
          <option value="deportes">Deportes</option>
          <option value="cultura">Cultura</option>
        </select>
        {/* Línea animada en la parte inferior del select */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-[#8FDA32] 
          w-full scale-x-0 origin-left
          transition-transform duration-300 ease-in-out
          group-hover:scale-x-100 group-focus-within:scale-x-100" 
        />
        {/* Ícono de flecha para indicar el desplegable */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className="w-4 h-4 fill-current" 
            viewBox="0 0 20 20"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M7 10l5 5 5-5H7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default CategorySelect;