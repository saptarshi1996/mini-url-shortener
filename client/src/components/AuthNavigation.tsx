import {
  FunctionComponent,
} from "react";

import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";

import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../actions";

export const AuthNavigation: FunctionComponent = () => {

  const dispatch = useDispatch();

  const auth: any = useSelector((state: any) => state.auth);

  const logoutUser = async (e: any) => {
    e.preventDefault();
    await dispatch(authActions.userLogout());
  };

  const NavigateToLoginOnLogout = () => {
    if (!auth.loggedIn) {
      return <Navigate to="/auth/login" />
    } else {
      return null;
    }
  }

  return (
    <Navbar bg="danger" variant="dark">
      <NavigateToLoginOnLogout />
      <Container>
        <Navbar.Brand href="/">
          Mini Url Shortner
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#" onClick={logoutUser}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
