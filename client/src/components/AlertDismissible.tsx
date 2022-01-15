import {
  Alert,
} from "react-bootstrap";

import { AlertProps } from "../interfaces";

export const AlertDismissible = ({ message, show, setShow, success }: AlertProps) => {

  if (show) {
    return (
      <>
        <Alert variant={ success ? "success" : "danger" } onClose={() => setShow(false)} dismissible>
          <h5>{message}</h5>
        </Alert>
      </>
    );
  } else {
    return null;
  }

}
