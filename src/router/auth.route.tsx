import { lazy } from "react";
import { Navigate } from "react-router-dom";

type GenericProps = Record<string, unknown>;
type RFC = (props?: GenericProps) => React.JSX.Element;
type NoPropsRFC = () => React.JSX.Element;
type Wrapper = React.LazyExoticComponent<RFC>;
type LazyExoticComponent = React.LazyExoticComponent<NoPropsRFC>;
type Config = {
  path: string;
  element: string | (() => JSX.Element);
  wrapper?: {
    element: Wrapper;
    props: GenericProps;
  };
};

const ServiceWrapper = lazy(
  () => import("@/components/layout/Admin/ServiceWrapper"),
);
const componentMap: Record<string, LazyExoticComponent> = {
  Dashboard: lazy(() => import("@/routes/dashboard")),
  CustomerManagement: lazy(
    () => import("@/routes/customer-management"),
  ),
  ReservationManagement: lazy(
    () => import("@/routes/reservation-management"),
  ),
  StoreManagement: lazy(() => import("@/routes/store-management")),
  AccountManagement: lazy(
    () => import("@/routes/account-management"),
  ),
};

const configs: Config[] = [
  {
    path: "/dashboard",
    element: "Dashboard",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        title: "",
      },
    },
  },
  {
    path: "/customer-management",
    element: "CustomerManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        title: "",
      },
    },
  },
  {
    path: "/reservation-management",
    element: "ReservationManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        title: "",
      },
    },
  },
  {
    path: "/store-management",
    element: "StoreManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        title: "",
      },
    },
  },
  {
    path: "/account-management",
    element: "AccountManagement",
    wrapper: {
      element: ServiceWrapper as Wrapper,
      props: {
        title: "",
      },
    },
  },
  {
    path: "/*",
    element: () => <Navigate to="/dashboard" />,
  },
];

export default configs.map(_buildRouteConfig);

function _buildRouteConfig(config: Config) {
  const Component =
    typeof config.element === "string"
      ? componentMap[config.element]
      : config.element;
  return {
    path: config.path,
    element: config.wrapper ? (
      <config.wrapper.element {...config.wrapper.props}>
        <Component />
      </config.wrapper.element>
    ) : (
      <Component />
    ),
  };
}
