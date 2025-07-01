import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import ProductoCard from "./ProductoCard";

function CarruselDeProductos({ productos }) {
  const [productosPorSlide, setProductosPorSlide] = useState(5);

  // Detectar tamaño de pantalla y ajustar cantidad de productos por slide
  useEffect(() => {
    function actualizarCantidad() {
      if (window.matchMedia("(max-width: 576px)").matches) {
        setProductosPorSlide(1); // Pantalla pequeña
      } else if (window.matchMedia("(max-width: 992px)").matches) {
        setProductosPorSlide(3); // Pantalla mediana
      } else {
        setProductosPorSlide(4); // Pantalla grande
      }
    }
    actualizarCantidad();
    window.addEventListener("resize", actualizarCantidad);
    return () => window.removeEventListener("resize", actualizarCantidad);
  }, []);

  // Divide los productos en grupos según productosPorSlide
  const slides = [];
  for (let i = 0; i < productos.length; i += productosPorSlide) {
    slides.push(productos.slice(i, i + productosPorSlide));
  }

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