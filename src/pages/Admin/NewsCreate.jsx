import React from 'react';
import Sidebar from "../../components/Sidebar";
import BackButton from "../../components/buttons/BackButton"
import NewsInput from "../../components/inputs/NewsInput"
import CategorySelect from "../../components/inputs/CategorySelect"
import TextArea from "../../components/inputs/TextArea"

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
        
        <form onSubmit={handleSubmit} className="mt-8">
          <h2 className="text-2xl font-bold mt-5">Titulo</h2>
          <NewsInput placeholder="Ingresa el titulo" className="w-85" />

          <h2 className="text-2xl font-bold mt-5">Categoria</h2>
          <CategorySelect className="w-85" />

          <h2 className="text-2xl font-bold mt-5">Descripcion</h2>
          <TextArea placeholder="Ingresa la descripción de la noticia" className="w-85" />
        </form>
      </div>
    </div>
  );
};

export default NewsCreate;