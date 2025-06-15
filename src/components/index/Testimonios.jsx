import { useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Ingeniero de Software",
    message:
      "Trabajar en tecnología me ha enseñado que la perseverancia y la pasión son claves para superar cualquier obstáculo. Es un camino que vale la pena recorrer porque cada logro es un impulso para crecer.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Laura Gómez",
    role: "Diseñadora UX/UI",
    message:
      "Ser diseñadora me permite combinar creatividad con funcionalidad para crear experiencias increíbles para los usuarios. En esta profesión, el detalle lo es todo y cada proyecto es una oportunidad para aprender.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Andrés Ramírez",
    role: "Desarrollador Frontend",
    message:
      "Cada línea de código es una oportunidad para construir algo que pueda impactar la vida de muchas personas. Aprender constantemente es la clave para estar siempre vigente en esta profesión dinámica.",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    id: 4,
    name: "Sofía Torres",
    role: "Analista de Datos",
    message:
      "Mi trabajo consiste en transformar datos complejos en historias claras que ayuden a tomar decisiones estratégicas. La precisión y la curiosidad son mis mejores herramientas.",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 5,
    name: "Javier Martínez",
    role: "Administrador de Redes",
    message:
      "Mantener las redes funcionando es un desafío constante, pero la satisfacción de resolver problemas es enorme. La paciencia y la atención al detalle son indispensables para esta labor.",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 6,
    name: "Valentina Rojas",
    role: "Especialista en Marketing Digital",
    message:
      "Ayudar a las marcas a conectar con sus clientes es una pasión que me impulsa a estar siempre aprendiendo. En marketing, la creatividad y el análisis van de la mano para lograr resultados.",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export default function Testimonios() {
  const duplicated = [...testimonials, ...testimonials];
  const trackRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    message: ''
  });

  const pauseAnimation = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "paused";
    }
  };

  const resumeAnimation = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "running";
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setFormData({
        role: '',
        message: ''
      });
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Aquí se procesaría la información del formulario
    console.log('Datos del testimonio:', formData);
    closeModal();
  };

  return (
    <div className="relative mt-4 sm:mt-8 mb-4 sm:mb-8 overflow-hidden w-full py-8 sm:py-12 lg:py-16 bg-white flex flex-col items-center">
      <div className="text-center mb-8 sm:mb-12 lg:mb-20 px-4">
        <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
          Historias inspiradoras
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-black/50 font-semibold mb-4 sm:mb-6 lg:mb-8">
          Compártenos tu experiencia.
        </p>
        <button 
          onClick={openModal}
          className="bg-[#9CE840] hover:bg-[#7FBF33] text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-md text-base sm:text-lg shadow-md transition-transform duration-300 transform hover:scale-105"
        >
          Agregar testimonio
        </button>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
          }

          @keyframes slide-up {
            from { 
              transform: translateY(100%);
            }
            to { 
              transform: translateY(0);
            }
          }

          @keyframes slide-down {
            from { 
              transform: translateY(0);
            }
            to { 
              transform: translateY(100%);
            }
          }

          @keyframes x-bounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.3) rotate(90deg); }
            100% { transform: scale(1) rotate(0deg); }
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }

          .animate-fade-out {
            animation: fade-out 0.3s ease-out forwards;
          }

          .animate-slide-up {
            animation: slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          .animate-slide-down {
            animation: slide-down 0.3s ease-in forwards;
          }

          .animate-x-bounce {
            animation: x-bounce 0.3s ease-out;
          }

          /* Optimización para pantallas pequeñas */
          @media (max-height: 600px) {
            .modal-container {
              padding: 1rem !important;
              max-height: 95vh !important;
            }
            
            .modal-content {
              padding: 1rem !important;
              max-height: none !important;
            }
            
            .testimonial-card {
              min-height: 200px !important;
            }
          }

          @media (max-height: 500px) {
            .modal-container {
              padding: 0.5rem !important;
            }
            
            .modal-content {
              padding: 0.75rem !important;
            }
          }
        `}
      </style>

      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex animate-scroll gap-3 sm:gap-4 lg:gap-6"
          style={{
            animation: "scroll 20s linear infinite",
            width: "max-content",
          }}
        >
          {duplicated.map((t, i) => (
            <div key={i} className="p-2 sm:p-3">
              <div
                onMouseEnter={pauseAnimation}
                onMouseLeave={resumeAnimation}
                className="testimonial-card flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] bg-white border border-black rounded-lg shadow-md p-4 sm:p-5 lg:p-6 transition-transform transform hover:scale-105"
              >
                <div className="flex items-start">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <p className="font-semibold text-base sm:text-lg">{t.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{t.role}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-3 sm:mt-4 leading-relaxed">{t.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Responsivo */}
      {isModalOpen && (
        <div
          className={`modal-container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 ${
            isClosing ? 'animate-fade-out' : 'opacity-0 animate-fade-in'
          }`}
          onClick={closeModal}
        >
          <div
            className={`modal-content bg-white rounded-lg p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto ${
              isClosing ? 'animate-slide-down' : 'translate-y-full animate-slide-up'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Nuevo Testimonio</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl font-bold hover:animate-x-bounce transition-colors p-1"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Profesión o Cargo
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9CE840] focus:border-transparent"
                  placeholder="Ej: Desarrollador Frontend, Diseñadora UX/UI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Tu testimonio
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9CE840] focus:border-transparent resize-none"
                  placeholder="Comparte tu experiencia, aprendizajes o consejos que puedan inspirar a otros profesionales..."
                />
              </div>

              <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-[#9CE840] hover:bg-[#7FBF33] text-white rounded-md font-medium transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}