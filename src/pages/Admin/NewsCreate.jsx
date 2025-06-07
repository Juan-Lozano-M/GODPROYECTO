import React, { useState } from 'react';
import axios from '../../config/axiosConfig';
import Sidebar from "../../components/Sidebar";
import DropZone from "../../components/admin/DropZone";
import BackButton from "../../components/buttons/BackButton";
import GameButton from "../../components/buttons/GameButton";
import CategorySelect from "../../components/inputs/CategorySelect";
import ContentEditor from "../../components/inputs/ContentEditor";
import NewsInput from "../../components/inputs/NewsInput";
import TextArea from "../../components/inputs/TextArea";
import Toast from '../../components/alertas/Toast'; // Import the Toast component

const NewsCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: null,
    content: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ title: '', message: '' });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
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
  
    try {
      const response = await axios.post('/api/news', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data.status === 'success') {
        handleShowToast('Éxito', 'Noticia creada exitosamente');
        // Opcionalmente resetear el formulario
        setFormData({
          title: '',
          category: '',
          description: '',
          image: null,
          content: ''
        });
      }
    } catch (error) {
      console.error('Error al crear la noticia:', error);
      
      if (error.response?.status === 401) {
        handleShowToast('Error', 'No tienes permisos para crear noticias. Verifica tu sesión.');
      } else if (error.response?.status === 403) {
        handleShowToast('Error', 'Solo los administradores pueden crear noticias.');
      } else {
        handleShowToast('Error', 'No se pudo crear la noticia');
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-40 md:mr-10">
        <div className="flex justify-between items-center mt-5">
          <h2 className="text-4xl font-bold">Creación de noticias</h2>
          <GameButton 
            text="Guardar"
            onClick={handleSubmit}
          />
        </div>
        <BackButton className="mt-4" />
        
        <form onSubmit={handleSubmit} className="flex-col mt-4 flex flex-wrap lg:flex-row 2xl:flex-row">
          <div className="flex-1 w-full lg:w-1/2">
            <h2 className="text-2xl font-bold">Titulo</h2>
            <NewsInput 
              placeholder="Ingresa el titulo" 
              className="w-[1%] sm:w-[182%] lg:w-[100%]"
              onChange={(value) => handleInputChange('title', value)}
            />

            <h2 className="text-2xl font-bold mt-4">Categoria</h2>
            <CategorySelect 
              className="w-[100%] sm:w-[100%] lg:w-[55%]"
              onChange={(value) => handleInputChange('category', value)}
            />

            <h2 className="text-2xl font-bold mt-4">Descripcion</h2>
            <TextArea 
              placeholder="Ingresa la descripción de la noticia" 
              className="w-[100%] sm:w-[100%] lg:w-[55%]"
              onChange={(value) => handleInputChange('description', value)}
            />

            <h2 className="text-2xl font-bold mt-4">Imagen</h2>
            <DropZone 
              className="w-[100%] sm:w-[100%] lg:w-[55%] mt-2"
              onFileChange={(file) => handleInputChange('image', file)}
            />
          </div>

          <div className="flex-1 w-full lg:ml-[-200px]">
            <h2 className="text-2xl font-bold mb-4">Contenido</h2>
            <ContentEditor 
              className="w-2/3 mt-2"
              onChange={(value) => handleInputChange('content', value)}
            />
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

export default NewsCreate;