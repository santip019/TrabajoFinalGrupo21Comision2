import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "./AppNavbar";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import FormularioProducto from "./FormularioProducto";
import Favoritos from "../pages/Favoritos";
import AcercaDe from "../pages/AcercaDe";
import ListarProductos from "../components/ListarProductos";
import VerDetalles from "../pages/VerDetalles";
import Papelera from "../pages/Papelera";
import AdminRoute from "../routes/AdminRoute";
import RutaAutenticada from "../routes/RutaAutenticada";
import Soporte from "../pages/Soporte";
import Carrito from "../pages/Carrito";
import Promociones from "../pages/Promociones";
import MasVendidos from "../pages/MasVendidos";
import Novedades from "../pages/Novedades";
import FormularioUsuario from "../components/FormularioUsuario";
import ErrorPage from "../pages/ErrorPage";

function PerfilWrapper() {
  const { user } = useAuth();
  if (!user) return null;
  return <FormularioUsuario modo="edicion" usuarioActual={user} />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/principal" />} />
      <Route path="/principal/error" element={<ErrorPage />} />
      <Route path="/principal/login" element={<Login />} />
      <Route path="/principal/registrarse" element={<FormularioUsuario modo="registro" />} />
      <Route path="perfil"
        element={
          <RutaAutenticada>
            <PerfilWrapper />
          </RutaAutenticada>
        }
      />
      <Route path="/principal" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="favoritos"
          element={
            <RutaAutenticada>
              <Favoritos />
            </RutaAutenticada>
          }
        />
        <Route path="carrito"
          element={
            <RutaAutenticada>
              <Carrito />
            </RutaAutenticada>
          }
        />
        <Route path="productos/:categoria" element={<ListarProductos />} />
        <Route path="producto/:id" element={<VerDetalles />} />
        <Route path="promociones" element={<Promociones />} />
        <Route path="mas-vendidos" element={<MasVendidos />} />
        <Route path="novedades" element={<Novedades />} />
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="soporte" element={<Soporte />} />

       {/* RUTAS ADMIN */}
        <Route path="nuevo-producto"
          element={
            <AdminRoute>
              <FormularioProducto />
            </AdminRoute>
          }
        />
        <Route path="editar-producto/:id"
          element={
            <AdminRoute>
              <FormularioProducto esEdicion={true} />
            </AdminRoute>
          }
        />
        <Route
          path="papelera"
          element={
            <AdminRoute>
              <Papelera />
            </AdminRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/principal/error" />} />
    </Routes>
  );
}

export default AppRoutes;
