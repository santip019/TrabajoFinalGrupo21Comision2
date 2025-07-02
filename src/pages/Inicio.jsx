import { useState, useEffect } from "react";
import { Col, Row, Container, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import CarruselDeProductos from "../components/CarruselDeProductos";
import CarruselDeImagenes from "../components/CarruselDeImagenes";
import ProductoCard from "../components/ProductoCard";

function Inicio() {
  const location = useLocation(),
    { user } = useAuth(),
    navigate = useNavigate();
  const [showToast, setShowToast] = useState(false),
    [nombre, setNombre] = useState("");
  const [productosAleatorios, setProductosAleatorios] = useState([]);
  const { productos, busqueda, categoriaSeleccionada } = useProductos();

  useEffect(() => {
    if (location.state?.bienvenido) {
      setShowToast(true);
      setNombre(location.state.nombre || user?.name || "");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, user]);

  useEffect(() => {
    setProductosAleatorios(
      productos
        .filter(
          (p) =>
            (p.brand || p.marca)?.toLowerCase() !== "waldo's" &&
            p.estado !== false
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
    );
  }, [productos]);

  const productosFiltradosBusqueda = productos.filter((p) => {
  if (!p) return false;
  const nombre = (p.title || p.nombre || "").toLowerCase();
  const marca = (p.brand || p.marca || "").toLowerCase();
  const coincideBusqueda =
    nombre.includes(busqueda.toLowerCase()) ||
    marca.includes(busqueda.toLowerCase());
  const perteneceCategoria =
    categoriaSeleccionada === "todas" ||
    (p.category &&
      p.category.toLowerCase() === categoriaSeleccionada.toLowerCase());
  return p.estado !== false && coincideBusqueda && perteneceCategoria;
});
  if (busqueda.trim() !== "") {
    return (
      <Container className="my-4">
        {productosFiltradosBusqueda.length === 0 ? (
          <p className="text-muted">No hay productos para mostrar.</p>
        ) : (
          <Row className="productos">
            {productosFiltradosBusqueda.map((producto) => (
              <Col xs={6} md={3} key={producto.id} className="mb-4">
                <ProductoCard producto={producto} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    );
  }

  const imagenesPrincipal = [
    "/src/assets/images/banner_promocion_productos3.png",
    "/src/assets/images/banner_promocion_productos2.png",
    "/src/assets/images/banner_promocion_productos1.png",
  ];
  const productosConDescuento = productos.filter(
    (p) => (p.discount || p.descuento || 0) > 0 && p.estado !== false
  );
  const productosWaldos = productos.filter(
    (p) =>
      (p.brand || p.marca)?.toLowerCase() === "waldo's" && p.estado !== false
  );
  const imagenesDescuento = [
    "/src/assets/images/Banners_promociones0.png",
    "/src/assets/images/Banners_promociones1.png",
  ];

  return (
    <div>
      <CarruselDeImagenes imagenes={imagenesPrincipal} />
      <Container className="carruseles">
        <h2>Super Ofertas</h2>
        <CarruselDeProductos
          productos={productosConDescuento}
          onVerDetalles={(id) => navigate(`/Layout/producto/${id}`)}
        />
      </Container>
      <Container className="carruseles">
        <h2>Productos Waldo's</h2>
        <CarruselDeProductos
          productos={productosWaldos}
          onVerDetalles={(id) => navigate(`/Layout/producto/${id}`)}
        />
      </Container>
      <Container className="carruseles-promo">
        <h2>Conoce nuestras promociones bancarias</h2>
        <CarruselDeImagenes imagenes={imagenesDescuento} />
      </Container>
      <Container className="carruseles">
        <h2>Otras Marcas</h2>
        <CarruselDeProductos
          productos={productosAleatorios}
          onVerDetalles={(id) => navigate(`/Layout/producto/${id}`)}
        />
      </Container>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg="success"
          delay={5000}
          autohide
        >
          <Toast.Header className="text-black">
            <strong className="me-auto">¡Acceso Exitoso!</strong>
            <small className="text-muted">Ahora puedes comprar online</small>
          </Toast.Header>
          <Toast.Body className="text-white">Bienvenido, {nombre}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Inicio;
