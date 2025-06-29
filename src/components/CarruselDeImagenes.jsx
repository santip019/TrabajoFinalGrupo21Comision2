import Carousel from "react-bootstrap/Carousel";

function CarruselDeImagenes({ imagenes }) {
  return (
    <Carousel
      indicators={false}
      controls={true}
      interval={3000} // Avanza automáticamente cada 3 segundos
      wrap={true}
    >
      {imagenes.map((img, idx) => (
        <Carousel.Item key={idx}>
          <div className={img.includes("productos") ? "imagenes-principal-contenedor" : "imagenes-promocion-contenedor"}>
            <img src={img} alt={`slide-${idx}`} className={img.includes("productos") ? "imagenes-principal" : "imagenes-promocion"}/>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarruselDeImagenes;