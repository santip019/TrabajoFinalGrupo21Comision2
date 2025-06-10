import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Inicio from './Inicio'
import Login from './Login'
import NuevoProducto from './NuevoProducto'
import Favoritos from './Favoritos'
import AcercaDe from './AcercaDe'

function App() {
  return(
    <Routes>  
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="login" element={<Login />} />
        <Route path="nuevo-producto" element={<NuevoProducto />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="acerca-de" element={<AcercaDe />} />
      </Route>
    </Routes>
  )
}

export default App