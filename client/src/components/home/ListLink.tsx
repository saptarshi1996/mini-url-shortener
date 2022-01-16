import { FunctionComponent } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { linkActions } from "../../actions";

import { IUserLink } from "../../interfaces";
import { Paginator } from "../Paginator";

export const ListLink: FunctionComponent = ({ userLinkList, paginationCursors }: any) => {

  const dispatch = useDispatch();

  const getLinkDetails = async (key: IUserLink) => {
    await dispatch(linkActions.getUserLinkById(key.id as number));
  }

  const RenderListGroup = (props: any) => {
    const userLinkList = props.userLinkList;
    const listGroupItems = userLinkList.map((key: IUserLink, index: number) => {
      return (<ListGroup.Item
        key={index}
        className="d-flex justify-content-between align-items-start"
      >
        {+(key.id as number) + 1}.
        <div onClick={() => getLinkDetails(key)} style={{ "cursor": "pointer" }} className="ms-2 me-auto">
          <div className="fw-bold" style={{ "wordWrap": "break-word" }}>
            {key.original_url && key.original_url.length > 100 ? key.original_url.substring(0, 100) + "..." : key.original_url}
          </div>
          <span className="fw-bold text-danger">{key.short_url}</span>
        </div>
        <Badge bg="danger" className="p-2" pill>
          Clicks: {key.clicks}
        </Badge>
      </ListGroup.Item>
      )
    });

    return (
      <ListGroup>
        {listGroupItems}
      </ListGroup>
    );
  }

  return (
    <>
      <Paginator {...{ cursors: paginationCursors } as any} />
      <RenderListGroup userLinkList={userLinkList} />
    </>
  );
}
