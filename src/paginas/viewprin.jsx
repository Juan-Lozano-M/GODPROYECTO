import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, Users, BookOpen, Star, Play, Palette, UserPlus, Mic } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section id="inicio" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-[#9CE840] text-sm font-medium mb-8 border border-[#9CE840]/30">
              <Star className="w-4 h-4 mr-2" />
              Tu futuro comienza aquí
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Tu futuro,
              <span className="bg-gradient-to-r from-[#9CE840] to-[#7BC62D] bg-clip-text text-transparent block">
                tu decisión
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Te acompañamos en el camino hacia tu futuro profesional con orientación personalizada, 
              herramientas especializadas y el apoyo que necesitas para tomar las mejores decisiones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#9CE840] hover:bg-[#8BD739] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Comenzar ahora
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200">
                Conocer más
              </button>
            </div>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#9CE840]/20 to-[#7BC62D]/20 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#9CE840]">500+</div>
                  <div className="text-gray-600">Jóvenes orientados</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#7BC62D]">95%</div>
                  <div className="text-gray-600">Satisfacción</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#9CE840]">5+</div>
                  <div className="text-gray-600">Años de experiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Potential Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Unlock your{' '}
              <span className="text-pink-500">creative potential</span>,{' '}
              <span className="text-orange-500 block sm:inline">connect with others</span>,
              <br className="hidden lg:block" />
              and{' '}
              <span className="text-teal-500 block sm:inline">stand out from the crowd</span>.{' '}
              <span className="text-xl sm:text-2xl">🎯</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Elevate Your Design Card */}
            <div className="bg-pink-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-lg sm:text-xl font-bold">Elevate Your Design</h3>
                </div>
                <p className="text-white/90 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Refine your skills into mastery. Elevate project quality and client engagement with a distinctive aesthetic vision.
                </p>
              </div>
              
              {/* Decorative Elements - Responsive */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full"></div>
              <div className="absolute top-1/2 -right-6 sm:-right-8 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full"></div>
              <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-lg transform rotate-12"></div>
              <div className="absolute top-16 sm:top-20 right-8 sm:right-12 w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-full"></div>
              
              {/* Portrait placeholder */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Creative Collaboration Card */}
            <div className="bg-orange-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-lg sm:text-xl font-bold">Creative Collaboration</h3>
                </div>
                <p className="text-white/90 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Connect with a vibrant community of designers. Share, learn, and grow in a collaborative creative ecosystem.
                </p>
              </div>
              
              {/* Decorative Elements - Responsive */}
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-20 h-20 sm:w-28 sm:h-28 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-8 sm:bottom-12 -right-4 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full"></div>
              
              {/* Group portrait placeholder */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/25 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/35 rounded-full"></div>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/30 rounded-full"></div>
                  </div>
                </div>
                
                {/* Name tags */}
                <div className="flex gap-1 sm:gap-2 mt-2 text-xs">
                  <span className="bg-purple-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Ana</span>
                  <span className="bg-blue-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">Michelle</span>
                  <span className="bg-green-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">Juan</span>
                </div>
              </div>
            </div>

            {/* Distinctive Voice Card */}
            <div className="bg-teal-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[400px] group hover:transform hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-lg sm:text-xl font-bold">Distinctive Voice</h3>
                </div>
                <p className="text-white/90 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Carve out your unique design identity. Learn from Pablo Stanley to craft standout products and accelerate your career.
                </p>
              </div>
              
              {/* Decorative Elements - Responsive */}
              <div className="absolute top-6 sm:top-8 -right-6 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-4 sm:-bottom-6 left-3 sm:left-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full"></div>
              <div className="absolute top-1/2 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-lg transform -rotate-12"></div>
              
              {/* Portrait placeholder */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/20 rounded-xl sm:rounded-2xl mx-auto flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/30 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full"></div>
                  </div>
                </div>
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

      {/* Testimonials Section */}
      <section id="testimonios" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Historias de Éxito
            </h2>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-600 px-4">
              Conoce a algunos de nuestros estudiantes que encontraron su camino
            </p>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20">
            <div className="bg-gradient-to-r from-[#9CE840] to-[#7BC62D] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
                ))}
              </div>
              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-white mb-6 sm:mb-8 leading-relaxed px-2">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="text-white">
                <p className="font-semibold text-base sm:text-lg">{testimonials[currentTestimonial].name}</p>
                <p className="opacity-90 text-sm sm:text-base">{testimonials[currentTestimonial].role}</p>
              </div>
              <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            ¿Listo para descubrir tu futuro?
          </h2>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-gray-300 px-4">
            Comienza tu viaje hacia la carrera de tus sueños hoy mismo
          </p>
          <div className="mt-8 sm:mt-10">
            <button className="w-full sm:w-auto bg-[#9CE840] hover:bg-[#8BD739] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center group">
              Comenzar Test Vocacional
              <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}