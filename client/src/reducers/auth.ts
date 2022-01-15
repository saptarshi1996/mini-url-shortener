import { Action } from "redux";

import { authConstant } from "../constants";

const initialState: Object = {
  loading: false,
  loggedIn: localStorage.getItem('token') ? true : false,
};

export const authReducer = (state: Object = initialState, action: Action) => {
  
  switch (action.type) {

    case authConstant.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        data: action,
      };

    case authConstant.USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        data: action,
      };

    case authConstant.USER_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        loggedIn: false,
        data: action,
      };

    case authConstant.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
      };

    default:
      return state;

  };
};
