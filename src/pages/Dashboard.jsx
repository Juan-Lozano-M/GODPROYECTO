import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#9CE840]">
      {/* Navbar */}
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
              <button
                onClick={handleLogout}
                className="bg-white text-[#87C232] border-2 border-[#87C232] px-4 py-2 rounded-full hover:bg-[#87C232] hover:text-white transition-colors duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 col-span-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Bienvenido, {userName}
            </h2>
            <p className="text-gray-600">
              Este es tu panel de control personal. Aquí podrás gestionar tu información y actividades.
            </p>
          </div>



        </div>
      </div>
    </div>
  );
};

export default Dashboard;
