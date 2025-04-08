import { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "/assets/logoGoogle.png";
import instagramLogo from "/assets/logoInstagram.png";
import loginImagen from "/assets/imagenLogin.png";

import GODlogo from "/assets/logoGOD.png";
import SocialLoginButton from "../components/buttons/SocialMediaButton";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cursor from "../components/Cursor";
import CustomTooltip from "../components/alertas/CustomTooltip";
import Textwriter from "../components/alertas/ui/textwriter";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de error o éxito

  const handleLogin = async (event) => {
    event.preventDefault();
  
    // Limpiar errores previos
    setEmailError("");
    setPasswordError("");
    setMensaje("");
  
    // Validar que los campos no estén vacíos
    if (!email.trim()) {
      setEmailError("El campo de correo es obligatorio.");
      return;
    }
  
    if (!password.trim()) {
      setPasswordError("El campo de contraseña es obligatorio.");
      return;
    }
  
    try {
      const datos = { email, password };
      const response = await fetch('http://localhost/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
  
      const result = await response.json();
      console.log("Respuesta del backend:", result); // 👈 Verifica qué devuelve el backend
  
      if (result.status === "success") {
        console.log("Usuario encontrado:", result);
        localStorage.setItem("userName", result.name);
        navigate("/dashboard");
      } else {
        setMensaje(result.message);
  
        if (result.message.includes("Correo no registrado")) {
          setEmailError("El correo no se encuentra registrado.");
          console.log("Error de correo no registrado.");
        } else if (result.message.includes("Correo incorrecto")) {
          setEmailError("Correo incorrecto.");
        }
  
        if (result.message.includes("Contraseña incorrecta")) {
          setPasswordError("Contraseña incorrecta.");
        }
      }
    } catch (error) {
      setMensaje("Error en la conexión: " + error.message);
    }
  };
  


 return (
  <div className="flex min-h-screen w-full bg-[#9CE840] cursor-none flex-grow  ">
    <Cursor/>
    <div className="flex items-end justify-between w-full h-45 absolute ">
      <div className="flex justify-between items-center ml-5 sm:ml-20 mb-15 ">
        <div className="flex items-center gap-0.4  xl:scale-80 2xl:scale-100">
        <Link to={"/"} ><img src={GODlogo} className="h-15 " /></Link>
        <h1 className="hidden sm:flex font-bravecho font-bold text-white text-[22px] ml-3 "> game of dreams </h1>
        </div>
        
        <motion.img 
          src={loginImagen}
          className="hidden sm:hidden lg:hidden xl:block  2xl:block max-[1380px]:hidden absolute w-full max-w-[120px] sm:max-w-[100px] lg:max-w-[410px] left-[48%] transform -translate-x-1/2 mt-[20%] sm:mt-[10%] lg:mt-200  xl:w-[360px] 2xl:w-[410px] xl:translate-y-[-50px] 2xl:translate-y-[50px] "
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }} 
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} 
        />





       
      </div>
    
      { /* 📌 Botones de inicio de sesión y registro */ }
      <div className="mr-5 mb-15 flex gap-2 sm:mr-15 lg:mr-30 xl:scale-80 2xl:scale-100 font-mint ">
            <Link to={"/login"}>
            <motion.button
              className="text-white relative pt-2 hidden sm:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: [0, 1], x: [-30, 0] }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              Iniciar sesión
              <span className="absolute left-1/2 transform -translate-x-1/2 mt-7 w-16 h-[2px] bg-white"></span>
            </motion.button>
          </Link>

          <Link to="/register">
            <motion.button
              className="px-6 py-2 bg-white text-[#87C232] rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: [0, 1], x: [30, 0] }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              Registrarse
             
            </motion.button>
          </Link>
            </div>
    </div>

    {/* 📌 Primera mitad de pantalla */}
    <div className="hidden lg:flex w-1/2 h-full ">
      <div className="mt-50 ml-40">
        <h1 className="lg:text-[40px] xl:text-[42px] 2xl:text-[57px] font-mint font-bold mt-16 xl:mt-[-28px] 2xl:mt-8 ">
        <Textwriter 
          words={["Descubre tu camino, construye tu futuro."]} 
          loop={false} 
          cursor={true} 
        cursorStyle={"|"} 
          typeSpeed={60} 

        />
        </h1>
        <p className="mt-13 text-[20px] font-mint font-bold  ">Si no tienes una cuenta</p>

        <Link to="../register" className="text-white text-[20px]  font-mint font-bold">
          ¡Regístrate aquí!
        </Link>
      </div>
    </div>

    {/* 📌 Segunda mitad de pantalla */}
    <div className="w-full lg:w-1/2 flex justify-center items-center ">
      <div className="2xl:ml-40 xl:translate-x-20 2xl:translate-x-0 xl:scale-80 2xl:scale-100 ">
        {/* 📌 Input de correo */}

        <div className="relative">
        <InputField
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%] p-3 mb-4 bg-[#232324]/70 text-white rounded-md  " 
        />
          {emailError && (

            <div className="absolute -right-8 top-3">
              <CustomTooltip message={emailError} className="text-red-500" />
            </div>

          )}
        </div>
        

        {/* 📌 Input de contraseña */}

        <div className="relative ">
          <div>
            <InputField
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

            {passwordError && (
            <div className="absolute -right-8 top-3">
               <CustomTooltip message={passwordError} className="text-red-500" />
            </div>
          )}
          </div>
        </div>

          <a href="#" className="text-white text-sm float-end font-mint font-semibold">
            ¿Recuperar contraseña?
          </a>

        <button
          onClick={handleLogin}
          className="w-full bg-[#87C232] p-3 mb-10 mt-10 rounded-md text-white shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer font-semibold "
        >
          Iniciar Sesión
        </button>

        <div className="flex items-center gap-8 ">
          <div className="flex-1 border-t border-white opacity-50"></div>
          <span className="text-white font-mint font-semibold">o inicia con</span>
          <div className="flex-1 border-t border-white opacity-50"></div>
        </div>

        <div className="flex justify-between h-15 pt-3 mt-7">
          <SocialLoginButton icon={googleLogo} />
          <SocialLoginButton icon={instagramLogo} />
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
