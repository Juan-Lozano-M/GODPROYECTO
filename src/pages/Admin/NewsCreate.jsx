import { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import DropZone from "../../components/admin/DropZone";
import Toast from '../../components/alertas/Toast'; // Import the Toast component
import BackButton from "../../components/buttons/BackButton";
import GameButton from "../../components/buttons/GameButton";
import CategorySelect from "../../components/inputs/CategorySelect";
import ContentEditor from "../../components/inputs/ContentEditor";
import NewsInput from "../../components/inputs/NewsInput";
import TextArea from "../../components/inputs/TextArea";
import axios from '../../config/axiosConfig';

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
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [resetDropZone, setResetDropZone] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUploadStart = () => {
    setIsImageUploading(true);
  };

  const handleImageUploadEnd = () => {
    setIsImageUploading(false);
  };

  const handleShowToast = (title, message) => {
    setToastData({ title, message });
    setShowToast(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar que no se esté subiendo una imagen
    if (isImageUploading) {
      handleShowToast('Espera', 'Por favor espera a que termine de subirse la imagen');
      return;
    }
    
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
      });      if (response.data.status === 'success') {
        handleShowToast('Éxito', 'Noticia creada exitosamente');
          // Refrescar la página después de un breve delay para mostrar el toast
        setTimeout(() => {
          window.location.reload();
        }, 200);
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
          <h2 className="text-4xl font-bold">Creación de noticias</h2>          <GameButton 
            text={isImageUploading ? "Subiendo imagen..." : "Guardar"}
            onClick={handleSubmit}
            disabled={isImageUploading}
          />
        </div>
        <BackButton className="mt-4" />
        
        <form onSubmit={handleSubmit} className="flex-col mt-4 flex flex-wrap lg:flex-row 2xl:flex-row">
          <div className="flex-1 w-full lg:w-1/2">            <h2 className="text-2xl font-bold">Titulo</h2>
            <NewsInput 
              placeholder="Ingresa el titulo" 
              className="w-[1%] sm:w-[182%] lg:w-[100%]"
              value={formData.title}
              onChange={(value) => handleInputChange('title', value)}
            />            <h2 className="text-2xl font-bold mt-4">Categoria</h2>
            <CategorySelect 
              className="w-[100%] sm:w-[100%] lg:w-[55%]"
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
            />            <h2 className="text-2xl font-bold mt-4">Descripcion</h2>
            <TextArea 
              placeholder="Ingresa la descripción de la noticia" 
              className="w-[100%] sm:w-[100%] lg:w-[55%]"
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
            /><h2 className="text-2xl font-bold mt-4">Imagen</h2>
            {isImageUploading && (
              <p className="text-sm text-[#8FDA32] mb-2">Subiendo imagen a Cloudinary...</p>
            )}            <DropZone 
              className="w-[100%] sm:w-[100%] lg:w-[55%] mt-2"
              onFileChange={(file) => handleInputChange('image', file)}
              onUploadStart={handleImageUploadStart}
              onUploadEnd={handleImageUploadEnd}
              reset={resetDropZone}
            />
          </div>          <div className="flex-1 w-full lg:ml-[-200px]">
            <h2 className="text-2xl font-bold mb-4">Contenido</h2>
            <ContentEditor 
              className="w-2/3 mt-2"
              value={formData.content}
              onChange={(value) => handleInputChange('content', value)}
              reset={resetDropZone}
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