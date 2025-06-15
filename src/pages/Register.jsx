import axios from 'axios'
import { motion } from "framer-motion"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import xIcon from '../assets/icons/xIcon.png'
import imagenRegister from '../assets/images/imagenRegister.png'
import GODlogo from '../assets/logos/logoGOD.png'
import googleLogo from '../assets/logos/logoGoogle.png'
import instagramLogo from '../assets/logos/logoInstagram.png'
import AlertMessage from '../components/alertas/AlertMesagge'
import Textwriter from "../components/alertas/ui/textwriter"
import SocialLoginButton from "../components/buttons/SocialMediaButton"
import Cursor from '../components/Cursor'
import InputField from "../components/InputField"
import Loader from '../components/loader'
import {
  auth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  googleProvider,
  linkWithCredential,
  signInWithPopup
} from "../firebaseConfig"

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
        
        try {
          setIsLoading(true);
          setMensaje("");
    
          if (!email || !nombre || !password || !confirmPassword) {
            setMensaje("Por favor, ingresa todos los campos.");
            return;
          }
    
          if (password !== confirmPassword) {
            setMensaje("Las contraseñas no coinciden.");
            return;
          }
    
          // First check if user exists in backend
          try {
            const checkResponse = await axios.post('http://127.0.0.1:5000/auth/check-email', {
              email: email
            });
            
            if (checkResponse.data.exists) {
              setMensaje("El correo ya está registrado");
              return;
            }
          } catch (error) {
            if (error.response && error.response.status !== 404) {
              setMensaje("Error al verificar el correo");
              return;
            }
          }
    
          // Then create user in Firebase
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const firebaseUser = userCredential.user;
          const idToken = await firebaseUser.getIdToken();
    
          // Finally create user in backend
          const datos = {
            correo_usu: email,
            nombre_usu: nombre,
            firebase_uid: firebaseUser.uid,
            token: idToken,
            contrasena_hash_usu: password // Backend will hash this
          };
    
          const response = await axios.post('http://127.0.0.1:5000/auth/register', datos, {
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          });
    
          if (response.data.status === "success") {
            localStorage.setItem("userName", nombre);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("firebaseUID", firebaseUser.uid);
            navigate("/dashboard");
          } else {
            // If backend registration fails, delete Firebase user
            await firebaseUser.delete();
            setMensaje(response.data.message);
          }
    
        } catch (error) {
          console.error("Error in registration:", error);
          setMensaje("Error en el registro: " + (error.response?.data?.message || error.message));
        } finally {
          setIsLoading(false);
        }
      };

      const manejarInicioConGoogle = async () => {
        try {
          setIsLoading(true);
          setMensaje("");
      
          // Check if email exists with password authentication
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          const methods = await fetchSignInMethodsForEmail(auth, user.email);
      
          if (methods.includes('password')) {
            // If email exists with password, link the Google credential
            const credential = GoogleAuthProvider.credential(
              result.credential.accessToken
            );
            await linkWithCredential(auth.currentUser, credential);
          }
      
          const idToken = await user.getIdToken();
      
          const response = await axios.post('http://127.0.0.1:5000/auth/register', {
            token: idToken,
            nombre_usu: user.displayName,
            correo_usu: user.email,
            firebase_uid: user.uid
          });
      
          if (response.data.status === "success") {
            localStorage.setItem("userName", user.displayName);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userPhoto", user.photoURL || "");
            localStorage.setItem("firebaseUID", user.uid);
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Full error:", error);
          setMensaje("Error al registrar: " + (error.response?.data?.message || error.message));
        } finally {
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
              <h1 className="hidden sm:flex  font-semibold text-white text-[22px] ml-3 mb-15 "> game of dreams </h1>
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
            iconClassName="right-[-50px]"
          />
          <InputField 
            type="text" 
            placeholder="Ingresa tu nombre" 
            icon={xIcon} 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]" 
            iconClassName="right-[-50px]"
          />
          <InputField 
            type="text" 
            placeholder="Ingresa tu apellido" 
            icon={xIcon} 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)}
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]" 
            iconClassName="right-[-35px] sm:right-[-50px]"
          />
          <InputField 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]"
            iconClassName="right-[-35px] sm:right-[-50px]"
          />
          <InputField 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]"
            iconClassName="right-[-35px] sm:right-[-50px] "
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
            <SocialLoginButton icon={googleLogo} onClick={manejarInicioConGoogle} />
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
          <h1 className="text-[50px]  font-bold xl:text-[40px] 2xl:text-[50px] xl:translate-y-[-80px] 2xl:translate-y-[-40px]">
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
          <p className="mt-3 text-[20px]  font-bold xl:text-[15px] 2xl:text-[20px]">Si ya tienes una cuenta</p>
          <Link to="/login" className="text-white text-[20px]  font-bold xl:text-[15px] 2xl:text-[20px]">
              Inicia sesión aqui!
          </Link>
          </div>
        </div>
    </div>
  );
};

export default Register;