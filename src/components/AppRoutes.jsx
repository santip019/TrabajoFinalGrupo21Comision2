import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './AppNavbar';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import NuevoProducto from './NuevoProducto';
import Favoritos from '../pages/Favoritos';
import AcercaDe from '../pages/AcercaDe';
import EditarProducto from './EditarProducto';
import VerDetalles from '../pages/VerDetalles';
import Papelera from '../pages/Papelera';
import AdminRoute from "../routes/AdminRoute";
import RutaAutenticada from "./RutaAutenticada";
import Soporte from '../pages/Soporte';
import Devoluciones from './Devoluciones';
import Faq from '../pages/Faq';
import Contacto from './Contacto';
import Seguridad from './Seguridad';
import Cuenta from './Cuenta';
import Carrito from '../pages/Carrito'


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Layout" />} />

      {/* Soporte técnico: RUTAS PÚBLICAS */}
      <Route path="/soporte" element={<Soporte />} />
      <Route path="/soporte/devoluciones" element={<Devoluciones />} />
      <Route path="/soporte/faq" element={<Faq />} />
      <Route path="/soporte/contacto" element={<Contacto />} />
      <Route path="/soporte/seguridad" element={<Seguridad />} />
      <Route path="/soporte/cuenta" element={<Cuenta />} />

      <Route path="/Layout" element={<Layout />}>

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