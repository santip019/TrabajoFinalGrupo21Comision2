import { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Esta función sirve para registro y edición
export function validarYGuardarUsuario({ email, password, confirmar, name }, esEdicion = false, emailOriginal = "") {
  // Solo validaciones lógicas, no de formato
  if (!esEdicion && password.length < 6) return { ok: false, error: "Contraseña muy corta" };
  if (password !== confirmar) return { ok: false, error: "Las contraseñas no coinciden" };

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (
    (!esEdicion && usuarios.some(u => u.email === email)) ||
    (esEdicion && email !== emailOriginal && usuarios.some(u => u.email === email))
  ) {
    return { ok: false, error: "Ese correo ya está registrado" };
  }

  if (esEdicion) {
    const idx = usuarios.findIndex(u => u.email === emailOriginal);
    if (idx === -1) return { ok: false, error: "Usuario no encontrado" };
    usuarios[idx].email = email;
    usuarios[idx].name = name;
    if (password) usuarios[idx].password = password;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    // Actualiza el usuario en sesión
    const sessionUser = { ...usuarios[idx], password: undefined };
    localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
    return { ok: true };
  } else {
    usuarios.push({ email, password, name, role: "user" });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    return { ok: true };
  }
}

// Componente reutilizable
function FormularioUsuario({ modo = "registro", usuarioActual = null, onSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: usuarioActual?.email || "",
    name: usuarioActual?.name || "",
    password: "",
    confirmar: ""
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    const esEdicion = modo === "edicion";
    const res = validarYGuardarUsuario(
      { ...form },
      esEdicion,
      usuarioActual?.email || ""
    );
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setError("");
    setExito(esEdicion ? "Perfil actualizado correctamente" : "Registro exitoso");
    setTimeout(() => {
      setExito("");
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(esEdicion ? "/principal" : "/principal/login");
      }
    }, 1500);
  };

  return (
    <div className={`d-flex justify-content-center ${modo === "registro" ? "registrar" : "editar-user mt-5"}`}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>{modo === "edicion" ? "Editar Perfil" : "REGISTRARSE"}</h2>
        <h3>{modo === "edicion" ? "" : "Bienvenido"}</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {exito && <Alert variant="success">{exito}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
          />
          <Form.Control.Feedback type="invalid">
            Ingrese un email válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
          />
          <Form.Control.Feedback type="invalid">
            El nombre es obligatorio.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{modo === "edicion" ? "Nueva contraseña" : "Contraseña"}</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={modo === "edicion" ? "Dejar en blanco para no cambiar" : ""}
            minLength={modo === "edicion" && !form.password ? undefined : 6}
            required={modo !== "edicion"}
          />
          <Form.Control.Feedback type="invalid">
            La contraseña debe tener al menos 6 caracteres.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            {modo === "edicion" ? "Confirmar nueva contraseña" : "Confirmar contraseña"}
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmar"
            value={form.confirmar}
            onChange={handleChange}
            placeholder={modo === "edicion" ? "Dejar en blanco para no cambiar" : ""}
            minLength={modo === "edicion" && !form.password ? undefined : 6}
            required={modo !== "edicion"}
          />
          <Form.Control.Feedback type="invalid">
            Las contraseñas deben coincidir.
          </Form.Control.Feedback>
        </Form.Group>
        {modo === "edicion" ? (
          <Button type="submit" className="mt-3 w-100" variant="dark">
            Guardar cambios
          </Button>
        ) : (
          <Row>
            <Button type="submit" variant="dark" className="mt-4 w-100">
              Registrarse
            </Button>
            <Col>
            <h5 className="login-texto-2 mt-4">
              ¿Ya tienes una cuenta? 
              <Button variant="link" href="/principal/login">Iniciar Sesión</Button>
            </h5>
          </Col>
          </Row>
        )}
      </Form>
    </div>
  );
}

export default FormularioUsuario;