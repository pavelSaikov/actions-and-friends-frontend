import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {
  actionsReducer,
  ActionsSlice,
  AuthSlice,
  userReducer,
  UserSlice,
  writeTokenToLocalStorageMiddleware,
} from "./slices";
import { authReducer } from "./slices/auth/auth.slice";

export interface Store {
  auth: AuthSlice;
  user: UserSlice;
  actions: ActionsSlice;
}

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  actions: actionsReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(writeTokenToLocalStorageMiddleware),
});

export type TypedDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export * from "./slices";
