import axios from 'axios';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from "react";
import { Link } from "react-router-dom";
import imagenRecover from "../../assets/images/imagenRecover2.png"; // Keep your current image
import GODlogo from "../../assets/logos/logoGOD.png";
import Toast from '../../components/alertas/Toast';
import GameButton from "../../components/buttons/GameButton";
import InputField from "../../components/inputs/InputField";
import Loader from '../../components/loader';
import { auth } from '../../firebaseConfig';

// Remove this import
// import AlertMessage from "../components/alertas/AlertMesagge";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({
    title: '',
    message: ''
  });

  const handleShowToast = (title, message) => {
    setToastData({ title, message });
    setShowToast(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      handleShowToast("Error", "Por favor, ingresa tu correo electrónico");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const checkResponse = await axios.post('http://127.0.0.1:5000/auth/request-reset', {
        email: email
      });
  
      if (checkResponse.data.status === 'error') {
        handleShowToast("Error", checkResponse.data.message);
        return;
      }
  
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      handleShowToast("¡Éxito!", "Se ha enviado un enlace para restablecer la contraseña a tu correo");
    } catch (error) {
      console.error("Error al solicitar restablecimiento:", error);
      handleShowToast(
        "Error",
        error.code === 'auth/user-not-found'
          ? "No existe una cuenta con este correo electrónico"
          : "Error al solicitar restablecimiento de contraseña"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#9CE840] cursor-guante">
      <Toast 
        show={showToast}
        setShow={setShowToast}
        title={toastData.title}
        message={toastData.message}
      />
      
      {isLoading && <Loader />}

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
            className="fixed hidden lg:block bottom-0 
              lg:right-[30px] lg:h-[400px]
              xl:right-[30px] xl:h-[450px]
              2xl:right-[35px] 2xl:h-[600px] z-1"
            alt="Character"
          />
          
          <div className="bg-white rounded-sm p-8 w-full max-w-2xl relative z-10 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {!success && (
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-center mb-4">¿Olvidaste tu contraseña?</h1>
                <p className="text-gray-600 text-center">
                  No te preocupes, sucede a los mejores. Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña de forma segura.
                </p>
              </div>
            )}
            
            {success ? (
              <div className="mb-6 text-center p-8">
                <h1 className="text-3xl font-bold text-center mb-4">¡Correo enviado con éxito!</h1>
                <p className="text-gray-600 text-center mb-6">
                  Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                </p>
                <div className="relative h-[30px] ">
                  <div className='absolute top-10 left-1/2 transform -translate-x-1/2'>
                     <Link to="/login">
                    <GameButton 
                      text="Volver al inicio de sesión" 
                      buttonClassName="bg-[#9CE840] hover:bg-[#87C232] text-black min-w-[200px] "
                    />
                  </Link>
                  </div>
                 
                </div>
              </div>
            ) : (
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
                  <GameButton 
                    text={isLoading ? "Enviando..." : "Enviar"} 
                    buttonClassName="bg-[#9CE840] hover:bg-[#87C232] text-black px-16 w-50"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecoverPassword;


