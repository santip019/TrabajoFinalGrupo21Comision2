import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useUserLocalStorage } from "../hooks/useUserLocalStorage";

const FavoritosContext = createContext();

export function useFavoritos() {
  return useContext(FavoritosContext);
}

export function FavoritosProvider({ children }) {
  const { user, loadingUser } = useAuth();
  const [favoritos, setFavoritos] = useUserLocalStorage("favoritos", user, []);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  // Nueva función para limpiar favoritos
  const limpiarFavoritos = () => setFavoritos([]);

  return (
    <FavoritosContext.Provider
      value={{ favoritos, toggleFavorito, limpiarFavoritos }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}
