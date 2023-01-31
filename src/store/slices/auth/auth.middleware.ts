import { Middleware } from "@reduxjs/toolkit";
import { setToken } from "./auth.slice";

export const TOKEN_KEY = "jwt-token";

export const writeTokenToLocalStorageMiddleware: Middleware =
  () => (next) => (action) => {
    if (action.type === setToken.type && typeof document !== "undefined") {
      const token = action.payload;
      document.cookie = `${TOKEN_KEY}=${action.payload}`;
    }

    next(action);
  };
