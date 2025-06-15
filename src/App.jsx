import { Routes, Route } from 'react-router-dom'
import Home from './paginas/index'
import Contacto from './paginas/Contactos'
import ProyectosView from './paginas/proyectosview'
import Test from './componentes/Testimonios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/proyectosview" element={<ProyectosView />} />
      

    </Routes>
  )
}

export default App // <--- SOLO esto al final