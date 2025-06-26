import { motion } from "framer-motion"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import xIcon from '../assets/icons/xIcon.png'
import imagenRegister from '../assets/images/imagenRegister.png'
import GODlogo from '../assets/logos/logoGOD.png'
import googleLogo from '../assets/logos/logoGoogle.png'
import CustomTooltip from '../components/alertas/CustomTooltip'
import Textwriter from "../components/alertas/ui/textwriter"
import SocialLoginButton from "../components/buttons/SocialMediaButton"
import InputField from "../components/inputs/InputField"
import Loader from '../components/loader'
import axiosInstance from '../config/axiosConfig'
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
      const [fieldErrors, setFieldErrors] = useState({
        email: '',
        nombre: '',
        apellido: '',
        password: '',
        confirmPassword: ''
      });
      const manejarEnvio = async (event) => {
        event.preventDefault();
        setFieldErrors({ email: '', nombre: '', apellido: '', password: '', confirmPassword: '' });
        let errors = {};
        // Validación de email en tiempo real ya se hace, pero aquí solo bloquea si está vacío
        if (!email) errors.email = 'El correo es obligatorio.';
        if (!nombre) errors.nombre = 'El nombre es obligatorio.';
        if (!apellido) errors.apellido = 'El apellido es obligatorio.';
        if (!password) errors.password = 'La contraseña es obligatoria.';
        if (!confirmPassword) errors.confirmPassword = 'Confirma tu contraseña.';
        if (password && confirmPassword && password !== confirmPassword) {
          errors.confirmPassword = 'Las contraseñas no coinciden.';
        }
        // No bloquear por formato de email aquí
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setIsLoading(false);
          return;
        }
    
        try {
          setIsLoading(true);
            // First check if user exists in backend
          try {
            const checkResponse = await axiosInstance.post('/auth/check-email', {
              email: email
            }, {
              timeout: 10000 // 10 second timeout
            });
            
            if (checkResponse.data.exists) {
              setFieldErrors(prev => ({ ...prev, email: 'El correo ya está registrado.' }));
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.error("Error checking email:", error);
            if (error.response && error.response.status !== 404) {
              setFieldErrors(prev => ({ ...prev, email: 'Error al verificar el correo. Intenta nuevamente.' }));
              setIsLoading(false);
              return;
            }
            // If it's a 404 or network error, continue with registration
          }
    
          // Then create user in Firebase
          let firebaseUser;
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            firebaseUser = userCredential.user;
          } catch (firebaseError) {
            console.error("Firebase registration error:", firebaseError);
            if (firebaseError.code === 'auth/email-already-in-use') {
              setFieldErrors(prev => ({ ...prev, email: 'El correo ya está registrado en el sistema.' }));
            } else if (firebaseError.code === 'auth/weak-password') {
              setFieldErrors(prev => ({ ...prev, password: 'La contraseña debe tener al menos 6 caracteres.' }));
            } else if (firebaseError.code === 'auth/invalid-email') {
              setFieldErrors(prev => ({ ...prev, email: 'El formato del correo no es válido.' }));
            } else {
              setFieldErrors(prev => ({ ...prev, email: 'Error en el registro: ' + firebaseError.message }));
            }
            setIsLoading(false);
            return;
          }

          // Get Firebase ID token
          const idToken = await firebaseUser.getIdToken();
    
          // Finally create user in backend
          const datos = {
            correo_usu: email,
            nombre_usu: nombre,
            firebase_uid: firebaseUser.uid,
            token: idToken,
            contrasena_hash_usu: password // Backend will hash this
          };          try {
            const response = await axiosInstance.post('/auth/register', datos, {
              headers: {
                'Authorization': `Bearer ${idToken}`,
              },
              timeout: 10000
            });
            
            if (response.data.status === "success") {
              localStorage.setItem("userName", nombre);
              localStorage.setItem("userEmail", email);
              localStorage.setItem("firebaseUID", firebaseUser.uid);
              localStorage.setItem("authToken", idToken); // Guardar el token para autenticación
              navigate("/");
            } else {
              // If backend registration fails, delete Firebase user
              await firebaseUser.delete();
              setFieldErrors(prev => ({ ...prev, email: response.data.message }));
            }
          } catch (backendError) {
            console.error("Backend registration error:", backendError);
            // If backend registration fails, clean up Firebase user
            try {
              await firebaseUser.delete();
            } catch (deleteError) {
              console.error("Error deleting Firebase user:", deleteError);
            }
            setFieldErrors(prev => ({ 
              ...prev, 
              email: 'Error en el servidor: ' + (backendError.response?.data?.message || 'Intenta nuevamente') 
            }));
          }
    
        } catch (error) {
          console.error("Error in registration:", error);
          setFieldErrors(prev => ({ ...prev, email: 'Error inesperado en el registro. Intenta nuevamente.' }));
        } finally {
          setIsLoading(false);
        }
      };      const manejarInicioConGoogle = async () => {
        try {
          setIsLoading(true);
          setFieldErrors({ email: '', nombre: '', apellido: '', password: '', confirmPassword: '' });
      
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
      
          const idToken = await user.getIdToken();          const response = await axiosInstance.post('/auth/register', {
            token: idToken,
            nombre_usu: user.displayName,
            correo_usu: user.email,
            firebase_uid: user.uid
          }, {
            timeout: 10000
          });
          
          if (response.data.status === "success") {
            localStorage.setItem("userName", user.displayName);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userPhoto", user.photoURL || "");
            localStorage.setItem("firebaseUID", user.uid);
            localStorage.setItem("authToken", idToken); // Guardar el token para autenticación
            navigate("/");
          } else {
            setFieldErrors(prev => ({ ...prev, email: response.data.message }));
          }
        } catch (error) {
          console.error("Google registration error:", error);
          let errorMessage = 'Error al registrar con Google';
          
          if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Registro cancelado por el usuario';
          } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Popup bloqueado por el navegador';
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }
          
          setFieldErrors(prev => ({ ...prev, email: errorMessage }));
        } finally {
          setIsLoading(false);        }
      };
    
    // Validación de email en tiempo real
    const validateEmail = (value) => {
      // Expresión regular simple para validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return '';
      if (!emailRegex.test(value)) return 'Correo no válido.';
      return '';
    };

    // Actualización del input de email con validación en tiempo real
    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
      setFieldErrors((prev) => ({
        ...prev,
        email: validateEmail(value)
      }));
    };
  
  return (

    
    <div className="min-h-screen flex bg-[#9CE840] cursor-guante">

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
      <div className=" w-full flex flex-col justify-center items-center mt-30 xl:w-1/2 scale-100 max-[1535px]:!scale-80 min-[1536px]:!scale-80 min-[1550px]:!scale-100\n\n">
        <div>
        <div className="relative flex items-center">
          <InputField 
            type="email" 
            placeholder="Ingresa tu correo" 
            icon={xIcon} 
            value={email} 
            onChange={handleEmailChange} 
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]"
            iconClassName="right-[-50px]"
          />
          {fieldErrors.email && (
<<<<<<< HEAD
            <span className="absolute right-[-40px] top-1 z-10">
=======
            <span className="absolute right-[-40px] top-2 z-10">
>>>>>>> adminFinal
              <CustomTooltip message={fieldErrors.email} />
            </span>
          )}
        </div>
        <div className="relative flex items-center">
          <InputField 
            type="text" 
            placeholder="Ingresa tu nombre" 
            icon={xIcon} 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]" 
            iconClassName="right-[-50px]"
          />
          {fieldErrors.nombre && (
<<<<<<< HEAD
            <span className="absolute right-[-40px] top-1 z-10">
=======
            <span className="absolute right-[-40px] top-2 z-10">
>>>>>>> adminFinal
              <CustomTooltip message={fieldErrors.nombre} />
            </span>
          )}
        </div>
        <div className="relative flex items-center">
          <InputField 
            type="text" 
            placeholder="Ingresa tu apellido" 
            icon={xIcon} 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)}
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]" 
            iconClassName="right-[-35px] sm:right-[-50px]"
          />
          {fieldErrors.apellido && (
<<<<<<< HEAD
            <span className="absolute right-[-40px] top-1 z-10">
=======
            <span className="absolute right-[-40px] top-2 z-10">
>>>>>>> adminFinal
              <CustomTooltip message={fieldErrors.apellido} />
            </span>
          )}
        </div>
        <div className="relative flex items-center">
          <InputField 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]"
            iconClassName="right-[-35px] sm:right-[-50px]"
          />
          {fieldErrors.password && (
<<<<<<< HEAD
            <span className="absolute right-[-40px] top-1 z-10">
=======
            <span className="absolute right-[-40px] top-2 z-10">
>>>>>>> adminFinal
              <CustomTooltip message={fieldErrors.password} />
            </span>
          )}
        </div>
        <div className="relative flex items-center">
          <InputField 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="w-full max-w-[90%] sm:max-w-[80%] max-[1536px]:max-w-[85%]"
            iconClassName="right-[-35px] sm:right-[-50px] "
          />
          {fieldErrors.confirmPassword && (
<<<<<<< HEAD
            <span className="absolute right-[-40px] top-1 z-10">
=======
            <span className="absolute right-[-40px] top-2 z-10">
>>>>>>> adminFinal
              <CustomTooltip message={fieldErrors.confirmPassword} />
            </span>
          )}
        </div>

<button 
          className="w-full bg-[#87C232] p-3 mb-10 mt-3 rounded-md text-white shadow-md hover:shadow-2xl transition-shadow duration-300 font-mint font-semibold"
          onClick={manejarEnvio}
          disabled={isLoading} // Deshabilitar el botón mientras se carga
        >          
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>

          <div className="flex items-center gap-8 mt-3">
            <div className="flex-1 border-t border-white opacity-50"></div>
              <span className="text-black font-mint font-semibold">o</span>
            <div className="flex-1 border-t border-white opacity-50"></div>
          </div>

          <div className="pt-3 mt-7">
            <SocialLoginButton 
              icon={googleLogo} 
              onClick={manejarInicioConGoogle}
              altText="Google"
              text="Continuar con Google"
            />
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