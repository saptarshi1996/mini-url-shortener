import { FunctionComponent, useEffect } from "react";

import { Card } from "react-bootstrap";

import { CreateLink } from "./CreateLink";
import { ListLink } from "./ListLink";

export const LeftPanel: FunctionComponent = () => {

  useEffect(() => {

  }, []);

  const cardStyle = {
    "height": "95vh",
  };

  // this component will have the url list. with the details.
  return (
    <>
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>
            <CreateLink />
          </Card.Title>
          <hr />
          <ListLink />
        </Card.Body>
      </Card>
    </>
  );
}
