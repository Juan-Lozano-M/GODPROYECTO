import { motion, useAnimation } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const SlidingButton = () => {
  const controls = useAnimation();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login"; // Saber en qué página estamos

  const handleClick = async () => {
    await controls.start({
      x: isLogin ? 100 : -100, // Se desliza a la derecha o izquierda
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    });

    navigate(isLogin ? "/register" : "/login"); // Redirige después de la animación
  };

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      initial={{ x: 0, opacity: 1 }}
      className="px-6 py-2 bg-white text-[#87C232] rounded-full shadow-lg relative overflow-hidden"
    >
      {isLogin ? "Iniciar sesión" : "Registrarse"}
    </motion.button>
  );
};

export default SlidingButton;
