import {
  FunctionComponent,
  useState,
  ChangeEvent,
  Dispatch,
  useEffect,
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

import { authActions } from "../actions";
import { LoginInterface, AlertProps } from "../interfaces";
import { AlertDismissible } from "../components";

export const Login: FunctionComponent = () => {

  const dispatch: Dispatch<any> = useDispatch();
  const selector: any = useSelector((state: any) => state.auth);

  const [show, setShow] = useState(false);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  } as LoginInterface);

  useEffect(() => {
    setShow(selector.message ? true : false);
  }, [selector]);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });

  }

  const handleLoginFormSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(authActions.userLogin(login));
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
                  message: selector.message,
                  show: show,
                  setShow: setShow,
                  success: selector.success,
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
