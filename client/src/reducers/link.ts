import { Action } from "redux";

import { linkConstant } from "../constants";

const initialState: Object = {
  
  userLinkList: [],
  linkCursors: null,

  userLinkLoading: false,
  addLinkSuccess: false,

  userLinkObjectLoading: false,
  userLinkObject: null,

  editLinkSuccess: false,
  deleteLinkSuccess: false,

  getShareableLinkLoading: false,
  getShareableLinkList: [],

  toggleShareLinkModal: false,

};

export const linkReducer = (state: Object = initialState, action: Action) => {

  switch (action.type) {

    case (linkConstant.FETCH_USER_LINK_LOADING):
      return {
        ...state,
        userLinkLoading: true,
      };

    case (linkConstant.FETCH_USER_LINK_SUCCESS):
      return {
        ...state,
        userLinkLoading: false,
        ...action,
        userLinkObject: null,
      };

    case (linkConstant.FETCH_USER_LINK_FAILED):
      return {
        ...state,
        userLinkLoading: false,
        ...action,
      };

    case (linkConstant.CREATE_USER_LINK_SUCCESS):
      return {
        ...state,
        userLinkLoading: false,
        ...action,
      };

    case (linkConstant.FETCH_USER_LINK_OBJECT_LOADING):
      return {
        ...state,
        userLinkObjectLoading: true,
      };

    case (linkConstant.FETCH_USER_LINK_OBJECT_SUCCESS):
      return {
        ...state,
        ...action,
        userLinkObjectLoading: false,
      };

    case (linkConstant.FETCH_USER_LINK_OBJECT_FAILED):
      return {
        ...state,
        userLinkObjectLoading: false,
        userLinkObject: null,
      };

    case (linkConstant.GET_SHARE_LINK_OBJECT_LOADING):
      return {
        ...state,
        getShareableLinkLoading: true,
        getShareableLinkList: [],
      };

    case (linkConstant.GET_SHARE_LINK_OBJECT_SUCCESS):
      return {
        ...state,
        ...action,
        getShareableLinkLoading: false,
      };

      case (linkConstant.SHOW_SHARE_LINK_MODAL):
        return {
          ...state,
          toggleShareLinkModal: true,
        };
      
      case (linkConstant.HIDE_SHARE_LINK_MODAL):
        return {
          ...state,
          toggleShareLinkModal: false,
        };

    default:
      return state;
  };

};
