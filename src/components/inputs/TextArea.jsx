import { useEffect, useRef, useState } from 'react';

const TextArea = ({ placeholder = "Ingresa texto", className = "w-[200px]", onChange, value: externalValue = '' }) => {
  const [value, setValue] = useState(externalValue);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textareaRef = useRef(null);
  // Sincronizar con el valor externo cuando cambie
  useEffect(() => {
    setValue(externalValue);
  }, [externalValue]);

  // Función para verificar si el textarea está desbordando
  const checkOverflow = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const isTextOverflowing = textarea.scrollHeight > textarea.clientHeight;
      setIsOverflowing(isTextOverflowing);
    }
  };

  // Verificar overflow cuando el valor cambie
  useEffect(() => {
    checkOverflow();
  }, [value]);

  const handledChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    // Verificar overflow después del cambio
    setTimeout(checkOverflow, 0);
  }

  return (
    // Contenedor principal con margen superior
    <div className="relative mt-2">
      {/* Contenedor relativo para el textarea y la línea animada */}
      <div className={`relative group overflow-hidden rounded-lg ${className}`}>        {/* Textarea con estilos personalizados */}
        <textarea 
          ref={textareaRef}
          className="text-base px-4 py-2.5 border-none rounded-lg bg-[#f8f8f8] 
            shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full text-gray-700 h-[150px]
            transition-all duration-300 ease-in-out resize-none
            hover:bg-[#f2f2f2]
            focus:outline-none focus:bg-white focus:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
            placeholder:text-gray-400"
          placeholder={placeholder}
          value={value}
          onChange={handledChange}
        />        {/* Línea animada en la parte inferior - solo se muestra si no hay overflow */}
        {!isOverflowing && (
          <div className="absolute bottom-0 left-0 h-0.5 bg-[#8FDA32] 
            w-full scale-x-0 origin-left
            transition-transform duration-300 ease-in-out
            group-hover:scale-x-100 group-focus-within:scale-x-100 rounded-b-lg" 
          />
        )}
      </div>
    </div>
  );
}

export default TextArea;