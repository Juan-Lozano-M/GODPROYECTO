import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import Toast from '../alertas/Toast';

export default function Testimonios() {
  const [testimonials, setTestimonials] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const trackRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    message: ''
  });
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Aquí deberías obtener el token de tu contexto de autenticación o localStorage
        // Este es un ejemplo - ajústalo según tu implementación de autenticación
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        
        if (token) {
          setUserToken(token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);
  const openModal = () => {
    if (!isAuthenticated) {
      // Redirigir al login si no está autenticado
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setFormData({
        title: '',
        role: '',
        message: ''
      });
    }, 300);
  };
  const handleSubmit = async () => {
    if (!isAuthenticated || !userToken) {
      // Redirigir al login si no está autenticado
      navigate('/login');
      return;
    }

    if (!formData.title.trim() || !formData.message.trim()) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Construir el objeto de testimonio
      const testimonialData = {
        titulo_tes: formData.title.trim(),
        contenido_tes: formData.message.trim(),
        cargo_tes: formData.role.trim()
      };

      // Enviar a la API con el token de autenticación
      await axios.post(
        '/api/testimonials/create', 
        testimonialData,
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setShowToast(true); // Mostrar toast de éxito
      closeModal();
      
    } catch (error) {
      console.error('Error al enviar testimonio:', error);
      
      if (error.response?.status === 401) {
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        setIsAuthenticated(false);
        setUserToken(null);
      } else if (error.response?.status === 400) {
        alert('Por favor completa todos los campos obligatorios.');
      } else {
        alert('Error al enviar el testimonio. Inténtalo nuevamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const loadTestimonials = () => {
    axios
      .get("/api/testimonials/by-status?status=aprobado", {
        withCredentials: false  // No necesitamos credenciales para testimonios públicos
      })
      .then((res) => {
        let data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          // Si tenemos pocos testimonios, los duplicamos para tener suficientes para el carrusel
          if (data.length < 6) {
            const repeatCount = Math.ceil(6 / data.length);
            data = Array.from({ length: repeatCount }, () => data).flat();
          }
          setTestimonials(data);
        } else {
          // Si no hay testimonios, usamos unos de ejemplo
          setTestimonials([
            {
              nombre_usuario: "Usuario Ejemplo",
              cargo_tes: "Estudiante",
              titulo_tes: "Excelente plataforma",
              contenido_tes: "Game of Dreams me ayudó a encontrar mi vocación.",
              profile_image: null
            }
          ]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar testimonios:", err);
        // En caso de error, usamos testimonios de ejemplo
        setTestimonials([
          {
            nombre_usuario: "Usuario Ejemplo",
            cargo_tes: "Estudiante",
            titulo_tes: "Excelente plataforma",
            contenido_tes: "Game of Dreams me ayudó a encontrar mi vocación.",
            profile_image: null
          }
        ]);
      });
  };

  useEffect(() => {
    loadTestimonials();
  }, []);
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

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "U";

  const getColor = (name) => {
    const colors = ["#E6F4EA", "#FDEBD0", "#E8DAEF", "#D6EAF8", "#FCF3CF"];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full overflow-hidden bg-white py-24 px-4 sm:px-6 lg:px-8">
      <Toast
        title="¡Testimonio enviado!"
        message="Tu testimonio ha sido enviado exitosamente y está pendiente de aprobación."
        show={showToast}
        setShow={setShowToast}
      />      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-adlam text-gray-900 mb-2 sm:mb-4">
          Historias inspiradoras
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-black/50 font-semibold mb-4 sm:mb-6 lg:mb-8">
          Compártenos tu experiencia.
        </p>
        <button 
          onClick={openModal}
          className="bg-[#9CE840] hover:bg-[#7FBF33] text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-md text-base sm:text-lg shadow-md transition-transform duration-300 transform hover:scale-105"
        >
          {isAuthenticated ? 'Agregar testimonio' : 'Inicia sesión para agregar testimonio'}
        </button>
      </div>      <div className="relative w-full overflow-hidden">        <div
          ref={trackRef}
          className="flex animate-scroll gap-4"
          style={{
            animation: "scroll 40s linear infinite",
            width: "max-content",
          }}
        >
          {/* Duplicamos los testimonios para el efecto infinito */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={`testimonial-${i}`} className="p-2 sm:p-3">
              <div
                onMouseEnter={pauseAnimation}
                onMouseLeave={resumeAnimation}
                className="testimonial-card flex-shrink-0 w-[300px] min-h-[220px] bg-white border border-black rounded-lg shadow-md p-5 hover:scale-105 transition-transform"
              >
                <div className="flex items-start">
                  {t.profile_image ? (
                    <img
                      src={t.profile_image}
                      alt={t.nombre_usuario}
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-full mr-4 flex items-center justify-center text-lg font-bold text-white"
                      style={{ backgroundColor: getColor(t.nombre_usuario) }}
                    >
                      {getInitial(t.nombre_usuario)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-base">{t.nombre_usuario}</p>
                    <p className="text-sm text-gray-600">{t.cargo_tes}</p>
                  </div>
                </div>
                {t.titulo_tes && (
                  <p className="text-black font-semibold text-sm mt-2 mb-1">{t.titulo_tes}</p>
                )}
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  {t.contenido_tes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`modal-container fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6 ${
            isClosing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'
          }`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          onClick={closeModal}
        >
          <div
            className={`modal-content bg-white rounded-lg p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto ${
              isClosing ? 'modal-content-exit' : 'modal-content-enter'
            }`}
            onClick={(e) => e.stopPropagation()}
          >            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-adlam text-gray-900">Nuevo Testimonio</h3>
              <button
                onClick={closeModal}
                disabled={isSubmitting}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl font-bold hover:animate-x-bounce transition-colors p-1 disabled:opacity-50"
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
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9CE840] focus:border-transparent disabled:opacity-50"
                  placeholder="Ej: Desarrollador Frontend, Diseñadora UX/UI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Título del testimonio *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9CE840] focus:border-transparent disabled:opacity-50"
                  placeholder="Ej: Mi gran cambio, Cómo encontré mi vocación..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Tu testimonio *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9CE840] focus:border-transparent resize-none disabled:opacity-50"
                  placeholder="Comparte tu experiencia, aprendizajes o consejos que puedan inspirar a otros profesionales..."
                  required
                />
              </div>

              <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.title.trim() || !formData.message.trim()}
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-[#9CE840] hover:bg-[#7FBF33] text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }

          @keyframes modal-fade-in {
            from { 
              opacity: 0;
            }
            to { 
              opacity: 1;
            }
          }

          @keyframes modal-fade-out {
            from { 
              opacity: 1;
            }
            to { 
              opacity: 0;
            }
          }

          @keyframes modal-slide-up {
            from { 
              transform: translateY(100%);
              opacity: 0;
            }
            to { 
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes modal-slide-down {
            from { 
              transform: translateY(0);
              opacity: 1;
            }
            to { 
              transform: translateY(100%);
              opacity: 0;
            }
          }

          @keyframes x-bounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.3) rotate(90deg); }
            100% { transform: scale(1) rotate(0deg); }
          }

          .modal-backdrop-enter {
            animation: modal-fade-in 0.3s ease-out forwards;
          }

          .modal-backdrop-exit {
            animation: modal-fade-out 0.3s ease-out forwards;
          }

          .modal-content-enter {
            animation: modal-slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          .modal-content-exit {
            animation: modal-slide-down 0.3s ease-in forwards;
          }

          .animate-x-bounce {
            animation: x-bounce 0.3s ease-out;
          }

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
    </div>
  );
}