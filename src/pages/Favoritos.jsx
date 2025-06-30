import { useFavoritos } from "../context/FavoritosContext";
import { useProductos } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import Badge from 'react-bootstrap/Badge';
import ProductoCard from "../components/ProductoCard";

function Favoritos() {
  const { productos } = useProductos();
  const { user } = useAuth();
  const { favoritos } = useFavoritos();

  if (!user) {
    window.location.href = "/principal/login";
    return null;
  }
  
  // Filtrar productos favoritos que están activos (estado=true)
  const productosFavoritos = productos.filter(
    (producto) => favoritos.includes(producto.id) && producto.estado
  );

  return (
    <div className="container contenido-principal">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="titulos">
          <Badge className="inicio" bg="none">
            Productos Favoritos
          </Badge>
        </h2>
      </div>
      <div className="row">
        {productosFavoritos.length > 0 ? (
          productosFavoritos.map((producto) => (
            <div key={producto.id} className="productos col-md-3 d-flex mb-4">
              <ProductoCard producto={producto} />
            </div>
          ))
        ) : (
          <p className="text-muted">No hay productos favoritos.</p>
        )}
      </div>
    </div>
  );
}

export default Favoritos;