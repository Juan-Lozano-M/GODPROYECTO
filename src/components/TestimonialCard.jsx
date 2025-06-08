const TestimonialCard = ({ imageUrl, name, position, onView }) => {
  const inicial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="flex items-center w-full h-20 sm:h-27 bg-black/7 rounded-sm">
      {imageUrl ? (
        <img src={imageUrl} className="w-14 sm:w-19 rounded-lg ml-4 object-cover" alt={`Imagen de ${name}`} />
      ) : (
        <div className="w-14 sm:w-22 h-14 sm:h-19 rounded-lg ml-4 bg-gray-400 flex items-center justify-center text-white font-bold text-xl">
          {inicial}
        </div>
      )}
      <div className="flex justify-between items-center w-full h-full">
        <div className="ml-5 sm:ml-10">
          <h1 className="text-[15px] sm:text-[20px] xl:text-[18px] 2xl:text-[21px] font-bold">{name}</h1>
          <p className="text-[11px] sm:text-[15px] xl:text-[12px] 2xl:text-[15px] font-bold mr-2 text-[#3E3E3E]">{position}</p>
        </div>
        <button
          onClick={onView}
          className="flex items-center justify-center bg-black p-3 rounded-lg w-auto mr-7"
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