
import iconAnguloAbajo from "../../assets/icons/iconAnguloAbajo.png";
import iconNotification from "../../assets/icons/iconNotification.png";
import iconSearch from "../../assets/icons/iconSearch.png";

const Search = () => {
    return (        <div className="flex ml-auto w-200 sm:h-15 xl:w-180 xl:h-14 2xl:w-200 2xl:h-15">
            <div className="sm:h-full flex flex-1 items-center">
            <img src={iconSearch} className="h-4 sm:h-6 xl:h-5 2xl:h-6 absolute ml-5 xl:ml-4 2xl:ml-5" alt="Icono de búsqueda" />
            <input
                type="text"
                className="w-[83%] sm:w-[77%] xl:w-[76%] 2xl:w-[77%] h-full py-2 pl-13 sm:pl-15 xl:pl-13 2xl:pl-15 pr-10 xl:pr-9 2xl:pr-10 rounded-lg bg-black/7 xl:text-sm 2xl:text-base"
                style={{ fontFamily: "'Mint Sans', sans-serif" }}
                placeholder="Buscar..."
            />
            </div>
            <div className="flex items-center">
            <img src={iconNotification} className="h-4 sm:h-5 xl:h-4 2xl:h-5 mr-3 xl:mr-2 2xl:mr-3" alt="Notificaciones" />
            <div className="h-10 w-10 sm:h-15 sm:w-15 xl:h-13 xl:w-13 2xl:h-15 2xl:w-15 rounded-lg bg-black/7"></div>
            <button>
                <img src={iconAnguloAbajo} className="h-2 sm:h-3 xl:h-2 2xl:h-3 ml-1" alt="Icono de menú" />
            </button>
            </div>
        </div>
    );
  };
  
  export default Search;