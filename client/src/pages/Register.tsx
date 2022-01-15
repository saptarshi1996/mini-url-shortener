import {
  useState,
  FunctionComponent,
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

import { AlertDismissible } from "../components";
import { authActions } from "../actions";
import { RegisterInterface } from "../interfaces";

export const Register: FunctionComponent = () => {

  const dispatch: Dispatch<any> = useDispatch();
  const selector = useSelector((state: any) => state.auth);

  const [show, setShow] = useState(false);
  const [register, setRegister] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  } as RegisterInterface);

  useEffect(() => { 
    setShow(selector.message ? true : false);
  }, [selector]);

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();
    const { name, value } = e.target;

    setRegister({
      ...register,
      [name]: value,
    });

  }

  const handleRegisterFormSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(authActions.userRegister(register));
  }

  return (
    <>
      <Container style={{ paddingTop: "10%" }}>
        <Row className="justify-content-center">
          <Col lg="5">
            <Card>
              <Card.Body>

                <Card.Title className="text-center text-uppercase mt-2">
                  <h4>Sign Up</h4>
                </Card.Title>

                <hr />

                <AlertDismissible {...{
                  message: selector.message,
                  show: show,
                  setShow: setShow,
                  success: selector.success,
                }} />

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
                    <Button variant="danger" type="submit">
                      Register Here
                    </Button>
                  </Form.Group>

                </Form>

              </Card.Body>
            </Card>
            <Row className="mt-2">
              <Col lg="6">
                <Button variant="danger" href="/auth/login">Login Here</Button>
              </Col>
              <Col lg="6" style={{ textAlign: "right" }}>
                <Button variant="danger">Verify User</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
