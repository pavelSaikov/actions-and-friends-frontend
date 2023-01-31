import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { UserForm, AppWrapper } from "@/components";
import { IUser } from "@/models";
import { setToken, store, TOKEN_KEY, useTypedDispatch } from "@/store";
import {
  deleteUser,
  getUser,
  selectUser,
  setUser,
  updateUser,
} from "@/store/slices/user";
import { userApi } from "@/api/user.api";
import { useRouter } from "next/router";
import { Route } from "@/config";

export async function getServerSideProps(context: {
  req: { cookies: { [key: string]: string } };
}) {
  const token = context.req.cookies[TOKEN_KEY];
  // console.log("token: ", token);
  // console.log("store", store.getState());

  const dispatch = store.dispatch;
  dispatch(setToken(token));
  // console.log("state with token: ", store.getState());
  // await dispatch(getUser());

  const user = await userApi.getUser(token);
  // dispatch(setUser(user));
  // console.log("store", store.getState());
  // console.log("user: ", user);

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Profile() {
  const dispatch = useTypedDispatch();

  const user = useSelector(selectUser);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const onUpdateUser = useCallback(
    async (updatedUser: Partial<IUser>) => {
      await dispatch(updateUser(updatedUser));
      await dispatch(getUser());
    },
    [dispatch]
  );

  const onDeleteUser = useCallback(async () => {
    await dispatch(deleteUser());
    router.push(Route.Login);
  }, [dispatch, router]);

  return (
    <AppWrapper>
      <div>
        <UserForm user={user} onSaveUser={onUpdateUser} />
        <div className="flex justify-between items-center mt-[20px] px-4 py-3 bg-white sm:px-6">
          <h2 className="font-bold text-[18px]">
            Delete account and all related information
          </h2>
          <button
            onClick={onDeleteUser}
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-800  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Delete Account
          </button>
        </div>
      </div>
    </AppWrapper>
  );
}
