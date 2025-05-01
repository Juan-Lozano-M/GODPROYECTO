const TestimonialStat = ({ value, indicator, label, iconSrc, bgColor }) => {

    return (
      
        <div className="flex h-auto w-auto">
          <div className="flex justify-center items-center w-auto">
            <h1 className="mt-auto font-adlam text-5xl lg:text-6xl"> {value} </h1>
          </div>
          <div className="flex flex-col items-end h-full w-auto ml-2 sm:ml-3 mt-2">
          <div
                className="flex justify-center items-center gap-1 px-1 sm:px-2 rounded-full px-"
                style={{ backgroundColor: bgColor }}
          >
              <img src={iconSrc} className="h-3" alt="Flecha" />
              <p className="text-[12px] sm:text-[15px] font-adlam"> {indicator} </p>
            </div>
            <p className="font-adlam text-[12px] lg:text-[20px]"> {label} </p>
          </div>
        </div>
      );
    };

export default TestimonialStat;