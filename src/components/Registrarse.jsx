import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Correo inválido");
    if (password.length < 6) return setError("Contraseña muy corta");
    if (password !== confirmar) return setError("Las contraseñas no coinciden");
    register(email, password);
    setExito("Registro exitoso");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {exito && <Alert variant="success">{exito}</Alert>}
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control value={email} onChange={e => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirmar contraseña</Form.Label>
        <Form.Control type="password" value={confirmar} onChange={e => setConfirmar(e.target.value)} required />
      </Form.Group>
      <Button type="submit" className="mt-3">Registrarse</Button>
    </Form>
  );
}

export default Registro;