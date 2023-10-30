import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const map = {
  Dashboard: lazy(() => import("@/routes/dashboard")),
};

const routes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <map.Dashboard />,
  },
  {
    path: "/*",
    element: <Navigate to='/dashboard' />,
  },
];

export default routes;
