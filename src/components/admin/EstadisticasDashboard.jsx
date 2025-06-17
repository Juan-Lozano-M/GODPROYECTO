
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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

// Contenido de la pestaña GENERAL
const GeneralContent = ({ stats, loading }) => {
  const [trafficView] = useState('Mensual');
  const [fontSize, setFontSize] = useState(10);

  // Hook para manejar el fontSize responsivo
  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth >= 1024 ? 13 : 10);
    };

    // Ejecutar al montar el componente
    handleResize();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (!stats) return <div>Error al cargar datos.</div>;

  const general = stats?.general || {};
  const totals = general.totals || {};
  const trafficData = general.traffic?.map(item => ({
    name: item.month,
    value: item.visits
  })) || [];

  const visits = general.visits || {};

  const StatCard = ({ title, value, subtitle, className = "" }) => (
    <div className={`bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 ${className}`} style={{ borderLeft: '4px solid #9CE840' }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg" style={{ background: '#E9FCD6' }}>
              <div className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#9CE840' }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">{title}</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
            {value.toLocaleString()}
          </div>
          {subtitle && (
            <div className="text-xs text-gray-500">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );

  // Escala para usuarios registrados
  const maxTraffic = Math.max(...trafficData.map(d => d.value || 0), 30);
  const adjustedMaxTraffic = Math.ceil(maxTraffic / 6) * 6;
  const yTicksTraffic = Array.from({ length: adjustedMaxTraffic / 6 + 1 }, (_, i) => i * 6);

  // Escala para visitas por sección
  const maxVisits = Math.max(
    visits.home_visits || 0,
    visits.projects_visits || 0,
    visits.contact_visits || 0,
    visits.news_visits || 0,
    0
  );
  const adjustedMaxVisits = Math.max(100, Math.ceil(maxVisits / 25) * 25);
  const yTicksVisits = Array.from({ length: adjustedMaxVisits / 25 + 1 }, (_, i) => i * 25);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Tarjetas resumen */}
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 xl:gap-6 flex-1">
          <StatCard title="Totales" value={totals.total_registered || 0} subtitle="Totales registrados" />
          <StatCard title="Este mes" value={totals.this_month || 0} subtitle="Registrados este mes" />
          <StatCard title="Esta semana" value={totals.this_week || 0} subtitle="Registrados la última semana" />
          <StatCard title="Hoy" value={totals.today || 0} subtitle="Registrados hoy" />
        </div>
      </div>      {/* Gráficas */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 2xl:space-y-0 2xl:grid 2xl:grid-cols-3 2xl:gap-6">
        {/* Usuarios registrados */}
        <div className="lg:col-span-2 2xl:col-span-2">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Usuarios registrados</h2>
              <div className="bg-gray-100 rounded-lg p-1 w-fit">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-white text-gray-900 shadow-sm" disabled>
                  {trafficView}
                </button>
              </div>
            </div>

            {/* Altura adaptativa para diferentes tamaños de pantalla */}
            <div className="h-64 sm:h-72 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="greenGradientUsuarios" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9CE840" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#9CE840" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#EFEFEF" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: fontSize, fill: '#6b7280' }} 
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[0, adjustedMaxTraffic]} 
                    ticks={yTicksTraffic} 
                    allowDecimals={false} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: fontSize, fill: '#6b7280' }}
                    width={40}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderColor: '#ccc',
                      fontSize: '12px'
                    }} 
                    labelStyle={{ color: 'black' }} 
                    formatter={(value) => [`${value} registros`, 'Cantidad']} 
                    cursor={false} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#9CE840" 
                    strokeWidth={2} 
                    fill="url(#greenGradientUsuarios)" 
                    dot={{ fill: '#9CE840', strokeWidth: 1, r: 3 }} 
                    activeDot={{ r: 4, fill: '#9CE840', strokeWidth: 2, stroke: '#fff' }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Visitas por sección */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Visitas por sección</h3>
            <span className="text-xs bg-[#9CE840] text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-medium w-fit">Este mes</span>
          </div>

          {/* Altura adaptativa para el gráfico de barras */}
          <div className="h-72 sm:h-80 md:h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Inicio', visitas: visits.home_visits || 0 },
                  { name: 'Proyectos', visitas: visits.projects_visits || 0 },
                  { name: 'Contacto', visitas: visits.contact_visits || 0 },
                  { name: 'Noticias', visitas: visits.news_visits || 0 }
                ]}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid vertical={false} stroke="#EFEFEF" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6b7280', fontSize: fontSize }}
                  interval={0}
                  angle={window.innerWidth < 640 ? -45 : 0}
                  textAnchor={window.innerWidth < 640 ? "end" : "middle"}
                  height={window.innerWidth < 640 ? 60 : 30}
                />
                <YAxis
                  domain={[0, adjustedMaxVisits]}
                  ticks={yTicksVisits}
                  allowDecimals={false}
                  tick={{ fill: '#6b7280', fontSize: fontSize }}
                  width={40}
                />
                <Tooltip 
                  formatter={(value) => [`${value} visitas`, 'Sección']}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Bar 
                  dataKey="visitas" 
                  fill="#9CE840" 
                  barSize={window.innerWidth < 640 ? 20 : 30} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


