import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const map = {
  Login: lazy(() => import("@/routes/login")),
  ForgotPassword: lazy(() => import("@/routes/forgot-password")),
  LandingPage: lazy(
    () => import("@/routes/reservation-landing-page"),
  ),
};
const routes: RouteObject[] = [
  {
    path: "/login",
    element: <map.Login />,
  },
  {
    path: "/forgot-password",
    element: <map.ForgotPassword />,
  },
  {
    path: "/landing-page",
    element: <map.LandingPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
];

export default routes;
