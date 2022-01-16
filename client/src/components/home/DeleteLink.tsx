import { Fragment, FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";

import { useDispatch } from "react-redux";
import { linkActions } from "../../actions";

export const DeleteLink: FunctionComponent = ({ id }: any) => {

  const dispatch = useDispatch();

  const [deleteModal, setDeleteModal] = useState(false);

  // useEffect(() => {

  //   if (addLinkSuccess)
  //     setDeleteModal(false)

  // }, [addLinkSuccess]);

  const submitDeleteLink = async (e: any) => {
    e.preventDefault();
    await dispatch(linkActions.deleteUserLinkById(id));
    await dispatch(linkActions.getUserLinkList());
  }

  return (
    <>
      <Button size="sm" onClick={() => setDeleteModal(true)} variant="danger">
        Delete
      </Button>

      <Fragment>
        <Modal
          show={deleteModal}
          onHide={() => setDeleteModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Confirm to delete the link permanently?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={submitDeleteLink} variant="danger">Delete</Button>
            <Button onClick={() => setDeleteModal(false)} variant="secondary">Cancel</Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </>
  );
}
