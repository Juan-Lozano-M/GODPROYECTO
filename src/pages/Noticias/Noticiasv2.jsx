
import NewsList from "../../components/noticia/NewsList"; // Importa el componente de lista de noticias
  import { ArrowRight } from "lucide-react";
  import { useState } from "react";
  import imagennews from "../../assets/images/news.png"; // Importa la imagen de fondo para la sección de noticias
  import Cursor from "../../components/Cursor"; // Importa el componente de cursor personalizado

  // Componente funcional Noticiasv2 que renderiza la sección de noticias
  function Noticiasv2() {
    const [isHovered, setIsHovered] = useState(false);

    return (
      
      <main className="min-h-screen bg-white"> {/* Contenedor principal con fondo blanco y altura mínima de pantalla completa */}
        <Cursor/>

        {/* Sección principal con imagen destacada */}
        <div className="relative ">
          <div className="flex">
            
            {/* Barra lateral roja con texto vertical */}
            <div className="w-35 bg-[#87C232] flex flex-col items-center  py-8 ">
              <div className="text-white font-bold mt-35 text-4xl " style={{ writingMode: "vertical-rl" }}>
                NOTICIAS RECIENTES
              </div>
            </div>

            {/* Contenedor de la imagen principal */}
            <div className="flex-1 relative">
              <div className="relative h-[710px] w-full bg-[#9CE840] ">
                <img src={imagennews} alt="Games Collage"
                  className="absolute inset-0 w-[1000px] h-full object-cover" />
                
                {/* Capa de degradado sobre la imagen */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30"></div>

                {/* Contenido sobre la imagen */}
                <div 
                  className="absolute bottom-[-40px] md:bottom-[-40px] left-4 md:left-100 right-4 md:right-0 p-4 md:p-10 bg-gray-800 transform transition-all duration-300 hover:translate-x-2 z-20"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="bg-white inline-block px-2 md:px-4 py-1 mb-2">
                    <span className="text-black text-xs md:text-sm font-medium">NOTICIAS</span>
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">
                    NOTICIAS DESTACADAS
                  </h2>
                  <p className="text-xs md:text-sm text-white transition-all duration-300">
                  Descubre tu camino con inspiración. En esta seccion de noticias destacadas encontrarás historias motivadoras, consejos prácticos y oportunidades que te ayudarán a explorar y definir tu vocación. ¡Cada edición está pensada para acercarte un paso más a tu propósito!
                  </p>

                  {/* Nuevo botón de flecha con animación */}
                  <div className={`absolute right-4 md:right-8 bottom-4 md:bottom-8 p-2 md:p-4 rounded-full bg-white transition-all duration-300 ${
                    isHovered ? 'translate-x-2' : ''
                  }`}>
                    <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
                  </div>
                </div>

                {/* Fondo blanco debajo de noticias destacadas */}
                <div className="absolute bottom-[-80px] left-0 right-0 h-[40px] bg-white z-10"></div>
              </div>

              {/* Botones de filtro de noticias */}
              <div className="absolute md:top-0 md:right-0 md:bottom-36 bottom-[-120px] left-4 right-4 md:left-auto flex flex-row md:flex-col justify-between md:justify-center space-x-2 md:space-x-0 md:space-y-2 md:bg-gray-100 md:p-6 z-10">
                <button className="bg-[#87C232] text-white px-6 md:px-12 py-2 md:py-4 text-sm md:text-base font-medium hover:bg-[#87C232] flex-1 md:flex-none">
                  DESCUBRE
                </button>
                <button className="bg-gray-400 text-white px-6 md:px-12 py-2 md:py-4 text-sm md:text-base font-medium hover:bg-gray-500 flex-1 md:flex-none">
                  BUSCA
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de lista de noticias */}
        <div className="max-w-6xl mx-auto px-4 py-8 mt-30">
          <div className="grid grid-cols-1 gap-16">
            {/* Renderiza la lista de noticias */}
            <NewsList />
          </div>
        </div>
      </main>
    );
  }

  export default Noticiasv2; // Exporta el componente para su uso en la aplicación
