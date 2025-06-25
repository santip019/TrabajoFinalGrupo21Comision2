import Carousel from "react-bootstrap/Carousel";

function CarruselDeImagenes({ imagenes }) {
  return (
    <Carousel indicators={false} controls={true} interval={null} wrap={true}>
      {imagenes.map((img, idx) => (
        <Carousel.Item key={idx}>
          <img src={img} alt={`slide-${idx}`} style={{ width: "100%", height: "300px", objectFit: "cover" }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarruselDeImagenes;