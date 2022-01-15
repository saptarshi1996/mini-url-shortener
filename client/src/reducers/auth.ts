import { Action } from "redux";

import { authConstant } from "../constants";

const initialState: Object = {
  loading: false,
  loggedIn: localStorage.getItem('token') ? true : false,
  message: '',
  success: false,
};

export const authReducer = (state: Object = initialState, action: Action) => {
  
  switch (action.type) {

    case authConstant.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        ...action,
        success: true,
      };

    case authConstant.USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        ...action,
        success: false,
      };

    case authConstant.USER_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        loggedIn: false,
        ...action,
      };

    case authConstant.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        ...action,
        message: '',
      };

    case authConstant.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        ...action,
        success: true,
      };

    case authConstant.USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        ...action,
        success: false,
      };

    default:
      return state;

  };
};
