import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/news.json") // Ruta correcta según donde esté el JSON
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error cargando noticias:", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      {news.map((item, index) => (
        <NewsCard key={index} {...item} />
      ))}
    </div>
  );
};

export default NewsList;
