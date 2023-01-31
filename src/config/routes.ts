export enum Route {
  Login = "/login",
  SignUp = "/signup",
  Main = "/",
  Actions = "/actions",
  Friends = "/friends",
}

export const PUBLIC_ROUTES = [Route.Login, Route.SignUp];
export const ROUTES = [
  Route.Login,
  Route.SignUp,
  Route.Main,
  Route.Actions,
  Route.Friends,
];

export const isPublicRoute = (path: string) => {
  const pathName = path.substring(1, path.length);
  return PUBLIC_ROUTES.reduce((isPublic, route) => {
    if (isPublic) {
      return isPublic;
    }

    const routeName = String(route).substring(1, route.length);
    return !!(pathName.length && routeName.includes(pathName));
  }, false);
};
