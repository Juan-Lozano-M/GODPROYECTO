import React from 'react';

const VocationalGuidanceBenefits = () => {
  return (
    <>
      {/* Estilos específicos para VocationalGuidanceBenefits */}
      <style>{`
        /* Estilos para pantallas pequeñas de altura */
        @media (max-height: 700px) {
          .vocational-title {
            font-size: 2.8rem !important;
            margin-bottom: 1rem !important;
          }
          .vocational-section {
            padding: 2rem 0 !important;
            margin-bottom: 2rem !important;
          }
          .vocational-card-title {
            font-size: 1.25rem !important;
            margin-bottom: 0.5rem !important;
          }
          .vocational-card-text {
            font-size: 0.875rem !important;
            line-height: 1.4 !important;
          }
          .vocational-grid-gap {
            gap: 1rem !important;
          }
          .vocational-image {
            aspect-ratio: 1 / 1 !important;
          }
        }

        /* Estilos para pantallas extra grandes */
        @media (min-width: 1600px) {
          .vocational-title {
            font-size: 3.5rem !important;
          }
          .vocational-card-title {
            font-size: 1.75rem !important;
          }
          .vocational-card-text {
            font-size: 1.125rem !important;
          }
          .vocational-section {
            padding: 5rem 0 !important;
          }
        }

        /* Animaciones suaves */
        .vocational-card {
          transition: transform 0.2s ease-out;
        }
        .vocational-card:hover {
          transform: translateY(-2px);
        }

        .vocational-image {
          transition: transform 0.3s ease-out;
        }
        .vocational-image:hover {
          transform: scale(1.02);
        }
      `}</style>

      <div className="vocational-section font-sans mb-8 md:mb-20 py-6 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Título centrado para móviles */}
          <div className="text-center mb-8 lg:hidden">
            <h2 className="vocational-title text-gray-800 text-2xl md:text-4xl lg:text-6xl font-bold leading-tight px-4">
              ¿Cómo lo <span className="text-[#9CE840]">hacemos</span>?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Imagen solo visible en desktop */}
            <div className="relative mx-auto lg:ml-12 max-w-sm lg:max-w-lg order-2 lg:order-1 hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&h=800&q=80"
                alt="Jóvenes estudiantes trabajando colaborativamente"
                className="vocational-image w-full h-auto rounded-2xl shadow-lg object-cover aspect-[4/3] lg:aspect-[7/8]"
              />
            </div>
            
            {/* Contenido del lado derecho - ocupa todo el ancho en móvil */}
            <div className="flex flex-col justify-between h-full order-1 lg:order-2 lg:mr-12 text-center lg:text-left">
              {/* Título solo visible en desktop */}
              <div className="hidden lg:flex items-center gap-3 mb-6 md:mb-8">
                <h2 className="vocational-title text-2xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  ¿Cómo lo <span className="text-[#9CE840]">hacemos</span>?
                </h2>                           
              </div>
                           
              <div className="vocational-grid-gap grid grid-cols-1 gap-8 md:gap-8 flex-1">
                {/* Tarjetas como cards individuales en móvil */}
                <div className="vocational-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none lg:grid lg:grid-cols-2 lg:gap-6">
                  <div className="mb-6 lg:mb-0">
                    <h3 className="vocational-card-title text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      Exploración Vocacional
                    </h3>
                    <p className="vocational-card-text text-gray-600 text-base md:text-base leading-relaxed">
                      Análisis 360° del estudiante con padres, jóvenes y docentes para identificar inclinaciones hacia actividades, entornos y personas específicas.
                    </p>
                  </div>
                  <div className="lg:block">
                    <h3 className="vocational-card-title text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      Gestión del Cambio
                    </h3>
                    <p className="vocational-card-text text-gray-600 text-base md:text-base leading-relaxed">
                      Manejo y uso del miedo como herramienta de transformación, adaptación a nuevos entornos y fortalecimiento de la identidad personal.
                    </p>
                  </div>
                </div>
                 
                <div className="vocational-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none lg:grid lg:grid-cols-2 lg:gap-6">
                  <div className="mb-6 lg:mb-0">
                    <h3 className="vocational-card-title text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      Conexión con Profesionales
                    </h3>
                    <p className="vocational-card-text text-gray-600 text-base md:text-base leading-relaxed">
                      Conversatorios con estudiantes universitarios y profesionales activos para acercar a los jóvenes a la realidad académica y laboral.
                    </p>
                  </div>
                  <div className="lg:block">
                    <h3 className="vocational-card-title text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      Experiencias Directas
                    </h3>
                    <p className="vocational-card-text text-gray-600 text-base md:text-base leading-relaxed">
                      Visitas guiadas y encuentros personalizados en campos de acción reales para conocer de primera mano el futuro profesional.
                    </p>
                  </div>
                </div>
                 
                <div className="vocational-card bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none lg:grid lg:grid-cols-2 lg:gap-6">
                  <div className="mb-6 lg:mb-0">
                    <h3 className="vocational-card-title text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      Decisiones Conscientes
                    </h3>
                    <p className="vocational-card-text text-gray-600 text-base md:text-base leading-relaxed">
                      Toma de decisiones vocacionales autónomas basadas en vivencias directas y relacionamiento con entornos productivos afines.
                    </p>
                  </div>
                  <div className="lg:block">
                    <h3 className="vocational-card-title text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      Compromiso y Acción
                    </h3>
                    <p className="vocational-card-text text-gray-600 text-base md:text-base leading-relaxed">
                      Los participantes comparten aprendizajes, inspiran a sus pares y generan valor a través de experiencias colaborativas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VocationalGuidanceBenefits;