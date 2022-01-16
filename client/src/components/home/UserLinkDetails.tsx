import { FunctionComponent } from "react";

import {
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

import QRCode from "react-qr-code";

export const UserLinkDetails: FunctionComponent = ({ userLinkObject }: any) => {

  const RenderUserLinkDetails = () => {
    if (userLinkObject) {

      return (

        <>

          <Row>
            <Col lg="6">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <u className="text-danger">{userLinkObject.short_url}</u>
                    <p><small>created on: {new Date(userLinkObject.created_at).toLocaleDateString()}</small></p>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <Card.Body>
                  <Button variant="danger" size="sm">Copy</Button>
                  &nbsp;
                  <Button variant="danger" size="sm">Edit</Button>
                  &nbsp;
                  <Button variant="danger" size="sm">Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col lg="12">
              <Card>
                <Card.Body>
                  <Card.Title>Original Url</Card.Title>
                  <hr></hr>
                  {userLinkObject.original_url}
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card>
                <Card.Body>
                  <Card.Title>QR Code</Card.Title>
                  <hr></hr>
                  <div className="text-center">
                    <QRCode value={userLinkObject.short_url} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card>
                <Card.Body>
                  <Card.Title>Statistics</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </>

      );

    } else {
      return <>Click on a link to get details</>;
    }
  }

  return (
    <>
      <RenderUserLinkDetails />
    </>
  );
}
