import React from 'react';
import Sidebar from "../../components/Sidebar";
import BackButton from "../../components/buttons/BackButton"
import NewsInput from "../../components/inputs/NewsInput"
import CategorySelect from "../../components/inputs/CategorySelect"
import TextArea from "../../components/inputs/TextArea"
import DropZone from "../../components/admin/DropZone"





const NewsCreate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar el formulario
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-40 md:mr-10">
        <h2 className="text-4xl font-bold mt-5">Creacion de noticias</h2>
        <BackButton className="mt-4" />
        
        <form onSubmit={handleSubmit} className="mt-4 flex gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Titulo</h2>
            <NewsInput placeholder="Ingresa el titulo" className="w-85" />

            <h2 className="text-2xl font-bold mt-4">Categoria</h2>
            <CategorySelect className="w-85" />

            <h2 className="text-2xl font-bold mt-4">Descripcion</h2>
            <TextArea placeholder="Ingresa la descripción de la noticia" className="w-85" />

            <h2 className="text-2xl font-bold mt-4">Imagen</h2>
            <DropZone className="w-85 mt-2" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold ">Contenido</h2>

          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsCreate;