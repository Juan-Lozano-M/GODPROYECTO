// Importamos los hooks necesarios de React y la librería react-dropzone
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

// Componente DropZone que acepta una prop className con valor por defecto "w-85"
const DropZone = ({ className = "w-85" }) => {
  // Estado para almacenar la URL de vista previa de la imagen
  const [preview, setPreview] = useState(null);

  // Función que se ejecuta cuando se suelta o selecciona un archivo
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]; // Tomamos solo el primer archivo
    setPreview(URL.createObjectURL(file)); // Creamos una URL temporal para la vista previa
  }, []);

  // Hook useDropzone que configura la funcionalidad de arrastrar y soltar
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'] // Solo aceptamos imágenes
    },
    maxFiles: 1 // Máximo 1 archivo
  });

  return (
    // Contenedor principal que acepta la className personalizada
    <div className={className}>
      {/* Área de drop que cambia de estilo cuando se arrastra un archivo */}
      <div 
        {...getRootProps()} 
        className={`w-full h-[160px] p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragActive ? 'border-[#8FDA32] bg-[#8FDA32]/10' : 'border-gray-300 hover:border-[#8FDA32]'}`}
      >
        {/* Input oculto que maneja la selección de archivos */}
        <input {...getInputProps()} />
        
        {/* Renderizado condicional basado en si hay una imagen seleccionada */}
        {preview ? (
          // Si hay imagen, mostramos la vista previa
          <div className="flex items-center justify-center h-full">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>
        ) : (
          // Si no hay imagen, mostramos la interfaz de drop
          <div className="flex flex-col items-center justify-center gap-2 h-full">
            {/* Ícono de subida */}
            <svg 
              className={`w-8 h-8 ${isDragActive ? 'text-[#8FDA32]' : 'text-gray-400'}`} 
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 48 48" 
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M24 32v-8m0 0V16m0 8h8m-8 0h-8" 
              />
            </svg>
            {/* Mensaje que cambia según si se está arrastrando un archivo o no */}
            {isDragActive ? (
              <p className="text-lg text-[#8FDA32]">Suelta el archivo aquí...</p>
            ) : (
              <div className="text-center">
                <p className="text-base text-gray-600">Arrastra y suelta una imagen aquí, o</p>
                <p className="text-[#8FDA32]">haz clic para seleccionar</p>
              </div>
            )}
            {/* Texto informativo sobre tipos de archivo permitidos */}
            <p className="text-sm text-gray-500"> JPG, JPEG (máx. 1 archivo)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;