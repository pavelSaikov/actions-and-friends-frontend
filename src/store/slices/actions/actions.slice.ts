import { createSlice } from "@reduxjs/toolkit";

import { Action } from "@/models";
import { getActions } from "./actions.thunks";

export interface ActionsSlice {
  actions: Action[];
}

const INITIAL_STATE: ActionsSlice = { actions: [] };

const actionsSlice = createSlice({
  name: "actions",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [getActions.fulfilled.type]: (
      state,
      { payload }: { payload: Action[] }
    ) => {
      state.actions = payload;
    },
  },
});

export const actionsReducer = actionsSlice.reducer;
