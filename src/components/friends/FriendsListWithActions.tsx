import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  deleteFriend,
  getFriendActions,
  getFriends,
  selectFriendActions,
  selectFriends,
  useTypedDispatch,
} from "@/store";

export const FriendsListWithActions = () => {
  const dispatch = useTypedDispatch();

  const friends = useSelector(selectFriends);
  const selectedFriendActions = useSelector(selectFriendActions);

  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId.length) {
      dispatch(getFriendActions(selectedUserId));
    }
  }, [dispatch, selectedUserId, friends]);

  const onSelectUser = useCallback((id: string) => setSelectedUserId(id), []);

  const onDeleteUser = useCallback(
    async (id: string) => {
      await dispatch(deleteFriend(id));
      dispatch(getFriends());
    },
    [dispatch]
  );

  return (
    <div className="flex mt-[20px] px-4 py-3 bg-white w-[100%]">
      <div className="grow mr-[20px]">
        <h2 className="font-bold text-[18px] mb-[20px]">Friends</h2>
        <div>
          {friends.map(({ _id, name, surname, nickname }) => (
            <div
              key={_id}
              onClick={() => onSelectUser(_id)}
              className={`flex justify-between items-center cursor-pointer mt-[20px] py-[20px] px-[15px] border rounded-xl border-gray-100 ${
                _id === selectedUserId ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex flex-col">
                <div className="w-[25px] mx-[5px]"></div>
                <p className="font-bold text-[18px]">{`${name} ${surname}`}</p>
                <p className="text-[12px] text-gray-500">{`${nickname}`}</p>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUser(_id);
                  }}
                  type="submit"
                  className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Delete from friends
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grow pl-[20px] border-l">
        <h2 className="font-bold text-[18px] mb-[20px]">Friend Actions</h2>
        <div>
          {selectedFriendActions.length === 0 && (
            <p className="text-gray-500">No actions</p>
          )}
          {selectedFriendActions.map((action) => (
            <div
              key={action._id}
              className="flex justify-between items-center px-[10px] py-[15px] mb-[15px] rounded-[10px] border-[1px] border-gray-300 shadow-sm"
            >
              <p>{action.actionName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
