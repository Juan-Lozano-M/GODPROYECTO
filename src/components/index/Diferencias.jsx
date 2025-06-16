import { useState } from 'react';

const Diferencias = () => {
  const [activeTab, setActiveTab] = useState('tradicional');

  const metodosTradicionales = [
    {
      titulo: "Tests vocacionales estáticos",
      descripcion: "Cuestionarios predefinidos sin contexto real"
    },
    {
      titulo: "Orientación individual",
      descripcion: "Proceso aislado sin conexión con la realidad laboral"
    },
    {
      titulo: "Enfoque teórico",
      descripcion: "Información sobre carreras sin experiencia práctica"
    }
  ];

  const enfoqueGOD = [
    {
      titulo: "Experiencias reales e inmersivas",
      descripcion: "Gameplays y parches con profesionales activos del sector productivo"
    },
    {
      titulo: "Conexión intergeneracional",
      descripcion: "Interacción directa con estudiantes universitarios y trabajadores expertos"
    },
    {
      titulo: "Gestión emocional integrada",
      descripcion: "Change Management para manejar miedos y presiones académicas"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header minimalista */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            ¿Por qué somos{' '}
            <span className="relative">
              <span className="text-[#9CE840]">diferentes</span>
            </span>
            ?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            GOD revoluciona la orientación vocacional conectando a los jóvenes 
            directamente con la realidad académica y laboral.
          </p>
        </div>

         {/* Tabs minimalistas */}
         <div className="mb-10 md:mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative bg-gray-100 rounded-full p-1 max-w-sm w-full">
              <div 
                className={`absolute top-1 bottom-1 rounded-full shadow-sm transition-all duration-300 ease-out ${
                  activeTab === 'tradicional' 
                    ? 'left-1 right-1/2 mr-0.5 bg-white' 
                    : 'right-1 left-1/2 ml-0.5 bg-[#9CE840]'
                }`}
              />
              <div className="relative grid grid-cols-2">
                <button
                  onClick={() => setActiveTab('tradicional')}
                  className={`py-3 px-4 text-sm font-medium transition-colors duration-200 rounded-full ${
                    activeTab === 'tradicional'
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Tradicional
                </button>
                <button
                  onClick={() => setActiveTab('god')}
                  className={`py-3 px-4 text-sm font-medium transition-colors duration-200 rounded-full ${
                    activeTab === 'god'
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  GOD
                </button>
              </div>
            </div>
          </div>
          
          {/* Cards minimalistas y responsivas */}
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
            {(activeTab === 'tradicional' ? metodosTradicionales : enfoqueGOD).map((item, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 bg-white border border-black hover:shadow-lg h-48 flex flex-col animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* Contenido */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    {item.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA minimalista */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-[#9CE840] rounded-full animate-pulse"></div>
            Descubre la diferencia GOD
          </div>
        </div>
      </div>

      {/* CSS en línea para la animación personalizada */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
        `}
      </style>
    </section>
  );
};

export default Diferencias;