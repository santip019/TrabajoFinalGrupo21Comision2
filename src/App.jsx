import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from './assets/compenents/Layout';
import Inicio from './assets/compenents/Inicio';
import Login from './assets/compenents/Login';
import NuevoProducto from './assets/compenents/NuevoProducto';
import Favoritos from './assets/compenents/Favoritos';
import AcercaDe from './assets/compenents/AcercaDe';
import EditarProducto from './assets/compenents/EditarProducto';
import VerDetalles from './assets/compenents/VerDetalles';
import Papelera from './assets/compenents/Papelera';
import AdminRoute from "./routes/AdminRoute"; // 🔐 Nueva protección

function App() {
  const [productos, setProductos] = useState([]);

  // 🧱 Funciones principales
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

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Inicio
              productos={productos}
              eliminarProducto={eliminarProducto}
              restaurarProducto={restaurarProducto}
            />
          }
        />
        <Route path="login" element={<Login />} />

        {/* 🔐 Ruta protegida para admin */}
        <Route
          path="/nuevo-producto"
          element={
            <AdminRoute>
              <NuevoProducto agregarProducto={agregarProducto} />
            </AdminRoute>
          }
        />
        <Route
          path="/editar-producto/:id"
          element={
            <AdminRoute>
              <EditarProducto productos={productos} setProductos={setProductos} />
            </AdminRoute>
          }
        />

        {/* Rutas públicas */}
        <Route
          path="favoritos"
          element={<Favoritos productos={productos} />}
        />
        <Route
          path="acerca-de"
          element={<AcercaDe />}
        />
        <Route
          path="/producto/:id"
          element={<VerDetalles productos={productos} />}
        />
        <Route
          path="/papelera"
          element={<Papelera productos={productos} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
