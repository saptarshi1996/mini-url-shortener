import {
  FunctionComponent,
  useState,
  ChangeEvent,
  Dispatch,
} from 'react';

import { Selector, useDispatch, useSelector } from "react-redux";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import { authActions } from "../actions";
import { LoginInterface } from "../interfaces";
import { StateFromReducersMapObject } from 'redux';

export const Login: FunctionComponent = () => {

  const dispatch: Dispatch<any> = useDispatch();
  const selector: Selector<any, any> = useSelector((state: any) => state.auth);

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

  const handleLoginFormSubmit = (e: any) => {
    e.preventDefault();
    dispatch(authActions.userLogin(login));
  };

  return (
    <>
      <Container style={{ paddingTop: "10%" }}>
        { JSON.stringify(selector) }
        <Row className="justify-content-center">
          <Col lg="5">
            <Card>
              <Card.Body>
                <Card.Title className="text-center text-uppercase mt-2">
                  Login
                </Card.Title>

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
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form.Group>
                </Form>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
