import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { FavoritosProvider } from './context/FavoritosContext';
import { CarritoProvider } from './context/CarritoContext';
import { ProductosProvider } from './context/ProductosContext'; // <-- Importa el proveedor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>
          <FavoritosProvider>
            <App />
          </FavoritosProvider>
        </CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  </StrictMode>
)