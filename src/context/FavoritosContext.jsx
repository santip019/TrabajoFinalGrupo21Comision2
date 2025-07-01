import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritosContext = createContext();

export function useFavoritos() {
  return useContext(FavoritosContext);
}

export function FavoritosProvider({ children }) {
  const { user, loadingUser } = useAuth();
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos del usuario al iniciar sesión
  useEffect(() => {
    if (user && user.email) {
      const favs = localStorage.getItem(`favoritos_${user.email}`);
      setFavoritos(favs ? JSON.parse(favs) : []);
    }
  }, [user, loadingUser]);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`favoritos_${user.email}`, JSON.stringify(favoritos));
    }
  }, [favoritos, user, loadingUser]);

  useEffect(() => {
    if (!user) setFavoritos([]);
  }, [user]);
  
  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  // Nueva función para limpiar favoritos
  const limpiarFavoritos = () => setFavoritos([]);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, limpiarFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
}