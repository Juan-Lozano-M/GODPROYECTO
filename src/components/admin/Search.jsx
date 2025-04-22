
import iconSearch from "../../assets/icons/iconSearch.png";
import iconNotification from "../../assets/icons/iconNotification.png";
import iconAnguloAbajo from "../../assets/icons/iconAnguloAbajo.png";

const Search = () => {
    return (

        <div className="flex items-center justify-between sm:h-15 mb-4">
            <div className="sm:h-full flex flex-1 items-center">
            <img src={iconSearch} className="h-4 sm:h-6 absolute ml-5" alt="Icono de búsqueda" />
            <input
                type="text"
                className="w-[83%] sm:w-[77%] h-full py-2 pl-13 sm:pl-15 pr-10 rounded-lg bg-black/7"
                style={{ fontFamily: "'Mint Sans', sans-serif" }}
                placeholder="Buscar..."
            />
            </div>
            <div className="flex items-center">
            <img src={iconNotification} className="h-4 sm:h-5 mr-3" alt="Notificaciones" />
            <div className="h-10 w-10 sm:h-15 sm:w-15 rounded-lg bg-black/7"></div>
            <button>
                <img src={iconAnguloAbajo} className="h-2 sm:h-3 ml-1" alt="Icono de menú" />
            </button>
            </div>
        </div>
    );
  };
  
  export default Search;