import axios from 'axios'; // Import axios for making HTTP requests
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DeleteButton from "../buttons/DeleteButton";

const DropZone = ({ className = "w-85", onFileChange, reset = false }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  // Efecto para resetear el componente cuando reset cambie a true
  useEffect(() => {
    if (reset) {
      setPreview(null);
      setFile(null);
    }
  }, [reset]);

  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('folder', 'news_images'); // Specify the folder in Cloudinary

    // Send the file to the backend
    axios.post('http://127.0.0.1:5000/api/news/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('File uploaded successfully:', response.data);
      if (onFileChange) {
        onFileChange(response.data.url); // Pass the uploaded file URL back to the parent component
      }
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className={className}>
      <div 
        {...getRootProps()} 
        className={`w-full h-[160px] p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors flex justify-between items-end
          ${isDragActive ? 'border-[#8FDA32] bg-[#8FDA32]/10' : 'border-gray-300 hover:border-[#8FDA32]'}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="flex items-center justify-center h-full w-full relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            <DeleteButton 
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
                setFile(null);
                if (onFileChange) {
                  onFileChange(null);
                }
              }} 
              className="absolute top-0 right-0 transform -translate-y-1/4 translate-x-1/4 scale-80"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 h-full flex-grow">
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
            {isDragActive ? (
              <p className="text-lg text-[#8FDA32]">Suelta el archivo aquí...</p>
            ) : (
              <div className="text-center">
                <p className="text-base text-gray-600">Arrastra y suelta una imagen aquí, o</p>
                <p className="text-[#8FDA32]">haz clic para seleccionar</p>
              </div>
            )}
            <p className="text-sm text-gray-500"> JPG, JPEG (máx. 1 archivo)</p>
          </div>
        )}
      </div>
    </div>
  );  
};

export default DropZone;
