import { fetchUserSucceed } from "./user";
import axios from "axios";

export const handleStripeToken = token => {
  return async dispatch => {
    const res = await axios.post("/api/stripe", token);
    dispatch(fetchUserSucceed(res.data));
  };
};
