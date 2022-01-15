import { Fragment, FunctionComponent, useState } from "react";
import {
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";

import { useDispatch } from "react-redux";

export const CreateLink: FunctionComponent = () => {

  const dispatch = useDispatch();

  const [addLink, setAddLink] = useState('');

  const [createModal, setCreateModal] = useState(false);

  const submitGenerateLink = async (e: any) => {
    // await dispatch();
  }

  return (
    <>
      <div>
        <Button onClick={() => setCreateModal(true)} variant="danger">
          Create
        </Button>
      </div>

      <Fragment>
        <Modal
          show={createModal}
          onHide={() => setCreateModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create New Link here.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form onSubmit={submitGenerateLink}>
              <FormGroup className="mb-3">
                <FormControl onChange={(e: any) => setAddLink(e.target.value)} name="value" placeholder="Enter Link" />
              </FormGroup>
              <FormGroup className="mb-3">
                <Button variant="danger">Generate Link</Button>
              </FormGroup>
            </Form>

          </Modal.Body>
        </Modal>
      </Fragment>

    </>
  );
}
