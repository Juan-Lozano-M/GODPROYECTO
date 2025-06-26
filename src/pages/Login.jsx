import { sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImagen from "../assets/images/imagenLogin.png";
import GODlogo from "../assets/logos/logoGOD.png";
import googleLogo from "../assets/logos/logoGoogle.png";
import CustomTooltip from "../components/alertas/CustomTooltip";
import Textwriter from "../components/alertas/ui/textwriter";
import SocialLoginButton from "../components/buttons/SocialMediaButton";
import InputField from "../components/inputs/InputField";
import axiosInstance from "../config/axiosConfig"; // Asegúrate de que este archivo esté configurado correctamente
import {
  auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "../firebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mensaje, setMensaje] = useState(""); 
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    setMensaje("");

    if (!email.trim()) {
      setEmailError("El campo de correo es obligatorio.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("El campo de contraseña es obligatorio.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const firebaseUser = userCredential.user;
      const idToken = await firebaseUser.getIdToken();

      const response = await axiosInstance.post('/auth/login', {
        correo_usu: email.trim().toLowerCase(),
        token: idToken  
      });

      if (response.data.status === "success") {
        localStorage.setItem("userName", response.data.user.nombre);
        localStorage.setItem("userEmail", response.data.user.correo);
        localStorage.setItem("firebaseUID", firebaseUser.uid);
        localStorage.setItem("userRole", response.data.user.role); // Store the role

        localStorage.setItem("profileImage", response.data.user.profile_image || "");
        localStorage.setItem("userPhoto", response.data.user.profile_image || "");

        const event = new CustomEvent('profileImageUpdated', {
          detail: { imageUrl: response.data.user.profile_image }
        });
        window.dispatchEvent(event);
          if (response.data.user.role === "Admin") {
            navigate("/home");
          } else {
            navigate("/");
          }

        localStorage.setItem("authToken", idToken);

        // Check the user's role from the database response
        console.log("User role:", response.data.user.role); // Debug log
        if (response.data.user.role === "Admin") {
          console.log("Redirecting to /home"); // Debug log
          navigate("/home");
        } else {
          console.log("Redirecting to /dashboard"); // Debug log
          navigate("/");
        } 
      }
    } catch (error) {
      console.error("Detailed error:", error);
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          setPasswordError("Contraseña incorrecta.");
          break;
        case 'auth/user-not-found':
          setEmailError("No existe una cuenta con este correo.");
          break;
        case 'auth/invalid-email':
          setEmailError("Formato de correo inválido");
          break;
        case 'auth/too-many-requests':
          setMensaje("Demasiados intentos fallidos. Por favor, intente más tarde.");
          break;
        default:
          setMensaje("Error en el inicio de sesión. Por favor, verifique sus credenciales.");
      }
    }
  };  const handleGoogleLogin = async () => {
    try {
      // 1. Limpiar completamente cualquier sesión anterior
      await auth.signOut();
      
      // 2. Limpiar localStorage para eliminar cualquier token almacenado
      localStorage.clear();
        // 3. Crear un nuevo provider con configuraciones específicas
      const freshGoogleProvider = new GoogleAuthProvider();
      freshGoogleProvider.setCustomParameters({
        prompt: 'select_account',
        access_type: 'offline',
        include_granted_scopes: 'true'
      });
      
      // 4. Agregar scopes específicos para forzar re-autenticación
      freshGoogleProvider.addScope('email');
      freshGoogleProvider.addScope('profile');
      
      // 5. Esperar un momento para que se complete el logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = await signInWithPopup(auth, freshGoogleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await axiosInstance.post('/auth/login', {
        correo_usu: user.email,
        token: idToken
      });      if (response.data.status === "success") {
        localStorage.setItem("userName", user.displayName);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("firebaseUID", user.uid);
        localStorage.setItem("userRole", response.data.user.role);
        localStorage.setItem("authToken", idToken);
        // Guardar la foto personalizada si existe, si no la de Google
        localStorage.setItem("profileImage", response.data.user.profile_image || user.photoURL || "");
        localStorage.setItem("userPhoto", response.data.user.profile_image || user.photoURL || "");
        // Lanzar evento para actualizar Navbar
        const event = new CustomEvent('profileImageUpdated', {
          detail: { imageUrl: response.data.user.profile_image || user.photoURL || "" }
        });
        window.dispatchEvent(event);
        // Check the user's role from the database response
        console.log("Google user role:", response.data.user.role); // Debug log
        if (response.data.user.role === "Admin") {
          console.log("Redirecting to /home"); // Debug log
          navigate("/home");
        } else {
          console.log("Redirecting to /dashboard"); // Debug log
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      
      // Si el usuario cancela el login, no mostrar error
      if (error.code === 'auth/popup-closed-by-user' || 
          error.code === 'auth/cancelled-popup-request') {
        return;
      }
      
      setMensaje("Error al iniciar sesión con Google. Por favor, intente nuevamente.");
    }
  };

  // Add this new function to handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setMensaje("Por favor, ingresa tu correo electrónico");
      return;
    }
    
    try {
      // Use Firebase client SDK to send reset email directly
      await sendPasswordResetEmail(auth, resetEmail, {
        url: 'http://localhost:5173/login/recoverpassword',
        handleCodeInApp: true
      });
      
      setResetEmailSent(true);
      setMensaje("Se ha enviado un enlace para restablecer la contraseña a tu correo");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setMensaje(`Error al enviar correo: ${error.message}`);
    }
  };

  return (
  <div className="flex min-h-screen w-full bg-[#9CE840] cursor-none flex-grow cursor-guante  ">
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
      <div className="mr-5 mb-15 flex gap-2 sm:mr-15 lg:mr-30 xl:scale-80 2xl:scale-100 font-adlam ">
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
        <h1 className="lg:text-[40px] xl:text-[42px] 2xl:text-[57px]  font-bold mt-16 xl:mt-[-28px] 2xl:mt-8 ">
        <Textwriter 
          words={["Descubre tu camino, construye tu futuro."]} 
          loop={false} 
          cursor={true} 
          cursorStyle={"|"} 
          typeSpeed={60} 

        />
        </h1>
        <p className="mt-13 text-[20px]  font-bold  ">Si no tienes una cuenta</p>

        <Link to="../register" className="text-white text-[20px]   font-bold">
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
          autoComplete="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" " 
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

          <a href="#" className="text-white text-sm float-end font-semibold">
           
          </a>
          <Link to="/login/recoverpassword" className="text-white text-lg float-end font-semibold">
          ¿Recuperar contraseña?
          </Link>

        <button
          onClick={handleLogin}
          className="w-full bg-[#87C232] p-3 mb-10 mt-10 rounded-md text-white shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer font-semibold "
        >
          Iniciar Sesión
        </button>

        <div className="flex items-center gap-8 ">
          <div className="flex-1 border-t border-white opacity-50"></div>
          <span className="text-white font-semibold">o</span>
          <div className="flex-1 border-t border-white opacity-50"></div>
        </div>

          <div className="pt-3 mt-7">
            <SocialLoginButton 
              icon={googleLogo} 
              onClick={handleGoogleLogin}
              altText="Google"
              text="Continuar con Google"
            />
          </div>
      </div>
    </div>
  </div>
);
};

export default Login;