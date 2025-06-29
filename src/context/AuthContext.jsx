import { createContext, useContext, useState, useEffect } from "react";
import usuarios from "../assets/usuarios.json";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem("sessionUser");
    return session ? JSON.parse(session) : null;
  });

  useEffect(() => {
    if (!localStorage.getItem("usuarios")) {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }, []);

  const login = (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const userData = usuarios.find(user => user.email === email && user.password === password);
    if (userData) {
      const sessionUser = { email: userData.email, role: userData.role || "user", name: userData.name };
      setUser(sessionUser);
      localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
      return { success: true };
    }
    return { success: false, message: "Credenciales inválidas" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sessionUser");
  };

  const register = (email, password, name, role = "user") => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({ email, password, name, role });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}