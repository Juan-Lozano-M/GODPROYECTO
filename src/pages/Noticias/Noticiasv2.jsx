
import NewsList from "../../components/noticia/NewsList"; // Importa el componente de lista de noticias
  import { ArrowRight } from "lucide-react";
  import { useState } from "react";
  import imagennews from "../../assets/news.svg"

  // Componente funcional Noticiasv2 que renderiza la sección de noticias
  function Noticiasv2() {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <main className="min-h-screen bg-white"> {/* Contenedor principal con fondo blanco y altura mínima de pantalla completa */}


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
              <div className="relative h-[710px] w-full ">
                <img src={imagennews} alt="Games Collage"
                  className="absolute inset-0 w-full h-full object-cover" />
                
                {/* Capa de degradado sobre la imagen */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30"></div>

                {/* Contenido sobre la imagen */}
                <div 
                  className="absolute bottom-[-40px] left-100 right-0 p-10 bg-gray-800 transform transition-all duration-300 hover:translate-x-2"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="bg-white inline-block px-4 py-1 mb-2">
                    <span className="text-black text-sm font-medium">NEWS</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2 transition-all duration-300 group-hover:text-gray-300">
                    NOTICIAS DESTACADAS
                  </h2>
                  <p className="text-white text-sm transition-all duration-300">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit et porro repellendus possimus ut rem ullam maior.
                  </p>

                  {/* Nuevo botón de flecha con animación */}
                  <div className={`absolute right-8 bottom-8 p-4 rounded-full bg-white transition-all duration-300 ${
                    isHovered ? 'translate-x-2' : ''
                  }`}>
                    <ArrowRight className="w-6 h-6 text-gray-800" />
                  </div>
                </div>


              </div>

              {/* Botones de filtro de noticias en la esquina superior derecha */}
              <div className="absolute top-0 right-0 bottom-36 flex flex-col justify-center space-y-2 bg-gray-100 p-6">
                <button className="bg-[#87C232] text-white px-12 py-4 font-medium hover:bg-[#87C232]">
                  ALL NEWS
                </button>
                <button className="bg-gray-400 text-white px-12 py-4 font-medium hover:bg-gray-500">
                  RESEARCH
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
