import axios from '../config/axiosConfig';

// Servicio para manejar las operaciones CRUD de proyectos
export const projectService = {
  
  // Obtener todos los proyectos
  async getAllProjects() {
    try {
      const response = await axios.get('/api/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Obtener un proyecto por ID
  async getProjectById(id) {
    try {
      const response = await axios.get(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  // Crear un nuevo proyecto (solo admin)
  async createProject(projectData) {
    try {
      const response = await axios.post('/api/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Actualizar un proyecto (solo admin)
  async updateProject(id, projectData) {
    try {
      const response = await axios.patch(`/api/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Eliminar un proyecto (solo admin)
  async deleteProject(id) {
    try {
      const response = await axios.delete(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Buscar proyectos con filtros
  async searchProjects(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.query) queryParams.append('q', params.query);
      if (params.category) queryParams.append('category', params.category);
      if (params.status) queryParams.append('status', params.status);
      if (params.year) queryParams.append('year', params.year);
      
      const response = await axios.get(`/api/projects/search?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  }
};
