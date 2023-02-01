import { Action } from "@/models";
import { createResponseHandler, ENDPOINT } from "./constants";

class ActionsApi {
  private endpoint: string;

  constructor() {
    this.endpoint = process.env.NEXT_PUBLIC_API_URL ?? "";
  }

  createAction(newAction: Omit<Action, "_id">, token: string): Promise<Action> {
    return fetch(`${this.endpoint}/action`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(newAction),
    }).then(createResponseHandler((action) => action));
  }

  getActions(token: string, userId: string): Promise<Action[]> {
    return fetch(`${this.endpoint}/action/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(createResponseHandler((actions) => actions));
  }

  updateAction(updatedAction: Partial<Action>, token: string): Promise<Action> {
    return fetch(`${this.endpoint}/action/${updatedAction._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedAction),
    }).then(createResponseHandler((updatedAction) => updatedAction));
  }

  deleteAction(actionId: string, token: string): Promise<string> {
    return fetch(`${this.endpoint}/action/${actionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(createResponseHandler((id) => id));
  }
}

export const actionsApi = new ActionsApi();
