
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Area, AreaChart, Tooltip, CartesianGrid } from 'recharts';

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
const GeneralContent = ({ stats, loading }) => {

  const [trafficView, setTrafficView] = useState('Mensual');

  if (loading) return <div>Cargando estadísticas...</div>;
  if (!stats) return <div>Error al cargar datos.</div>;

  const general = stats?.general || {};
  const totals = general.totals || {};
  const activeUsers = general.active_users || {};
  const trafficData = general.traffic?.map(item => ({
    name: item.month,
    value: item.visits
  })) || [];

  const visits = general.visits || {};

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
      <div>
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 flex-1">
            <StatCard 
              title="Totales" 
              value={totals.total_registered || 0} 
              subtitle="Totales registrados"
              className="w-full"
            />
            <StatCard 
              title="Este mes" 
              value={totals.this_month || 0}
              subtitle="Registrados el último mes"
              className="w-full"
            />
            <StatCard 
              title="Esta semana" 
              value={totals.this_week || 0} 
              subtitle="Registrados la última semana"
              className="w-full"
            />
            <StatCard 
              title="Hoy" 
              value={totals.today || 0} 
              subtitle="Registrados hoy"
              className="w-full" 
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 xl:w-80 xl:flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Usuarios Activos</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Día</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-32 xl:w-40 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#9CE840] h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm font-medium">{activeUsers.day || 0}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Semana</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-32 xl:w-40 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#9CE840] h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="text-sm font-medium">{activeUsers.week || 0}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mes</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-32 xl:w-40 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#9CE840] h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <span className="text-sm font-medium">{activeUsers.month || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      interval={0} // Fuerza mostrar todos los meses
                    />
                    <YAxis
                      domain={[0, 50]}
                      tickCount={6} // muestra 0, 10, 20, 30, 40, 50
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
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

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Visitas</h3>
              <span className="text-xs bg-[#9CE840] text-black px-3 sm:px-4 py-2 rounded-xl font-medium">
                Este mes
              </span>
            </div>

            <div className="flex justify-center">
              <CircularProgress 
                percentage={visits.visit_increase || 0} 
                label="más de vistas" 
                sublabel="Último mes" 
              />
            </div>

            <div className="space-y-1 pt-4">
              <VisitMetric label="Total de visitas" value={visits.total_visits || 0} color="green" />
              <VisitMetric label="Visitas sección inicios" value={visits.home_visits || 0} color="green" />
              <VisitMetric label="Visitas sección proyectos" value={visits.projects_visits || 0} color="blue" />
              <VisitMetric label="Visitas sección contacto" value={visits.contact_visits || 0} color="gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Contenido de la pestaña NOTICIAS
const NoticiasContent = ({ stats, loading }) => {
  const [activeNewsTab, setActiveNewsTab] = useState('Anual');

  if (loading) return <div>Cargando estadísticas...</div>;
  if (!stats) return <div>Error al cargar datos.</div>;

  const news = stats?.news || {};
  const totals = news.totals || {};
  const mostViewed = news.most_viewed || [];
  const recentNews = news.recent_news || [];
  const categories = news.categories || [];

  const NewsItem = ({ title, timeAgo, category, views }) => (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stat Cards */}
        {[{
          label: 'Total de Noticias',
          value: totals.total_news || 0,
          subtitle: `+${totals.created_this_month || 0} este mes`
        }, {
          label: 'Publicadas Hoy',
          value: totals.published_today || 0,
          subtitle: `+${(totals.published_today || 0) - (totals.published_yesterday || 0)} con respecto a ayer`
        }, {
          label: 'Vistas Totales',
          value: totals.total_views?.toLocaleString() || 0,
          subtitle: 'Noticias vistas'
        }, {
          label: 'Interacciones',
          value: totals.total_shares?.toLocaleString() || 0,
          subtitle: 'Noticias compartidas'
        }].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderLeft: '4px solid #9CE840' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-[#E9FCD6]">
                <div className="w-4 h-4 text-green-500">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.subtitle}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Noticias Más Vistas</h3>
            <div className="space-y-2">
              {mostViewed.map((item, i) => (
                <NewsItem
                  key={i}
                  title={item.title}
                  timeAgo={`${item.hours_ago} horas`}
                  category={item.category}
                  views={item.views}
                />
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Noticias Más Recientes</h3>
              <div className="space-y-2">
                {recentNews.map((item, i) => (
                  <NewsItem
                    key={i}
                    title={item.title}
                    timeAgo={item.minutes_ago ? `${item.minutes_ago} min` : `${item.hours_ago} horas`}
                    category={item.category}
                    views={item.views}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Noticias por Categoría</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categories}>
                  <CartesianGrid vertical={false} stroke="#EFEFEF" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#888", dy: 10 }}
                    axisLine={{ stroke: "#D3D3D3", strokeWidth: 1 }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 30]}
                    ticks={[0, 6, 12, 18, 24, 30]}
                    tick={{ fill: "#888", dx: -28 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#ccc' }}
                    labelStyle={{ color: 'black' }}
                    formatter={(value) => [`${value} noticias`, 'Cantidad']}
                  />
                  <Bar dataKey="count" fill="#9CE840" barSize={20} radius={[6, 6, 0, 0]} />
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

  const CircularProgressTestimonios = ({ percentage, label }) => {
    const circumference = 2 * Math.PI * 50;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="12" fill="none" />
            <circle cx="60" cy="60" r="50" stroke="#9CE840" strokeWidth="12" fill="none" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-300" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
            <span className="text-sm text-gray-600 text-center">{label}</span>
          </div>
        </div>
      </div>
    );
  };

  const DistributionItem = ({ color, label, percentage }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="text-sm text-gray-700">{label}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2 ml-4" style={{width: '120px'}}>
          <div className={`${color.replace('bg-', 'bg-')} h-2 rounded-full transition-all duration-300`} style={{width: `${percentage}%`}}></div>
        </div>
      </div>
      <span className="text-sm font-semibold text-gray-800 ml-2">{percentage}%</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TestimonioStatCard icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>} title="Total de Testimonios" value={totals.total_testimonials || 0} subtitle={`+${totals.monthly_change || 0} este mes`} />
        <TestimonioStatCard icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} title="Aprobados" value={totals.approved || 0} subtitle={`+${totals.approved_change || 0} este mes`} />
        <TestimonioStatCard icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>} title="Anulados" value={totals.rejected || 0} subtitle={`+${totals.rejected_change || 0} este mes`} />
        <TestimonioStatCard icon={<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>} title="Pendientes" value={totals.pending || 0} subtitle="Testimonios pendientes"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Distribución por Estado</h3>
          </div>

          <div className="flex justify-center mb-6">
            <CircularProgressTestimonios percentage={distribution.approved_percentage || 0} label="Aprobados" />
          </div>

          <div className="space-y-3">
            <DistributionItem color="bg-green-500" label="Aprobados" percentage={distribution.approved_percentage || 0} />
            <DistributionItem color="bg-orange-500" label="Rechazados" percentage={distribution.rejected_percentage || 0} />
            <DistributionItem color="bg-red-500" label="Pendientes" percentage={distribution.pending_percentage || 0} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Tendencia de Envíos</h3>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tendenciaData}>
                  <defs>
                    <linearGradient id="greenGradientTestimonios" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9CE840" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#9CE840" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis domain={[0, 30]} ticks={[0, 6, 12, 18, 24, 30]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#ccc' }}
                    labelStyle={{ color: 'black' }}
                    formatter={(value) => [`${value} testimonios`, 'Cantidad']}
                    cursor={false}
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