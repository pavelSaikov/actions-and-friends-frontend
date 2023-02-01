import { CreateFriendship, Friendship } from "@/models";
import { createResponseHandler, ENDPOINT } from "./constants";

class FriendsApi {
  private endpoint: string;

  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_API_URL ?? "";
  }

  getFriendships(token: string): Promise<Friendship[]> {
    return fetch(`${this.endpoint}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(createResponseHandler((friendships) => friendships));
  }

  createFriendship(newFriendship: CreateFriendship, token: string) {
    return fetch(`${this.endpoint}/friends`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(newFriendship),
    }).then(createResponseHandler((friendship) => friendship));
  }

  deleteFriendship(friendId: string, token: string) {
    return fetch(`${this.endpoint}/friends/${friendId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(createResponseHandler(() => {}));
  }
}

export const friendsApi = new FriendsApi();
