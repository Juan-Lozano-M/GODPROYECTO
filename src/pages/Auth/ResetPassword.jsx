import { confirmPasswordReset } from 'firebase/auth';
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import imagenRecover from "../../assets/images/imagenRecover2.png";
import GODlogo from "../../assets/logos/logoGOD.png";
import Toast from '../../components/alertas/Toast';
import GameButton from "../../components/buttons/GameButton";
import InputField from "../../components/inputs/InputField";
import Loader from '../../components/loader';
import { auth } from '../../firebaseConfig';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({
    title: '',
    message: ''
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    if (!oobCode) {
      handleShowToast("Error", "Link inválido o expirado");
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [oobCode, navigate]);

  const handleShowToast = (title, message) => {
    setToastData({ title, message });
    setShowToast(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      handleShowToast("Error", "Por favor, completa todos los campos");
      return;
    }

    if (password.length < 8) {
      handleShowToast("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      handleShowToast("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      setIsLoading(true);
      await confirmPasswordReset(auth, oobCode, password);
      handleShowToast("¡Éxito!", "Contraseña actualizada correctamente");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error("Error resetting password:", error);
      handleShowToast(
        "Error",
        error.code === 'auth/invalid-action-code'
          ? "El link ha expirado o ya fue usado"
          : "Error al restablecer la contraseña"
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-center mb-4">Ingresa tu nueva contraseña</h1>
              <p className="text-gray-600 text-center">
                ¡Estás a un paso de continuar tu camino hacia tus sueños!<br/>
                Por tu seguridad, crea una contraseña fuerte que incluya al menos 8 caracteres, combinando letras, números y símbolos.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="">
              <InputField
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full max-w-full"
                inputClassName="w-full min-w-full bg-[#232324] 2xl:min-w-full"
              />
              <InputField
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full max-w-full"
                inputClassName="w-full min-w-full bg-[#232324] 2xl:min-w-full"
              />
              <div className="flex justify-center">
                <GameButton 
                  text="Enviar" 
                  buttonClassName="bg-[#9CE840] hover:bg-[#87C232] text-black px-16 w-50"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;

