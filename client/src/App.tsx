import { FunctionComponent } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Login, Register, Home } from "./pages";

export const App: FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
};
