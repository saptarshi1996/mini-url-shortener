import { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";
import { useDispatch } from "react-redux";

import { linkActions } from "../../actions";
import { Loader } from "../Loader";

export const ShareLink: FunctionComponent = ({
  id,
  getShareableLinkLoading,
  getShareableLinkList,
  toggleShareLinkModal,
}: any) => {

  const dispatch = useDispatch();

  const openShareLink = async () => {
    dispatch(linkActions.showShareLinkModal());
    dispatch(linkActions.getShareableLinkForShortUrl(id))
  }

  const RenderLoaderOrShareList = () => {
    if (getShareableLinkLoading) {
      return <Loader />
    } else {

      const buttonListComponent = getShareableLinkList.map((key: any, index: number) => {
        return (
          <div key={index} className="mb-3 d-grid gap-2">
            <Button href={key.shareable_link} target="_blank" type="button" variant="danger">{key.platform}</Button>
          </div>
        )
      });

      return (
        <>
          {buttonListComponent}
        </>
      );
    }
  }

  return (
    <>
      <Button type="button" size="sm" onClick={() => openShareLink()} variant="danger">
        Share
      </Button>

      <Fragment>
        <Modal
          show={toggleShareLinkModal}
          onHide={() => dispatch(linkActions.hideShareLinkModal())}
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Share link on
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RenderLoaderOrShareList />
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </>
  );
}
