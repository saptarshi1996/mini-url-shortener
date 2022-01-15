import { Dispatch } from "redux";
import { AxiosResponse } from "axios";

import { LoginInterface, RegisterInterface } from "../interfaces";
import { authConstant } from "../constants";
import { axiosUnauthPlugin } from "../plugins";

const userLogin = (login: LoginInterface) => async (dispatchEvent: Dispatch) => {
  try {

    dispatchEvent({
      type: authConstant.USER_LOGIN_LOADING,
    });

    const { data }: AxiosResponse = await axiosUnauthPlugin.post('/auth/login', login);

    const token = data.data.token;
    localStorage.setItem('token', `Token ${token}`);

    return dispatchEvent({
      type: authConstant.USER_LOGIN_SUCCESS,
      data: {
        loggedIn: true,
        ...data.data,
      }
    });

  } catch (ex) {
    return dispatchEvent({
      type: authConstant.USER_LOGIN_FAILED,
    });
  }
}

const userRegister = (register: RegisterInterface) => (dispatchEvent: Dispatch) => {

}

const userLogout = () => (dispatchEvent: Dispatch) => { 
  localStorage.clear();
  return dispatchEvent({
    type: authConstant.USER_LOGOUT_SUCCESS,
  });
}

export const authActions = { 
  userLogin,
  userRegister,
  userLogout,
};
