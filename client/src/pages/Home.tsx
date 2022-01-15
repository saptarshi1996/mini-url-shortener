import { FunctionComponent } from 'react';
import {
  Col,
  Row,
} from 'react-bootstrap';

import { RightPanel, LeftPanel } from "../components";

export const Home: FunctionComponent = () => {
  return (
    <>
      <Row>
        <Col lg="6">
          <LeftPanel />
        </Col>
        <Col lg="6">
          <RightPanel />
        </Col>
      </Row>
    </>
  );
};
