import { Navigate } from "react-router-dom";

export const UnAuth = ({ children }: { children: JSX.Element }) => {

  const auth = localStorage.getItem('token') ? true : false;

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
