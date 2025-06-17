import axios from '../config/axiosConfig';

export const contactService = {
  // Enviar formulario de contacto por roles (Estudiante, Maestro, Padre)
  sendContactForm: async (formData) => {
    try {
      const response = await axios.post('/api/contact/form', formData);
      return response.data;
    } catch (error) {
      console.error('Error al enviar formulario de contacto:', error);
      throw error.response?.data || error.message;
    }
  },

  // Enviar mensaje de contacto personalizado
  sendCustomMessage: async (messageData) => {
    try {
      const response = await axios.post('/api/contact/message', messageData);
      return response.data;
    } catch (error) {
      console.error('Error al enviar mensaje personalizado:', error);
      throw error.response?.data || error.message;
    }
  },

  // Probar la conexión con el servicio de contacto
  testConnection: async () => {
    try {
      const response = await axios.get('/api/contact/test');
      return response.data;
    } catch (error) {
      console.error('Error al probar conexión:', error);
      throw error.response?.data || error.message;
    }
  }
};
