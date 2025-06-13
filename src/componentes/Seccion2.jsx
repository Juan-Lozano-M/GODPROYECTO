import React from "react";
import { Plane, Users, Monitor } from "lucide-react";

// Importación de imágenes
import spidermanCat from "../assets/spiderman_cat.png";
import image3 from "../assets/3.png";
import mirarArriba from "../assets/mirar_arriba.png";

const Seccion2 = () => {
  return (
    <>
      {/* Estilos específicos para Sección 2 */}
      <style>{`
        /* Estilos para pantallas pequeñas de altura */
        @media (max-height: 700px) {
          .section2-title {
            font-size: 3rem !important;
            line-height: 1.2 !important;
          }
          .section2-stats {
            margin-bottom: 3rem !important;
            padding: 1rem !important;
          }
          .section2-stat-value {
            font-size: 2rem !important;
          }
          .section2-stat-label {
            font-size: 0.75rem !important;
          }
          .section2-card {
            height: 420px !important;
          }
          .section2-card-image {
            height: 200px !important;
          }
        }

        /* Estilos para pantallas extra grandes */
        @media (min-width: 1600px) {
          .section2-title {
            font-size: 4.5rem !important;
          }
          .section2-stat-value {
            font-size: 3rem !important;
          }
          .section2-card {
            height: 600px !important;
          }
          .section2-card-image {
            height: 350px !important;
          }
        }

        /* Animaciones suaves para hover */
        .section2-card-image {
          transition: transform 0.3s ease-out;
        }
        .section2-card:hover .section2-card-image {
          transform: scale(1.1);
        }
      `}</style>

      <section className="font-sans p-4 md:p-6 mb-8 md:mb-20 max-w-7xl mx-auto text-gray-800">
        {/* Estadísticas principales */}
        <div className="section2-stats flex flex-col lg:flex-row justify-between items-center gap-4 mb-12 md:mb-36 bg-transparent p-4 md:p-6 rounded-lg shadow-md border border-black">
          {[
            {
              label: "De los colombianos NO acceden a educación superior",
              value: "60%",
              highlight: true,
              color: "text-[#9CE840]",
              source: "MEN & DANE, 2023",
              link: "#"
            },
            {
              label: "De estudiantes universitarios desertan en Colombia",
              value: "48%",
              highlight: true,
              color: "text-[#9CE840]",
              source: "SPADIES - MEN, 2023",
              link: "#"
            },
            {
              label: "De profesionales colombianos trabajan en su área de estudio",
              value: "22%",
              highlight: true,
              color: "text-[#9CE840]",
              source: "OLE - MEN, 2022",
              link: "#"
            },
            {
              label: "De desempleo juvenil en Colombia (18-28 años)",
              value: "23.8%",
              highlight: true,
              color: "text-[#9CE840]",
              source: "DANE, 2023",
              link: "#"
            },
          ].map(({ label, value, highlight, color, source, link }, i) => (
            <div key={i} className="text-center flex-1 min-w-0 mb-6 lg:mb-0 px-2">
              <span className={`section2-stat-value block text-2xl md:text-4xl font-extrabold mb-1 ${highlight ? color : "text-gray-900"}`}>
                {value}
              </span>
              <span className="section2-stat-label text-xs md:text-sm text-gray-600 uppercase tracking-wide leading-tight block px-2">
                {label}
              </span>
              <p className="text-xs text-gray-500 mt-2">
                Fuente:{" "}
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#9CE840] hover:underline">
                  {source}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Título principal */}
        <div className="text-center mt-6 md:mt-10 p-4 md:p-8 mb-8 md:mb-12">
          <h1 className="section2-title text-2xl md:text-4xl lg:text-6xl font-bold leading-tight px-4">
            Descubre tu camino con{" "}
            <span className="text-[#9CE840]"> nosotros</span>,{" "}
            conoce que<span className="text-[#CCED22]"> combatimos </span>
            y <span className="text-teal-400">como </span>lo hacemos.
          </h1>
        </div>

        {/* Tarjetas */}
        <div className="w-full flex justify-center px-2 md:px-3">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 justify-items-center">
              {/* Tarjeta 1 */}
              <div className="section2-card relative rounded-3xl overflow-hidden shadow-xl h-[400px] md:h-[500px] w-full max-w-[320px] bg-transparent border border-black p-4 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="p-2 md:p-3">
                      <Plane className="w-5 h-5 md:w-6 md:h-6 text-black" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-black leading-tight">
                      Alta deserción en <br className="hidden md:block" /> 
                      <span className="md:hidden">las </span>universidades
                    </h3>
                  </div>
                  <p className="text-black font-light ml-2 md:ml-4 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                    Muchos jóvenes eligen carreras sin guía y abandonan al poco tiempo. Te ayudamos a tomar decisiones informadas y conscientes.
                  </p>
                </div>
                <img
                  src={spidermanCat}
                  alt="spiderman cat"
                  className="section2-card-image w-full h-[200px] md:h-[300px] object-contain mt-auto"
                />
              </div>

              {/* Tarjeta 2 */}
              <div className="section2-card relative rounded-3xl overflow-hidden shadow-xl h-[400px] md:h-[500px] w-full max-w-[320px] bg-transparent border border-black p-4 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="p-2 md:p-3">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-black" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-black leading-tight">
                      Carreras sin conexión laboral
                    </h3>
                  </div>
                  <p className="text-black font-light ml-2 md:ml-4 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                    La mayoría termina en trabajos que no se relacionan con su carrera. Te ayudamos a alinear tu vocación con tu futuro profesional.
                  </p>
                </div>
                <img
                  src={image3}
                  alt="imagen 3"
                  className="section2-card-image w-full h-[200px] md:h-[300px] object-contain mt-auto"
                />
              </div>

              {/* Tarjeta 3 */}
              <div className="section2-card relative rounded-3xl overflow-hidden shadow-xl h-[400px] md:h-[500px] w-full max-w-[320px] bg-transparent border border-black p-4 md:p-6 flex flex-col justify-between md:col-span-2 lg:col-span-1 md:mx-auto">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="p-2 md:p-3">
                      <Monitor className="w-5 h-5 md:w-6 md:h-6 text-black" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-black leading-tight">
                      Presión y estrés constante
                    </h3>
                  </div>
                  <p className="text-black font-light ml-2 md:ml-4 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                    La toma de decisiones bajo presión afecta la salud mental. Brindamos apoyo para elegir con calma y claridad.
                  </p>
                </div>
                <img
                  src={mirarArriba}
                  alt="mirar arriba"
                  className="section2-card-image w-full h-[200px] md:h-[300px] object-contain mt-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Seccion2;