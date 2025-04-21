import { Routes, Route } from 'react-router-dom'
import Home from './paginas/index' // asegúrate de la ruta correcta

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
