import { Fragment, FunctionComponent, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from "react-bootstrap";

import { useDispatch } from "react-redux";

import { AlertDismissible } from "../AlertDismissible";
import { linkActions } from "../../actions";
import { IUserLink } from "../../interfaces";

export const EditLink: FunctionComponent = ({ userLinkObject }: any) => {

  const dispatch = useDispatch();

  const [editModal, setEditModal] = useState(false);

  const [editErrorModel, setEditErrorModel] = useState(false);
  const [editErrorModelMessage, setEditErrorModelMessage] = useState('');

  const [editLinkModel, setEditLinkModel] = useState({
    id: 0,
    short_url: '',
  } as IUserLink);

  const handleEditLinkModelChange = (e: any) => { 

    e.preventDefault();
    const { name, value } = e.target;
    setEditLinkModel({
      ...editLinkModel,
      [name]: value,
    });

  }

  const submitDeleteLink = async (e: any) => {

    e.preventDefault();

    let { id, short_url }: { id: number, short_url: string } = editLinkModel as { id: number, short_url: string };

    if (short_url.length === 0 || short_url.length > 5) {
      console.log("error");
      setEditErrorModel(true);
      setEditErrorModelMessage('Key must be 5 characters and not blank');
      return;
    }

    const verify = /^[a-z0-9]+$/i.test(short_url);
    if (!verify) {
      setEditErrorModel(true);
      setEditErrorModelMessage('Key must contain only alphanumeric characters');
      return;
    }

    short_url = `http://127.0.0.1:8000/mus/sr/${short_url}`

    await dispatch(linkActions.editUserLinkById({
      id: id,
      short_url: short_url,
    } as IUserLink));

    await dispatch(linkActions.getUserLinkList());

  }

  const closeEditModal = () => { 
    // clear error messages.
    setEditErrorModel(false);
    setEditErrorModelMessage('');
    setEditModal(false);
  }

  const openEditModal = () => {
    setEditLinkModel({ 
      ...editLinkModel,
      id: userLinkObject.id,
      short_url: userLinkObject.short_url.split('/sr/')[1]
    });
    setEditModal(true);
  }

  return (
    <>
      <Button size="sm" onClick={() => openEditModal()} variant="danger">
        Edit
      </Button>

      <Fragment>
        <Modal
          show={editModal}
          onHide={() => closeEditModal()}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit your link here.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              
              <AlertDismissible {...{
                show: editErrorModel,
                message: editErrorModelMessage,
                setShow: setEditErrorModel,
                success: false,
              } as any } />

              <Form>
                <FormGroup className="mb-3">
                  <Form.Label>EditShort Url</Form.Label>
                  <FormControl onChange={handleEditLinkModelChange} value={editLinkModel.short_url} placeholder="Edit url here" name="short_url" as="textarea" rows={4} />
                </FormGroup>
                <FormGroup className="mb-3 d-grid gap-2">
                  <Button type="button" onClick={submitDeleteLink} variant="danger">Edit</Button>
                </FormGroup>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </Fragment>
    </>
  );
}
