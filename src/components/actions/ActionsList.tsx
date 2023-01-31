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

// const EditDialog = ({
//   onEditClose,
//   onEdit,
//   action,
//   isOpen,
// }: {
//   onEditClose: () => void;
//   onEdit: (updatedAction: Action) => void;
//   action: Action;
//   isOpen: boolean;
// }) => {
//   const { register, handleSubmit, formState, reset } = useForm({
//     mode: "onChange",
//     defaultValues: {
//       value: action.actionName ?? "",
//     },
//   });

//   const onAdd = useCallback(
//     (actionName: string) => {
//       onEdit({ ...action, actionName });
//     },
//     [action, onEdit]
//   );

//   useEffect(() => {}, []);

//   return (
//     <Dialog open={isOpen} onClose={onEditClose}>
//       <Dialog.Panel>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-lg font-medium leading-6 text-gray-900"
//                 >
//                   Edit Action
//                 </Dialog.Title>
//                 <form className="w-[100%]" onSubmit={handleSubmit(onAdd)}>
//                   <div className="mt-2">
//                     <div className="flex justify-between items-center">
//                       <div className="grow">
//                         <input
//                           type="text"
//                           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
//                             !isValid && "!border-red-600"
//                           }`}
//                           {...register("value", { minLength: 5 })}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <button
//                       type="submit"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={onEdit()}
//                     >
//                       Deactivate
//                     </button>
//                     <button
//                       onClick={onEditClose}
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </Dialog.Panel>
//             </div>
//           </div>
//         </Dialog>
//       </Dialog.Panel>
//     </Dialog>
//   );
// };

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
    (id: string) => {
      dispatch(deleteAction(id));
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
      {/* <EditDialog onEdit={onEdit} onEditClose={onEditCancel} {...dialogState} /> */}
    </div>
  );
};
