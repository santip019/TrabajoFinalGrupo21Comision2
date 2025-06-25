import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorito } from "../store/favoritos";
import { useAuth } from "../context/AuthContext";
import { useProductos } from "../context/ProductosContext"; // <-- Corrige el import
import { agregarAlCarrito } from "../store/carrito";
import ListaDeProductos from "../components/ListaDeProductos";
import CarruselDeProductos from "../components/CarruselDeProductos";

function Inicio() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favoritos);
  const [mostrarPapelera, setMostrarPapelera] = useState(false);
  const { user } = useAuth();
  const { productos, eliminarProducto, restaurarProducto, busqueda, categoriaSeleccionada } = useProductos(); // <-- Obtén todo del contexto

  const productosFiltrados = productos.filter((producto) => { // Filtra los productos según la categoría, estado y búsqueda
    const categoria = producto.category;
    const perteneceCategoria =
      categoriaSeleccionada === "todas" || categoria === categoriaSeleccionada;
    const activoOInactivo = mostrarPapelera
      ? !producto.estado
      : producto.estado;
    const nombre = (producto.nombre || producto.title || "").toLowerCase();
    const coincideBusqueda = nombre.includes(busqueda.toLowerCase());
    return perteneceCategoria && activoOInactivo && coincideBusqueda;
  });

  const listaProductos = productosFiltrados.map((producto) => (
    <div key={producto.id} className="col-md-4 d-flex mb-4">
      <Card className="card w-100">
        <Card.Img
          variant="top"
          src={producto.image || "https://via.placeholder.com/180"}
        />
        <Card.Body>
          <Card.Title>{producto.title || producto.nombre}</Card.Title>
          <Card.Text>Precio ${producto.precio || producto.price}</Card.Text>

          {!mostrarPapelera && (
            <>
              {user?.role === "admin" && (
                <Button
                  variant="success"
                  onClick={() =>
                    navigate(`/Layout/editar-producto/${producto.id}`)
                  }
                >
                  Editar
                </Button>
              )}{" "}
              <Button
                variant="info"
                onClick={() => navigate(`/Layout/producto/${producto.id}`)}
              >
                Ver Detalles
              </Button>{" "}
              <Button
                variant={
                  favoritos.includes(producto.id)
                    ? "warning"
                    : "outline-warning"
                }
                onClick={() => dispatch(toggleFavorito(producto.id))}
                style={{ fontSize: "1.2rem", padding: "0.3rem" }}
                aria-label="Favorito"
              >
                {favoritos.includes(producto.id) ? "★ " : "☆ "}
              </Button>{" "}
              <Button
                variant="outline-primary"
                onClick={() => dispatch(agregarAlCarrito(producto))}
              >
                Añadir al carrito
              </Button>
              {user?.role === "admin" && (
                <Button
                  variant="danger"
                  onClick={() => eliminarProducto(producto.id)}
                  style={{ fontSize: "1.5rem", padding: "0.3rem" }}
                  aria-label="Eliminar Producto"
                >
                  <MdDeleteForever />
                </Button>
              )}
            </>
          )}

          {mostrarPapelera && (
            <>
              {user?.role === "admin" && (
                <Button
                  variant="success"
                  onClick={() => restaurarProducto(producto.id)}
                  style={{ fontSize: "1.2rem", padding: "0.3rem" }}
                  aria-label="Restaurar Producto"
                >
                  Restaurar
                </Button>
              )}
              <Badge bg="danger" className="ms-2">
                Eliminado
              </Badge>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  ));

  return (
  <div className="container">
    {/* Carrusel de productos destacados */}
    <h2>
        <Badge className="inicio" bg="primary">
          Productos Destacados
        </Badge>
    </h2>
    <CarruselDeProductos
      productos={productosFiltrados.slice(0, 12)} // Muestra los primeros 12 productos filtrados
      onVerDetalles={id => navigate(`/Layout/producto/${id}`)}
    />

    {/* TODO ESTO IRIA EN GestionarProducto.jsx
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>
        <Badge className="inicio" bg="primary">
          {mostrarPapelera ? "Papelera" : "Productos"}
        </Badge>
      </h2>
      <div className="d-flex gap-2 align-items-center">
        <Form.Select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
        <Button
          variant={mostrarPapelera ? "secondary" : "outline-secondary"}
          onClick={() => setMostrarPapelera(!mostrarPapelera)}
        >
          {mostrarPapelera ? "Ver activos" : "Ver papelera"}
        </Button>
      </div>
    </div>
    <div className="row">
      {productosFiltrados.length > 0 ? (
        <ListaDeProductos
          productos={productosFiltrados}
          onVerDetalles={(id) => navigate(`/Layout/producto/${id}`)}
          onAgregarCarrito={(producto) =>
            dispatch(agregarAlCarrito(producto))
          }
          mostrarPapelera={mostrarPapelera}
          user={user}
          favoritos={favoritos}
          onToggleFavorito={(id) => dispatch(toggleFavorito(id))}
          onEliminar={eliminarProducto}
          onRestaurar={restaurarProducto}
          onEditar={(id) => navigate(`/Layout/editar-producto/${id}`)}
        />
      ) : (
        <p className="text-muted">
          {mostrarPapelera
            ? "No hay productos en la papelera."
            : "No hay productos activos en esta categoría."}
        </p>
      )}
    </div>
  */}
</div>

);
}

export default Inicio;
