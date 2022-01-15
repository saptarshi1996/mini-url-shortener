import { Action } from "redux";

import { linkConstant } from "../constants";

const initialState: Object = {
  userLinkList: [],
  linkCursors: null,
  userLinkLoading: false,
  addLinkSuccess: false,
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
      }

    default:
      return state;
  };

};
