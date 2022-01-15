import { Dispatch } from "redux";

import { axiosAuthPlugin } from "../plugins";
import { linkConstant } from "../constants";

const createNewLink = (value: string) => async (dispatchEvent: Dispatch) => {
  try {

    const { data } = await axiosAuthPlugin.post('/mus/shortner', { value }, {
      headers: {
        "Authorization": localStorage.getItem('token') as string,
      }
    });

    return dispatchEvent({
      type: linkConstant.CREATE_USER_LINK_SUCCESS,
      ...data,
      addLinkSuccess: true,
    });

  } catch (ex: any) {
    if (ex.response) {
      return dispatchEvent({
        type: linkConstant.CREATE_USER_LINK_FAILED,
        ...ex.response.data,
      });
    } else {
      return dispatchEvent({
        type: linkConstant.CREATE_USER_LINK_FAILED,
      });
    }
  }
}

const getUserLinkList = (page?: string) => async (dispatchEvent: Dispatch) => {
  try {

    dispatchEvent({
      type: linkConstant.FETCH_USER_LINK_LOADING,
    });

    let query = ``;
    if (page) { 
      query += `?${page}`;
    }

    const { data } = await axiosAuthPlugin.get(`/mus/shortner${query}`, {
      headers: {
        "Authorization": localStorage.getItem('token') as string,
      }
    });

    return dispatchEvent({
      type: linkConstant.FETCH_USER_LINK_SUCCESS,
      userLinkList: data.result.results,
      linkCursors: {
        count: data.result.count,
        next: data.result.next,
        prev: data.result.previous,
      },
      addLinkSuccess: false,
    });

  } catch (ex: any) {
    if (ex.response) {
      return dispatchEvent({
        type: linkConstant.FETCH_USER_LINK_FAILED,
        ...ex.response.data,
      });
    } else {
      return dispatchEvent({
        type: linkConstant.FETCH_USER_LINK_FAILED,
      });
    }
  }
}

export const linkActions = {
  createNewLink,
  getUserLinkList,
};
