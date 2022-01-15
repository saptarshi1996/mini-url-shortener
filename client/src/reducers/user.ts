import { Action } from "redux";

import { authConstant } from "../constants";

const initialState: Object = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
};

export const userReducer = (state: Object = initialState, action: Action) => {
  
  switch (action.type) {
    default:
      return state;
  };
};
