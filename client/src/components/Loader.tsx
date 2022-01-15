import { FunctionComponent } from "react";

import "../styles/loader.css";

export const Loader: FunctionComponent = () => {
  return (
    <div style={{ "textAlign": "center" }}>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}
