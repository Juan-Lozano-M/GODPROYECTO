import React, { useState, useEffect} from 'react';
import { ChevronRight, Target, Users, BookOpen, Star, Play, Palette, UserPlus, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '../componentes/navbar';
import Footer from '../componentes/footer';
import Test from '../componentes/Testimonios';
import Auto from '../componentes/Autoregister';
import Nosotros from '../componentes/Nosotros'
import Final from '../componentes/SeccionF'



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
  
  const [setCurrentTestimonial] = useState(0);

  

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
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-[#9CE840] text-sm font-medium mb-8 border border-[#9CE840]/30">
              <Star className="w-4 h-4 mr-2" />
              Tu futuro comienza aquí
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Tu <span
            className="relative inline-block bg-[#9CE840]  text-white px-2 py-1 rounded-md select-none"
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
              <span class="text-gray-900 block">
                tu decisión
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
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
            <div className="relative  backdrop-blur-sm rounded-3xl p-8 border border-black shadow-sm">
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

      {/* Creative Potential Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-3xl md:text-4xl text-gray-900 lg:text-5xl xl:text-[2.8rem] font-semibold leading-tight">
              Descubre tu camino con{' '}
              <span className="text-[#9CE840]">game of dreams</span>{' '}
              <br></br>¿Que combatimos?
            </h2>
          </div>


         

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Elevate Your Design Card */}
            <div className="bg-white border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-black relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-lg sm:text-xl font-bold">Elevate Your Design</h3>
                </div>
                <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Refine your skills into mastery. Elevate project quality and client engagement with a distinctive aesthetic vision.
                </p>
              </div>
              
              {/* Decorative Elements - Responsive */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full"></div>
              <div className="absolute top-1/2 -right-6 sm:-right-8 w-16 h-16 sm:w-24 sm:h-24 bg-gray-300 rounded-full"></div>
              <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg transform rotate-12"></div>
              
              
              {/* Portrait placeholder */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Creative Collaboration Card */}
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-black relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all border border-black duration-300">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-lg sm:text-xl font-bold">Creative Collaboration</h3>
                </div>
                <p className="text-gray-500 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Connect with a vibrant community of designers. Share, learn, and grow in a collaborative creative ecosystem.
                </p>
              </div>
              
             
              
              
            </div>

            {/* Distinctive Voice Card */}
            <div className="border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-black relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-lg sm:text-xl font-bold">Distinctive Voice</h3>
                </div>
                <p className="text-gray-500 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Carve out your unique design identity. Learn from Pablo Stanley to craft standout products and accelerate your career.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              ¿Por qué elegir Game of Dreams?
            </h2>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-600 px-4">
              Nuestra metodología única combina ciencia y diversión para encontrar tu vocación ideal
            </p>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="border border-black rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9CE840] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-900">Test Vocacional Avanzado</h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                Evaluaciones científicamente validadas que analizan tus intereses, habilidades y personalidad para encontrar tu match perfecto.
              </p>
            </div>

            <div className="border border-black rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9CE840] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-900">Orientación Personalizada</h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                Acompañamiento uno a uno con expertos en orientación vocacional que te guiarán en cada paso de tu proceso de decisión.
              </p>
            </div>

            <div className="border border-black rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 group md:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9CE840] rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-900">Recursos Educativos</h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                Accede a una biblioteca completa de información sobre carreras, universidades y oportunidades laborales actualizadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Outcomes Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 mb-8 sm:mb-12 lg:mb-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Estudiante trabajando en su escritorio con libros y materiales creativos"
                  className="rounded-xl sm:rounded-2xl shadow-lg w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  Benefits & Outcomes
                </h2>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Find Your Voice</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Make yourself stand out in the digital industry by adding your own style to your projects. Clients will love your unique touch!
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Join Our Community</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Connect with a diverse group of students and alumni in our Discord channels for collaboration, feedback, and support.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Get Real Feedback</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Show off your work in our quarterly Portfolio Showcase for live reviews and recognition.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Weekly Workshops</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Join our weekly live workshops with guest speakers, design tutorials, and behind-the-scenes client work.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Lifetime Access</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Access Together Studio Templates and a Design Resource Library with new materials added regularly.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Flexible Learning</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Learn at your own pace with lifetime access to the course, including future updates and resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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