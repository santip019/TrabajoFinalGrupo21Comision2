import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useProductos } from "../context/ProductosContext";

function EditarProducto() {
  const { productos, setProductos } = useProductos();
  const { id } = useParams();
  const navigate = useNavigate();
  const productoOriginal = productos.find((a) => String(a.id) === String(id));

  const [formData, setFormData] = useState({
    id: "",
    image: "",
    title: "",
    price: "",
    description: "",
    category: "",
    status: false,
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
    navigate("/Layout");
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
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3-form">
          <Form.Label>Favorito</Form.Label>
          <Form.Control
            type="checkbox"
            name="favourite"
            checked={formData.favourite}
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
