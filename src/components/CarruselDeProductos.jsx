import Carousel from "react-bootstrap/Carousel";
import ProductoCard from "./ProductoCard";

function CarruselDeProductos({ productos }) {
  const productosPorSlide = 5;

  // Divide los productos en grupos de 5, sin repetir ni rellenar
  const slides = [];
  for (let i = 0; i < productos.length; i += productosPorSlide) {
    slides.push(productos.slice(i, i + productosPorSlide));
  }

  // Si no hay productos, no renderiza nada
  if (slides.length === 0) return null;

  return (
    <Carousel
      indicators={false}
      controls={slides.length > 1}
      interval={null}
      wrap={false}
      nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
      prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
    >
      {slides.map((grupo, idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-center gap-3">
            {grupo.map((producto, i) => (
              <div key={producto.id + "-" + i} style={{ width: "14rem" }}>
                <ProductoCard producto={producto} />
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarruselDeProductos;
