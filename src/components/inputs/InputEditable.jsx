import React, { useState } from 'react';
import axios from "../../config/axiosConfig";
import { auth } from "../../firebaseConfig";

const InputEditable = ({ 
  value, 
  onChange,
  type = 'text',
  disabled = false,
  placeholder = '',
  className = '',
  field = '',
  onSuccess,  // This will be used for toast notifications
  onCancel,   // Add this prop for cancel handling
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const idToken = await currentUser.getIdToken();

      // Crear el objeto de datos dinámicamente basado en el campo
      const data = {};
      data[field] = tempValue;

      console.log("Saving field:", field, "with value:", tempValue); // Debug log

      const response = await axios.put('/api/user/profile', 
        data,
        { 
          headers: { 'Authorization': `Bearer ${idToken}` }
        }
      );

      if (response.data.status === 'success') {
        if (onChange) onChange(tempValue);
        setIsEditing(false);
        
        // Ensure onSuccess is called
        console.log("Save successful, calling onSuccess"); // Debug log
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  const handleEdit = () => {
    if (!disabled) {
      setIsEditing(true);
      setTempValue(value);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue(value);
    if (onCancel) onCancel();
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <>
          <input
            type={type}
            value={tempValue}
            onChange={(e) => {
              setTempValue(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className={`bg-white border border-gray-300 p-2 rounded-md flex-grow ${className}`}
            placeholder={placeholder}
            autoFocus
          />
          {/* Botón de Guardar - Estilo Tecla B&N */}
          <button 
            onClick={handleSave}
            className="ml-2 bg-white p-2 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_black] hover:shadow-[1px_1px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_0px_black] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-150 ease-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Botón de Cancelar - Estilo Tecla B&N */}
          <button 
            onClick={handleCancel}
            className="ml-2 bg-white p-2 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_black] hover:shadow-[1px_1px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_0px_black] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-150 ease-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      ) : (
        <>
          <input
            type={type}
            value={value}
            className={`bg-gray-100 p-2 rounded-md flex-grow ${className}`}
            disabled
          />
          {/* Botón de Editar - Estilo Tecla B&N */}
          <button 
            onClick={handleEdit}
            className="ml-2 bg-white p-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_black]  hover:shadow-[1px_1px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_0px_black] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[3px_3px_0px_0px_black] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default InputEditable;