import AppRoutes from './assets/components/AppRoutes.jsx';
function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
          <AppRoutes />
          {/* Componente con todas las rutas */}
      </main>
    </div>
  );
}

export default App;
