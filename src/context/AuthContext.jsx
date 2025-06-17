import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // Recupera el usuario de localStorage si existe
  const [user, setUser] = useState(() => {
    const userGuardado = localStorage.getItem("user");
    return userGuardado ? JSON.parse(userGuardado) : null;
  });

  const login = (username, role) => {
    const usuario = { username, role };
    setUser(usuario);
    localStorage.setItem("user", JSON.stringify(usuario));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}