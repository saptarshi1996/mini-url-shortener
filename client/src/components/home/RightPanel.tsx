import { FunctionComponent } from "react";

import { 
  Card 
} from "react-bootstrap";

import { useSelector } from "react-redux";

import { UserLinkDetails } from "./UserLinkDetails";
import { Loader } from "../Loader";

export const RightPanel: FunctionComponent = () => {

  const {
    userLinkObjectLoading,
    userLinkObject,
    getShareableLinkLoading,
    getShareableLinkList,
    shareLinkDispatched,
  }: any = useSelector((state: any) => state.link);

  const rightCardStyle = {
    "height": "95vh",
  };

  const RenderLoaderOrLinkObject = () => { 
    if (userLinkObjectLoading) {
      return <Loader />
    } else {
      return <UserLinkDetails {...{ 
        userLinkObject, 
        getShareableLinkLoading,
        getShareableLinkList,
        shareLinkDispatched,
      } as any} />;
    }
  }

  return (
    <>
    <Card style={rightCardStyle}>
      <Card.Body>
        <RenderLoaderOrLinkObject />
      </Card.Body>
    </Card>
    </>
  );
}
