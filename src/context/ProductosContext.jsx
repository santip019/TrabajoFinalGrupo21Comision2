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
  const [loading, setLoading] = useState(false);// Se define un estado para controlar cuando mostrar el Spinner de carga
  
  const productosGuardados = localStorage.getItem("productos");

  // Cargar productos desde la API y el JSON local al montar el componente
  useEffect(() => {
    if (productosGuardados) {
      setLoading(true); // cuando empieza a solicitar (get) los productos de la API se define como true el que aparezca el Spinner de carga 
      setProductos(JSON.parse(productosGuardados));
      setTimeout(() => setLoading(false), 300); // 300ms de spinner
    } else {
      const fetchProductos = async () => {
        setLoading(true); // cuando empieza a solicitar (get) los productos de la API se define como true el que aparezca el Spinner de carga 
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
          // Guarda en localStorage la primera vez
          localStorage.setItem("productos", JSON.stringify([...productosAdaptados, ...productosLocalesAdaptados]));
        } catch (err) {
          console.error("Error al cargar productos:", err);
        } finally {
          setLoading(false);// Cuando termina el (get) a la API se cambia el estado a false para que deje de aparecer el Spinner de carga
        }
      };
      fetchProductos();
    }
  }, []);

  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    if (productos.length > 0) {
      localStorage.setItem("productos", JSON.stringify(productos));
    }
  }, [productos]);

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
      setCategoriaSeleccionada,
      loading, // Se importan el estado actual del Spinner de carga junto con su funcion para cambiarlo
      setLoading
    }}>
      {children}
    </ProductosContext.Provider>
  );
}