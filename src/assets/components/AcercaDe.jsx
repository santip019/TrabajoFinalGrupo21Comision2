import { Card, Row, Badge } from  "react-bootstrap";
import { FaGithub } from "react-icons/fa";

function AcercaDe() {

  const participantes = [
    {
      nombre: "Santiago Padilla",
      github: "santip019",
      url: "https://github.com/santip019",
      img: "https://github.com/santip019.png",
    },
    {
      nombre:"Valentina Efimov",
      github: "Valen-08",
      url: "https://github.com/Valen-08",
      img: "https://github.com/Valen-08.png",
    },
    {
      nombre:"Antonela Cruz",
      github: "antocruz06",
      url: "https://github.com/antocruz06",
      img: "https://github.com/antocruz06.png",
    },
    {
      nombre:"Maximiliano Calpanchay",
      github: "maxiicalpa",
      url: "https://github.com/maxiicalpa",
      img: "https://github.com/maxiicalpa.png",
    },
    {
      nombre:"Bruno Fernandez",
      github: "brunofernandez877",
      url: "https://github.com/brunofernandez877",
      img: "https://github.com/brunofernandez877.png",
    },
  ];
  return (
    <div>
      <h2>Acerca de</h2>
      <Row>
        {participantes.map((participante) => (
          <Card key={participante.github} style={{ width: "12rem", margin: "1rem" }}>
            <Card.Img
              variant="top"
              src={participante.img}
              alt={participante.nombre}
              style={{ width: "100%", borderRadius: "50%", marginTop: "1rem", objectFit: "cover", height: "120px" }}
            />
            <Card.Body className="text-center">
              <Card.Title>{participante.nombre}</Card.Title>
              <a
                href={participante.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Badge bg="dark" className="d-inline-flex align-items-center gap-1 justify-content-center">
                  <FaGithub style={{ fontSize: "1.1em" }} />
                  {participante.github}
                </Badge>
              </a>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  );
}
export default AcercaDe;