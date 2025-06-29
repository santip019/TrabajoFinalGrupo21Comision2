import Carousel from "react-bootstrap/Carousel";
import ProductoCard from "./ProductoCard"; // Importa tu componente reutilizable

function CarruselDeProductos({ productos }) {
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
      wrap={true}
      nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
      prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
    >
      {slidesToShow.map((grupo, idx) => (
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