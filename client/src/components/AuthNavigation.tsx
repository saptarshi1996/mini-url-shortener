import {
  FunctionComponent,
  useEffect,
} from "react";

import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";

import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions, userActions } from "../actions";

export const AuthNavigation: FunctionComponent = () => {

  useEffect(() => {
    dispatch(userActions.fetchUserDetails());
  });

  const dispatch = useDispatch();

  const auth: any = useSelector((state: any) => state.auth);
  const user: any = useSelector((state: any) => state.user);

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
          Mini Url Shortener
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#">Welcome {user?.user?.first_name} {user?.user?.last_name}</Nav.Link>
          <Nav.Link href="#" onClick={logoutUser}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
