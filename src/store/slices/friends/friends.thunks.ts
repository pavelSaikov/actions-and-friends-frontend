import { createAsyncThunk } from "@reduxjs/toolkit";

import { actionsApi, userApi } from "@/api";
import { Action, IUser } from "@/models";
import { getToken } from "../helpers";
import { friendsApi } from "@/api/friends.api";
import { selectUser } from "../user";

export const findUserByNickName = createAsyncThunk(
  "friends/findUserByNickname",
  async (nickname: string): Promise<IUser | null> => {
    return userApi.getUserByNickname(nickname, getToken());
  }
);

export const createFriendship = createAsyncThunk(
  "friends/createFriendship",
  async (friendId: string, { getState }) => {
    const userId = selectUser(getState())!._id;

    return friendsApi.createFriendship({ friendId, userId }, getToken());
  }
);

export const getFriends = createAsyncThunk(
  "friends/getFriends",
  async (): Promise<IUser[]> => {
    const friendships = await friendsApi.getFriendships(getToken());
    const friendsIds = friendships.map(({ friendId }) => friendId);
    const friends = await Promise.all(
      friendsIds.map((id) => userApi.getUserById(id, getToken()))
    );

    return friends;
  }
);

export const getFriendActions = createAsyncThunk(
  "friends/getFriendAction",
  async (id: string): Promise<Action[]> => {
    return actionsApi.getActions(getToken(), id);
  }
);

export const deleteFriend = createAsyncThunk(
  "friends/deleteFriend",
  (friendId: string) => {
    return friendsApi.deleteFriendship(friendId, getToken());
  }
);
