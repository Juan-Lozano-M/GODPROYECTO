import React, { useState } from "react";
import offEye from "../assets/icons/offEye.png";
import onEye from "../assets/icons/onEye.png";
import xIcon from "../assets/icons/xIcon.png";

const InputField = ({ 
  type, 
  placeholder, 
  value, 
  onChange,
  className = "",
  inputClassName = "",
  iconClassName = "",
  showClearButton = true,
  icon = null,
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const clearInput = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-86 p-3 mb-4 bg-[#232324]/70 text-white rounded-md 2xl:min-w-[344px] ${inputClassName}`}
        {...props}
      />

      {/* Botón de limpiar input */}
      {value && type !== "password" && showClearButton && (
        <button 
          onClick={clearInput} 
          className={`absolute right-5 top-3 ${iconClassName}`}
          type="button"
        >
          <img src={xIcon} alt="Clear input" />
        </button>
      )}

      {/* Botón de alternar visibilidad de contraseña */}
      {type === "password" && (
        <button 
          onClick={togglePasswordVisibility} 
          className={`absolute right-5 top-0 ${iconClassName}`}
          type="button"
        >
          <img
            src={showPassword ? onEye : offEye}
            alt="Toggle Password"
            className={`transition ${showPassword ? "h-5 mt-3" : "mt-4"}`}
          />
        </button>
      )}

      {/* Custom icon */}
      {icon && type !== "password" && !value && !showClearButton && (
        <div className={`absolute right-5 top-3 ${iconClassName}`}>
          <img src={icon} alt="Input icon" />
        </div>
      )}
    </div>
  );
};

export default InputField;

