const TestimonialCard = ({ image, name, title }) => {
  return (
    <div className="flex items-center w-full h-27 bg-black/7 rounded-sm">
      <img src={image} className="w-19 rounded-lg ml-4" alt={`Imagen de ${name}`} />
      <div className="flex justify-between items-center w-full h-full">
        <div className="ml-10">
            <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className="text-[15px] lg:text-[20px] xl:text-[15px] font-bold">{name}</h1>
            <p style={{ fontFamily: "'Quicksand', sans-serif" }} className="text-[11px] lg:text-[15px] xl:text-[13px] font-bold mr-2 text-[#3E3E3E]">{title}</p>
        </div>
        <div className="flex items-center justify-center bg-black p-3 rounded-lg w-auto mr-7">
        <h1
          style={{ fontFamily: "'Mint Sans', sans-serif" }}
          className="text-white font-bold text-[15px]"
        >
          <span className="block 2xl:hidden mx-3">Ver</span>
          <span className="hidden 2xl:block">Ver testimonio</span>
        </h1>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;