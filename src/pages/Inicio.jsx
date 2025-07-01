import { useState, useEffect } from "react";
import { Col, Row, Container, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import CarruselDeProductos from "../components/CarruselDeProductos";
import CarruselDeImagenes from "../components/CarruselDeImagenes";
import ProductoCard from "../components/ProductoCard";

function Inicio() {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [nombre, setNombre] = useState("");
  const [mostrarPapelera] = useState(false);
  const {
    productos,
    busqueda,
    categoriaSeleccionada,
  } = useProductos();

  // --- BÚSQUEDA DINÁMICA ---
  // Si hay texto en la barra de búsqueda, mostrar solo los resultados como en promociones/novedades
  const productosFiltradosBusqueda = productos.filter((producto) => {
    const nombre = (producto.title || producto.nombre || "").toLowerCase();
    const marca = (producto.brand || producto.marca || "").toLowerCase();
    const coincideBusqueda =
      nombre.includes(busqueda.toLowerCase()) ||
      marca.includes(busqueda.toLowerCase());
    const perteneceCategoria =
      categoriaSeleccionada === "todas" ||
      producto.category === categoriaSeleccionada;
    return producto.estado && coincideBusqueda && perteneceCategoria;
  });

  // Agrupa de a 5 productos por fila

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
      (p.brand || p.marca) &&
      (p.brand || p.marca).toLowerCase() === "waldo's" &&
      p.estado !== false
  );

  const [productosAleatorios, setProductosAleatorios] = useState([]);
  useEffect(() => {
    const productosNoWaldos = productos.filter(
      (p) =>
        (p.brand || p.marca)?.toLowerCase() !== "waldo's" && p.estado !== false
    );
    const mezclados = [...productosNoWaldos]
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
    setProductosAleatorios(mezclados);
  }, [productos]);

  const imagenesDescuento = [
    "/src/assets/images/Banners_promociones0.png",
    "/src/assets/images/Banners_promociones1.png",
  ];

  // --- Efecto para mostrar el toast de bienvenida ---
  // Si el usuario viene de un logueo exitoso, muestra un toast de bienvenida
  useEffect(() => {
    if (location.state?.bienvenido) {
      setShowToast(true);
      // Usa el nombre del estado o, si no viene, el del usuario logueado
      setNombre(location.state.nombre || user.name || "");
      // Limpia el estado para que no se muestre el toast al refrescar
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, user]);

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
      {/*Esto es el componente renderizado del mensaje de logueo correcto*/}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success" delay={5000} autohide>
          <Toast.Header className="text-black">
            <strong className="me-auto">¡Acceso Exitoso!</strong>
            <small className="text-muted">Ahora puedes comprar online</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Bienvenido, {nombre}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Inicio;