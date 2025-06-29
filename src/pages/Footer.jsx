import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-waldos">
      <Container>
        <Row className="align-items-start">
          {/* Logo y redes */}
          <Col md={3} className="mb-4 mb-md-0 d-flex flex-column align-items-start">
            <img
              src="/src/assets/images/LogoPaguinaWaldo's.png"
              alt="Logo"
              className="footer-logo"
            />
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <FaTwitter />
              </a>
              <a href="https://wa.me/5493884961309" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                <FaWhatsapp />
              </a>
            </div>
          </Col>
          {/* Horarios y teléfonos */}
          <Col md={5} className="mb-4 mb-md-0">
            <h5>Atención al Cliente</h5>
            <p className="footer-horarios">
              <b>Horarios:</b> Lunes a Sábado de 9:00 a 20:00<br />
              <b>Teléfonos:</b> 0800-123-4567 / (011) 4321-9876
            </p>
          </Col>
          {/* Suscripción */}
          <Col md={4}>
            <h5>Recibí promociones y novedades</h5>
            <Form className="d-flex gap-2 footer-form">
              <Form.Control
                type="email"
                placeholder="Tu correo electrónico"
                className="footer-input"
              />
              <Button variant="success" type="submit">
                Suscribirse
              </Button>
            </Form>
            <small className="text-muted">No compartimos tu email con terceros.</small>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <small>&copy; {new Date().getFullYear()} Waldo's - Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;