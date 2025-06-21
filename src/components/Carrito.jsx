import { useDispatch, useSelector } from 'react-redux';
import { quitarDelCarrito, cambiarCantidad } from '../store/carrito';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Carrito() {
  const carrito = useSelector((state) => state.carrito);
  const dispatch = useDispatch();

  // ✅ Cálculo seguro de precio (precio || price || 0)
  const total = carrito.reduce((acc, item) => {
    const precio = item.precio || item.price || 0;
    return acc + precio * item.cantidad;
  }, 0);

  return (
    <div className="container mt-4">
      <h2>🛒 Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p className="text-muted">El carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body className="d-flex align-items-center gap-4">
                {/* ✅ Imagen del producto */}
                <img
                  src={item.image || item.imagen || 'https://via.placeholder.com/80'}
                  alt={item.nombre || item.title}
                  style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                />

                {/* ✅ Detalles del producto */}
                <div style={{ flex: 1 }}>
                  <h5 className="mb-1">{item.nombre || item.title}</h5>
                  <p className="mb-2">${item.precio || item.price}</p>

                  <Form.Control
                    type="number"
                    min={1}
                    value={item.cantidad}
                    onChange={(e) =>
                      dispatch(
                        cambiarCantidad({ id: item.id, cantidad: +e.target.value })
                      )
                    }
                    style={{ width: '80px' }}
                  />
                </div>

                {/* ✅ Botón de quitar */}
                <Button
                  variant="danger"
                  onClick={() => dispatch(quitarDelCarrito(item.id))}
                >
                  Quitar
                </Button>
              </Card.Body>
            </Card>
          ))}
          <h4 className="mt-3 text-end">Total: ${total.toFixed(2)}</h4>
        </>
      )}
    </div>
  );
}

export default Carrito;