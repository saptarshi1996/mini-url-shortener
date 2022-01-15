import { FunctionComponent } from "react";
import { Form, ListGroup, Badge, Col, Row } from "react-bootstrap";
import { IUserLink } from "../../interfaces";

import { Paginator } from "../Paginator";

export const ListLink: FunctionComponent = ({ userLinkList, paginationCursors }: any) => {

  const listGroupEntries = [];

  const getLinkDetails = (id: number) => {
    console.log(id);
  }

  const RenderListGroup = (props: any) => {
    const userLinkList = props.userLinkList;
    const listGroupItems = userLinkList.map((key: IUserLink, index: number) => {
      return (<ListGroup.Item
        key={index}
        className="d-flex justify-content-between align-items-start"
      >
        <Form.Check
          type="checkbox"
          id={`checkbox-${index}`}
          label=""
          isInvalid
        />
        <div style={{ "cursor": "pointer" }} className="ms-2 me-auto">
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
