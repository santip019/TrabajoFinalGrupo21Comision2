import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const { user } = useAuth();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    if (user) {
      const cart = JSON.parse(localStorage.getItem(`carrito_${user.email}`)) || [];
      setCarrito(cart);
    } else {
      setCarrito([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`carrito_${user.email}`, JSON.stringify(carrito));
    }
  }, [carrito, user]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) return prev;
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      quitarDelCarrito,
      cambiarCantidad,
      vaciarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
}