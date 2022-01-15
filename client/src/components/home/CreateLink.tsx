import { Fragment, FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";

import { useDispatch } from "react-redux";
import { linkActions } from "../../actions";

export const CreateLink: FunctionComponent = ({ addLinkSuccess }: any) => {

  const dispatch = useDispatch();

  const [addLink, setAddLink] = useState('');
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {

    if (addLinkSuccess)
      setCreateModal(false)

  }, [addLinkSuccess]);

  const submitGenerateLink = async (e: any) => {
    e.preventDefault();
    await dispatch(linkActions.createNewLink(addLink));
    await dispatch(linkActions.getUserLinkList());
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

            <Form>
              <FormGroup className="mb-3">
                <FormControl as="textarea" rows={3} onChange={(e: any) => setAddLink(e.target.value)} name="value" placeholder="Enter Link" />
              </FormGroup>
              <FormGroup className="mb-3">
                <Button type="button" onClick={submitGenerateLink} variant="danger">Generate Link</Button>
              </FormGroup>
            </Form>

          </Modal.Body>
        </Modal>
      </Fragment>
    </>
  );
}
