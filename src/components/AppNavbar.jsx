import { Navbar, Container, Nav, Row, Col, Dropdown } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
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
  const { productos, categoriaSeleccionada, setCategoriaSeleccionada } = useProductos();
  const categorias = [
    "todas",
    ...Array.from(new Set(productos.map(p => p.category)))
  ]; // Aqui se guardan las categorías únicas de los productos

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container>
              <Row className="menu-arriba w-100 align-items-center ">
                <Col md={3} className="logo-col d-flex justify-content-start ">
                  <Navbar.Brand as={Link} to="/">
                    <img src="/src/assets/images/LogoPaguinaWaldo's.png" alt="Logo" className="logo"/>
                  </Navbar.Brand>
                </Col>
                <Col md={5} className="d-flex justify-content-center ">
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
                <Col md={4} className="d-flex justify-content-end ">
                  <Nav>
                    <Nav.Link as={Link} to="/Layout/favoritos">
                      <span className="icono-estrella">
                        <FaRegStar />
                      </span>
                      Favoritos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/login">
                      <span className="icono-cliente">
                        <FaRegUser />
                      </span>
                      Cliente
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/carrito">
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

              <Row className="menu-abajo w-100 align-items-center ">
                <Col md={2} className="d-flex justify-content-start">
                  <Dropdown>
                    <Dropdown.Toggle variant="none" id="dropdown-categorias" className="categorias">
                      {categoriaSeleccionada === "todas" ? "Categorías" : categoriaSeleccionada}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {categorias.map(cat => (
                        <Dropdown.Item
                          key={cat}
                          onClick={() => setCategoriaSeleccionada(cat)} // Cambia la categoría seleccionada
                          active={categoriaSeleccionada === cat}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col md={10} className="d-flex justify-content-end">
                  <Nav>
                    <Nav.Link as={Link} to="/Layout"> Inicio </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/promociones"> Promociones </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/mas-vendidos"> Más Vendidos </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/novedades"> Novedades </Nav.Link>
                    <Nav.Link as={Link} to="/Layout/soporte"> 
                      Ayuda 
                      <span className="icono-ayuda">
                        <MdOutlineContactSupport />
                      </span>
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
