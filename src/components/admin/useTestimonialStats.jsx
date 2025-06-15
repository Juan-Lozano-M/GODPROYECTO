// hooks/useTestimonialStats.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTestimonialStats = () => {
  const [stats, setStats] = useState({
    testimonios_aprobados: 0,
    testimonios_rechazados: 0,
    testimonios_en_espera: 0,
    total_testimonios: 0,
    porcentaje_aprobacion: 0,
    porcentaje_rechazo: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://localhost:5000/api/testimonials/stats');
      console.log('Stats fetched:', response.data);
      
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching testimonial stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Función para refrescar las estadísticas manualmente
  const refreshStats = () => {
    fetchStats();
  };

  return {
    stats,
    loading,
    error,
    refreshStats
  };
};

export default useTestimonialStats;