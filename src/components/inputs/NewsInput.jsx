import { useState } from 'react';

const NewsInput = ({ placeholder = "Ingresa texto", className = "w-[200px]", onChange, value: propValue }) => {
  const [internalValue, setInternalValue] = useState('');
  
  // Usar el valor de la prop si se proporciona, sino usar el valor interno
  const value = propValue !== undefined ? propValue : internalValue;

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Si no hay prop value, actualizar el estado interno
    if (propValue === undefined) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative mt-4 w-[55%]">
      <div className={`relative group overflow-hidden rounded-lg ${className}`}>
        <input 
          type="text" 
          name="text" 
          value={value}
          onChange={handleChange}
          className="text-base px-4 py-2.5 border-none rounded-lg bg-[#f8f8f8] 
            shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full text-gray-700
            transition-all duration-300 ease-in-out
            hover:bg-[#f2f2f2]
            focus:outline-none focus:bg-white focus:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
            focus:animate-inputFocus
            placeholder:text-gray-400"
          placeholder={placeholder} 
        />
        <div className="absolute bottom-0 left-0 h-0.5 bg-[#8FDA32] 
          w-full scale-x-0 origin-left
          transition-transform duration-300 ease-in-out
          group-hover:scale-x-100 group-focus-within:scale-x-100" 
        />
      </div>
    </div>
  );
}

export default NewsInput;
