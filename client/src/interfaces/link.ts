export interface IUserLink { 

  id: number;
  original_url: string;
  short_url: string;
  created_on: string;
  clicks: number;

}

export interface IPageCursor { 
  count: number;
  next: string;
  previous: string;
}

export interface IUserLinkList {
  userLinkList: Array<any>;
}
