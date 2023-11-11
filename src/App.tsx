import Loader from "@/components/common/Loader";
import { theme } from "@/configs/mantine-theme";
import useOnMounted from "@/hooks/useOnMounted";
import authRoutes from "@/router/auth.route";
import guestRoutes from "@/router/guest.route";
import useAuthStore from "@/stores/auth.store";
import { MantineProvider } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const App = () => {
  const authStore = useAuthStore();
  const [loaded, setLoaded] = useState(false);
  const routes = useMemo(() => {
    return _buildRoutes(loaded, !!authStore.user);
  }, [authStore.user, loaded]);

  useOnMounted(
    useCallback(() => {
      if (loaded) {
        return;
      }
      authStore.loadToken();
      setLoaded(true);
    }, [authStore, loaded]),
  );

  return (
    <MantineProvider theme={theme}>
      {useRoutes(routes)}
    </MantineProvider>
  );
};

export default App;

function _buildRoutes(loaded: boolean, login: boolean) {
  if (!loaded) {
    return [
      {
        path: "/*",
        element: <Loader />,
      } as RouteObject,
    ];
  }
  return login ? authRoutes : guestRoutes;
}
