import AppRoutes from './components/AppRoutes.jsx';
import { BrowserRouter } from 'react-router';
function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <BrowserRouter>
          <AppRoutes />{/* Componente con todas las rutas */}
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
