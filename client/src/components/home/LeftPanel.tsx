import { FunctionComponent, useEffect } from "react";

import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { linkActions } from "../../actions";

import { Loader } from "../Loader";
import { CreateLink } from "./CreateLink";
import { ListLink } from "./ListLink";

export const LeftPanel: FunctionComponent = () => {

  const linkSelector: any = useSelector((state: any) => state.link);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(linkActions.getUserLinkList());
  }, []);

  const cardStyle = {
    "height": "95vh",
  };

  const RenderLoadingOrList = () => {
    if (linkSelector && linkSelector.userLinkLoading) {
      return <Loader />;
    } else {
      return <ListLink {...{ userLinkList: linkSelector.userLinkList, paginationCursors: linkSelector.linkCursors } as any} />;
    }
  }

  // this component will have the url list. with the details.
  return (
    <>
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>
            <CreateLink {...{ addLinkSuccess: linkSelector.addLinkSuccess } as any} />
          </Card.Title>
          <hr />
          <RenderLoadingOrList />
        </Card.Body>
      </Card>
    </>
  );
}
