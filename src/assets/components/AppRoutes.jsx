import { Routes, Route, Navigate } from "react-router-dom";
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
        <Route index element={<Inicio />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="papelera" element={<Papelera />} />
        <Route path="producto/:id" element={<VerDetalles />} />
        {/* Rutas solo para admin */}
        <Route path="nuevo-producto" element={
          <AdminRoute>
            <NuevoProducto />
          </AdminRoute>
        } />
        <Route path="editar-producto/:id" element={
          <AdminRoute>
            <EditarProducto />
          </AdminRoute>
        } />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;