
const CartoonButton = ({ text = "Crear noticia" }) => {
  return (
    <div className="w-full">      <button 
        className="
          relative w-full cursor-pointer border-none rounded-xl bg-black
          text-lg xl:text-base 2xl:text-lg font-bold overflow-hidden
          transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
          hover:shadow-[4px_4px_0_rgba(0,0,0,0.5)]
          hover:translate-x-[-4px] hover:translate-y-[-4px]
          hover:animate-[brutalistShake_0.4s_cubic-bezier(0.36,0.07,0.19,0.97)_both]
          active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
          active:translate-x-[-2px] active:translate-y-[-2px]
          focus:outline-none
          focus:shadow-[0_0_0_2px_black,inset_0_0_0_2px_#e8e8e8]
          group
        "
      ><span 
          className="
            block box-border border-[5px] border-black rounded-xl
            px-2 py-3 sm:px-4 text-adlam sm:py-4 sm:text-[22px] xl:px-3 xl:py-3 xl:text-[20px] 2xl:px-4 2xl:py-4 2xl:text-[22px] bg-[#e8e8e8] text-black
            transform translate-y-[-0.2em]
            transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
            group-hover:translate-y-[-0.33em]
            group-active:translate-y-0
            button-top
          "
        >
          {text}
        </span>
      </button>
      
      <style jsx>{`
        @keyframes brutalistShake {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(-2px) translateY(-2px) rotate(-1deg);
          }
          75% {
            transform: translateX(2px) translateY(2px) rotate(1deg);
          }
        }
        
        button:hover .button-top {
          transform: translateY(-0.33em);
        }
        
        button:active .button-top {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default CartoonButton;