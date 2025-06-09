
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Componente Tab Button reutilizable
const TabButton = ({ 
  isActive, 
  onClick, 
  children, 
  activeColor = 'bg-[#9CE840]', 
  inactiveColor = 'bg-transparent',
  textActiveColor = 'text-white',
  textInactiveColor = 'text-gray-600'
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-md ${
        isActive
          ? `${activeColor} ${textActiveColor} shadow-lg transform scale-105`
          : `${inactiveColor} ${textInactiveColor} hover:bg-gray-300`
      }`}
    >
      {children}
    </button>
  );
};

// Componente Tabs Container reutilizable
const TabsContainer = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  activeColor,
  inactiveColor,
  textActiveColor,
  textInactiveColor,
  className = ""
}) => {
  return (
    <div className={`flex flex-wrap gap-8 mb-6 ${className}`}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          textActiveColor={textActiveColor}
          textInactiveColor={textInactiveColor}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
};

// CONTENIDO DEL DASHBOARD COMPLETO EN GENERAL ⬇️
const GeneralContent = () => {
  const [trafficView, setTrafficView] = useState('Mensual');
  
  // Datos para el gráfico de tráfico
  const trafficData = [
    { name: 'Ene', value: 12000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 25000 },
    { name: 'Abr', value: 28000 },
    { name: 'May', value: 24000 },
    { name: 'Jun', value: 26000 },
    { name: 'Jul', value: 25000 }
  ];

  // Componente para las tarjetas de estadísticas
  const StatCard = ({ title, value, subtitle, className = "" }) => {
    return (
      <div
        className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 ${className}`}
        style={{ borderLeft: '4px solid #9CE840' }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg" style={{ background: '#E9FCD6' }}>
                <div className="w-4 h-4" style={{ color: '#9CE840' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <span className="text-sm text-gray-600 font-medium">{title}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {value.toLocaleString()}
            </div>
            {subtitle && (
              <div className="text-xs text-gray-500">{subtitle}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Componente para el indicador circular
  const CircularProgress = ({ percentage, label, sublabel }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-30 h-30">
          <svg className="w-30 h-30 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#9CE840"
              strokeWidth="10"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
          </div>
        </div>
        <div className="text-center mt-2">
          <div className="text-sm font-medium text-gray-800">{label}</div>
          <div className="text-xs text-gray-500">{sublabel}</div>
        </div>
      </div>
    );
  };

  // Componente para las métricas de visitas
  const VisitMetric = ({ label, value, color = 'green' }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{value}</span>
        <div className={`w-2 h-2 rounded-full ${color === 'green' ? 'bg-green-500' : color === 'blue' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header con estadísticas de usuarios - RESPONSIVE FIXED */}
      <div>
        {/* Contenedor principal responsivo */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Contenedor de las 4 tarjetas de estadísticas - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 flex-1">
            <StatCard 
              title="Totales" 
              value={1247} 
              subtitle="Totales registrados"
              className="w-full"
            />
            <StatCard 
              title="Este mes" 
              value={8} 
              subtitle="Registrados el último mes"
              className="w-full"
            />
            <StatCard 
              title="Esta semana" 
              value={2845} 
              subtitle="Registrados la ultima semana"
              className="w-full"
            />
            <StatCard 
              title="Hoy" 
              value={156} 
              subtitle="Registrados hoy"
              className="w-full" 
            />
          </div>

          {/* Usuarios Activos - responsive */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 xl:w-80 xl:flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Usuarios Activos</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Día</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-32 xl:w-40 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#9CE840] h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm font-medium">25</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Semana</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-32 xl:w-40 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#9CE840] h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="text-sm font-medium">15</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mes</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-32 xl:w-40 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#9CE840] h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <span className="text-sm font-medium">10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sección de Tráfico */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-800">Tráfico</h2>
              <div className="flex flex-wrap gap-2 bg-gray-100 rounded-lg p-1 overflow-x-auto">
                {['Anual', 'Mensual', 'Diario'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTrafficView(period)}
                    className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      trafficView === period
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9CE840" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#9CE840" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `${value/1000}K`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9CE840"
                  strokeWidth={3}
                  fill="url(#greenGradient)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#9CE840', strokeWidth: 2, stroke: '#fff' }}
                />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sección lateral derecha */}
        <div className="space-y-6">
          {/* Visitas */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Visitas</h3>
              <span className="text-xs bg-[#9CE840] text-black px-3 sm:px-4 py-2 rounded-xl font-medium">
                Este mes
              </span>
            </div>
            
            <div className="flex justify-center">
              <CircularProgress 
                percentage={55} 
                label="más de vistas" 
                sublabel="Ultimo mes" 
              />
            </div>

            <div className="space-y-1 pt-4">
              <VisitMetric label="Total de visitas" value="130" color="green" />
              <VisitMetric label="Visitas sección inicios" value="45" color="green" />
              <VisitMetric label="Visitas sección proyectos" value="35" color="blue" />
              <VisitMetric label="Visitas sección contacto" value="25" color="gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contenido de la pestaña NOTICIAS
const NoticiasContent = () => {
  const [activeNewsTab, setActiveNewsTab] = useState('Anual');

  const newsTabs = [
    { id: 'Anual', label: 'Anual' },
    { id: 'Mensual', label: 'Mensual' },
    { id: 'Diario', label: 'Diario' }
  ];

  // Componente para los elementos de noticias
  const NewsItem = ({ icon, title, timeAgo, category, views, isRecent = false }) => (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        <div>
          <h4 className="text-sm font-medium text-gray-800 mb-1">{title}</h4>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>Hace {timeAgo}</span>
            <span>•</span>
            <span>{category}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-adlam text-[#9CE840]">{views.toLocaleString()}</div>
        <div className="text-xs text-gray-500">vistas</div>
      </div>
    </div>
  );

  // Componente para el gráfico circular de progreso
  const CircularChart = ({ percentage }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#9CE840"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
          <span className="text-xs text-gray-500">más vistas</span>
          <span className="text-xs text-gray-500">último mes</span>
        </div>
      </div>
    );
  };

  // Componente para elementos de categoría
  const CategoryItem = ({ color, label, value }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tarjetas superiores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderLeft: '4px solid #9CE840' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-[#E9FCD6]">
              <div className="w-4 h-4 text-green-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-600 font-medium">Total de Noticias</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">1,247</div>
          <div className="text-xs text-gray-500">+73 este mes</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderLeft: '4px solid #9CE840' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-[#E9FCD6]">
              <div className="w-4 h-4 text-green-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-600 font-medium">Publicadas Hoy</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-xs text-gray-500">+2 respecto a ayer</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderLeft: '4px solid #9CE840' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-[#E9FCD6]">
              <div className="w-4 h-4 text-green-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-600 font-medium">Promedio de Vistas</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">2,845</div>
          <div className="text-xs text-gray-500">por noticia</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderLeft: '4px solid #9CE840' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-[#E9FCD6]">
              <div className="w-4 h-4 text-green-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-600 font-medium">Interacciones</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">156</div>
          <div className="text-xs text-gray-500">promedio por noticia</div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sección de Noticias Más Vistas */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Noticias Más Vistas</h3>
            </div>
            <div className="space-y-2">
              <NewsItem
                title="Nueva tecnología revoluciona el sector energético"
                timeAgo="2 horas"
                category="Tecnología"
                views={15847}
              />
              <NewsItem
                title="Cambios en las políticas económicas del país"
                timeAgo="4 horas"
                category="Economía"
                views={12433}
              />
              <NewsItem
                title="Descubrimiento médico promete nuevos tratamientos"
                timeAgo="6 horas"
                category="Salud"
                views={9876}
              />
            </div>

            <div className="mt-8">
              <div className="flex items-center space-x-2 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Noticias Más Recientes</h3>
              </div>
              <div className="space-y-2">
                <NewsItem
                  title="Conferencia internacional sobre cambio climático"
                  timeAgo="15 min"
                  category="Ambiente"
                  views={234}
                  isRecent={true}
                />
                <NewsItem
                  title="Nuevas medidas de seguridad en transporte público"
                  timeAgo="1 hora"
                  category="Transporte"
                  views={567}
                  isRecent={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección lateral derecha */}
        <div className="space-y-6">
          {/* Categorías */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Categorías</h3>
            </div>
            
            <div className="flex justify-center mb-6">
              <CircularChart percentage={70} />
            </div>

            <div className="space-y-3">
              <CategoryItem color="bg-blue-500" label="Política" value="342" />
              <CategoryItem color="bg-green-500" label="Tecnología" value="289" />
              <CategoryItem color="bg-orange-500" label="Economía" value="234" />
              <CategoryItem color="bg-purple-500" label="Deportes" value="187" />
              <CategoryItem color="bg-teal-500" label="Cultura" value="156" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Contenido de la pestaña TESTIMONIOS
const TestimoniosContent = () => {
  const [tendenciaView, setTendenciaView] = useState('30D');

  // Datos para el gráfico de tendencia
  const tendenciaData = [
    { name: 'Ene', value: 180 },
    { name: 'Feb', value: 220 },
    { name: 'Mar', value: 280 },
    { name: 'Abr', value: 350 },
    { name: 'May', value: 400 },
    { name: 'Jun', value: 380 }
  ];

  // Componente para las tarjetas de estadísticas
  const TestimonioStatCard = ({ icon, title, value, subtitle }) => {
    return (
      <div
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4"
        style={{ borderLeft: '4px solid #9CE840' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-[#E9FCD6]">
            <div className="w-4 h-4 text-[#9CE840]">
              {icon}
            </div>
          </div>
          <span className="text-sm text-gray-600 font-medium">{title}</span>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    );
  };

  // Componente para el gráfico circular
  const CircularProgressTestimonios = ({ percentage, label }) => {
    const circumference = 2 * Math.PI * 50;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#9CE840"
              strokeWidth="12"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
            <span className="text-sm text-gray-600 text-center">{label}</span>
          </div>
        </div>
      </div>
    );
  };

  // Componente para elementos de distribución
  const DistributionItem = ({ color, label, percentage }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-sm text-gray-700">{label}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2 ml-4" style={{width: '120px'}}>
          <div 
            className={`${color.replace('bg-', 'bg-')} h-2 rounded-full transition-all duration-300`} 
            style={{width: `${percentage}%`}}
          ></div>
        </div>
      </div>
      <span className="text-sm font-semibold text-gray-800 ml-2">{percentage}%</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tarjetas superiores */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TestimonioStatCard
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
          title="Total de Testimonios"
          value={2847}
          subtitle="+23 este mes"
        />
        
        <TestimonioStatCard
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
          title="Aprobados"
          value={2456}
          subtitle="+90 este mes"
        />
        
        <TestimonioStatCard
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>}
          title="Rechazados"
          value={234}
          subtitle="+8 este mes"
        />
        
        <TestimonioStatCard
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
          title="Pendientes"
          value={157}
          subtitle="Por revisar"
        />
        
        <TestimonioStatCard
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
          title="Tasa de Aprobación"
          value="86%"
          subtitle="+2% este mes"
        />
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribución por Estado */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800"> Distribución por Estado</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className="px-3 py-1 text-sm font-medium bg-[#9CE840] text-white rounded-md shadow-lg shadow-green-200">
                Todo
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900">
                Este Mes
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mb-6">
            <CircularProgressTestimonios 
              percentage={86} 
              label="Aprobados" 
            />
          </div>

          <div className="space-y-3">
            <DistributionItem color="bg-green-500" label="Aprobados" percentage={86} />
            <DistributionItem color="bg-orange-500" label="Rechazados" percentage={8} />
            <DistributionItem color="bg-red-500" label="Pendientes" percentage={6} />
          </div>
        </div>

        {/* Tendencia de Envíos */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800"> Tendencia de Envíos</h3>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['7D', '30D', '90D'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTendenciaView(period)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      tendenciaView === period
                        ? 'bg-[#9CE840] text-white shadow-lg shadow-green-200'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tendenciaData}>
                <defs>
                  <linearGradient id="greenGradientTestimonios" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9CE840" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#9CE840" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9CE840"
                  strokeWidth={3}
                  fill="url(#greenGradientTestimonios)"
                  dot={{ fill: '#9CE840', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#9CE840', strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL
const EstadisticasDashboard = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = [
    { id: 'General', label: 'General' },
    { id: 'Noticias', label: 'Noticias' },
    { id: 'Testimonios', label: 'Testimonios' }
  ];

  const contentComponents = {
    'General': GeneralContent,
    'Noticias': NoticiasContent,
    'Testimonios': TestimoniosContent
  };

  const ActiveContent = contentComponents[activeTab];

  return (
    <div className="mt-6 ">
      {/* Tab Navigation */}
      <TabsContainer
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeColor="bg-[#9CE840]"
        inactiveColor="bg-transparent"
        textActiveColor="text-white"
        textInactiveColor="text-gray-600"
      />

      {/* Content Area */}
      <div>
        <ActiveContent />
      </div>
    </div>
  );
};

export default EstadisticasDashboard;