const getTimeAgo = (fechaISO) => {
  if (!fechaISO) return "desconocido";

  const fecha = new Date(fechaISO);
  const ahora = new Date();
  const diffMs = ahora - fecha;

  if (isNaN(diffMs)) return "desconocido"; // Evita el NaN

  const minutos = Math.floor(diffMs / (1000 * 60));
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const meses = Math.floor(dias / 30);

  if (minutos < 60) return `${minutos} min`;
  if (horas < 24) return `${horas} hora${horas !== 1 ? 's' : ''}`;
  if (dias < 30) return `${dias} día${dias !== 1 ? 's' : ''}`;
  return `${meses} mes${meses !== 1 ? 'es' : ''}`;
};

// Contenido de la pestaña NOTICIAS
const NoticiasContent = ({ stats, loading }) => {
  const [activeNewsTab, setActiveNewsTab] = useState('Anual');
  const [fontSize, setFontSize] = useState(10);

  // Hook para manejar el fontSize responsivo
  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth >= 1024 ? 13 : 10);
    };

    // Ejecutar al montar el componente
    handleResize();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (!stats) return <div>Error al cargar datos.</div>;

  const news = stats?.news || {};
  const totals = news.totals || {};
  const mostViewed = news.most_viewed || [];
  const recentNews = news.recent_news || [];
  const categories = news.categories || [];

  const diff = (totals.published_today || 0) - (totals.published_yesterday || 0);
  const subtitleHoy = diff === 0
    ? 'Igual que ayer'
    : diff > 0
      ? `+${diff} con respecto a ayer`
      : `${diff} con respecto a ayer`;

  const NewsItem = ({ title, timeAgo, category, views }) => (
    <div className="flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 line-clamp-2 sm:line-clamp-1">{title}</h4>
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-gray-500">
            <span className="truncate">Hace {timeAgo}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline truncate">{category}</span>
          </div>
        </div>
      </div>
      <div className="text-right ml-2 flex-shrink-0">
        <div className="text-sm sm:text-lg font-adlam text-[#9CE840]">{views.toLocaleString()}</div>
        <div className="text-xs text-gray-500">vistas</div>
      </div>
    </div>
  );

  const StatCard = ({ label, value, subtitle }) => (
    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border-l-4 hover:shadow-md transition-shadow duration-200" style={{ borderLeft: '4px solid #9CE840' }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1 sm:p-1.5 rounded-lg bg-[#E9FCD6] flex-shrink-0">
          <div className="w-3 h-3 sm:w-4 sm:h-4 text-green-500">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-2">{label}</span>
      </div>
      <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-500 line-clamp-1">{subtitle}</div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <StatCard 
          label="Total de Noticias" 
          value={totals.total_news || 0} 
          subtitle={`+${totals.created_this_month || 0} este mes`} 
        />
        <StatCard 
          label="Publicadas Hoy" 
          value={totals.published_today || 0} 
          subtitle={subtitleHoy} 
        />
        <StatCard 
          label="Vistas Totales" 
          value={totals.total_views?.toLocaleString() || 0} 
          subtitle="Noticias vistas" 
        />
        <StatCard 
          label="Interacciones" 
          value={totals.total_shares?.toLocaleString() || 0} 
          subtitle="Noticias compartidas" 
        />
      </div>

      {/* Contenido principal */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6">
        {/* Columna izquierda - Listas de noticias */}
        <div className="lg:col-span-2">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 h-full">
            {/* Noticias Más Vistas */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Noticias Más Vistas</h3>
              <div className="space-y-1 sm:space-y-2">
                {mostViewed.length > 0 ? (
                  mostViewed.map((item, i) => (
                    <NewsItem
                      key={i}
                      title={item.title}
                      timeAgo={getTimeAgo ? getTimeAgo(item.fecha_creacion) : 'N/A'}
                      category={item.category}
                      views={item.views}
                    />
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No hay noticias disponibles
                  </div>
                )}
              </div>
            </div>

            {/* Divisor */}
            <div className="border-t border-gray-200 my-4 sm:my-6"></div>

            {/* Noticias Más Recientes */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Noticias Más Recientes</h3>
              <div className="space-y-1 sm:space-y-2">
                {recentNews.length > 0 ? (
                  recentNews.map((item, i) => (
                    <NewsItem
                      key={i}
                      title={item.title}
                      timeAgo={getTimeAgo ? getTimeAgo(item.fecha_creacion) : 'N/A'}
                      category={item.category}
                      views={item.views}
                    />
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No hay noticias recientes
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Gráfico */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Noticias por Categoría</h3>
            </div>
            
            {/* Altura adaptativa para el gráfico */}
            <div className="h-64 sm:h-72 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={categories}
                  margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                >
                  <CartesianGrid vertical={false} stroke="#EFEFEF" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: "#888", fontSize: fontSize }} 
                    axisLine={{ stroke: "#D3D3D3" }} 
                    tickLine={false}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[0, 30]} 
                    ticks={[0, 6, 12, 18, 24, 30]} 
                    tick={{ fill: "#888", fontSize: fontSize }} 
                    axisLine={false} 
                    tickLine={false}
                    width={35}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderColor: '#ccc',
                      fontSize: '12px'
                    }} 
                    labelStyle={{ color: 'black' }} 
                    formatter={(value) => [`${value} noticias`, 'Cantidad']} 
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#9CE840" 
                    barSize={window.innerWidth < 640 ? 15 : 20} 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contenido de la pestaña TESTIMONIOS
const TestimoniosContent = ({ stats, loading }) => {
  const [fontSize, setFontSize] = useState(10);

  // Hook para manejar el fontSize responsivo
  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth >= 1024 ? 13 : 10);
    };

    // Ejecutar al montar el componente
    handleResize();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;
  if (!stats) return <div>Error al cargar datos.</div>;

  const testimonials = stats?.testimonials || {};
  const totals = testimonials.totals || {};
  const distribution = testimonials.distribution || {};
  const tendenciaData = testimonials.trend?.map(item => ({
    name: item.month,
    value: item.count
  })) || [];

  const TestimonioStatCard = ({ icon, title, value, subtitle }) => {
    return (
      <div
        className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border-l-4 hover:shadow-md transition-shadow duration-200"
        style={{ borderLeft: '4px solid #9CE840' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 sm:p-1.5 rounded-lg bg-[#E9FCD6] flex-shrink-0">
            <div className="w-3 h-3 sm:w-4 sm:h-4 text-[#9CE840]">
              {icon}
            </div>
          </div>
          <span className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-2">{title}</span>
        </div>
        <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className="text-xs text-gray-500 line-clamp-1">{subtitle}</div>
      </div>
    );
  };

  const CircularProgressTestimonios = ({ percentage, label }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36">
          <svg className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 transform -rotate-90" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle 
              cx="55" 
              cy="55" 
              r="45" 
              stroke="#9CE840" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray={strokeDasharray} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round" 
              className="transition-all duration-300" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800">{percentage}%</span>
            <span className="text-xs sm:text-sm text-gray-600 text-center">{label}</span>
          </div>
        </div>
      </div>
    );
  };

  const DistributionItem = ({ color, label, percentage }) => (
    <div className="flex items-center justify-between py-2 sm:py-3 px-2 sm:px-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
        <div className={`w-3 h-3 rounded-full ${color} flex-shrink-0`}></div>
        <span className="text-xs sm:text-sm text-gray-700 min-w-0 flex-shrink-0">{label}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2 min-w-[40px] sm:min-w-[60px]">
          <div 
            className={`${color.replace('bg-', 'bg-')} h-2 rounded-full transition-all duration-300`} 
            style={{width: `${percentage}%`}}
          ></div>
        </div>
      </div>
      <span className="text-xs sm:text-sm font-semibold text-gray-800 ml-2 flex-shrink-0">{percentage}%</span>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <TestimonioStatCard 
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>} 
          title="Total de Testimonios" 
          value={totals.total_testimonials || 0} 
          subtitle={`+${totals.monthly_change || 0} este mes`} 
        />
        <TestimonioStatCard 
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} 
          title="Aprobados" 
          value={totals.approved || 0} 
          subtitle={`+${totals.approved_change || 0} este mes`} 
        />
        <TestimonioStatCard 
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>} 
          title="Anulados" 
          value={totals.rejected || 0} 
          subtitle={`+${totals.rejected_change || 0} este mes`} 
        />
        <TestimonioStatCard 
          icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} 
          title="Pendientes" 
          value={totals.pending || 0} 
          subtitle="Testimonios pendientes"
        />
      </div>

      {/* Contenido principal */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6">
        {/* Columna izquierda - Distribución */}
        <div className="lg:col-span-2">
          <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Distribución por Estado</h3>
              
              <div className="flex justify-center mb-4 sm:mb-6">
                <CircularProgressTestimonios 
                  percentage={distribution.approved_percentage || 0} 
                  label="Aprobados" 
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <DistributionItem 
                  color="bg-green-500" 
                  label="Aprobados" 
                  percentage={distribution.approved_percentage || 0} 
                />
                <DistributionItem 
                  color="bg-red-500" 
                  label="Rechazados" 
                  percentage={distribution.rejected_percentage || 0} 
                />
                <DistributionItem 
                  color="bg-orange-500" 
                  label="Pendientes" 
                  percentage={distribution.pending_percentage || 0} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Gráfico */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Testimonios Aprobados</h3>
              <div className="bg-gray-100 rounded-lg p-1 self-start sm:self-auto">
                <button
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md bg-white text-gray-900 shadow-sm"
                  disabled
                >
                  Mensual
                </button>
              </div>
            </div>

            {/* Altura adaptativa para el gráfico */}
            <div className="h-64 sm:h-72 md:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={tendenciaData} 
                  margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                >
                  <defs>
                    <linearGradient id="greenGradientTestimonios" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9CE840" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#9CE840" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#EFEFEF" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: "#888", fontSize: fontSize }} 
                    axisLine={{ stroke: "#D3D3D3" }} 
                    tickLine={false}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[0, 30]} 
                    ticks={[0, 6, 12, 18, 24, 30]} 
                    tick={{ fill: "#888", fontSize: fontSize }} 
                    axisLine={false} 
                    tickLine={false}
                    width={35}
                  />
                  
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderColor: '#ccc',
                      fontSize: '12px'
                    }}
                    labelStyle={{ color: 'black' }}
                    formatter={(value) => [`${value} testimonios`, 'Cantidad']}
                    cursor={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#9CE840"
                    strokeWidth={2}
                    fill="url(#greenGradientTestimonios)"
                    dot={{ fill: '#9CE840', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, fill: '#9CE840', strokeWidth: 2, stroke: '#fff' }}
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

  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats/dashboard", {
          withCredentials: true
        });
        if (response.data.success) {
          setStatsData(response.data.data);
        } else {
          console.error("Error en la respuesta de estadísticas:", response.data.message);
        }
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
        <ActiveContent stats={statsData} loading={loading} />
      </div>
    </div>
  );
};

export default EstadisticasDashboard;