import { useState } from "react";
import iconAnguloAbajo from "../../assets/icons/iconAnguloAbajo.png";

const AdminProfile = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <div className="relative w-auto">
      <div className="flex items-center cursor-pointer" onClick={handleToggle}>
        {/* Avatar simulado - puedes reemplazarlo por una imagen real si quieres */}
        <div className="h-10 w-10 sm:h-15 sm:w-15 rounded-lg bg-black/10"></div>
        
        <img
          src={iconAnguloAbajo}
          className="h-2 sm:h-3 ml-2"
          alt="Icono de menú"
        />
      </div>

      {open && (
        <div className="absolute top-12 right-0 bg-white shadow-md p-2 rounded w-40 z-10 border border-gray-200">
          <p className="text-sm hover:bg-gray-100 px-3 py-2 cursor-pointer rounded">
            Mi perfil
          </p>
          <p className="text-sm hover:bg-gray-100 px-3 py-2 cursor-pointer rounded">
            Cerrar sesión
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;