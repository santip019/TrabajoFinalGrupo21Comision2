import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

// Eliminamos la importación de react-icons/fa para resolver el error de compilación
// y usamos un SVG en línea para el icono.

function ErrorPage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        {/* Icono de advertencia de react-icons */}
        <FaExclamationTriangle size={100} className="text-warning mb-4" />
        <h1 className="display-1 fw-bold text-dark">404</h1>
        <p className="fs-3 text-dark"> <span className="text-danger">¡Vaya!</span> Página no encontrada.</p>
        <p className="lead text-secondary">
          La página que estás buscando no existe.
        </p>
        {/* Botón para volver a la página de inicio */}
        <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
      </div>
    </div>
  );
}

export default ErrorPage;

