import { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';

const useTestimonialStats = () => {
  const [stats, setStats] = useState({
    testimonios_aprobados: 0,
    testimonios_rechazados: 0,
    noticias_publicadas: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener testimonios y noticias en paralelo
      const [testimoniosResponse, noticiasResponse] = await Promise.all([
        axios.get("/api/testimonials", { withCredentials: false }),
        axios.get("/api/news/get-news", { withCredentials: false }) // ← NUEVA LLAMADA PARA NOTICIAS
      ]);

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

      // Procesar estadísticas de noticias
      // La respuesta tiene el formato: { status: 'success', news: [...] }
      const noticias = noticiasResponse.data?.news || [];
      const noticiasPublicadas = noticias.length; // Todas las noticias de esta ruta están publicadas

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