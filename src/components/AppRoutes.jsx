import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./AppNavbar";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Registro from "../pages/Registrarse";
import NuevoProducto from "./NuevoProducto";
import Favoritos from "../pages/Favoritos";
import AcercaDe from "../pages/AcercaDe";
import ListarProductos from "../components/ListarProductos"; // Asegúrate de tener este componente
import EditarProducto from "./EditarProducto";
import VerDetalles from "../pages/VerDetalles";
import Papelera from "../pages/Papelera";
import AdminRoute from "../routes/AdminRoute";
import RutaAutenticada from "../routes/RutaAutenticada";
import Soporte from "../pages/Soporte";
import Devoluciones from "./Devoluciones";
import Faq from "../pages/Faq";
import Contacto from "./Contacto";
import Seguridad from "./Seguridad";
import Cuenta from "./Cuenta";
import Carrito from "../pages/Carrito";
import Promociones from "../pages/Promociones";
import MasVendidos from "../pages/MasVendidos";
import Novedades from "../pages/Novedades";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/principal" />} />

      <Route path="/principal/login" element={<Login />} />
      <Route path="/principal/registrarse" element={<Registro />} />

        {/*Rutas Publicas*/}
      <Route path="/principal" element={<Layout />}>
        <Route index element={<Inicio />} />

        <Route path="favoritos" element={
          <RutaAutenticada>
            <Favoritos />
          </RutaAutenticada>
        } />
        <Route path="carrito" element={
          <RutaAutenticada>
            <Carrito />
          </RutaAutenticada>
        } />

        <Route path="cliente" element={
          <RutaAutenticada>
            <Login />
          </RutaAutenticada>
        } />
        <Route path="productos/:categoria" element={<ListarProductos />} />
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="papelera" element={<Papelera />} />
        <Route path="producto/:id" element={<VerDetalles />} />
        <Route path="promociones" element={<Promociones />} />
        <Route path="mas-vendidos" element={<MasVendidos />} />
        <Route path="novedades" element={<Novedades />} />

        

        <Route path="soporte" element={<Soporte />} />
        <Route path="soporte/devoluciones" element={<Devoluciones />} />
        <Route path="soporte/faq" element={<Faq />} />
        <Route path="soporte/contacto" element={<Contacto />} />
        <Route path="soporte/seguridad" element={<Seguridad />} />
        <Route path="soporte/cuenta" element={<Cuenta />} />

        {/* PROTEGER RUTAS ADMIN */}
        <Route path="nuevo-producto" element={
          <AdminRoute>
            <NuevoProducto />
          </AdminRoute>
        } />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
