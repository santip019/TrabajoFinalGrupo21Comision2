import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const navigate = useNavigate();
  const { user, loadingUser } = useAuth();
  const [carrito, setCarrito] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      const cart = localStorage.getItem(`carrito_${user.email}`);
      setCarrito(cart ? JSON.parse(cart) : []);
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`carrito_${user.email}`, JSON.stringify(carrito));
    }
  }, [carrito, user, loadingUser]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    // Agrega un toast para este producto
    setToasts((prev) => [...prev, producto]);
  };

  useEffect(() => {
    if (!user) setCarrito([]);
  }, [user]);

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  // Función para cerrar un toast
  const cerrarToast = (idx) => {
    setToasts((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      <CarritoContext.Provider
        value={{
          carrito,
          agregarAlCarrito,
          quitarDelCarrito,
          cambiarCantidad,
          vaciarCarrito,
        }}
      >
        {children}
      </CarritoContext.Provider>
      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{ position: "fixed" }}
      >
        {toasts.map((producto, idx) => {
          // Busca la cantidad actual en el carrito
          const item = carrito.find((p) => p.id === producto.id);
          return (
            <Toast
              key={producto.id + "-" + idx}
              onClose={() => cerrarToast(idx)}
              bg="success"
              delay={10000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Producto agregado</strong>
              </Toast.Header>
              <Toast.Body className="text-white d-flex align-items-center">
                <img
                  src={
                    producto.image ||
                    producto.imagen ||
                    "https://via.placeholder.com/60"
                  }
                  alt={producto.title || producto.nombre}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    marginRight: 12,
                    background: "#fff",
                    borderRadius: 8,
                  }}
                />
                <div>
                  <b>{producto.title || producto.nombre}</b>
                  <br />
                  Precio: ${producto.precio || producto.price}
                  <br />
                  Cantidad:{" "}
                  <input
                    type="number"
                    min={1}
                    value={item?.cantidad ?? 1}
                    style={{ width: 50, marginRight: 8 }}
                    onChange={(e) => {
                      const nuevaCantidad = Math.max(1, Number(e.target.value));
                      cambiarCantidad(producto.id, nuevaCantidad);
                    }}
                  />
                  <button
                    className="btn btn-light btn-sm ms-2"
                    onClick={() => navigate("/principal/carrito")}
                  >
                    Ir al carrito
                  </button>
                </div>
              </Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
    </>
  );
}
