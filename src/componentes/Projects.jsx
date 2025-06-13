import React from 'react';

const ProjectsComponent = () => {
  const projects = [
    {
      id: 1,
      title: "Colegio Champagnat",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
      type: "web",
      category: "Diseño Web"
    },
    {
      id: 2,
      title: "Centro Médico Digital",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&h=200&fit=crop",
      type: "web",
      category: "Plataforma Digital"
    },
    {
      id: 3,
      title: "Restaurante La Terraza",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      type: "mobile",
      category: "App Móvil"
    },
    {
      id: 4,
      title: "Hotel Boutique",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      type: "web",
      category: "E-commerce"
    },
    {
      id: 5,
      title: "Estudio Creativo",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
      type: "web",
      category: "Portfolio"
    },
    {
      id: 6,
      title: "Marketplace Digital",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
      type: "web",
      category: "E-commerce"
    }
  ];

  const mainProject = {
    title: "Colegio Champagnat",
    description: "Plataforma educativa integral con gestión de estudiantes y recursos digitales",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop"
  };

  return (
    <div className="bg-white py-8 sm:py-12 md:py-16 lg:py-20 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative pb-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-4 sm:mb-6 lg:mb-8">
            Algunos 
            <br />
            <span className="text-gray-800">Proyectos</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-xl mx-auto px-4">
            Transforma tus habilidades de diseño visual con nuestro equipo especializado.
          </p>
          
          {/* Button */}
          <div className="flex justify-center">
            <button className="px-6 sm:px-8 py-3 sm:py-4 border border-black text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-colors flex items-center gap-3 text-sm sm:text-base">
              Ver Portafolio
              <span className="text-lg">▶</span>
            </button>
          </div>
        </div>

        {/* Desktop Layout - Solo visible en pantallas grandes */}
        <div className="hidden lg:block relative min-h-[500px] pb-8">
          {/* Left Column - Small Cards */}
          <div className="absolute left-0 top-0 space-y-6">
            {/* Top Left Card */}
            <div className="w-48 bg-white rounded-xl shadow-lg border border-black overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src={projects[0].image} 
                alt={projects[0].title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{projects[0].title}</h3>
                <p className="text-xs text-gray-500">{projects[0].category}</p>
              </div>
            </div>

            {/* Bottom Left Card */}
            <div className="w-48 bg-white rounded-xl shadow-lg border border-black overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
              <img 
                src={projects[2].image} 
                alt={projects[2].title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{projects[2].title}</h3>
                <p className="text-xs text-gray-500">{projects[2].category}</p>
              </div>
            </div>
          </div>

          {/* Center - Large Project Card */}
          <div className="mx-auto max-w-lg">
            <div className="bg-white rounded-2xl border border-black shadow-2xl overflow-hidden">
              <div className="relative h-80">
                <img 
                  src={mainProject.image}
                  alt={mainProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{mainProject.title}</h2>
                  <p className="text-sm opacity-90 mb-4">{mainProject.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Small Cards */}
          <div className="absolute right-0 top-0 space-y-6">
            {/* Top Right Card */}
            <div className="w-48 bg-white rounded-xl shadow-lg border border-black overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src={projects[3].image} 
                alt={projects[3].title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{projects[3].title}</h3>
                <p className="text-xs text-gray-500">{projects[3].category}</p>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div className="w-48 bg-white rounded-xl shadow-lg border border-black overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
              <img 
                src={projects[4].image} 
                alt={projects[4].title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{projects[4].title}</h3>
                <p className="text-xs text-gray-500">{projects[4].category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout - Grid responsivo */}
        <div className="block lg:hidden pb-8">
          {/* Proyecto Principal - Móvil */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-black shadow-lg overflow-hidden max-w-md mx-auto">
              <div className="relative h-48 sm:h-56 md:h-64">
                <img 
                  src={mainProject.image}
                  alt={mainProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{mainProject.title}</h2>
                  <p className="text-xs sm:text-sm opacity-90">{mainProject.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Proyectos - Móvil/Tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {projects.slice(0, 4).map((project, index) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl shadow-lg border border-black overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-32 sm:h-36 object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsComponent;