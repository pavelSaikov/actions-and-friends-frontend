import { createSlice } from "@reduxjs/toolkit";

import { TOKEN_KEY } from "./auth.middleware";
import { createUser } from "./auth.thunk";

export interface AuthSlice {
  token: string | null;
  isCreationUserLoading: boolean;
}

const getToken = () => {
  if (typeof document !== "undefined") {
    const key = `${TOKEN_KEY}=`;
    const token =
      document.cookie
        .split(";")
        .find((c) => c.trim().startsWith(key))
        ?.substring(key.length) ?? null;

    return token;
  }

  return null;
};

const INITIAL_STATE: AuthSlice = {
  token: getToken(),
  isCreationUserLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload;
    },
  },

  extraReducers: {
    [createUser.pending.type]: (state) => {
      state.isCreationUserLoading = true;
    },
    [createUser.fulfilled.type]: (state, { payload }) => {
      state.isCreationUserLoading = true;
      state.token = payload;
    },
    [createUser.rejected.type]: (state) => {
      state.isCreationUserLoading = true;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setToken } = authSlice.actions;
