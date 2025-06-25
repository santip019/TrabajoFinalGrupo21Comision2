import Carousel from "react-bootstrap/Carousel";

function CarruselDeImagenes({ imagenes }) {
  return (
    <Carousel indicators={false} controls={true} interval={null} wrap={true}>
      {imagenes.map((img, idx) => (
        <Carousel.Item key={idx}>
          <img src={img} alt={`slide-${idx}`} className={img.includes("productos") ? "imagenes-principal" : "imagenes-promocion"}/>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarruselDeImagenes;