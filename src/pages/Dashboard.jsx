import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenDashboard from "../assets/images/imagenDashboard.png";
import Checkboxmore from "../components/checkbox/Checkboxmore";
import { Link } from "react-router-dom";
import LogoutButton from "../components/buttons/LogoutButton";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestError, setInterestError] = useState("");
  const navigate = useNavigate();
  const [isEditingProfileInterests, setIsEditingProfileInterests] = useState(false);

  const [showAllInterests, setShowAllInterests] = useState(false);

  const interests = [
    "Investigación",
    "Deporte",
    "Música",
    "Arte",
    "Tecnología",
    "Medio Ambiente",
    "Lectura",
    "Fotografía",
    "Viajes",
    "Cocina"
  ];

  const sortInterests = (interestsList) => {
    return [...interestsList].sort((a, b) => {
      const aSelected = selectedInterests.includes(a);
      const bSelected = selectedInterests.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return interests.indexOf(a) - interests.indexOf(b);
    });
  };

  const visibleInterests = showAllInterests 
    ? interests 
    : sortInterests(interests).slice(0, 7);
  const sortedInterests = visibleInterests;
  const handleEditProfileInterests = () => {
    if (isEditingProfileInterests) {
      localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
    }
    setIsEditingProfileInterests(!isEditingProfileInterests);
  };
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedInterests = JSON.parse(localStorage.getItem("userInterests") || "[]");
    
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail); // Make sure this is working
    if (storedInterests.length > 0) setSelectedInterests(storedInterests);
  }, []);

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
    setInterestError("");
  };

  const handleSaveInterests = () => {
    if (selectedInterests.length < 2) {
      setInterestError("Por favor selecciona al menos 2 intereses");
      return;
    }
    localStorage.setItem("userInterests", JSON.stringify(selectedInterests));
    setInterestError("¡Intereses guardados exitosamente!");
    sortInterests(interests);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#87C232]">GOD Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#87C232] text-white rounded-full flex items-center justify-center text-xl font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="ml-3 font-medium text-gray-700">{userName}</span>
              </div>
              <div onClick={handleLogout}>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black rounded-lg shadow-lg p-6 mb-6 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="z-10">
              <h2 className="text-3xl font-semibold text-[#9CE840] mb-5">
                Bienvenido {userName}
              </h2>
              <p className="text-gray-300 text-sm max-w-md">
                Estudiante de último año con pasión por el medio ambiente y ganas de cambiar el mundo. ¡Futuro defensor del planeta!
              </p>
              <div className="flex gap-4 mt-4">

                <Link to="/" >
                <button className="bg-[#9CE840] text-black px-4 py-2 rounded-md">
                  ¡Descubre tu camino!
                </button>
                </Link>
              </div>
            </div>
            <div className="absolute right-10 top-[-55px] h-full w-1/3 hidden max-[810px]:hidden min-[810px]:block">
              <img
                src={ImagenDashboard}
                alt="Profile"
                className="h-80 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 lg:w-1/4">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-[#87C232] rounded-full flex items-center justify-center text-6xl text-white mb-4">
                {userName.charAt(0).toUpperCase()}
              </div>
              <p className="text-xl font-semibold mb-2">{userName}</p>

              <p className="text-gray-500 text-sm mb-4">{userEmail}</p>
              
              <div className="flex gap-2 mb-4">
                {selectedInterests.slice(0, 2).map((interest) => (
                  <span 
                    key={interest}
                    className="bg-[#9CE840] text-black px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>

              <div className="flex justify-start w-full gap-2 text-sm text-gray-500 mb-2">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>04/09/2006</span>
                </div>
              </div>
              <div className="flex justify-start w-full gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>

                  <span>Instituto de bolivar</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold bg-[#9CE840] text-black p-3 rounded-t-lg -m-6 mb-6">
                Información Personal
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 mb-2">Nombre:</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={userName}
                      className="bg-gray-100 p-2 rounded-md flex-grow"
                      disabled
                    />
                    <button className="ml-2 bg-[#9CE840] p-2 rounded-[10px]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Correo:</label>
                  <div className="flex items-center">

                    <input
                        type="email"
                        value={userEmail}
                        className="bg-gray-100 p-2 rounded-md flex-grow"
                        disabled
                    />
                    <button className="ml-2 bg-[#9CE840] p-2 rounded-[10px]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Contraseña:</label>
                  <div className="flex items-center">
                    <input
                      type="password"
                      value="••••••"
                      className="bg-gray-100 p-2 rounded-md flex-grow"
                      disabled
                    />
                    <button className="ml-2 bg-[#9CE840] p-2 rounded-[10px]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-2">Fecha nacimiento:</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="bg-gray-100 p-2 rounded-md flex-grow"
                      disabled
                    />
                    <button className="ml-2 bg-[#9CE840] p-2 rounded-[10px]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-gray-600 mb-2">Institución:</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="bg-gray-100 p-2 rounded-md flex-grow"
                      disabled
                    />
                    <button className="ml-2 bg-[#9CE840] p-2 rounded-[10px]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold bg-[#9CE840] text-black p-3 rounded-t-lg -m-6 mb-6">
                Lo que te apasiona
              </h2>
              <div className="mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className={`flex flex-wrap gap-3 transition-all duration-300 ease-in-out p-1 ${
                      showAllInterests 
                        ? 'max-h-[800px] opacity-100 scale-100' 
                        : 'max-h-[45px] opacity-90 scale-95'
                    } transform origin-top overflow-hidden`}>
                      {sortedInterests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => isEditingProfileInterests && handleInterestToggle(interest)}
                          className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                            selectedInterests.includes(interest)
                              ? "bg-[#9CE840] text-black font-medium"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          } ${!isEditingProfileInterests && "cursor-default"}`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 pt-2">
                    <Checkboxmore 
                      checked={showAllInterests}
                      onChange={() => setShowAllInterests(!showAllInterests)}
                      className={`scale-75 transform transition-all duration-300 ${
                        showAllInterests ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </div>
                </div>
                {interestError && (
                  <p className={`text-sm mt-2 ${
                    interestError.includes("exitosamente") 
                      ? "text-green-500" 
                      : "text-red-500"
                  }`}>
                    {interestError}
                  </p>
                )}
                <div className={`transition-all duration-300 ease-in-out ${
                  showAllInterests 
                    ? 'h-[60px] opacity-100 mt-4' 
                    : 'h-0 opacity-0 mt-0'
                } overflow-hidden`}>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditingProfileInterests(!isEditingProfileInterests)}
                      className={`${
                        isEditingProfileInterests 
                          ? "bg-gray-500" 
                          : "bg-[#87C232]"
                      } text-white px-6 py-2 rounded-md hover:opacity-90`}
                    >
                      {isEditingProfileInterests ? "Cancelar" : "Editar"}
                    </button>
                    {isEditingProfileInterests && (
                      <button
                        onClick={handleSaveInterests}
                        className="bg-[#87C232] text-white px-6 py-2 rounded-md hover:bg-[#9CE840]"
                      >
                        Guardar intereses
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
