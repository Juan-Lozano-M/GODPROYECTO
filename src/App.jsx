import { Link } from 'react-router-dom';
import './App.css';
import Cursor from './components/Cursor'; // Importa el componente Cursor

function App() {
  return (
    <div className="min-h-screen bg-[#9CE840] flex flex-col items-center justify-center gap-6 cursor-none">
      {/* Cursor animado */}
      <Cursor />

      <h1 className="text-4xl font-bold text-white mb-8">Bienvenido a GOD</h1>
      
      <Link to="/login">
        <button className="w-64 py-3 bg-white text-[#87C232] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ">
          Iniciar Sesión
        </button>
      </Link>




      <Link to="/noticiasv">
        <button className="w-64 py-3 bg-[#87C232] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          Noticias
        </button>
      </Link>
    </div>
  );
}

export default App;