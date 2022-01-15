import { Fragment, FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { linkActions } from "../actions";

export const Paginator: FunctionComponent = ({ cursors }: any) => { 

  const dispatch = useDispatch();

  const getPrevious = async () => {
    if (cursors && cursors.prev) {
      let page: string = cursors.prev.split('?')[1];
      await dispatch(linkActions.getUserLinkList(page));
    } else {
      return;
    }
  }

  const getNext = async () => {
    if (cursors && cursors.next) {
      let page: string = cursors.next.split('?')[1];
      await dispatch(linkActions.getUserLinkList(page));
    } else {
      return;
    }
  }

  return (
    <>
      <Fragment>
        <p>
          <Button onClick={getPrevious} variant="danger">Prev</Button>
          &nbsp;
          <Button onClick={getNext} variant="danger">Next</Button>
        </p>
      </Fragment>
    </>
  );
}
