import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function LoginMain() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
}

function NavBar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  return (
    <div className="flex space-x-4 p-4">
      
      <Link
        to="/"
        onClick={() => setActiveTab("/login")}
        className={`px-4 py-2 transition-all ${
          activeTab === "/login" ? "border-b-2 border-white" : "opacity-70"
        }`}
      >
        Iniciar sesión
      </Link>

      <Link
        to="/register"
        onClick={() => setActiveTab("/register")}
        className={`px-4 py-2 transition-all ${
          activeTab === "/register" ? "border-b-2 border-white" : "opacity-70"
        }`}
      >
        Registrarse
      </Link>
    </div>
  );
}

export default LoginMain;
