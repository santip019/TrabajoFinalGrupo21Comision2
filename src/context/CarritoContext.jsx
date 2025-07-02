import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const { user, loadingUser } = useAuth();
  const [carrito, setCarrito] = useState([]);

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
        return prev.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );}
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // Limpia carrito cuando el usuario cierra sesión
  useEffect(() => {
    if (!user) setCarrito([]);
  }, [user]);
  
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