import { createContext, useContext, useState, useEffect } from "react";
import usuarios from "../assets/usuarios.json";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    //Precargar usuarios desde el JSON si no existen en localStorage
    if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
    // Simula carga de usuario desde localStorage
    const sessionUser = localStorage.getItem("sessionUser");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    setLoadingUser(false);
  }, []);

  const login = (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const userData = usuarios.find(user => user.email === email && user.password === password);
    if (userData) {
      const sessionUser = { email: userData.email, role: userData.role || "user", name: userData.name };
      setUser(sessionUser);
      localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
      return { success: true, name: userData.name };
    }
    return { success: false, message: "Credenciales inválidas" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sessionUser");
    navigate("/principal");
  };

  const register = (email, password, name, role = "user") => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({ email, password, name, role });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };

  return (
    <AuthContext.Provider value={{ user, loadingUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}