import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // Lee el usuario de sessionUser al iniciar
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem("sessionUser");
    return session ? JSON.parse(session) : null;
  });

  // Mantiene la sesión al recargar
  useEffect(() => {
    const session = localStorage.getItem("sessionUser");
    if (session && !user) setUser(JSON.parse(session));
  }, []);

  // Login: valida y guarda sessionUser
  const login = (email, password) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.email === email && userData.password === password) {
      const sessionUser = { email: userData.email, role: userData.role || "user" };
      setUser(sessionUser);
      localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
      return { success: true };
    }
    return { success: false, message: "Credenciales inválidas" };
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("sessionUser");
  };

  // Registro
  const register = (email, password, role = "user") => {
    localStorage.setItem("user", JSON.stringify({ email, password, role }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}