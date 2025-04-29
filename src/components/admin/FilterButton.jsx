import React from "react";

const FilterButton = ({ label, isActive, onClick, iconSrc }) => {
  return (
    <button
      className={`py-1 px-2 sm:py-2 sm:px-4 lg:py-2 lg:px-3 xl:py-3 xl:px-4 rounded-xl font-adlam transition-all duration-200 ${
        isActive 
          ? "bg-black text-white hover:bg-black" 
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      } flex items-center justify-center hover:scale-105`}
      onClick={onClick}
    >
      {iconSrc ? (
        <img src={iconSrc} alt={label} className="h-4 w-4 sm:w-5 sm:h-5" />
      ) : (
        label
      )}
    </button>
  );
};

export default FilterButton;