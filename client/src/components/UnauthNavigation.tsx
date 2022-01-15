import {
  FunctionComponent,
} from "react";

import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const UnauthNavigation: FunctionComponent = () => {

  const auth: any = useSelector((state: any) => state.auth);

  const NavigateToHomeOnAuth = () => {
    if (auth.loggedIn) {
      return <Navigate to="/" />
    } else {
      return null;
    }
  }

  return (
    <Navbar bg="danger" variant="dark">
      <NavigateToHomeOnAuth />
      <Container>
        <Navbar.Brand href="/">
          Mini Url Shortner
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/auth/login">Login</Nav.Link>
          <Nav.Link href="/auth/register">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
