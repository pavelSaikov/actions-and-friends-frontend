import axios from "axios";

import { IUser } from "@/models";
import { createResponseHandler, ENDPOINT } from "./constants";

class UserApi {
  private endpoint: string;

  constructor() {
    this.endpoint = ENDPOINT;
  }

  getUser(token: string): Promise<IUser> {
    return fetch(`${this.endpoint}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(createResponseHandler((user) => user));
  }

  getUserById(id: string, token: string): Promise<IUser> {
    return fetch(`${this.endpoint}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(createResponseHandler((user) => user));
  }

  getUserByNickname(nickname: string, token: string): Promise<IUser> {
    return fetch(`${this.endpoint}/user/nickname/${nickname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(createResponseHandler((user) => user[0]));
  }

  updateUser(user: Partial<IUser>, token: string): Promise<string> {
    return axios.patch(`${this.endpoint}/user`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteUser(token: string): Promise<string> {
    return axios.delete(`${this.endpoint}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const userApi = new UserApi();
