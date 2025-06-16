import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

function NuevoProducto({ agregarProducto }) {
  const [producto, setProducto] = useState({
    id: crypto.randomUUID(), // o usar Date.now(), si no usás UUID
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    imagen: "",
    estado: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarProducto(producto);
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }} className="p-4 shadow">
        <Card.Title>Agregar Nuevo Producto</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" onChange={handleChange} value={producto.nombre} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name="precio" onChange={handleChange} value={producto.precio} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control name="descripcion" onChange={handleChange} value={producto.descripcion} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control name="categoria" onChange={handleChange} value={producto.categoria} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control name="imagen" onChange={handleChange} value={producto.imagen} required />
          </Form.Group>
          <Button variant="primary" type="submit">Guardar</Button>
        </Form>
      </Card>
    </div>
  );
}

export default NuevoProducto;