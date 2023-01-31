import { createSlice } from "@reduxjs/toolkit";

import { Action, IUser } from "@/models";
import {
  findUserByNickName,
  getFriendActions,
  getFriends,
} from "./friends.thunks";

export interface FriendsSlice {
  friends: IUser[];
  searchedUser: IUser | null;
  selectedFriendActions: Action[];
}

const INITIAL_STATE: FriendsSlice = {
  friends: [],
  searchedUser: null,
  selectedFriendActions: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState: INITIAL_STATE,
  reducers: {
    resetSearchedUser: (state) => {
      state.searchedUser = null;
    },
  },
  extraReducers: {
    [findUserByNickName.fulfilled.type]: (state, { payload }) => {
      state.searchedUser = payload ?? null;
    },
    [getFriends.fulfilled.type]: (state, { payload }) => {
      state.friends = payload;
    },
    [getFriendActions.fulfilled.type]: (state, { payload }) => {
      state.selectedFriendActions = payload;
    },
    [getFriendActions.rejected.type]: (state) => {
      state.selectedFriendActions = [];
    },
  },
});

export const friendsReducer = friendsSlice.reducer;

export const { resetSearchedUser } = friendsSlice.actions;
