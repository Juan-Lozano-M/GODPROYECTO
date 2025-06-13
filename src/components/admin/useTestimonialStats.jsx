import { useState, useEffect } from 'react';
import axios from 'axios';

const useTestimonialStats = () => {
  const [stats, setStats] = useState({
    testimonios_aprobados: 0,
    testimonios_rechazados: 0,
    noticias_publicadas: 0, // ← NUEVA ESTADÍSTICA
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Solo obtener testimonios por ahora
      const testimoniosResponse = await axios.get("http://localhost:5000/api/testimonials");

      // Procesar estadísticas de testimonios
      const testimonios = testimoniosResponse.data || [];
      const testimoniosAprobados = testimonios.filter(t => {
        const estado = t.estado_tes?.toString().toLowerCase();
        return estado === 'aprobado' || estado === 'approved';
      }).length;

      const testimoniosRechazados = testimonios.filter(t => {
        const estado = t.estado_tes?.toString().toLowerCase();
        return estado === 'anulado' || estado === 'rechazado' || estado === 'rejected';
      }).length;

      // ← TEMPORAL: Valor fijo para noticias hasta tener el endpoint correcto
      const noticiasPublicadas = 10; // Cambia esto cuando tengas el endpoint correcto

      setStats({
        testimonios_aprobados: testimoniosAprobados,
        testimonios_rechazados: testimoniosRechazados,
        noticias_publicadas: noticiasPublicadas,
      });

      console.log('Estadísticas actualizadas:', {
        testimonios_aprobados: testimoniosAprobados,
        testimonios_rechazados: testimoniosRechazados,
        noticias_publicadas: noticiasPublicadas,
      });

    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      setError(error.message || 'Error al cargar estadísticas');
      
      // En caso de error, mantener valores en 0
      setStats({
        testimonios_aprobados: 0,
        testimonios_rechazados: 0,
        noticias_publicadas: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = () => {
    fetchStats();
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refreshStats,
  };
};

export default useTestimonialStats;