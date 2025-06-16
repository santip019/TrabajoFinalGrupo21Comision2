import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './assets/compenents/Layout'
import Inicio from './assets/compenents/Inicio'
import Login from './assets/compenents/Login'
import NuevoProducto from './assets/compenents/NuevoProducto'
import Favoritos from './assets/compenents/Favoritos'
import AcercaDe from './assets/compenents/AcercaDe'
import EditarProducto from './assets/compenents/EditarProducto'
import VerDetalles from './assets/compenents/VerDetalles'
import Papelera from './assets/compenents/Papelera'

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
        <Route path="favoritos" element={<Favoritos productos={productos} />} />
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="/editar-producto/:id" element={ <EditarProducto productos={productos} setProductos={setProductos} /> } />
        <Route path="/producto/:id" element={<VerDetalles productos={productos} />} />
      </Route>
    </Routes>
  )
}

export default App