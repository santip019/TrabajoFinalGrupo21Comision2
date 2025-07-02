import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setValidated(true);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    
    const res = login(email, password);
    if (res.success) {
      navigate("/principal", { state: { bienvenido: true, nombre: res.name } });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="iniciar-sesion d-flex justify-content-center">
      <Col md={12} sm={12} className="d-flex align-items-center justify-content-center">
        <Form
          className="contenedor-iniciar"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <h2 className="login-titulo">INICIAR SESIÓN</h2>
          <h3 className="login-texto">¡Bienvenido de vuelta!</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group>
            <Form.Label className="login-campos">Email</Form.Label>
            <Form.Control
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              type="email"
              isInvalid={validated && !/\S+@\S+\.\S+/.test(email)}
            />
            <Form.Control.Feedback type="invalid">
              Ingrese un correo válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="login-campos">Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              isInvalid={validated && (!password || password.length < 6)}
            />
            <Form.Control.Feedback type="invalid">
              La contraseña debe tener al menos 6 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col>
              <Button variant="secondary" className="mt-4 w-100" href="/">Volver</Button>
            </Col>
            <Col md={8} sm={8}>
              <Button type="submit" variant="dark" className="mt-4 w-100">Ingresar</Button>
            </Col>
          </Row>
          <Col>
            <h5 className="login-texto-2 mt-4">
              ¿No tienes una cuenta?
              <Button variant="link" href="/principal/registrarse">Registrarse</Button>
            </h5>
          </Col>
        </Form>
      </Col>
    </div>
  );
}

export default Login;