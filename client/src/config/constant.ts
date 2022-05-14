import { config } from "dotenv";
config();

export const Constant = {

  "Environment": {
    "PORT": process.env.PORT,
    "BASE_URL": process.env.BASE_URL,
  },

};
