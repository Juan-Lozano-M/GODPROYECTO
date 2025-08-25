const Card = ({ title, description, category, image }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            {category}
          </span>
          <h3 className="text-lg font-bold mt-2">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
          <a href="#" className="text-green-600 font-semibold mt-4 inline-block">
            Explorar Carrera
          </a>
        </div>
      </div>
    );
  };
  
  export default Card;
  