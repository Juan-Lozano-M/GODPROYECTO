const FilterButton = ({ label, isActive, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`px-5 py-2 rounded-xl font-adlam transition-all transform duration-200 ease-in-out
          ${isActive 
            ? "bg-black text-white scale-105" // se expande si está activo
            : "bg-black/10 text-black hover:bg-black/20 hover:scale-105"} // también se expande al hacer hover
        `}
      >
        {label}
      </button>
    );
  };
  
  export default FilterButton;
  