const TestimonialCard = ({ imageUrl, name, position, status, comment, onView }) => {
  // Validaciones de seguridad
  const safeName = name || "Usuario sin nombre";
  const safePosition = position || "Sin cargo";
  const safeStatus = status || "En espera";
  const safeComment = comment || "";
  
  const inicial = safeName.charAt(0).toUpperCase();
  
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case "Aprobado":
        return "bg-[#9CE840] text-black";
      case "Anulado":
        return "bg-[#EA4335] text-black";
      case "En espera":
        return "bg-[#FFBE00] text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Función para manejar errores de imagen
  const handleImageError = (e) => {
    console.warn("Error al cargar imagen:", imageUrl);
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className="flex items-center w-full h-20 sm:h-27 bg-black/7 rounded-sm">
      {imageUrl ? (
        <div className="relative w-14 sm:w-19 h-14 sm:h-19 ml-4">
          <img 
            src={imageUrl} 
            className="w-full h-full rounded-lg object-cover" 
            alt={`Imagen de ${safeName}`}
            onError={handleImageError}
          />
          <div 
            className="absolute inset-0 w-full h-full rounded-lg bg-gray-400 items-center justify-center text-white font-bold text-xl hidden"
            style={{ display: 'none' }}
          >
            {inicial}
          </div>
        </div>
      ) : (
        <div className="w-14 sm:w-22 h-14 sm:h-19 rounded-lg ml-4 bg-gray-400 flex items-center justify-center text-white font-bold text-xl">
          {inicial}
        </div>
      )}
      
      <div className="flex justify-between items-center w-full h-full">
        <div className="ml-5 sm:ml-10 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[15px] sm:text-[20px] xl:text-[18px] 2xl:text-[21px] font-adlam">
              {safeName}
            </h1>
            {/* Badge de estado */}
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(safeStatus)}`}>
              {safeStatus}
            </span>
          </div>
          
          <p className="text-[11px] sm:text-[15px] xl:text-[12px] 2xl:text-[15px] font-adlam mr-2 text-[#3E3E3E]">
            {safePosition}
          </p>
        </div>
        
        <button
          onClick={onView}
          className="flex items-center justify-center bg-black p-3 rounded-lg w-auto mr-7 transition-transform duration-200 hover:scale-104"
          type="button"
        >
          <span
            style={{ fontFamily: "'Mint Sans', sans-serif" }}
            className="text-white font-bold text-[15px]"
          >
            {/* Mostrar solo en pantallas < lg y entre xl y 2xl */}
            <span className="block lg:hidden xl:flex 2xl:hidden sm:mx-2">Ver</span>
            {/* Mostrar solo en pantallas entre lg y xl, y >= 2xl */}
            <span className="hidden lg:block xl:hidden 2xl:block">Ver testimonio</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;