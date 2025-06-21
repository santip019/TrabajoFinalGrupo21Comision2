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
import AdminRoute from "../routes/AdminRoute";
import RutaAutenticada from "./RutaAutenticada";
import Soporte from './Soporte';
import Devoluciones from './Devoluciones';
import Faq from './Faq';
import Contacto from './Contacto';
import Seguridad from './Seguridad';
import Cuenta from './Cuenta';
import Carrito from './Carrito'


function AppRoutes() {
  return (
    <Routes>
      {/* Login como pantalla inicial */}
      <Route path="/" element={<Login />} />

      {/* Soporte técnico: RUTAS PÚBLICAS */}
      <Route path="/soporte" element={<Soporte />} />
      <Route path="/soporte/devoluciones" element={<Devoluciones />} />
      <Route path="/soporte/faq" element={<Faq />} />
      <Route path="/soporte/contacto" element={<Contacto />} />
      <Route path="/soporte/seguridad" element={<Seguridad />} />
      <Route path="/soporte/cuenta" element={<Cuenta />} />

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
        <Route path="carrito" element={<Carrito />} />

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