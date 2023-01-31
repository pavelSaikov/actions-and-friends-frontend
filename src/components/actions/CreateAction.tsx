import { useCallback } from "react";
import { useSelector } from "react-redux";

import { addAction, getActions, selectUser, useTypedDispatch } from "@/store";
import { CreateEditActionForm } from "./CreateEditActionFrom";

export const CreateAction = () => {
  const dispatch = useTypedDispatch();

  const user = useSelector(selectUser);

  const onAddAction = useCallback(
    async (actionName: string) => {
      await dispatch(
        addAction({
          userId: user!._id,
          actionName,
          completed: false,
        })
      );

      dispatch(getActions());
    },
    [dispatch, user]
  );

  return <CreateEditActionForm onSave={onAddAction} />;
};
