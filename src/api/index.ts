import axios from "axios";
import Router from "next/router";

// axios.interceptors.response.use(
//   (response) => response,
//   ({ response: { status } }) => {
//     if (status === 401) {
//       Router.push("/login");
//       throw new Error("Unauthorized");
//     }
//   }
// );

export * from "./auth.api";
export * from "./user.api";
export * from "./actions.api";
