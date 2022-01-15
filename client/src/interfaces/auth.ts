import { Dispatch, SetStateAction } from "react";

export interface LoginInterface {
  email: string;
  password: string;
};

export interface RegisterInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export interface AlertProps {
  message: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  success: boolean;
};
