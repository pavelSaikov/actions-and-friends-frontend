import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {
  actionsReducer,
  ActionsSlice,
  AuthSlice,
  friendsReducer,
  FriendsSlice,
  userReducer,
  UserSlice,
  writeTokenToLocalStorageMiddleware,
} from "./slices";
import { authReducer } from "./slices/auth/auth.slice";

export interface Store {
  auth: AuthSlice;
  user: UserSlice;
  actions: ActionsSlice;
  friends: FriendsSlice;
}

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  actions: actionsReducer,
  friends: friendsReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(writeTokenToLocalStorageMiddleware),
});

export type TypedDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export * from "./slices";
