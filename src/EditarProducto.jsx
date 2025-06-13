import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditarProducto({ productos, setProductos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const productoOriginal = productos.find((a) => a.id === id);

  const [formData, setFormData] = useState({
    id: "",
    imagen: "",
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    favorito: false,
  });

  useEffect(() => {
    if (productoOriginal) {
      setFormData(productoOriginal);
    }
  }, [productoOriginal]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosProductos = productos.map((a) => (a.id === id ? formData : a));
    setProductos(nuevosProductos);
    navigate("/");
  };

  if (!productoOriginal) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <div>
      <h2>Modifique los datos del producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3-form">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Favorito</Form.Label>
          <Form.Control
            type="checkbox"
            name="favorito"
            checked={formData.favorito}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
      </Form>
    </div>
  );
}

export default EditarProducto;
