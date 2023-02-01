import { Switch, Dialog } from "@headlessui/react";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Action } from "@/models";
import {
  deleteAction,
  getActions,
  selectActions,
  updateAction,
  useTypedDispatch,
} from "@/store";
import { CreateEditActionForm } from "./CreateEditActionFrom";
import { useForm } from "react-hook-form";

const ActionItem = memo(function ActionItem({
  action,
  onDelete,
  onEdit,
  changeCompletedState,
}: {
  action: Action;
  onDelete: (id: string) => void;
  onEdit: (action: Action) => void;
  changeCompletedState: (action: Action, state: boolean) => void;
}) {
  const [isCompleted, setIsCompleted] = useState(action.completed);
  const [isEditMode, setIsEditMode] = useState(false);

  const onToggleCompleted = useCallback(
    (checked: boolean) => {
      setIsCompleted(checked);
      changeCompletedState(action, checked);
    },
    [action, changeCompletedState]
  );

  if (isEditMode) {
    return (
      <div className="flex justify-between items-center  mb-[15px] rounded-[10px] border-[1px] border-gray-300 shadow-sm">
        <CreateEditActionForm
          title={"Edit Action"}
          saveButtonText={"Save"}
          onSave={(updatedName: string) => {
            onEdit({ ...action, actionName: updatedName });
            setIsEditMode(false);
          }}
          initialName={action.actionName}
          onCancel={() => setIsEditMode(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-[10px] py-[15px] mb-[15px] rounded-[10px] border-[1px] border-gray-300 shadow-sm">
      <p className={`${isCompleted ? "line-through text-gray-600" : ""}`}>
        {action.actionName}
      </p>
      <div className="flex items-center">
        <Switch
          checked={isCompleted}
          onChange={onToggleCompleted}
          className={`${
            isCompleted ? "bg-indigo-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              isCompleted ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <button
          onClick={() => setIsEditMode(true)}
          className="w-[80px] mx-[10px] inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(action._id)}
          className=" w-[80px] inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-800  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

export const ActionsList = () => {
  const dispatch = useTypedDispatch();

  const actions = useSelector(selectActions);

  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    action: Action | null;
  }>({
    isOpen: false,
    action: null,
  });

  const onDelete = useCallback(
    async (id: string) => {
      await dispatch(deleteAction(id));
      dispatch(getActions());
    },
    [dispatch]
  );

  const onChangeCompletedState = useCallback(
    async (action: Action, checked: boolean) => {
      await dispatch(updateAction({ ...action, completed: checked }));
      dispatch(getActions());
    },
    [dispatch]
  );

  const onEdit = useCallback(
    async (updatedAction: Action) => {
      await dispatch(updateAction(updatedAction));
      dispatch(getActions());
    },
    [dispatch]
  );

  return (
    <div className="flex justify-between items-left flex-col mt-[20px] px-4 py-3 bg-white">
      <h2 className="font-bold text-[18px] mb-[20px]">Actions</h2>
      <div>
        {actions.map((action) => (
          <ActionItem
            key={action._id}
            action={action}
            onEdit={onEdit}
            onDelete={onDelete}
            changeCompletedState={onChangeCompletedState}
          />
        ))}
      </div>
    </div>
  );
};
