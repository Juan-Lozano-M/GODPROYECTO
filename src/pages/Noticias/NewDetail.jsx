import React from "react"


export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30 z-10" />
    
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-3 py-1 mb-6 bg-emerald-600 text-white text-xs font-medium tracking-wider uppercase rounded-sm">
                Historias Inspiradoras
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight drop-shadow-lg">
                DESCUBRE TU VERDADERA VOCACIÓN
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="h-10 w-10 rounded-full overflow-hidden relative">
               
                </div>
                <span className="text-white font-medium drop-shadow-md">María González</span>
                <span className="text-white/70 drop-shadow-md">•</span>
                <span className="text-white/90 drop-shadow-md">20 de marzo, 2025</span>
              </div>
              <div className="flex justify-center">
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="content" className="container px-4 md:px-6 mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article */}
          <div className="lg:col-span-8">
        
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-10">
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-emerald-100">
                <div className="p-6 border-b border-emerald-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Comparte Esta Historia</h3>
              
                  </div>
                </div>
                <div className="p-6">
                
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-emerald-100">
                <div className="p-6 border-b border-emerald-100">
                  <h3 className="text-lg font-bold text-gray-800">Historias Destacadas</h3>
                </div>
                <div className="p-6">
               
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-emerald-100">
                <div className="p-6 border-b border-emerald-100">
                  <h3 className="text-lg font-bold text-gray-800">Recursos Vocacionales</h3>
                </div>
                <div className="p-6 space-y-6">
                 
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl overflow-hidden shadow-md border border-emerald-100 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-emerald-100 p-2 rounded-full">
                
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Boletín de Inspiración</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Recibe historias inspiradoras y consejos vocacionales directamente en tu correo.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Suscribirme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

