import AppRoutes from './components/AppRoutes.jsx';
import { useProductos } from './context/ProductosContext.jsx';// Se importa el la funcion useProductos del contexto para el Spinner de carga 
import {Spinner} from "react-bootstrap";
function App() {
    const { loading } = useProductos();

  return (
    <div className="d-flex flex-column min-vh-100">
      {loading && 
      <div className="pantalla-carga">
        <Spinner animation="border" variant="success" role="status"></Spinner>
      </div>} {/*Pregunta si el valor de loading = true, si es asi entonces renderza el Spinner, sino no pasa nada*/}
      <main className="flex-grow-1">
          <AppRoutes />{/* Componente con todas las rutas */}
      </main>
    </div>
  );
}

export default App;
