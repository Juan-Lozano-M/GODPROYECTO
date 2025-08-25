import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://godbackend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para mantener cookies de sesión si las usas
});

// Interceptor para agregar el token automáticamente a todas las peticiones
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido - limpiar localStorage y redirigir
      console.log('Token expirado, redirigiendo al login...');
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;