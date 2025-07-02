import Carousel from "react-bootstrap/Carousel";
import ProductoCard from "./ProductoCard";
import { useSlidesCarrusel } from "../hooks/useSlidesCarrusel";

function CarruselDeProductos({ productos }) {
  // Usa el hook personalizado para obtener los slides responsivos
  const slides = useSlidesCarrusel(productos, [
    { max: 576, value: 1 },
    { max: 992, value: 3 },
    { max: Infinity, value: 4 }
  ]);

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