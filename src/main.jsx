import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { ProductosProvider } from './context/ProductosContext'; // <-- Importa el proveedor

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ProductosProvider>
            <App />
          </ProductosProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)