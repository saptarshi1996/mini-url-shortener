import { FunctionComponent } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthNavigation, UnauthNavigation, Navigation } from './components';

import { RequireAuth, UnAuth } from "./middleware";
import { Login, Register, Home, NotFound } from "./pages";

export const App: FunctionComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<RequireAuth><><AuthNavigation /><Home /></></RequireAuth>} />
          <Route path="/auth/login" element={<UnAuth><><UnauthNavigation /><Login /></></UnAuth>} />
          <Route path="/auth/register" element={<UnAuth><><UnauthNavigation /><Register /></></UnAuth>} />
          <Route path="/not-found" element={ <><Navigation />< NotFound /></> } />
        </Routes>
      </Router>
    </>
  );
};
