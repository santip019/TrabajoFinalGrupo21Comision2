import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Inicio from './Inicio'
import Login from './Login'
import NuevoProducto from './NuevoProducto'
import Favoritos from './Favoritos'
import AcercaDe from './AcercaDe'
import { useState } from 'react'
import EditarProducto from './EditarProducto'
import VerDetalles from './VerDetalles'

function App() {
  const [productos, setProductos] = useState([]);

  return(
    <Routes>  
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio productos={productos}/>} />
        <Route path="login" element={<Login />} />
        <Route path="nuevo-producto" element={<NuevoProducto />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="/editar-producto/:id" element={ <EditarProducto productos={productos} setProductos={setProductos} /> } />
        <Route path="/producto/:id" element={<VerDetalles productos={productos} />} />
      </Route>
    </Routes>
  )
}

export default App