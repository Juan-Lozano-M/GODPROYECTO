import React, { useState } from "react";
import xIcon from "../assets/icons/xIcon.png";
import offEye from "../assets/icons/offEye.png";
import onEye from "../assets/icons/onEye.png";

const InputField = ({ type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const clearInput = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className="relative w-full">
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-86 p-3 mb-4 bg-[#232324]/70 text-white rounded-md  2xl:min-w-[344px]" 
      />

      {/* Botón de limpiar input */}
      {value && type !== "password" && (
        <button onClick={clearInput} className="absolute right-5 top-3">
          <img src={xIcon} alt="Clear input" />
        </button>
      )}

      {/* Botón de alternar visibilidad de contraseña */}
      {type === "password" && (
        <button onClick={togglePasswordVisibility} className="absolute right-5">
          <img
            src={showPassword ? onEye : offEye}
            alt="Toggle Password"
            className={`transition ${showPassword ? "h-5 mt-3" : "mt-4"}`}
          />
        </button>
      )}
    </div>
  );
};

export default InputField;

