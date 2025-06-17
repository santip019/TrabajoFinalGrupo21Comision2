import { createContext, useContext, useEffect, useState } from "react";

const ProductosContext = createContext();

export function useProductos() {
  return useContext(ProductosContext);
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  // Cargar productos desde la API al montar el componente (async/await)
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const productosAdaptados = data.map(prod => ({
          ...prod,
          estado: true, // activo por defecto
          favoritos: false 
        }));
        setProductos(productosAdaptados);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };
    fetchProductos();
  }, []);

  // Borrado lógico
  const eliminarProducto = (id) => {
    setProductos(productos =>
      productos.map(p =>
        p.id === id ? { ...p, estado: false } : p
      )
    );
  };

  // Restaurar producto o devolverlo de la papelera
  const restaurarProducto = (id) => {
    setProductos(productos =>
      productos.map(p =>
        p.id === id ? { ...p, estado: true } : p
      )
    );
  };

  return (
    <ProductosContext.Provider value={{
      productos,
      eliminarProducto,
      restaurarProducto,
      setProductos
    }}>
      {children}
    </ProductosContext.Provider>
  );
}