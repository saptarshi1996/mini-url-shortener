import { combineReducers } from "redux";

import { authReducer } from "./auth";
import { userReducer } from "./user";
import { linkReducer } from "./link";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  link: linkReducer,
});
