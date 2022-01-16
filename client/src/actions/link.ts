import { Dispatch } from "redux";

import { axiosAuthPlugin } from "../plugins";
import { linkConstant } from "../constants";
import { IUserLink } from "../interfaces";

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

const getUserLinkById = (id: number) => async (dispatchEvent: Dispatch) => {
  try {

    dispatchEvent({
      type: linkConstant.FETCH_USER_LINK_OBJECT_LOADING,
    });

    const { data } = await axiosAuthPlugin.get(`/mus/shortner/${id}`, {
      headers: {
        "Authorization": localStorage.getItem('token') as string,
      }
    });

    return dispatchEvent({
      type: linkConstant.FETCH_USER_LINK_OBJECT_SUCCESS,
      userLinkObject: data.user_url,
    });

  } catch (ex: any) {
    if (ex.response) {
      return dispatchEvent({
        type: linkConstant.FETCH_USER_LINK_OBJECT_FAILED,
        ...ex.response.data,
      });
    } else {
      return dispatchEvent({
        type: linkConstant.FETCH_USER_LINK_OBJECT_FAILED,
      });
    }
  }
}

const deleteUserLinkById = (id: number) => async (dispatchEvent: Dispatch) => {
  try {

    dispatchEvent({
      type: linkConstant.DELETE_USER_LINK_OBJECT_LOADING,
    });

    await axiosAuthPlugin.delete(`/mus/shortner/${id}`, {
      headers: {
        "Authorization": localStorage.getItem('token') as string,
      }
    });

    return dispatchEvent({
      type: linkConstant.DELETE_USER_LINK_OBJECT_SUCCESS,
    });

  } catch (ex: any) {
    if (ex.response) {
      return dispatchEvent({
        type: linkConstant.DELETE_USER_LINK_OBJECT_FAILED,
        ...ex.response.data,
      });
    } else {
      return dispatchEvent({
        type: linkConstant.DELETE_USER_LINK_OBJECT_FAILED,
      });
    }
  }
}

const editUserLinkById = (editLinkObjectPayload: IUserLink) => async (dispatchEvent: Dispatch) => {
  try { 

    dispatchEvent({
      type: linkConstant.EDIT_USER_LINK_OBJECT_LOADING,
    });

    await axiosAuthPlugin.put(`/mus/shortner/${editLinkObjectPayload.id}`, {
      short_url: editLinkObjectPayload.short_url,
    }, {
      headers: {
        "Authorization": localStorage.getItem('token') as string,
      },
    });

    return dispatchEvent({
      type: linkConstant.EDIT_USER_LINK_OBJECT_SUCCESS,
    })

  } catch (ex: any) {
    if (ex.response) {
      return dispatchEvent({
        type: linkConstant.EDIT_USER_LINK_OBJECT_FAILED,
        ...ex.response.data,
      });
    } else {
      return dispatchEvent({
        type: linkConstant.EDIT_USER_LINK_OBJECT_FAILED,
      });
    }
  }
}

export const linkActions = {
  createNewLink,
  getUserLinkList,
  getUserLinkById,
  deleteUserLinkById,
  editUserLinkById,
};