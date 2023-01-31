import { store } from "..";
import { selectToken } from "./auth";

export const getToken = () => {
  return selectToken(store.getState()) ?? "";
};
