import { Fragment, FunctionComponent } from "react";
import { Button } from "react-bootstrap";

export const Paginator: FunctionComponent = () => { 
  return (
    <>
      <Fragment>
        <p>
          <Button variant="danger">Prev</Button>
          &nbsp;
          <Button variant="danger">Next</Button>
        </p>
      </Fragment>
    </>
  );
}
