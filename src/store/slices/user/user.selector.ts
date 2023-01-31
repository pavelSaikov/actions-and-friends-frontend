import { createSelector } from "@reduxjs/toolkit";
import { UserSlice } from "./user.slice";

const selectUserSlice = (state: any): UserSlice => state.user;

export const selectUser = createSelector(
  selectUserSlice,
  (state) => state.user
);
