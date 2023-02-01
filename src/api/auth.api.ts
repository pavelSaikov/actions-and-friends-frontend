import { IUser } from "@/models";
import { createResponseHandler, ENDPOINT } from "./constants";

class AuthApi {
  private endpoint = "";

  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_API_URL ?? "";
  }

  signup(newUser: IUser) {
    return fetch(`${this.endpoint}/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newUser),
    }).then(createResponseHandler((data) => data.access_token));
  }

  login(email: string, password: string) {
    return fetch(`${this.endpoint}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then(createResponseHandler((data) => data.access_token));
  }

  checkToken(token: string) {
    return fetch(`${this.endpoint}/auth/check`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
    }).then(
      createResponseHandler((response) => {
        if (response.statusCode === 401) {
          return false;
        }

        return true;
      })
    );
  }
}

export const authApi = new AuthApi();
