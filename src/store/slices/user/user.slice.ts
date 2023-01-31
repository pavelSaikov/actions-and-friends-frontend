import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "@/models";
import { deleteUser, getUser } from "./user.thunks";

export interface UserSlice {
  user: IUser | null;
}

const INITIAL_STATE: UserSlice = { user: null };

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, { payload }: { payload: IUser }) => {
      state.user = payload;
    },
  },
  extraReducers: {
    [getUser.fulfilled.type]: (state, { payload }) => {
      state.user = payload;
    },
    [deleteUser.fulfilled.type]: (state) => {
      state.user = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;
