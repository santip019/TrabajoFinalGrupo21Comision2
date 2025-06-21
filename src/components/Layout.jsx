import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useSelector } from 'react-redux';


function Layout() {
  const { user, logout } = useAuth();
  const carrito = useSelector((state) => state.carrito);
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Layout">Inicio</Nav.Link>
              {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
              {user?.role === 'admin' && (
                <Nav.Link as={Link} to="/Layout/nuevo-producto">Nuevo Producto</Nav.Link>
              )}
              <Nav.Link as={Link} to="/Layout/favoritos">Favoritos</Nav.Link>
              <Nav.Link as={Link} to="/Layout/acerca-de">Acerca de</Nav.Link>
              <Nav.Link as={Link} to="/soporte">Soporte</Nav.Link>
              {user && (
                <Nav.Link as={Link} to="/Layout/carrito">
                  🛒 Carrito
                  {cantidadTotal > 0 && (
                    <span className="badge bg-light text-dark ms-1">{cantidadTotal}</span>
                  )}
             </Nav.Link>
                 )}
              {user && <Nav.Link onClick={logout}>Cerrar Sesión</Nav.Link>}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}


export default Layout;