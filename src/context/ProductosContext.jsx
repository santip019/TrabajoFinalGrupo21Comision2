import { createContext, useContext, useEffect, useState } from "react";
import productosLocales from "../assets/productos.json"; // Importa tu JSON local

const ProductosContext = createContext();

export function useProductos() {
  return useContext(ProductosContext);
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas"); // Esto guarda la categoría elegida por el usuario.
  const [busqueda, setBusqueda] = useState("");

  // Cargar productos desde la API y el JSON local al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const productosAdaptados = data.map(prod => ({
          ...prod,
          estado: true, // activo por defecto
          favoritos: false,
          brand: prod.brand || "Waldo's",
          discount: prod.discount || 0,
          delivery: prod.delivery || false
        }));

        // Adaptar productosLocales si es necesario
        const productosLocalesAdaptados = productosLocales.map(prod => ({
          ...prod,
          estado: prod.estado !== undefined ? prod.estado : true,
          favoritos: prod.favoritos !== undefined ? prod.favoritos : false,
          brand: prod.brand || prod.marca || "",
          discount: prod.discount || prod.descuento || 0,
          delivery: prod.delivery !== undefined ? prod.delivery : false
        }));

        // Unir ambos arrays
        setProductos([...productosAdaptados, ...productosLocalesAdaptados]);
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
      setProductos,
      busqueda,
      setBusqueda,
      categoriaSeleccionada,
      setCategoriaSeleccionada
    }}>
      {children}
    </ProductosContext.Provider>
  );
}