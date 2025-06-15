import React from 'react';

function Foot() {
  // Definir las rutas del menú
  const menuItems = [
    { name: "Noticias", path: "/noticias" },
    { name: "Nosotros", path: "/nosotros", isScroll: true, scrollId: "nosotros" },
    { name: "Proyectos", path: "/proyectosview" },
  ];

  // Función para manejar la navegación
  const handleNavClick = (item) => {
    if (item.isScroll && item.scrollId) {
      // Para elementos con scroll, usar scrollIntoView
      const element = document.getElementById(item.scrollId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Para rutas normales, usar window.location o tu router
      window.location.href = item.path;
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-nunito relative overflow-hidden">
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#A4FF00] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-8 py-16">
        {/* Contenedor principal */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Columna 1: Logo/Marca - Más espacio */}
            <div className="md:col-span-1 lg:col-span-4">
              <div className="mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#A4FF00] to-green-400 bg-clip-text text-transparent">
                  game of dreams
                </h2>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  Donde los sueños se convierten en realidad <br />
                  a través del juego.
                </p>
              </div>
            </div>

            {/* Columna 2: Navegación - Espacio medio */}
            <div className="md:col-span-1 lg:col-span-3">
              <h3 className="text-xl font-bold mb-6 text-[#A4FF00]">Navegación</h3>
              <nav className="space-y-3">
                {/* Enlace a Home */}
                <a
                  href="/"
                  className="block text-gray-300 hover:text-[#A4FF00] transition-all duration-300 hover:translate-x-2 hover:font-semibold"
                >
                  Home
                </a>
                {/* Enlaces dinámicos del menú */}
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="block text-left text-gray-300 hover:text-[#A4FF00] transition-all duration-300 hover:translate-x-2 hover:font-semibold cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Columna 3: Contacto - Espacio medio */}
            <div className="md:col-span-1 lg:col-span-3">
              <h3 className="text-xl font-bold mb-6 text-[#A4FF00]">Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-[#A4FF00]/20 rounded-full flex items-center justify-center group-hover:bg-[#A4FF00]/30 transition-colors">
                    <svg className="w-5 h-5 text-[#A4FF00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <a href="mailto:gameofdreams@gmail.com" className="text-gray-300 hover:text-[#A4FF00] transition-colors text-sm">
                    gameofdreams@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Columna 4: Redes Sociales - Menos espacio */}
            <div className="md:col-span-1 lg:col-span-2">
              <h3 className="text-xl font-bold mb-6 text-[#A4FF00]">Síguenos</h3>
              <div className="flex space-x-4">
                {[
                  { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-12 h-12 bg-white/10 hover:bg-[#A4FF00]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-[#A4FF00] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Línea divisoria con efecto neón */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gradient-to-r from-transparent via-[#A4FF00]/50 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-6 py-2 bg-gradient-to-r from-black via-gray-900 to-black">
                <div className="w-3 h-3 bg-[#A4FF00] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Pie de página */}
          <div className="flex flex-col md:flex-row justify-center items-center text-sm text-gray-400">
            <p className="mb-4 md:mb-0">
              © 2025 <span className="text-[#A4FF00] font-semibold">game of dreams</span>. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Foot;