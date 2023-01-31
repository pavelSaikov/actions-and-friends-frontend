import { createAsyncThunk } from "@reduxjs/toolkit";

import { IUser } from "@/models";
import { getToken } from "../helpers";
import { userApi } from "@/api/user.api";
import { setToken } from "../auth";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (): Promise<IUser> => {
    return userApi.getUser(getToken());
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedUser: Partial<IUser>) => {
    return userApi.updateUser(updatedUser, getToken());
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { dispatch }): Promise<string> => {
    const id = userApi.deleteUser(getToken());
    dispatch(setToken(""));

    return id;
  }
);
