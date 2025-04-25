import React from 'react';
import Sidebar from "../../components/Sidebar";
import DropZone from "../../components/admin/DropZone";
import BackButton from "../../components/buttons/BackButton";
import GameButton from "../../components/buttons/GameButton";
import CategorySelect from "../../components/inputs/CategorySelect";
import ContentEditor from "../../components/inputs/ContentEditor";
import NewsInput from "../../components/inputs/NewsInput";
import TextArea from "../../components/inputs/TextArea";





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
        
        <form onSubmit={handleSubmit} className=" flex-col mt-4 flex flex-wrap    lg:flex-row 2xl:flex-row">
          <div className="flex-1 w-full lg:w-1/2">
            <h2 className="text-2xl font-bold">Titulo</h2>
            <NewsInput placeholder="Ingresa el titulo" className="w-[1%] sm:w-[182%] lg:w-[100%]" />

            <h2 className="text-2xl font-bold mt-4">Categoria</h2>
            <CategorySelect className="w-[100%] sm:w-[100%] lg:w-[55%]" />

            <h2 className="text-2xl font-bold mt-4">Descripcion</h2>
            <TextArea placeholder="Ingresa la descripción de la noticia" className="w-[100%] sm:w-[100%] lg:w-[55%]" />

            <h2 className="text-2xl font-bold mt-4">Imagen</h2>
            <DropZone className="w-[100%] sm:w-[100%] lg:w-[55%]  mt-2" />
          </div>

          <div className="flex-1 w-full lg:ml-[-200px] "> {/* Se agrega margen superior en pantallas pequeñas */}
            <h2 className="text-2xl font-bold mb-4 ">Contenido</h2>
            <ContentEditor className="w-2/3 mt-2" />

            <GameButton buttonClassName='mt-30' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsCreate;