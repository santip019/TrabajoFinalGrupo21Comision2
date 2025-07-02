import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { useProductos } from "../context/ProductosContext";

function FormularioProducto({ esEdicion = false }) {
  const { productos, setProductos } = useProductos();
  const navigate = useNavigate();
  const { id } = useParams();

  const categorias = [
    ...new Set(productos.map(p=> p.category).filter(Boolean)),
  ]; // Filtrar categorías únicas y evitar valores vacíos

  // Si es edición, busca el producto original
  const productoOriginal = esEdicion
    ? productos.find((a) => a.id === Number(id))
    : null;
  
  // Estado inicial según si es edición o creación
  const nextId = productos.length > 0
    ? Math.max(...productos.map(p => Number(p.id))) + 1
    : 1;

  const [producto, setProducto] = useState(
    esEdicion && productoOriginal
      ? productoOriginal
      :{
    id: nextId,
    title: "",
    brand: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" },
    discount: "",
    dateOfEntry: "",
    delivery: false,
    status: true,
  });
  // Estado para validar el formulario
  // Se puede usar para mostrar mensajes de error o estilos de validación
  const [validated, setValidated] = useState(false);

  // Si es edición, actualiza el estado cuando cambia el producto original
  useEffect(() => {
    if (esEdicion && productoOriginal) {
      setProducto({ ...productoOriginal });
    }
  }, [esEdicion, productoOriginal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "delivery" || name === "estado") {
      setProducto({ ...producto, [name]: checked });
    } else if (name === "rate" || name === "count") {
      setProducto({
        ...producto,
        rating: { ...producto.rating, [name]: value }
      });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    if (esEdicion) {
      // Editar producto
      const nuevosProductos = productos.map((a) =>
        a.id === producto.id ? producto : a
      );
      setProductos(nuevosProductos);
    } else {
      // Crear producto
      setProductos([...productos, producto]);
    }
    navigate("/Layout");
  };

  // Si es edición y no existe el producto, muestra mensaje
  if (esEdicion && !productoOriginal) {
    return <h2>Producto no encontrado</h2>;
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="w-100 p-4 shadow me-5 ms-5">
        <Card.Title className="editar-titulo">{esEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}</Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="title"
                  onChange={handleChange}
                  value={producto.title}
                  required
                  minLength={3}
                />
                <Form.Control.Feedback type="invalid">
                  El nombre es obligatorio y debe tener al menos 3 caracteres.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  name="brand"
                  onChange={handleChange}
                  value={producto.brand}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  La marca es obligatoria.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={producto.price}
                  required
                  min={1}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un precio válido mayor a 0.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="description"
                  onChange={handleChange}
                  value={producto.description}
                  required
                  minLength={10}
                />
                <Form.Control.Feedback type="invalid">
                  La descripción es obligatoria y debe tener al menos 10 caracteres.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="category"
                  onChange={handleChange}
                  value={producto.category}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  La categoría es obligatoria.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                  name="image"
                  onChange={handleChange}
                  value={producto.image}
                  required
                  type="url"
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese una URL de imagen válida.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rating (Puntaje)</Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  onChange={handleChange}
                  value={producto.rating.rate}
                  min={0}
                  max={5}
                  step={0.1}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un puntaje válido (0 a 5).
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rating (Cantidad de votos)</Form.Label>
                <Form.Control
                  type="number"
                  name="count"
                  onChange={handleChange}
                  value={producto.rating.count}
                  min={0}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese la cantidad de votos.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descuento (%)</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  onChange={handleChange}
                  value={producto.discount}
                  min={0}
                  max={100}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un descuento válido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de ingreso</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfEntry"
                  onChange={handleChange}
                  value={producto.dateOfEntry}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese la fecha de ingreso.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Entrega disponible"
                  name="delivery"
                  checked={producto.delivery}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {esEdicion ? "Guardar Cambios" : "Guardar"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default FormularioProducto;