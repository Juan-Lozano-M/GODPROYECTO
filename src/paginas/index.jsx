import React, { useState, useEffect} from 'react';
import { ChevronRight, Target, Users, BookOpen, Star, Play, Palette, UserPlus, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import nerdImage from '../assets/nerd.png';
import desercionImg from '../assets/Desercion.png';
import incongruenciaImg from '../assets/Incongruencia.png';
import estresImg from '../assets/Estres.png';
import Nav from '../componentes/navbar';
import Footer from '../componentes/footer';
import Test from '../componentes/Testimonios';
import Auto from '../componentes/Autoregister';
import Nosotros from '../componentes/Nosotros'
import Final from '../componentes/SeccionF'
import Noticias from '../componentes/Proyectosin'
import Dife from '../componentes/Diferencias'



const words = ['Futuro', 'Camino', 'Destino', 'Meta', 'Sueño'];


function AnimatedWord({ word }) {
  return (
    <span className="inline-flex overflow-hidden">
      {[...word].map((char, i) => (
        <motion.span
          key={char + i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: i * 0.1,
            type: 'spring',
            stiffness: 700,
            damping: 10,
          }}
          whileTap={{ scale: 1.1, y: -5 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function GameOfDreams() {
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  

  const testimonials = [
    {
      name: "María González",
      role: "Estudiante de Medicina",
      text: "Game of Dreams me ayudó a descubrir mi verdadera pasión por la medicina. Ahora estoy segura de mi camino profesional."
    },
    {
      name: "Carlos Rodríguez",
      role: "Ingeniero de Software",
      text: "Gracias a esta plataforma encontré mi vocación en la tecnología. El proceso fue divertido y muy revelador."
    },
    {
      name: "Ana Martínez",
      role: "Diseñadora Gráfica",
      text: "La metodología de Game of Dreams es única. Me permitió explorar diferentes áreas hasta encontrar la perfecta para mí."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (


    <div className="min-h-screen bg-white">

      <Nav></Nav>

      <Auto></Auto>
      
      
      {/* Hero Section */}
<section id="inicio" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <div className="text-center relative">
      {/* Imagen al lado derecho del texto del hero y encima de estadísticas - solo desktop */}
      <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/6 w-64 h-64 pointer-events-none">
        <img 
          src={nerdImage} 
          alt="Estudiante orientación vocacional" 
          className="w-full h-full object-contain grayscale"
        />
      </div>


      <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-[#9CE840] text-lg sm:text-sm font-medium mb-8 border border-[#9CE840]/30">
        <Star className="w-4 h-4 mr-2" />
        Tu futuro comienza aquí
      </div>
      
      <h1 className="text-6xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Tu <span
          className="relative inline-block bg-[#9CE840] text-white px-2 py-1 rounded-md select-none"
          style={{ minWidth: '4ch', maxWidth: '7ch', textAlign: 'center', display: 'inline-block' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={words[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-block' }}
            >
              <AnimatedWord word={words[index]} />
            </motion.span>
          </AnimatePresence>
        </span>{' '}
        <span className="text-gray-900 block">
          tu decisión
        </span>
      </h1>
      
      <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
        Te acompañamos en el camino hacia tu futuro profesional con orientación personalizada, 
        herramientas especializadas y el apoyo que necesitas para tomar las mejores decisiones.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-[#9CE840] hover:bg-[#8BD739] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center">
          Registrate
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
        <button className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 border border-black">
          Conocer más
        </button>
      </div>
    </div>
    

    <div className="mt-16 relative">
      <div className="absolute inset-0 /20 rounded-3xl blur-3xl opacity-30"></div>
      <div className="relative backdrop-blur-sm rounded-3xl p-8 border border-black shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2 px-10">
            <div className="text-3xl font-bold text-[#9CE840]">60%</div>
            <div className="text-gray-600">De los colombianos NO acceden a educación superior</div>
          </div>
          <div className="space-y-2 px-10">
            <div className="text-3xl font-bold text-[#7BC62D]">48%</div>
            <div className="text-gray-600">De estudiantes universitarios desertan en Colombia</div>
          </div>
          <div className="space-y-2 px-10">
            <div className="text-3xl font-bold text-[#9CE840]">22%</div>
            <div className="text-gray-600">De profesionales colombianos trabajan en su área de estudio</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      

      
      <section className="py-12 sm:py-16 md:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 font-bold leading-tight">
        Descubre tu camino con{' '}
        <span className="text-[#9CE840]">game of dreams</span>{' '}
        <br />¿Qué combatimos?
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      
      {/* Carta Alta Deserción Universitaria */}
      <div className="bg-white border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-black relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
            </svg>
            <h3 className="text-lg sm:text-xl font-bold">Alta Deserción Universitaria</h3>
          </div>
          <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            De cada 40 estudiantes que ingresan a Educación Superior, solo 20 terminan. Combatimos esta deserción del 50% con orientación temprana y decisiones conscientes.
          </p>
        </div>
        
        {/* Imagen inferior izquierda */}
        <div className="absolute bottom-6 sm:bottom-8 left-2 sm:left-4 z-10">
          <img src={desercionImg} alt="Deserción" className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] object-contain opacity-80" />
        </div>
        
        {/* Estadística inferior derecha */}
        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-10">
          <div className="text-2xl sm:text-3xl font-bold text-red-500">50%</div>
          <div className="text-xs text-gray-500">deserción</div>
        </div>
      </div>

      {/* Carta Incongruencia Profesional */}
      <div className="border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-black relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-1">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg sm:text-xl font-bold">Incongruencia Profesional</h3>
          </div>
          <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Solo 4 de cada 20 graduados logran trabajar y vivir de lo que estudiaron (18%). Eliminamos esta brecha con experiencias reales antes de decidir.
          </p>
        </div>
        
        {/* Imagen inferior izquierda */}
        <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-10">
          <img src={incongruenciaImg} alt="Incongruencia" className="w-24 h-24 sm:w-[150px] sm:h-[150px] object-contain opacity-80" />
        </div>
        
        {/* Estadística inferior derecha */}
        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-10">
          <div className="text-2xl sm:text-3xl font-bold text-purple-500">18%</div>
          <div className="text-xs text-gray-500">trabajan en su área</div>
        </div>
      </div>

      {/* Carta Estrés y Presión Académica */}
      <div className="border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-black relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg sm:text-xl font-bold">Estrés y Presión Académica</h3>
          </div>
          <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            7 de cada 10 estudiantes con estrés alto experimentan interrupciones en su vida social y bienestar. Enseñamos gestión emocional y del cambio.
          </p>
        </div>
        
        {/* Imagen inferior izquierda */}
        <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-10">
          <img src={estresImg} alt="Estrés" className="w-24 h-24 sm:w-[150px] sm:h-[150px]  object-contain opacity-80" />
        </div>
        
        {/* Estadística inferior derecha */}
        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-10">
          <div className="text-2xl sm:text-3xl font-bold text-yellow-500">70%</div>
          <div className="text-xs text-gray-500">afectados por estrés</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Benefits & Outcomes Section */}
<section className="py-12 sm:py-16 md:py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Desktop Layout */}
    <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 items-center">
      {/* Image Column - Left on desktop */}
      <div className="lg:col-span-5">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Estudiante trabajando en su escritorio con libros y materiales creativos"
            className="rounded-xl sm:rounded-2xl shadow-lg w-full h-[500px] object-cover"
          />
        </div>
      </div>

      {/* Content Column - Right on desktop */}
      <div className="lg:col-span-7">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
          Beneficios para Ti
          </h2>
         
        </div>
         
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Descubre Tu Propósito</h3>
            <p className="text-base text-gray-600">
            Desarrolla claridad sobre tus inclinaciones vocacionales y fortalece tu identidad personal para tomar decisiones.
            </p>
          </div>
           
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Gestiona Tus Emociones</h3>
            <p className="text-base text-gray-600">
            Aprende a manejar la presión académica, el estrés de las transiciones y transforma el miedo en una herramienta de crecimiento.
            </p>
          </div>
           
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Conecta con Profesionales</h3>
            <p className="text-base text-gray-600">
            Accede a conversatorios y encuentros personalizados con expertos y trabajadores activos que te muestren la realidad de cada profesión.
            </p>
          </div>
           
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Experimenta Antes de Decidir</h3>
            <p className="text-base text-gray-600">
            Participa en visitas guiadas y experiencias directas en los campos profesionales de tu interés antes de tomar tu decisión final.
            </p>
          </div>
           
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Desarrolla Independencia</h3>
            <p className="text-base text-gray-600">
            Desarrolla autonomía y capacidad de adaptación para enfrentar con éxito los retos de la universidad y el mundo laboral.
            </p>
          </div>
           
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Construye Tu Red de Apoyo</h3>
            <p className="text-base text-gray-600">
            Construye relaciones colaborativas con otros jóvenes que comparten tus objetivos, impulsando juntos su desarrollo profesional
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="lg:hidden">
      {/* Content First on Mobile */}
      <div className="max-w-md px-5 text-center mx-auto ">
        <div className="flex items-center justify-center  gap-3 mb-6 sm:mb-8">
          <h2 className="text-3xl  sm:text-3xl font-bold text-gray-900 text-center">
          Beneficios para Ti
          </h2>
          
        </div>
         
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Descubre Tu Propósito</h3>
            <p className="text-sm sm:text-base text-gray-600">
            Desarrolla claridad sobre tus inclinaciones vocacionales y fortalece tu identidad personal para tomar decisiones.
            </p>
          </div>
           
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Gestiona Tus Emociones</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Aprende a manejar la presión académica, el estrés de las transiciones y transforma el miedo en una herramienta de crecimiento.
            </p>
          </div>
           
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Conecta con Profesionales</h3>
            <p className="text-sm sm:text-base text-gray-600">
            Accede a conversatorios y encuentros personalizados con expertos y trabajadores activos que te muestren la realidad de cada profesión.
            </p>
          </div>
           
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Experimenta Antes de Decidir</h3>
            <p className="text-sm sm:text-base text-gray-600">
            Participa en visitas guiadas y experiencias directas en los campos profesionales de tu interés antes de tomar tu decisión final.
            </p>
          </div>
           
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Desarrolla Independencia</h3>
            <p className="text-sm sm:text-base text-gray-600">
            Desarrolla autonomía y capacidad de adaptación para enfrentar con éxito los retos de la universidad y el mundo laboral.
            </p>
          </div>
           
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Construye Tu Red de Apoyo</h3>
            <p className="text-sm sm:text-base text-gray-600">
            Construye relaciones colaborativas con otros jóvenes que comparten tus objetivos, impulsando juntos su desarrollo profesional.
            </p>
          </div>
        </div>
      </div>

      {/* Image Last on Mobile */}
      <div className="mt-8 sm:mt-12">
        <div className="relative max-w-md mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Estudiante trabajando en su escritorio con libros y materiales creativos"
            className="rounded-xl sm:rounded-2xl  w-full h-[300px] sm:h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
    
  </div>
</section>

      <Dife></Dife>
      

      <Noticias></Noticias>
      <div id="testimonios">
        <Test></Test>
      </div>

      

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            ¿Listo para descubrir tu futuro?
          </h2>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-300 px-4">
            Comienza tu viaje hacia la carrera de tus sueños hoy mismo
          </p>
        </div>
      </section>

      <div id ="nosotros">
        <Nosotros></Nosotros>
      </div>
      
      <Final></Final>
      

      <Footer></Footer>
    </div>

    
  );
}