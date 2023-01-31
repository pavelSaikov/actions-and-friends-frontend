import { createAsyncThunk } from "@reduxjs/toolkit";

import { Action } from "@/models";
import { actionsApi } from "@/api";
import { getToken } from "../helpers";
import { selectUser } from "../user";

export const addAction = createAsyncThunk(
  "actions/createActions",
  (action: Omit<Action, "_id">) => {
    return actionsApi.createAction(action, getToken());
  }
);

export const getActions = createAsyncThunk(
  "actions/getActions",
  (_, { getState }): Promise<Action[]> => {
    const user = selectUser(getState());

    return actionsApi.getActions(getToken(), user!._id);
  }
);

export const updateAction = createAsyncThunk(
  "actions/updateAction",
  (updatedAction: Action): Promise<Action> => {
    return actionsApi.updateAction(updatedAction, getToken());
  }
);

export const deleteAction = createAsyncThunk(
  "actions/deleteAction",
  (id: string): Promise<string> => {
    return actionsApi.deleteAction(id, getToken());
  }
);
