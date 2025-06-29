import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Alert, Container, Col, Row } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div>
      <title>Iniciar sesión</title>
      {/*<h1>¡Accede a mas funciones inciando sesion!</h1>
         SACAR ESTILO INLINE DE CONTAINER 
      */}
      <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <Form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onChange={e => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="mt-3">Ingresar</Button>
          <Row> 
            <Col>
              <Button className="mt-3" href="/">Volver</Button>
            </Col>
            <Col>
              <Button className="mt-3" href="/principal/registrarse">Registrarse</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
