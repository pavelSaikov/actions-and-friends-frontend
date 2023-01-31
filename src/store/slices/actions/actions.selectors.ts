import { Store } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const actionsSelector = (state: Store) => state.actions;

export const selectActions = createSelector(
  actionsSelector,
  (state) => state.actions
);
