import React from "react";
import { Plane, Users, Monitor } from "lucide-react";

// Importación de imágenes
import spidermanCat from "../assets/spiderman_cat.png";
import image3 from "../assets/3.png";
import mirarArriba from "../assets/mirar_arriba.png";

const Seccion2 = () => {
  return (
    <section className="font-sans p-6 max-w-7xl mx-auto text-gray-800">
      {/* Estadísticas principales */}
      <div className="flex justify-around flex-wrap gap-6 mb-[9rem] bg-transparent p-6 rounded-lg shadow-md border border-black">
        {[
          {
            label: "Estudiantes Matriculados",
            value: "2.475.833",
            highlight: true,
            color: "text-[#9CE840]",
            source: "Ministerio de Educación Nacional, 2023",
            link: "https://snies.mineducacion.gov.co/portal/416243%3AEl-Ministerio-de-%20Educacion-Nacional-pone-a-disposicion-la-informacion-estadistica-de-educacion-superior-2022"
          },
          {
            label: "Graduados en 2023",
            value: "534.942",
            highlight: true,
            color: "text-[#9CE840]",
            source: "La República, 2024",
            link: "https://www.larepublica.co/empresas/de-1-6-millones-de-estudiantes-matriculados-en-pregrado-solo-18-termina-la-carrera-3968805"
          },
          {
            label: "Tasa de Graduación",
            value: "18%",
            highlight: true,
            color: "text-[#9CE840]",
            source: "La República, 2024",
            link: "https://www.larepublica.co/empresas/de-1-6-millones-de-estudiantes-matriculados-en-pregrado-solo-18-termina-la-carrera-3968805"
          },
          {
            label: "Satisfacción Laboral",
            value: "75,1%",
            highlight: true,
            color: "text-[#9CE840]",
            source: "Portafolio, 2023",
            link: "https://www.portafolio.co/economia/empleo/graduacion-75-de-los-graduados-estan-vinculados-al-sistema-laboral-formal-580348"
          },
        ].map(({ label, value, highlight, color, source, link }, i) => (
          <div key={i} className="text-center max-w-xs">
            <span className={`block text-4xl font-extrabold mb-1 ${highlight ? color : "text-gray-900"}`}>
              {value}
            </span>
            <span className="text-sm text-gray-600 uppercase tracking-wide">{label}</span>
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
      <div className="text-start mt-10 p-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Unlock your{" "}
          <span className="text-[#9CE840]">creative potential</span>,{" "}
          <span className="text-[#CCED22]">connect with others</span>,<br />
          and <span className="text-teal-400">stand out from the crowd</span>.
        </h1>
      </div>

      {/* Tarjetas */}
      <div className="w-full flex p-3 justify-center">
        <div className="w-[100%] ml-5">
          <div className="grid grid-cols-3 gap-5">
            {/* Tarjeta 1 */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-[500px] w-full max-w-[320px] bg-transparent border border-black p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="p-3">
                    <Plane className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Elevate Your Design</h3>
                </div>
                <p className="text-black font-light ml-4 text-sm mb-6 leading-relaxed">
                  Refine your skills into mastery. Elevate project quality and client engagement with a distinctive aesthetic vision.
                </p>
              </div>
              <img
                src={spidermanCat}
                alt="spiderman cat"
                className="w-full h-[300px] object-contain mt-auto transition-transform duration-200 ease-out transform hover:scale-125"
              />
            </div>

            {/* Tarjeta 2 */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-[500px] w-full max-w-[320px] bg-transparent border border-black p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="p-3">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold  text-black">Creative Collaboration</h3>
                </div>
                <p className="text-black font-light ml-4 text-sm mb-6 leading-relaxed">
                  Connect with a vibrant community of designers. Share, learn, and grow in a collaborative creative ecosystem.
                </p>
              </div>
              <img
                src={image3}
                alt="imagen 3"
                className="w-full h-[300px] object-contain mt-auto transition-transform duration-200 ease-out transform hover:scale-125"
              />
            </div>

            {/* Tarjeta 3 */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-[500px] w-full max-w-[320px] bg-transparent border border-black p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="p-3">
                    <Monitor className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Distinctive Voice</h3>
                </div>
                <p className="text-black text-sm font-light ml-4 mb-6 leading-relaxed">
                  Craft a unique brand identity. Develop a voice that resonates and elevates your presence in any medium.
                </p>
              </div>
              <img
                src={mirarArriba}
                alt="mirar arriba"
                className="w-full h-[300px] object-contain mt-auto transition-transform duration-200 ease-out transform hover:scale-125"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seccion2;
