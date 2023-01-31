import { createAsyncThunk } from "@reduxjs/toolkit";

import { authApi } from "@/api";
import { IUser } from "@/models";
import { setToken } from "./auth.slice";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (newUser: IUser, { dispatch }) => {
    const token = await authApi.signup(newUser);
    dispatch(setToken(token));

    return token;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    const token = await authApi.login(credentials.email, credentials.password);

    console.log(token);
    dispatch(setToken(token));

    return token;
  }
);
