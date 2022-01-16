import { Dispatch } from "redux";
import { axiosAuthPlugin } from "../plugins";

import { userConstant } from "../constants";

const fetchUserDetails = () => async (dispatchEvent: Dispatch) => { 
  try {

    if ('user' in localStorage) {
      
      const userDetails = JSON.parse(localStorage.getItem('user') as string);
      
      // return response.
      return dispatchEvent({
        type: userConstant.USER_DETAILS_FETCH_SUCCESS,
        user: userDetails,
      });

    } else {

      const { data } = await axiosAuthPlugin.get('/user/user-profile', {
        headers: {
          "Authorization": localStorage.getItem('token') as string,
        }
      });

      localStorage.setItem('user', JSON.stringify(data.user));

      // return response.
      return dispatchEvent({
        type: userConstant.USER_DETAILS_FETCH_SUCCESS,
        user: data.user,
      });

    }
    
  } catch (ex) {

  }
};

export const userActions = {
  fetchUserDetails,
};
