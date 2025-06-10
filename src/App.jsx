import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './Layout'
import Inicio from './Inicio'
import Login from './Login'
import NuevoProducto from './NuevoProducto'
import Favoritos from './Favoritos'
import AcercaDe from './AcercaDe'
import EditarProducto from './EditarProducto'
import VerDetalles from './VerDetalles'
import Papelera from './Papelera'

function App() {
  const [productos, setProductos] = useState([]);

const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };
  
const eliminarProducto = (id) => {
  setProductos(productos.map(p =>
    p.id === id ? { ...p, estado: false } : p
  ));
};

const restaurarProducto = (id) => {
  setProductos(productos.map(p =>
    p.id === id ? { ...p, estado: true } : p
  ));
};

  return(
    <Routes>  
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio productos={productos} eliminarProducto={eliminarProducto} restaurarProducto={restaurarProducto} />} />
        <Route path="login" element={<Login />} />
        <Route path="/nuevo-producto" element={<NuevoProducto agregarProducto={agregarProducto} />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="/editar-producto/:id" element={ <EditarProducto productos={productos} setProductos={setProductos} /> } />
        <Route path="/producto/:id" element={<VerDetalles productos={productos} />} />
      </Route>
    </Routes>
  )
}

export default App