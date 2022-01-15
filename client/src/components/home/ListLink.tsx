import { FunctionComponent } from "react";
import { Form, ListGroup, Badge, Col, Row } from "react-bootstrap";

import { Paginator } from "../Paginator";

export const ListLink: FunctionComponent = () => {

  const getLinkDetails = (id: number) => { 
    console.log(id);
  }

  return (
    <>
      <Paginator />
      <ListGroup>
        <ListGroup.Item
          className="d-flex p-3 justify-content-between align-items-start"
        >
          <Form.Check 
            type="checkbox"
            id="custom-checkbox"
            label=""
            color="danger"
            isInvalid
          />
          <Row onClick={(id) => getLinkDetails(12)} style={{ "cursor": "pointer" }}>
            <Col lg="10">
              <div className="ms-2 me-auto">
                <div className="fw-bold">https://stackoverflow.com/questions/60444734/warning-functions-are-not-valid-as-a-react-child-this-may-happen-if-you-return</div>
                <span className="fw-bold text-danger">http://localhost:8000/mus/sr/4393a6c1</span>
              </div>

            </Col>
            <Col lg="2">
              <Badge className="p-3" bg="danger" style={{ "fontSize": "15px" }}>
                Clicks: 14
              </Badge>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
