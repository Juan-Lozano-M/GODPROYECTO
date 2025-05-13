import React, { useState } from 'react';
import Galle from "../assets/cookie.png";
import AcceptIcon from "../assets/accept.png";
import CloseIcon from "../assets/x.png";

function CookiesBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-10 right-20 z-50 flex flex-col items-end font-nunito">
      {/* Contenedor general relativo para posicionar el botón sobre la línea */}
      <div className="relative">
        {/* Banner principal */}
        <div className="bg-[#732bf9] text-black text-sm w-[360px] rounded-md p-4 flex items-start justify-between shadow-lg border-[2px] border-black">
          <div className="flex gap-3">
            <img src={Galle} alt="cookie" className="w-10 h-10 mt-2" />
            <div className="flex flex-col">
              <p className="leading-tight">
                Este sitio web usa cookies. Al continuar navegando, aceptas su uso según nuestra{" "}
                <a href="/privacy" className="underline hover:text-white transition-all">Política de Privacidad</a>.
              </p>
            </div>
          </div>

          {/* Botón de cerrar con hover verde y más grande */}
          <button
            onClick={() => setVisible(false)}
            className="group transition-all"
          >
            <img
              src={CloseIcon}
              alt="close"
              className="w-10 h-4 transition-all duration-200 ease-in-out transform
                         group-hover:scale-125 group-hover:brightness-0 group-hover:invert group-hover:hue-rotate-[90deg]"
            />
          </button>
        </div>

        {/* Botón Accept más pequeño, centrado y sobresaliendo del contenedor */}
        <button
          onClick={() => setVisible(false)}
          className="absolute right-1 -translate-x-1/2 bottom-[-16px] bg-[#A4FF00] text-black font-bold py-1.5 px-4 border-2 border-black rounded-md text-xs
                     shadow-[0_3px_0_0_#000] transition-all duration-150 ease-in-out
                     hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                     active:translate-y-2 active:shadow-[0px_1px_0px_0px_black] flex items-center gap-1"
        >
          <img src={AcceptIcon} alt="accept" className="w-3 h-3" />
          Accept
        </button>
      </div>
    </div>
  );
}

export default CookiesBanner;
