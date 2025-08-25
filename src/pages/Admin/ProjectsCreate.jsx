import { useState } from 'react';
import DropZone from "../../components/admin/DropZone";
import Sidebar from "../../components/admin/Sidebar";
import Toast from '../../components/alertas/Toast';
import BackButton from "../../components/buttons/BackButton";
import GameButton from "../../components/buttons/GameButton";
import NewsInput from "../../components/inputs/NewsInput";
import TextArea from "../../components/inputs/TextArea";
import axios from '../../config/axiosConfig';

const ProjectsCreate = () => {  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    year: '',
    participants: '',
    methodology1: '',
    methodology2: '',
    status: 'activo',
    image: null,
    areas: []
  });

  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', message: '' });
  const [resetDropZone, setResetDropZone] = useState(false);
  
  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      year: '',
      participants: '',
      methodology1: '',
      methodology2: '',
      status: 'activo',
      image: null,
      areas: []
    });
    // Activar reset del DropZone
    setResetDropZone(true);
    // Desactivar el reset después de un breve momento
    setTimeout(() => setResetDropZone(false), 100);
  };
  const categoryOptions = [
    { value: 'orientacion_universitaria', label: 'Orientación Universitaria' },
    { value: 'orientacion_escolar', label: 'Orientación Escolar' },
    { value: 'desarrollo_profesional', label: 'Desarrollo Profesional' },
    { value: 'desarrollo_personal', label: 'Desarrollo Personal' },
    { value: 'proyecto_vida', label: 'Proyecto de Vida' }
  ];
  const statusOptions = [
    { value: 'activo', label: 'En progreso' },
    { value: 'completado', label: 'Completado' }
  ];
  const areaOptions = [
    { value: 'comunicacion', label: 'Comunicación' },
    { value: 'liderazgo', label: 'Liderazgo' },
    { value: 'trabajo_equipo', label: 'Trabajo en Equipo' },
    { value: 'soft_skills', label: 'Soft Skills' },
    { value: 'pensamiento_critico', label: 'Pensamiento Crítico' },
    { value: 'resolucion_problemas', label: 'Resolución de Problemas' },
    { value: 'gestion_tiempo', label: 'Gestión del Tiempo' },
    { value: 'inteligencia_emocional', label: 'Inteligencia Emocional' },
    { value: 'adaptabilidad', label: 'Adaptabilidad' },
    { value: 'creatividad', label: 'Creatividad' }
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAreaChange = (areaValue) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(areaValue)
        ? prev.areas.filter(area => area !== areaValue)
        : [...prev.areas, areaValue]
    }));
  };

  const handleShowToast = (title, message) => {
    setToastData({ title, message });
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar que el usuario esté autenticado
    const token = localStorage.getItem('authToken');
    if (!token) {
      handleShowToast('Error', 'No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    // Validaciones básicas
    if (!formData.title.trim()) {
      handleShowToast('Error', 'El título del proyecto es obligatorio.');      return;
    }

    if (!formData.category) {
      handleShowToast('Error', 'La categoría del proyecto es obligatoria.');
      return;
    }

    if (!formData.year) {
      handleShowToast('Error', 'El año del proyecto es obligatorio.');
      return;
    }

    try {
      const response = await axios.post('/api/projects', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });      if (response.data.status === 'success') {
        handleShowToast('Éxito', 'Proyecto creado exitosamente');
        // Resetear el formulario
        resetForm();
      }
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      
      if (error.response?.status === 401) {
        handleShowToast('Error', 'No tienes permisos para crear proyectos. Verifica tu sesión.');
      } else if (error.response?.status === 403) {
        handleShowToast('Error', 'Solo los administradores pueden crear proyectos.');
      } else {
        handleShowToast('Error', 'No se pudo crear el proyecto');
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-40 md:mr-10">        <div className="flex justify-between items-center mt-5">
          <h2 className="text-4xl font-bold">Creación de proyectos</h2>
          <GameButton 
            text="Guardar"
            onClick={handleSubmit}
          />
        </div>
        <BackButton className="mt-4" />
        
        <form onSubmit={handleSubmit} className="flex-col mt-4 flex flex-wrap lg:flex-row 2xl:flex-row">
          {/* Columna izquierda */}
          <div className="flex-1 w-full lg:w-1/2 lg:pr-8">            <h2 className="text-2xl font-bold">Título del proyecto</h2>
            <NewsInput 
              placeholder="Ingresa el título del proyecto" 
              className="w-full"
              value={formData.title}
              onChange={(value) => handleInputChange('title', value)}
            />

            <div className="flex gap-4 mt-4">              <div className="flex-1">
                <h2 className="text-2xl font-bold">Categoría</h2>
                <div className="relative mt-4 w-full">
                  <div className="relative group overflow-hidden rounded-lg">
                    <select
                      className="text-base px-4 py-2.5 border-none rounded-lg bg-[#f8f8f8] 
                        shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full text-gray-700
                        transition-all duration-300 ease-in-out
                        hover:bg-[#f2f2f2]
                        focus:outline-none focus:bg-white focus:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
                        focus:animate-inputFocus
                        appearance-none"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      <option value="">Selecciona una categoría</option>
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#8FDA32] 
                      w-full scale-x-0 origin-left
                      transition-transform duration-300 ease-in-out
                      group-hover:scale-x-100 group-focus-within:scale-x-100" 
                    />
                  </div>
                </div>
              </div>              <div className="flex-1">
                <h2 className="text-2xl font-bold">Año del proyecto</h2>
                <div className="relative mt-4 w-full">
                  <div className="relative group overflow-hidden rounded-lg">
                    <input
                      type="number"
                      min="2000"
                      max="2030"
                      className="text-base px-4 py-2.5 border-none rounded-lg bg-[#f8f8f8] 
                        shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full text-gray-700
                        transition-all duration-300 ease-in-out
                        hover:bg-[#f2f2f2]
                        focus:outline-none focus:bg-white focus:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
                        focus:animate-inputFocus
                        placeholder:text-gray-400"
                      placeholder="2024"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#8FDA32] 
                      w-full scale-x-0 origin-left
                      transition-transform duration-300 ease-in-out
                      group-hover:scale-x-100 group-focus-within:scale-x-100" 
                    />
                  </div>
                </div>
              </div>
            </div>            <h2 className="text-2xl font-bold mt-4">Número de participantes</h2>
            <div className="relative mt-4 w-full">
              <div className="relative group overflow-hidden rounded-lg">
                <input
                  type="number"
                  min="1"
                  className="text-base px-4 py-2.5 border-none rounded-lg bg-[#f8f8f8] 
                    shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full text-gray-700
                    transition-all duration-300 ease-in-out
                    hover:bg-[#f2f2f2]
                    focus:outline-none focus:bg-white focus:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
                    focus:animate-inputFocus
                    placeholder:text-gray-400"
                  placeholder="Ej: 5"
                  value={formData.participants}
                  onChange={(e) => handleInputChange('participants', e.target.value)}
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#8FDA32] 
                  w-full scale-x-0 origin-left
                  transition-transform duration-300 ease-in-out
                  group-hover:scale-x-100 group-focus-within:scale-x-100" 
                />
              </div>
            </div>            <h2 className="text-2xl font-bold mt-4">Estado inicial</h2>
            <div className="relative mt-4 w-full">
              <div className="relative group overflow-hidden rounded-lg">
                <select
                  className="text-base px-4 py-2.5 border-none rounded-lg bg-[#f8f8f8] 
                    shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full text-gray-700
                    transition-all duration-300 ease-in-out
                    hover:bg-[#f2f2f2]
                    focus:outline-none focus:bg-white focus:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
                    focus:animate-inputFocus
                    appearance-none"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#8FDA32] 
                  w-full scale-x-0 origin-left
                  transition-transform duration-300 ease-in-out
                  group-hover:scale-x-100 group-focus-within:scale-x-100" 
                />
              </div>
            </div>            <h2 className="text-2xl font-bold mt-4">Imagen del proyecto</h2>
            <DropZone 
              className="w-full mt-2"
              onFileChange={(file) => handleInputChange('image', file)}
              reset={resetDropZone}
            />
          </div>

          {/* Columna derecha */}
          <div className="flex-1 w-full lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
            <h2 className="text-2xl font-bold">Descripción del proyecto</h2>
            <TextArea 
              placeholder="Describe el proyecto, sus alcances y características principales..." 
              className="w-full h-32"
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
            />

            <h2 className="text-2xl font-bold mt-4">Metodología 1</h2>
            <TextArea 
              placeholder="Describe la primera metodología utilizada..." 
              className="w-full h-24"
              value={formData.methodology1}
              onChange={(value) => handleInputChange('methodology1', value)}
            />

            <h2 className="text-2xl font-bold mt-4">Metodología 2</h2>
            <TextArea 
              placeholder="Describe la segunda metodología utilizada..." 
              className="w-full h-24"
              value={formData.methodology2}
              onChange={(value) => handleInputChange('methodology2', value)}
            />

            <h2 className="text-2xl font-bold mt-4">Áreas</h2>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {areaOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={formData.areas.includes(option.value)}
                    onChange={() => handleAreaChange(option.value)}
                  />
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>
      <Toast 
        title={toastData.title}
        message={toastData.message}
        show={showToast}
        setShow={setShowToast}
      />
    </div>
  );
};

export default ProjectsCreate;