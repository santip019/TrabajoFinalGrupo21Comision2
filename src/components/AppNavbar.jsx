import { Navbar, Container, Nav, Row, Col, Dropdown, Offcanvas, Button, ListGroup, Form, Modal} from "react-bootstrap";
import { LuSearch } from "react-icons/lu";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProductos } from "../context/ProductosContext";
import { useState } from "react";
import Footer from "../pages/Footer";
import { useCarrito } from "../context/CarritoContext";
import { IoMdExit } from "react-icons/io";


function Layout() {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { carrito } = useCarrito();
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const { busqueda, setBusqueda } = useProductos();
  const { productos, categoriaSeleccionada, setCategoriaSeleccionada } = useProductos();
  const categorias = [
    "todas",
    ...Array.from(new Set(productos.map((p) => p.category))),
  ];

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const expand = "lg";

  return (
    <>
      <Navbar expand={expand} className="navbar">
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Row className="w-100 align-items-center">
                {/* Logo y Categorías */}
                <Col
                  xs={12}
                  lg="auto"
                  className="d-flex flex-column align-items-lg-start align-items-center mb-2 mb-lg-0"
                >
                  <Link to="/principal">
                    <img
                      src="/src/assets/images/LogoPaguinaWaldo's.png"
                      alt="Logo"
                      className="logo"
                      style={{
                        width: "160px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                  <Dropdown className="w-100 mt-2">
                    <Dropdown.Toggle
                      variant="none"
                      id="dropdown-categorias"
                      className="categorias"
                    >
                      {categoriaSeleccionada === "todas"
                        ? "Categorías"
                        : categoriaSeleccionada}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {categorias.map((cat) => (
                        <Dropdown.Item
                          key={cat}
                          onClick={() => {
                            setCategoriaSeleccionada(cat);
                            navigate(`/principal/productos/${cat}`);
                          }}
                          active={categoriaSeleccionada === cat}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                <Col xs={12} lg className="d-flex flex-column">
                  {/* Fila superior: Buscador + Favoritos, Usuario, Carrito */}
                  <Row className="align-items-center mb-2">
                    {/* Buscador */}
                    <Col xs={12} md={6} lg={6} className="mb-2 mb-md-0">
                      <Form className="contenedor-busqueda d-flex w-100">
                        <Form.Control
                          type="search"
                          placeholder="Buscar producto..."
                          className="busqueda"
                          value={busqueda}
                          onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <span className="icono-lupa">
                          <LuSearch />
                        </span>
                      </Form>
                    </Col>
                    {/* Favoritos, Usuario, Carrito */}
                    <Col
                      xs={12}
                      md={6}
                      lg={6}
                      className="d-flex justify-content-end"
                    >
                      <Nav className="flex-column justify-content-end flex-md-row w-100 text-md-end">
                        <Nav.Link
                          as={Link}
                          to="/principal/favoritos"
                          className="text-dark"
                        >
                          <span className="icono-estrella">
                            <FaRegStar />
                          </span>
                          Favoritos
                        </Nav.Link>
                        {!user ? (
                          <Nav.Link
                            as={Link}
                            to="/principal/login"
                            className="text-dark"
                          >
                            <span className="icono-cliente">
                              <FaRegUser />
                            </span>
                            Iniciar Sesión / Registrarse
                          </Nav.Link>
                        ) : (
                          <>
                            <Nav.Link
                              onClick={() => setShow(true)}
                              className="text-dark"
                            >
                              <span className="icono-cliente">
                                <FaRegUser />
                              </span>
                              {user.name}
                            </Nav.Link>
                            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                              <Offcanvas.Header closeButton>
                                <Offcanvas.Title className="cliente-titulo">Mi cuenta</Offcanvas.Title>
                              </Offcanvas.Header>
                              <Offcanvas.Body>
                                <ListGroup>
                                  <ListGroup.Item action onClick={() => { setShow(false); navigate("/principal/perfil"); }}>
                                    Ver perfil
                                  </ListGroup.Item>
                                  {/*<ListGroup.Item action onClick={() => { setShow(false); navigate("/principal/carrito"); }}>
                                    Cambiar Tema
                                  </ListGroup.Item> AGREGAR SI LLEGAMOS CON EL TIEMPO*/}
                                  <ListGroup.Item action onClick={() => { setShow(false); navigate("/principal/soporte"); }}>
                                    Soporte Tecnico
                                  </ListGroup.Item>
                                </ListGroup>
                                <br></br>
                                {/* Opciones según rol */}
                                {user.role === "admin" && 
                                <div>
                                  <ListGroup>
                                  <ListGroup.Item action onClick={() => { setShow(false); navigate("/principal/nuevo-producto"); }}>
                                    Añadir Producto
                                  </ListGroup.Item>
                                  <ListGroup.Item action onClick={() => { setShow(false); navigate("/principal/productos/todas"); }}>
                                    Gestionar Productos
                                  </ListGroup.Item>
                                  <ListGroup.Item action onClick={() => { setShow(false); navigate("/principal/papelera"); }}>
                                    Ver Papelera
                                  </ListGroup.Item>
                                </ListGroup>
                                </div>}
                                <br></br>
                                <Button variant="outline-danger" onClick={() => { setShow(false); setShowLogoutModal(true) }}>Cerrar sesión <IoMdExit /></Button>
                              </Offcanvas.Body>
                            </Offcanvas>
                          </>
                        )}
                        <Nav.Link
                          as={Link}
                          to="/principal/carrito"
                          className="text-dark"
                        >
                          <span className="icono-carrito">
                            <MdOutlineShoppingCart />
                          </span>
                          Carrito
                          {cantidadTotal > 0 && (
                            <span className="badge bg-light text-dark ms-1">
                              {cantidadTotal}
                            </span>
                          )}
                        </Nav.Link>
                      </Nav>
                    </Col>
                  </Row>
                  {/* Fila inferior: Menú principal */}
                  <Row className="menu-abajo align-items-center">
                    <Col xs={12} className="d-flex">
                      <Nav className="flex-column justify-content-end flex-md-row w-100 text-md-end">
                        <Nav.Link
                          as={Link}
                          to="/principal"
                          className="text-dark"
                        >
                          Inicio
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/principal/promociones"
                          className="text-dark"
                        >
                          Promociones
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/principal/mas-vendidos"
                          className="text-dark"
                        >
                          Más Vendidos
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/principal/novedades"
                          className="text-dark"
                        >
                          Novedades
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/principal/soporte"
                          className="text-dark"
                        >
                          Ayuda
                          <span className="icono-ayuda">
                            <MdOutlineContactSupport />
                          </span>
                        </Nav.Link>
                      </Nav>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {/* Modal de confirmación de cierre de sesión */}
          <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar cierre de sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Seguro que deseas cerrar sesión?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
              >
                Cerrar sesión
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Navbar>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
