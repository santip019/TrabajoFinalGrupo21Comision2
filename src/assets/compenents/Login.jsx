import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, role); // simulamos autenticación
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "24rem" }} className="p-4 shadow">
        <Card.Title>Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit">Ingresar</Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
