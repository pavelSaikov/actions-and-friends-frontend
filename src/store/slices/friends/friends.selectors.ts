import { Store } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

const friendsSliceSelector = (state: Store) => state.friends;

export const selectSearchedUser = createSelector(
  friendsSliceSelector,
  (state) => state.searchedUser
);

export const selectFriends = createSelector(
  friendsSliceSelector,
  (state) => state.friends
);

export const selectFriendActions = createSelector(
  friendsSliceSelector,
  (state) => state.selectedFriendActions ?? []
);
