import { createSelector } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth.slice";

export const authSelector = (state: any): AuthSlice => state.auth;

export const selectToken = createSelector(authSelector, (state) => state.token);
