import { Navbar, Container, Nav, Row, Col, Dropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { useProductos } from "../context/ProductosContext";

function Layout() {
  const { user, logout } = useAuth();
  const carrito = useSelector((state) => state.carrito);
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const { busqueda, setBusqueda } = useProductos();

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container>
              <Row className="w-100 align-items-center">
                <Col md={4}>
                  <Navbar.Brand as={Link} to="/">
                    Mi Logo
                  </Navbar.Brand>
                </Col>
              
                <Col md={4} className="text-center">
                  <Form className="d-flex ms-3">
                  <Form.Control
                    type="search"
                    placeholder="Buscar producto..."
                    className="me-2"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{ maxWidth: "200px" }}
                  />
                </Form>
                </Col>

                <Col md={4} className="d-flex justify-content-end">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Layout/favoritos">
                      Favoritos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/carrito">
                      Carrito
                      {cantidadTotal > 0 && (
                        <span className="badge bg-light text-dark ms-1">
                          {cantidadTotal}
                        </span>
                      )}
                    </Nav.Link>
                  </Nav>
                </Col>

                <Col xs={12}>
                  <Nav className="me-auto">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="none"
                        id="dropdown-categorias"
                        className="categorias"
                      >
                        Categorías
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#categoria1">
                          Categoría 1
                        </Dropdown.Item>
                        <Dropdown.Item href="#categoria2">
                          Categoría 2
                        </Dropdown.Item>
                        <Dropdown.Item href="#categoria3">
                          Categoría 3
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Nav.Link as={Link} to="/Layout">
                      Inicio
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/promociones">
                      Promociones
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/mas-vendidos">
                      Más Vendidos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/novedades">
                      Novedades
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/soporte">
                      Ayuda
                    </Nav.Link>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
