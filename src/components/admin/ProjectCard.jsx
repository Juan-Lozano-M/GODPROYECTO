import { Link } from "react-router-dom";

function ProjectCard({
  image,
  title,
  manager,
  startDate,
  endDate,
  description,
  progress = 0,
  status,
  isSelected,
  onSelect,
  slug,
  projectId,
}) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "activo":
        return "bg-[#9CE840] text-black";
      case "completado":
        return "bg-[#4285F4] text-white";
      case "pausado":
        return "bg-[#FFBE00] text-black";
      case "cancelado":
        return "bg-[#EA4335] text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-2 ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-transparent"
      }`}
      onClick={onSelect}
    >
      {/* Imagen del proyecto */}
      <div className="w-full sm:w-48 lg:w-56 xl:w-64 h-40 sm:h-32 lg:h-36 xl:h-40 flex-shrink-0">
        <img
          src={image || "/placeholder-project.jpg"}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "/placeholder-project.jpg";
          }}
        />
      </div>

      {/* Contenido del proyecto */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          {/* Título y estado */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-adlam">
              {title}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          </div>

          {/* Información del gerente y fechas */}
          <div className="text-sm sm:text-base text-gray-600 mb-3 font-quicksand">
            <p className="mb-1">
              <span className="font-semibold">Gerente:</span> {manager}
            </p>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <p>
                <span className="font-semibold">Inicio:</span> {startDate}
              </p>
              {endDate && (
                <p>
                  <span className="font-semibold">Fin:</span> {endDate}
                </p>
              )}
            </div>
          </div>

          {/* Descripción */}
          <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-2 font-quicksand">
            {description}
          </p>

          {/* Barra de progreso */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progreso</span>
              <span className="text-sm font-medium text-gray-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                  progress
                )}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Botón de ver proyecto */}
        <div className="flex justify-end">
          <Link
            to={`/home/project/${slug || projectId}`}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            Ver proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;