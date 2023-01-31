import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import {
  createFriendship,
  findUserByNickName,
  getFriends,
  resetSearchedUser,
  selectSearchedUser,
  useTypedDispatch,
} from "@/store";

export const FriendsSearch = () => {
  const dispatch = useTypedDispatch();

  const searchedUser = useSelector(selectSearchedUser);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!formState.errors.value);
  }, [formState]);

  const onSearch = useCallback(
    (formValues: any) => {
      dispatch(findUserByNickName(formValues.value));
    },
    [dispatch]
  );

  const onCreateFriendship = useCallback(async () => {
    if (searchedUser) {
      await dispatch(createFriendship(searchedUser?._id));
      dispatch(resetSearchedUser());
      dispatch(getFriends());
    }
  }, [dispatch, searchedUser]);

  return (
    <div className="flex justify-between items-left flex-col mt-[20px] px-4 py-3 bg-white w-[100%]">
      <h2 className="font-bold text-[18px] mb-[20px]">
        User search by nickname
      </h2>
      <form className="w-[100%]" onSubmit={handleSubmit(onSearch)}>
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
            <button
              type="submit"
              className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {searchedUser && (
        <div className="flex justify-between items-center mt-[20px] py-[20px] px-[15px] border rounded-xl bg-gray-100">
          <div className="flex flex-col">
            <p className="font-bold text-[18px]">{`${searchedUser.surname} ${searchedUser.name}`}</p>
            <p className="text-[12px] text-gray-500">{`${searchedUser.nickname}`}</p>
          </div>
          <div>
            <button
              onClick={onCreateFriendship}
              type="submit"
              className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Friends
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
