const StatCard = ({ value, label, bgColor = "bg-black/7", className = "" }) => {
  return (
    <div className={`${bgColor} rounded-lg w-full mt-10 sm:mt-15 xl:mt-0 ${className} flex items-center justify-center flex-col text-center`}>
      <h1 className="text-[18px] sm:text-3xl xl:text-[33px] 2xl:text-[40px] font-black mt-3 xl:mt-5 2xl:mt-3">
        {value}
      </h1>
      <h1 className="text-[13px] sm:text-lg xl:text-[17px] mx-2 font-black flex 2xl:mx-11 mb-3 xl:mb-4">
        {label}
      </h1>
    </div>
  );
};
export default StatCard;
