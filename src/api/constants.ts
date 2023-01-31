import Router from "next/router";

export const ENDPOINT = "http://localhost:3001";

export const createResponseHandler = (
  successCallback: (result: any) => any
) => {
  return async (response: Response) => {
    try {
      const result = await response.json();

      if (result.statusCode === 401 && typeof window !== "undefined") {
        Router.push("/login");
        throw new Error("Unauthorized");
      }

      return successCallback(result);
    } catch (e) {
      throw e;
    }
  };
};
