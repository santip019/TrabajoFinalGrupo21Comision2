import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritosContext = createContext();

export function useFavoritos() {
  return useContext(FavoritosContext);
}

export function FavoritosProvider({ children }) {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos del usuario al iniciar sesión
  useEffect(() => {
    if (user) {
      const favs = JSON.parse(localStorage.getItem(`favoritos_${user.email}`)) || [];
      setFavoritos(favs);
    } else {
      setFavoritos([]);
    }
  }, [user]);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favoritos_${user.email}`, JSON.stringify(favoritos));
    }
  }, [favoritos, user]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}