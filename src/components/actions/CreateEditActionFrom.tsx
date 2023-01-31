import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const CreateEditActionForm = ({
  onSave,
  title = "Add New Action",
  saveButtonText = "Add Action",
  initialName,
  onCancel,
}: {
  onSave: (actionName: string) => void;
  title?: string;
  saveButtonText?: string;
  initialName?: string;
  onCancel?: () => void;
}) => {
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      value: initialName ?? "",
    },
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!formState.errors.value);
  }, [formState]);

  useEffect(() => {
    if (initialName) {
      setValue("value", initialName);
    }
  }, [initialName, setValue]);

  const onAdd = useCallback(
    async (formValues: any) => {
      reset();
      onSave(formValues.value);
    },
    [onSave, reset]
  );

  return (
    <div className="flex justify-between items-left flex-col mt-[20px] px-4 py-3 bg-white w-[100%]">
      <h2 className="font-bold text-[18px] mb-[20px]">{title}</h2>
      <form className="w-[100%]" onSubmit={handleSubmit(onAdd)}>
        <div className="flex justify-between items-center">
          <div className="grow">
            <input
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                !isValid && "!border-red-600"
              }`}
              {...register("value", { minLength: 5 })}
            />
          </div>
          <div className="flex ml-[20px]">
            {onCancel && (
              <button
                onClick={(e) => onCancel()}
                className="mr-[20px] inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {saveButtonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
