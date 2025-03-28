
import googleLogo from '/assets/logoGoogle.png'
import instagramLogo from '/assets/logoInstagram.png'
import xIcon from '/assets/xIcon.png'
import offEye from '/assets/offEye.png'
import GODlogo from '/assets/logoGOD.png'
import imagenRegister from '/assets/imagenRegister.png' 
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import InputField from "../components/InputField";
import SocialLoginButton from "../components/buttons/SocialMediaButton";
import { Link } from "react-router-dom";
import Textwriter from "../components/alertas/ui/textwriter";
import AlertMessage from '../components/alertas/AlertMesagge'
import Cursor from '../components/Cursor'
import Loader from '../components/loader'


const Register = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); // Hook para redireccionar
  // Estado para capturar los valores del formulario
      const [email, setEmail] = useState('');
      const [nombre, setNombre] = useState('');
      const [apellido, setApellido] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [mensaje, setMensaje] = useState('');
    
      const manejarEnvio = async (event) => {
        event.preventDefault();
       
       
        if (!email || !nombre || !password || !confirmPassword) {
            setMensaje("Por favor, ingresa todos los campos.");
            return;
        }
    
        if (password !== confirmPassword) {
            setMensaje("Las contraseñas no coinciden.");
            return;
        }
    
        const datos = {
            email: email,
            nombre: nombre,
            password: password
        };
    
        
    
        try {
          const response = await fetch('http://localhost/backend/conexion.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(datos),
          });
          setIsLoading(true); // Activa el loader antes de la petición
         
          const responseText = await response.text();
          console.log("Respuesta del servidor:", responseText);
      
          let result;
          try {
              result = JSON.parse(responseText);
          } catch (error) {
              throw new Error("Error al convertir respuesta en JSON: " + error.message);
          }
      
          if (result.status === "error" && result.message.includes("Duplicate entry")) {
              setMensaje("El correo ya está registrado. Usa otro correo.");
              setIsLoading(false);
              return;
          }
      
          if (result.status === "success") {
              console.log("Registrado con éxito:", result);
              localStorage.setItem("userName", result.name);
              setTimeout(() => {
                  setIsLoading(false);
                  navigate("/dashboard");
              }, 2000);
          } else {
              setMensaje(result.message);
              setIsLoading(false);
          }
      } catch (error) {
          setMensaje("Hubo un error al enviar los datos: " + error.message);
          setIsLoading(false);
      }
      
        
    };
    
  
  return (

    
    <div className="min-h-screen flex bg-[#9CE840]">
      <Cursor/>
      {isLoading && <Loader />} {/* Renderizar el loader si isLoading es true */}

      { /* 📌 Div de Logo y botones de inicio de sesión y registro */ }
      <div className="flex items-end justify-between w-full h-45 absolute">
            <div className="flex justify-between items-center ml-5 sm:ml-20 xl:scale-80  2xl:scale-100">
              <Link to={"/"}> <img src={GODlogo} className='h-15 mb-15'/></Link>
              <h1 className="hidden sm:flex font-['ADLaM_Display'] font-semibold text-white text-[17px] ml-3 mb-15 "> GAME OF DREAMS </h1>
            </div>
          
            { /* 📌 Botones de inicio de sesión y registro */ }
            <div className="mr-5 mb-15 flex gap-2 sm:mr-15 lg:mr-30 xl:scale-80 2xl:scale-100">
            <Link to={"/login"}>
            <motion.button
              className="px-6 py-2 bg-white text-[#87C232] rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: [0, 1], x: [-30, 0] }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              Iniciar sesión
            </motion.button>
          </Link>

          <Link to="../register">
            <motion.button
              className="text-white relative pt-2 hidden sm:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: [0, 1], x: [30, 0] }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              Registrarse
              <span className="absolute left-1/2 transform -translate-x-1/2 mt-7 w-16 h-[2px] bg-white"></span>
            </motion.button>
          </Link>
            </div>
          </div>
          
        { /* 📌 Div inputs */ }
      <div className=" w-full flex flex-col justify-center items-center mt-30 xl:w-1/2 scale-100 max-[1535px]:!scale-80 min-[1536px]:!scale-80 min-[1550px]:!scale-100

">
        <div>
        <InputField 
            type="email" 
            placeholder="Ingresa tu correo" 
            icon={xIcon} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]"
          />
          <InputField 
            type="text" 
            placeholder="Ingresa tu nombre" 
            icon={xIcon} 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]" 
          />
          <InputField 
            type="text" 
            placeholder="Ingresa tu apellido" 
            icon={xIcon} 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)}
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]" 
          />
          <InputField 
            type="password" 
            placeholder="••••••••" 
            icon={offEye} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]"
          />
          <InputField 
            type="password" 
            placeholder="••••••••" 
            icon={offEye} 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]"
          />

<button 
          className="w-full bg-[#87C232] p-3 mb-10 mt-3 rounded-md text-white shadow-md hover:shadow-2xl transition-shadow duration-300 font-mint font-semibold"
          onClick={manejarEnvio}
          disabled={isLoading} // Deshabilitar el botón mientras se carga
        >          
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>

            {mensaje && <AlertMessage message={mensaje}  />} 


          <div className="flex items-center gap-8 mt-3">
            <div className="flex-1 border-t border-white opacity-50"></div>
              <span className="text-black font-mint font-semibold">o registrate con</span>
            <div className="flex-1 border-t border-white opacity-50"></div>
          </div>

          <div className="flex justify-between h-15 pt-3 mt-7">
            <SocialLoginButton icon={googleLogo} />
            <SocialLoginButton icon={instagramLogo} />
          </div>
        </div>
      </div>

      { /* 📌 Div mensaje y imagen*/ }
        <div className="hidden xl:flex flex-col w-1/2 mt-63 mr-40">
        <motion.img
          src={imagenRegister}
          className="hidden xl:block absolute h-120 mt-28  lg:hidden xl:h-100 2xl:h-120 xl:translate-y-[-100px] 2xl:translate-y-[-40px] "
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }} 
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} 
        />
          <h1 className="text-[50px] font-mint font-bold xl:text-[40px] 2xl:text-[50px] xl:translate-y-[-80px] 2xl:translate-y-[-40px]">
          <Textwriter 
          words={["Regístrate hoy y da el primer \n paso hacia el futuro."]} 
          loop={false} 
          cursor={true} 
          cursorStyle={"|"} 
          typeSpeed={60} 
          className="mb-50"

        />
          </h1>
          <div className="relative xl:translate-y-[-80px] 2xl:translate-y-[-40px] "> 
          <p className="mt-3 text-[20px] font-mint font-bold xl:text-[15px] 2xl:text-[20px]">Si ya tienes una cuenta</p>
          <Link to="/login" className="text-white text-[20px] font-mint font-bold xl:text-[15px] 2xl:text-[20px]">
              Inicia sesión aqui!
          </Link>
          </div>
        </div>
    </div>
  );
};

export default Register;