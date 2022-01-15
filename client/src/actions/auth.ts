import { Dispatch } from "redux";

import { LoginInterface, RegisterInterface } from "../interfaces";
import { authConstant } from "../constants";

const userLogin = (login: LoginInterface) => (dispatchEvent: Dispatch) => {
  try {

    dispatchEvent({
      type: authConstant.USER_LOGIN_LOADING,
    });

    setTimeout(() => {
      return dispatchEvent({
        type: authConstant.USER_LOGIN_SUCCESS,
      });
    }, 1000);

  } catch (ex) {
    return dispatchEvent({
      type: authConstant.USER_LOGIN_FAILED,
    });
  }
}

const userRegister = (register: RegisterInterface) => (dispatchEvent: Dispatch) => {

}

export const authActions = { 
  userLogin,
  userRegister,
};
