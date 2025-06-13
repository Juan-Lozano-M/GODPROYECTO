import { Routes, Route } from 'react-router-dom'
import Home from './paginas/index'
import Contacto from './paginas/Contactos'
import ProyectosView from './paginas/proyectosview'

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