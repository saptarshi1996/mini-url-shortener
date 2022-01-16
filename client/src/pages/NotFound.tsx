import { FunctionComponent } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export const NotFound: FunctionComponent = () => {
  return (
    <>
      <Container style={{ "paddingTop": "6%" }}>
        <Row className="justify-content-center">
          <Col lg="12" className="text-center">
            <h1 className="text-danger">Link Not Found. Please check the url again and retry.</h1>
            <Button variant="danger" href="/">Go Back</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
