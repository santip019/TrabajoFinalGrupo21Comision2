import { Card, Badge, Carousel, Container, Row, Col } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import integrantes from "../assets/data/integrantes.json";
import { useSlidesCarrusel } from "../hooks/useSlidesCarrusel";


function AcercaDe() {
  const slides = useSlidesCarrusel(integrantes, [
    { max: 576, value: 1 },
    { max: Infinity, value: 2 },
  ]);

  return (
    <Container className="my-4">
      <h2 className="titulos d-flex align-center">
        <Badge bg="none">Nosotros</Badge>
      </h2>
      <Row className="align-items-center">
        {/* Columna izquierda: Texto */}
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h3" className="mb-3 text-center">
                Nuestro proyecto
              </Card.Title>
              <Card.Text className="text-center">
                Este proyecto es un <b>e-commerce web</b> desarrollado para la
                materia <b>Programación Visual</b>. Permite a los usuarios
                explorar productos, agregarlos al carrito, gestionar favoritos,
                registrarse, iniciar sesión y acceder a un panel de
                administración.
                <br />
                Está construido con <b>React</b>, utiliza <b>React Bootstrap</b>{" "}
                para la interfaz, <b>React Router</b> para la navegación, y
                gestiona datos con <b>contextos</b> y <b>localStorage</b>.<br />
                Incluye componentes reutilizables, manejo de usuarios, roles
                (admin/cliente), y un diseño responsivo y moderno.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* Columna derecha: Carrusel */}
        <Col xs={12} md={6}>
          <Carousel
            controls={false}
            indicators={true}
            interval={5000}
            className="carrusel-integrantes"
          >
            {slides.map((grupo, idx) => (
              <Carousel.Item key={idx}>
                <div className="d-flex justify-content-end gap-3 flex-wrap">
                  {grupo.map((participante) => (
                    <Card
                      key={participante.id}
                      style={{
                        width: "13rem",
                        margin: "1rem",
                        height: "18rem",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={participante.img}
                        alt={participante.nombre}
                        style={{
                          width: "80%",
                          borderRadius: "50%",
                          marginTop: "2rem",
                          objectFit: "cover",
                          height: "150px",
                          alignSelf: "center",
                        }}
                      />
                      <Card.Body className="text-center">
                        <Card.Title>{participante.nombre}</Card.Title>
                        <a
                          href={participante.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                          aria-label={`GitHub de ${participante.nombre}`}
                        >
                          <Badge
                            bg="dark"
                            className="d-inline-flex align-items-center gap-1 justify-content-center"
                          >
                            <FaGithub style={{ fontSize: "1.1em" }} />
                            {participante.github}
                          </Badge>
                        </a>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default AcercaDe;
