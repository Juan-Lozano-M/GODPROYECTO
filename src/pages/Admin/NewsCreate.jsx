import React from 'react';
import Sidebar from "../../components/Sidebar";
import BackButton from "../../components/buttons/BackButton"
import NewsInput from "../../components/inputs/NewsInput"

const NewsCreate = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-40 md:mr-10">
        <h2 className="text-4xl font-bold mt-5">Creacion de noticias</h2>
        {/* Content will go here */}
        <BackButton className="mt-4" />

        <h2 className="text-2xl font-bold mt-5" >Titulo</h2>
        <NewsInput placeholder="Ingresa el titulo" />

    
      </div>
    </div>
  );
};

export default NewsCreate;