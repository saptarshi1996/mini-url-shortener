import {
  Alert,
} from "react-bootstrap";

import { AlertProps } from "../interfaces";

export const AlertDismissible = ({ message, show, setShow }: AlertProps) => {

  if (show) {
    return (
      <>
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <h5>{message}</h5>
        </Alert>
      </>
    );
  } else {
    return null;
  }

}
