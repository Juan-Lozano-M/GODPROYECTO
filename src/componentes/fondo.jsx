import React from "react";
import fondo1 from "../assets/fondo1.png";

const Fondo = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
      <img
        src={fondo1}
        alt="Fondo decorativo"
        className="w-full object-cover"
      />
    </div>
  );
};

export default Fondo;
