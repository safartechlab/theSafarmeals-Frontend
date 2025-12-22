import { Container, Row, Col } from "react-bootstrap";
import { FaStoreAlt, FaRegClock } from "react-icons/fa";

const Shopfooter = () => {
  return (
    <footer className="bg-light border-top">
      <Container fluid className="py-3 px-4">
        <Row className="align-items-center">
          {/* LEFT – BRAND */}
          <Col md={4} className="text-center text-md-start mb-2 mb-md-0">
            <div className="fw-semibold text-dark d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <FaStoreAlt />
              SafarMeals • Shop Console
            </div>
          </Col>

          {/* CENTER – INFO */}
          <Col md={4} className="text-center mb-2 mb-md-0">
            <small className="text-muted">
              Manage orders, shops & customers efficiently
            </small>
          </Col>

          {/* RIGHT – TIME */}
          <Col md={4} className="text-center text-md-end">
            <small className="text-muted d-flex align-items-center justify-content-center justify-content-md-end gap-2">
              <FaRegClock />
              {new Date().toLocaleDateString()} | v1.0.0
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Shopfooter;
