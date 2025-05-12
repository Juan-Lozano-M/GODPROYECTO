import React, { useState } from "react";
import { Link } from "react-router-dom";
import GODlogo from "../assets/logos/logoGOD.png";
import imagenRecover from "../assets/images/imagenRecover2.png"; // Import the recover image
import { motion } from "framer-motion"; // Import motion for animation
import axios from "axios";
import Cursor from "../components/Cursor";
import InputField from "../components/InputField";
import AlertMessage from "../components/alertas/AlertMesagge";


const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMensaje("");

    if (!email) {
      setMensaje("Por favor, ingresa tu correo electrónico.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/auth/recover-password",
        {
          correo_usu: email,
        }
      );

      setMensaje("Se ha enviado un enlace de recuperación a tu correo.");
    } catch (error) {
      setMensaje(
        error.response?.data?.message ||
          "Error al enviar el correo de recuperación."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="flex min-h-screen w-full bg-[#9CE840] cursor-none">
      
      <Cursor />

      {/* Header with logo and navigation */}
      <div className="flex items-end justify-between w-full h-45 absolute">
        <div className="flex justify-between items-center ml-5 sm:ml-20 mb-15">
          <div className="flex items-center gap-0.4 xl:scale-80 2xl:scale-100">
            <Link to={"/"}>
              <img src={GODlogo} className="h-15" alt="Game of Dreams Logo" />
            </Link>
            <h1 className="hidden sm:flex font-mint font-semibold text-white text-[22px] ml-3">
              game of dreams  
            </h1>
          </div>
        </div>
      </div>

      {/* Main content - Centered in the middle of the screen */}
      <main className="container mx-auto flex-1 flex items-center justify-center p-4 mt-10">
        <div className="relative w-full max-w-4xl flex justify-center">
          {/* Character image */}
          <img
            src={imagenRecover}
            className="absolute hidden lg:block 
              lg:right-[-300px] lg:bottom-[-150px] lg:h-[400px]
              xl:right-[-350px] xl:bottom-[-160px] xl:h-[450px]
              2xl:right-[-400px] 2xl:bottom-[-175px] 2xl:h-[500px] z-1"
            alt="Character"
          />
          
          <div className="bg-[#F0FFDD] rounded-md p-8 w-full max-w-2xl relative z-10 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-center mb-4">¿Olvidaste tu contraseña?</h1>
              <p className="text-gray-600 text-center">
                No te preocupes, sucede a los mejores. Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña de forma segura.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-full"
                inputClassName="w-full min-w-full bg-[#232324] 2xl:min-w-full"
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#9CE840] hover:bg-[#87C232] text-black font-medium px-12 py-2 rounded-md border border-black"
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
            {mensaje && <AlertMessage message={mensaje} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecoverPassword;


