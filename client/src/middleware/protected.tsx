import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

  const auth = localStorage.getItem('token') ? true : false;

  if (!auth) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
