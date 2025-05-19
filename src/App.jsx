import { Routes, Route } from 'react-router-dom'
import Home from './paginas/index' // asegúrate de la ruta correcta
import Contacto from './paginas/Contactos' // asegúrate de la ruta correcta

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  )
}

export default App
