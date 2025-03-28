import { useState, useEffect } from "react";
import Card from "../Card";
import noticiasData from "../../data/noticias.json"; // Importa el JSON con noticias

const Info = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    setNoticias(noticiasData); // Cargar los datos del JSON
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 md:px-6">
      {noticias.map((noticia, index) => (
        <Card key={index} {...noticia} />
      ))}
    </div>
  );
};

export default Info;
