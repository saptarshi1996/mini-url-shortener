import {
  FunctionComponent,
  useState,
  ChangeEvent,
  Dispatch,
} from 'react';

import { useDispatch } from "react-redux";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

import { RegisterInterface } from "../interfaces";

export const Register: FunctionComponent = () => {

  const dispatch: Dispatch<any> = useDispatch();

  const [register, setRegister] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  } as RegisterInterface);

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();
    const { name, value } = e.target;

    setRegister({
      ...register,
      [name]: value,
    });

  };

  const handleRegisterFormSubmit = (e: any) => {

    e.preventDefault();

    const { first_name, last_name, email, password }: RegisterInterface = register;

  };

  return (
    <>
      <Container style={{ paddingTop: "10%" }}>
        <Row className="justify-content-center">
          <Col lg="5">
            <Card>
              <Card.Body>
                <Card.Title className="text-center text-uppercase mt-2">
                  Sign Up
                </Card.Title>

                <Form onSubmit={handleRegisterFormSubmit}>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={handleRegisterChange} name="first_name" type="text" placeholder="Enter first name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control onChange={handleRegisterChange} name="last_name" type="text" placeholder="Enter last name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleRegisterChange} name="email" type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleRegisterChange} name="password" type="password" placeholder="Enter Password" />
                  </Form.Group>

                  <Form.Group className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Register Here
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
