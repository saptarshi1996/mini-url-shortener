import {
  FunctionComponent,
  useState,
  ChangeEvent,
  Dispatch,
} from 'react';

import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import { Navigate } from "react-router-dom";

import { authActions } from "../actions";
import { LoginInterface, AlertProps } from "../interfaces";
import { AlertDismissible } from "../components";

export const Login: FunctionComponent = () => {

  const dispatch: Dispatch<any> = useDispatch();
  const selector: any = useSelector((state: any) => state.auth);

  const [show, setShow] = useState(true);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  } as LoginInterface);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });

  };

  const handleLoginFormSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(authActions.userLogin(login));
  };

  const AfterLoginNavigation = () => {
    if (selector.loggedIn) {
      return (
        <Navigate to="/" />
      )
    } else { return null; }
  }

  return (
    <>
      <Container style={{ paddingTop: "10%" }}>
        <Row className="justify-content-center">
          <Col lg="5">
            <Card>
              <Card.Body>
                <Card.Title className="text-center text-uppercase mt-2">
                  <h4>Login</h4>
                </Card.Title>

                <hr />

                <AlertDismissible {...{
                  message: "login error",
                  show: show,
                  setShow: setShow,
                }} />

                <Form onSubmit={handleLoginFormSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleLoginChange} name="email" type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleLoginChange} name="password" type="password" placeholder="Enter Password" />
                  </Form.Group>

                  <Form.Group className="d-grid gap-2">
                    <Button variant="danger" type="submit">
                      Submit
                    </Button>
                  </Form.Group>
                </Form>

                <Card.Footer>

                </Card.Footer>

              </Card.Body>
            </Card>
            <Row className="mt-2">
              <Col lg="6">
                <Button variant="danger" href="/auth/register">Register Here</Button>
              </Col>
              <Col lg="6" style={{ textAlign: "right" }}>
                <Button variant="danger">Forgot Password</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
