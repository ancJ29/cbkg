import { theme } from "@/configs/mantine-theme";
import authRoutes from "@/router/auth.route";
import guestRoutes from "@/router/guest.route";
import useAuthStore from "@/stores/auth.store";
import { MantineProvider } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const App = () => {
  const authStore = useAuthStore();
  const [loaded, setLoaded] = useState(false);

  const routes = useMemo(() => {
    return _buildRoutes(loaded, !!authStore.user);
  }, [authStore.user, loaded]);

  useEffect(() => {
    if (loaded) {
      return;
    }
    authStore.loadToken();
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MantineProvider theme={theme}>
      <div className='w-screen h-screen'>{useRoutes(routes)}</div>
    </MantineProvider>
  );
};

export default App;

function _buildRoutes(loaded: boolean, login: boolean) {
  if (!loaded) {
    return [{ path: "/*", element: <div>Loading...</div> } as RouteObject];
  }
  return login ? authRoutes : guestRoutes;
}
