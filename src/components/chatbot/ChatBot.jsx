import axios from "axios"; // Usar tu configuración existente en lugar de axios directo
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { useEffect, useRef, useState } from "react";
import imagenChatbot from "../../assets/images/imagenChatbot.png";


const predefinedQuestions = [
  { text: "Top profesiones", style: "green" },
  { text: "¿Cómo saber qué estudiar?", style: "dark" },
  { text: "Trabajos con demanda?", style: "dark" },
  { text: "¿Qué hago si no me gusta nada?", style: "dark" },
]

export default function ChatInterface({ onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef(null)
  const scrollbarRef = useRef(null)
  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevenir scroll del body cuando el chat está abierto en móvil
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.classList.add('mobile-chat-open')
      // Prevenir zoom en iOS cuando se hace doble tap
      document.addEventListener('touchstart', handleTouchStart, { passive: false })
    } else {
      document.body.classList.remove('mobile-chat-open')
      document.removeEventListener('touchstart', handleTouchStart)
    }

    return () => {
      document.body.classList.remove('mobile-chat-open')
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [isMobile, isOpen])

  const handleTouchStart = (e) => {
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  }

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    if (scrollbarRef.current) {
      const osInstance = scrollbarRef.current.osInstance();
      if (osInstance) {
        const viewport = osInstance.elements().viewport;
        setTimeout(() => {
          viewport.scrollTo({
            top: viewport.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
    // Fallback al método anterior
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  // Scroll adicional cuando cambia el estado de loading
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    }
  }, [isLoading])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      const userMessage = { id: Date.now(), role: "user", content: input }
      setMessages(prev => [...prev, userMessage])
      setInput("")
      setIsLoading(true)
      
      try {
        // Preparar historial para el contexto
        const conversationHistory = messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
        
        console.log('Enviando mensaje:', input); // Debug log
        
        const response = await axios.post('http://127.0.0.1:5000/api/chatbot/message', {  // Sin la URL completa
          message: input,
          history: conversationHistory
        })
        
        console.log('Respuesta recibida:', response.data); // Debug log
        
        if (response.data.status === 'success') {
          const botMessage = { 
            id: Date.now() + 1, 
            role: "assistant", 
            content: response.data.message
          }
          setMessages(prev => [...prev, botMessage])
        } else {
          throw new Error('Error en la respuesta del servidor')
        }
      } catch (error) {
        console.error('Error sending message:', error)
        console.error('Error details:', error.response?.data); // More detailed error log
        const errorMessage = { 
          id: Date.now() + 1, 
          role: "assistant", 
          content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo." 
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleQuestionClick = async (question) => {
    const userMessage = { id: Date.now(), role: "user", content: question }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    
    try {
      console.log('Obteniendo respuestas predefinidas...'); // Debug log
      
      // Primero intentar obtener respuesta predefinida
      const predefinedResponse = await axios.get('http://127.0.0.1:5000/api/chatbot/predefined')  // Sin la URL completa
      
      console.log('Respuestas predefinidas:', predefinedResponse.data); // Debug log
      
      if (predefinedResponse.data.status === 'success' && predefinedResponse.data.responses[question]) {
        const botMessage = { 
          id: Date.now() + 1, 
          role: "assistant", 
          content: predefinedResponse.data.responses[question]
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        console.log('Usando DeepSeek para la pregunta:', question); // Debug log
        
        // Si no hay respuesta predefinida, usar DeepSeek
        const response = await axios.post('http://127.0.0.1:5000/api/chatbot/message', {  // Sin la URL completa
          message: question,
          history: []
        })
        
        if (response.data.status === 'success') {
          const botMessage = { 
            id: Date.now() + 1, 
            role: "assistant", 
            content: response.data.message
          }
          setMessages(prev => [...prev, botMessage])
        }
      }
    } catch (error) {
      console.error('Error with predefined question:', error)
      console.error('Error details:', error.response?.data); // More detailed error log
      const errorMessage = { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: "Lo siento, hubo un error. Por favor, intenta de nuevo." 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (typeof onOpenChange === 'function') {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange])

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isMobile ? 'bottom-6 right-6' : ''}`}>
      {/* Chat toggle button - Responsive */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-black text-white ${isMobile ? 'p-4 w-16 h-16' : 'p-3 w-14 h-14'} rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center mobile-touch-area chat-transition`}
      >
        {isOpen ? (
          <svg className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>{/* Chat window - Responsive con full-screen en móvil */}
      <div className={`${isMobile 
        ? 'fixed inset-0 w-full h-full bg-gray-200 rounded-none border-none z-50' 
        : 'absolute bottom-16 right-0 w-80 h-[500px] bg-gray-200 rounded-3xl border border-gray-400'
      } transition-all duration-300 transform 
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} flex flex-col`}>
          {/* Header con MICHAEL y mascota - Responsive */}
        <div className={`${isMobile ? 'p-6 pt-12' : 'p-4'} relative flex-shrink-0 bg-gray-200 ${isMobile ? 'rounded-none' : 'rounded-t-3xl'} flex items-center justify-center`}>          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 transition-colors mobile-close-button mobile-touch-area"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <h2 className={`font-bold ${isMobile ? 'text-2xl' : 'text-lg'} text-black`}>MICHAEL</h2>
          <div className={`absolute ${isMobile ? 'top-4 left-6' : 'top-[-50px] right-4'}`}>
            <img src={imagenChatbot} alt="Michael character" className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'}`} />
          </div>
        </div>        {/* Chat body - Responsive padding */}
        <div className={`${isMobile ? 'px-6 pb-6' : 'px-6 pb-4'} flex-1 flex flex-col overflow-hidden`}>
          {messages.length === 0 ? (
            <>              {/* Mensaje inicial - Responsive */}
              <div className={`${isMobile ? 'mb-8' : 'mb-6'} text-center`}>
                <p className={`text-gray-700 ${isMobile ? 'text-base' : 'text-sm'} mb-1`}>
                  ¡Hola! Puedes llamarme <strong>michael</strong>.
                </p>
                <p className={`text-gray-700 ${isMobile ? 'text-base' : 'text-sm'}`}>¿Tienes alguna duda?</p>
              </div>

              {/* Botones predefinidos - Responsive layout */}
              <div className={`${isMobile ? 'grid-cols-1 gap-4 mb-8 px-4' : 'grid-cols-2 gap-3 mb-6 px-2'} grid`}>
                {predefinedQuestions.map((q, i) => (
                  <button
                    key={i}                    className={`${isMobile ? 'text-base py-4 px-4' : 'text-xs py-3 px-3'} rounded-lg font-medium text-center transition-colors ${
                      q.style === "green" 
                        ? "bg-green-500 text-white hover:bg-green-600" 
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                    onClick={() => handleQuestionClick(q.text)}
                    disabled={isLoading}
                  >
                    {q.text}
                  </button>
                ))}
              </div>
                {/* Punto divisor - Responsive */}
              <div className={`flex justify-center ${isMobile ? 'mb-8' : 'mb-6'}`}>
                <div className={`${isMobile ? 'w-3 h-3' : 'w-2 h-2'} bg-gray-500 rounded-full`}></div>
              </div></>          ) : (
            /* Mensajes del chat con OverlayScrollbars moderno */            <OverlayScrollbarsComponent 
              ref={scrollbarRef}
              className={`flex-1 ${isMobile ? 'mb-6' : 'mb-4'}`}
              options={{
                scrollbars: {
                  theme: 'os-theme-dark',
                  visibility: 'auto',
                  autoHide: 'move',
                  autoHideDelay: 1000,
                  clickScrolling: true
                },
                overflow: {
                  x: 'hidden',
                  y: 'scroll'
                }
              }}
              style={{ height: '100%' }}>
              <div className={`space-y-3 ${isMobile ? 'pr-4' : 'pr-2'}`}>
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>                    <div className={`max-w-[70%] p-3 rounded-lg ${isMobile ? 'text-base' : 'text-sm'} whitespace-pre-wrap shadow-lg transition-all duration-200 hover:shadow-xl ${
                      m.role === "user" 
                        ? "bg-gradient-to-r from-green-400 to-green-500 text-white" 
                        : "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className={`bg-gradient-to-r from-gray-600 to-gray-700 text-white p-3 rounded-lg ${isMobile ? 'text-base' : 'text-sm'} shadow-lg`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            </OverlayScrollbarsComponent>
          )}          {/* Input área - Responsive */}
          <div className={`flex items-center justify-center mt-auto ${isMobile ? 'px-6 mobile-input-container' : 'px-4'}`}>
            {/* Input con botón de envío - Responsive */}
            <div className="w-full relative">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                placeholder="Escribe tu mensaje"
                className={`w-full ${isMobile ? 'p-4 pr-14 text-base' : 'p-3 pr-12 text-sm'} border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-white`}
                disabled={isLoading}
              />
              <button
                onClick={handleSubmit}
                className={`absolute ${isMobile ? 'right-4' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600 disabled:opacity-50`}
                disabled={isLoading || !input.trim()}
              >
                <svg className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div></div>
      </div>
    </div>
  )
}