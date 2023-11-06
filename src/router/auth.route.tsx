import { lazy } from "react";
import { Navigate } from "react-router-dom";

type GenericProps = Record<string, unknown>;
type Wrapper = React.LazyExoticComponent<(props?: GenericProps) => React.JSX.Element>;
type LazyExoticComponent = React.LazyExoticComponent<() => React.JSX.Element>;
type Config = {
  path: string;
  element: string | (() => JSX.Element);
  wrapper?: {
    element: Wrapper;
    props: GenericProps;
  };
};

const ServiceWrapper = lazy(() => import("@/components/layout/Admin/ServiceWrapper"));
const componentMap: Record<string, LazyExoticComponent> = {
  Dashboard: lazy(() => import("@/routes/dashboard")),
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
    path: "/*",
    element: () => <Navigate to='/dashboard' />,
  },
];

export default configs.map(_buildRouteConfig);

function _buildRouteConfig(config: Config) {
  const Component = typeof config.element === "string" ? componentMap[config.element] : config.element;
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
