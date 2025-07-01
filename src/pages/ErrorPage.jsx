import { Link } from 'react-router-dom';
// Eliminamos la importación de react-icons/fa para resolver el error de compilación
// y usamos un SVG en línea para el icono.

function ErrorPage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        {/* Icono de exclamación como SVG en línea */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="currentColor"
          className="text-warning mb-4"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233A1.129 1.129 0 0 0 1.12 14h13.76a1.13 1.13 0 0 0 .956-1.734L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
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

