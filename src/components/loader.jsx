import Lottie from "lottie-react";
import Loaderg from "../assets/loader.json"; // Archivo Lottie

const Loader = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-40 h-40"> {/* Ajusta el tamaño según tu animación */}
          <Lottie animationData={Loaderg} loop  className="scale-300"/>
        </div>
      </div>
    );
  };
  
  export default Loader;