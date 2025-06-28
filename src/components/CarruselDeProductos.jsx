import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CarruselDeProductos({ productos, onVerDetalles }) {
  const productosPorSlide = 5;

  // Si hay menos de 5 productos, repite desde el principio hasta llegar a 5
  let productosExtendidos = [...productos];
  while (productosExtendidos.length < productosPorSlide && productosExtendidos.length > 0) {
    productosExtendidos = productosExtendidos.concat(productos.slice(0, productosPorSlide - productosExtendidos.length));
  }

  // Genera slides en bucle: cada slide tiene 5 productos, avanzando de a 5, y si faltan productos repite desde el inicio
  const slides = [];
  for (let i = 0; i < productosExtendidos.length; i += productosPorSlide) {
    let grupo = productosExtendidos.slice(i, i + productosPorSlide);
    // Si es el último grupo y faltan productos, repite desde el principio
    if (grupo.length < productosPorSlide) {
      grupo = grupo.concat(productosExtendidos.slice(0, productosPorSlide - grupo.length));
    }
    slides.push(grupo);
  }

  // Si hay solo un slide, duplícalo para que el Carousel muestre los controles
  let slidesToShow = slides;
  if (slides.length === 1) {
    slidesToShow = [...slides, slides[0]];
  }

  return (
    <Carousel
      indicators={false}
      controls={true}
      interval={null}
      wrap={true} // Esto hace que el carrusel sea en bucle
      nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
      prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
    >
      {slidesToShow.map((grupo, idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-center gap-3">
            {grupo.map((producto, i) => (
              <Card
                key={producto.id + "-" + i}
                style={{ width: "14rem", cursor: "pointer" }}
                className="border-0"
                onClick={() => onVerDetalles(producto.id)}
              >
                <Card.Img
                  variant="top"
                  src={producto.image || producto.imagen || "https://via.placeholder.com/180"}
                  style={{ height: "140px", objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>
                    {producto.title || producto.nombre}
                  </Card.Title>
                  <Card.Text>
                    <b>${producto.precio || producto.price}</b>
                  </Card.Text>
                  <Button
                    variant="info"
                    onClick={e => {
                      e.stopPropagation();
                      onVerDetalles(producto.id);
                    }}
                  >
                    Ver Detalles
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarruselDeProductos;