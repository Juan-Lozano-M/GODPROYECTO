import React, { useState } from 'react';
import { Users, Target, Heart, Lightbulb, ArrowRight, Play, Star, Zap } from 'lucide-react';

const PorQueEsDiferente = () => {
  const [activeTab, setActiveTab] = useState('tradicional');

  const metodosTradicionales = [
    {
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      titulo: "Tests vocacionales estáticos",
      descripcion: "Cuestionarios predefinidos sin contexto real"
    },
    {
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      titulo: "Orientación individual",
      descripcion: "Proceso aislado sin conexión con la realidad laboral"
    },
    {
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      titulo: "Enfoque teórico",
      descripcion: "Información sobre carreras sin experiencia práctica"
    }
  ];

  const enfoqueGOD = [
    {
      icon: <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      titulo: "Experiencias reales e inmersivas",
      descripcion: "Gameplays y parches con profesionales activos del sector productivo"
    },
    {
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      titulo: "Conexión intergeneracional",
      descripcion: "Interacción directa con estudiantes universitarios y trabajadores expertos"
    },
    {
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      titulo: "Gestión emocional integrada",
      descripcion: "Change Management para manejar miedos y presiones académicas"
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 font-sans min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Header - Optimizado para pantallas pequeñas */}
        <div className="text-center mt-6 md:mt-10 p-4 md:p-8 mb-8 md:mb-12">
          <h1 className="section2-title text-4xl md:text-5xl lg:text-6xl font-bold font-sans leading-tight px-4 text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            ¿Por qué somos <span className="text-[#9CE840]">diferentes</span>?
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed font-sans">
            GOD revoluciona la orientación vocacional con un sistema de innovación que conecta 
            a los jóvenes directamente con la realidad académica y laboral de sus regiones.
          </p>
        </div>

        {/* Comparación Tabs - Mejorado para móviles */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg w-full max-w-md sm:max-w-lg">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setActiveTab('tradicional')}
                  className={`px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3 rounded-full font-medium transition-all text-xs sm:text-sm lg:text-base ${
                    activeTab === 'tradicional'
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Métodos Tradicionales
                </button>
                <button
                  onClick={() => setActiveTab('god')}
                  className={`px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3 rounded-full font-medium transition-all text-xs sm:text-sm lg:text-base ${
                    activeTab === 'god'
                      ? 'bg-[#9CE840] text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Enfoque GOD
                </button>
              </div>
            </div>
          </div>

          {/* Grid responsivo mejorado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(activeTab === 'tradicional' ? metodosTradicionales : enfoqueGOD).map((item, index) => (
              <div 
                key={index}
                className={`p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 hover:transform hover:scale-105 ${
                  activeTab === 'tradicional' 
                    ? 'border border-black bg-white' 
                    : 'bg-gradient-to-br from-white to-purple-50 border border-black'
                } ${
                  // Para pantallas muy pequeñas en altura, reducir el último elemento en móvil vertical
                  index === 2 && window.innerHeight < 600 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 ${
                  activeTab === 'tradicional'
                    ? 'border border-black text-gray-600'
                    : 'bg-[#9CE840] text-white'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight font-sans">
                  {item.titulo}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                  {item.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PorQueEsDiferente;