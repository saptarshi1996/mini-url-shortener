
import {
  FunctionComponent,
} from "react";

import {
  Navbar,
  Container,
} from "react-bootstrap";

export const Navigation: FunctionComponent = () => {
  return (
    <Navbar bg="danger" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          Mini Url Shortner
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
