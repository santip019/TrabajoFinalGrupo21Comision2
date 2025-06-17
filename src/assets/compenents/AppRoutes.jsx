import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from './Layout';
import Inicio from './Inicio';
import Login from './Login';
import NuevoProducto from './NuevoProducto';
import Favoritos from './Favoritos';
import AcercaDe from './AcercaDe';
import EditarProducto from './EditarProducto';
import VerDetalles from './VerDetalles';
import Papelera from './Papelera';
import AdminRoute from "../../routes/AdminRoute";
import RutaAutenticada from "./RutaAutenticada";

function AppRoutes() {
  const [productos, setProductos] = useState([]);

  // Funciones principales
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
      {/* Login como pantalla inicial */}
      <Route path="/" element={<Login />} />

      {/* Todo lo privado bajo Layout */}
      <Route path="/Layout" element={
        <RutaAutenticada>
          <Layout />
        </RutaAutenticada>
      }>
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
        <Route
          path="favoritos"
          element={<Favoritos productos={productos} />}
        />
        <Route
          path="acerca-de"
          element={<AcercaDe />}
        />
        <Route
          path="papelera"
          element={<Papelera productos={productos} />}
        />
        <Route
          path="producto/:id"
          element={<VerDetalles productos={productos} />}
        />
        {/* Rutas solo para admin */}
        <Route
          path="nuevo-producto"
          element={
            <AdminRoute>
              <NuevoProducto agregarProducto={agregarProducto} />
            </AdminRoute>
          }
        />
        <Route
          path="editar-producto/:id"
          element={
            <AdminRoute>
              <EditarProducto productos={productos} setProductos={setProductos} />
            </AdminRoute>
          }
        />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;