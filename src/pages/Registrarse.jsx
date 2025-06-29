import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Alert, Container } from "react-bootstrap";

function Registro() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmar: ""
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError("Correo inválido");
    if (form.password.length < 6) return setError("Contraseña muy corta");
    if (form.password !== form.confirmar) return setError("Las contraseñas no coinciden");
    register(form.email, form.password, form.name);
    setExito("Registro exitoso");
    setTimeout(() => navigate("/principal/login"), 1500);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <Form onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {exito && <Alert variant="success">{exito}</Alert>}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={form.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="name" value={form.name} onChange={handleChange} maxLength={6} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control type="password" name="confirmar" value={form.confirmar} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" className="mt-3">Registrarse</Button>
      </Form>
    </Container>
  );
}

export default Registro;