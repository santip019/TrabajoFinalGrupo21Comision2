import { Accordion, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Faq() {
  const navigate = useNavigate();

  const preguntas = [
    {
      pregunta: "¿Cuánto tarda el envío?",
      respuesta: "Los envíos demoran entre 2 a 5 días hábiles dependiendo tu zona."
    },
    {
      pregunta: "¿Cómo puedo pagar?",
      respuesta: "Aceptamos tarjetas de crédito, débito, transferencias y pagos por QR."
    },
    {
      pregunta: "¿Qué hago si mi producto llegó dañado?",
      respuesta: "Contactanos en la sección de Devoluciones para ayudarte con el reemplazo o reembolso."
    }
  ];

  return (
    <div className="container">
      <h3 className="mb-4">Preguntas Frecuentes</h3>
      <div className="mb-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>← Volver atrás</Button>
      </div>
      <Accordion>
        {preguntas.map((item, i) => (
          <Accordion.Item eventKey={i.toString()} key={i}>
            <Accordion.Header>{item.pregunta}</Accordion.Header>
            <Accordion.Body>{item.respuesta}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default Faq;
