import Loader from "@/components/common/Loader";
import { theme } from "@/configs/mantine-theme";
import authRoutes from "@/router/auth.route";
import guestRoutes from "@/router/guest.route";
import useAuthStore from "@/stores/auth.store";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import useBranchStore from "./stores/branch.store";
import useChainStore from "./stores/chain.store";
import useCommonStore from "./stores/common.store";
import useUserStore from "./stores/user.store";

const App = () => {
  const { loadToken, user } = useAuthStore();
  const [loaded, setLoaded] = useState(false);
  const { loadUsers } = useUserStore();
  const { loadChains } = useChainStore();
  const { loadBranches } = useBranchStore();
  const axiosLoading = useCommonStore.getState().axiosLoading;

  useEffect(() => {
    // Note: Don't load twice
    if (loaded) {
      return;
    }
    setLoaded(true);
    loadToken();
    loadBranches();
    loadChains();
  }, [loadBranches, loadChains, loadToken, loaded, user?.id]);

  useEffect(() => {
    // Note: Don't load users if user is not logged in
    if (!user?.id) {
      return;
    }
    loadUsers();
  }, [user, loadUsers]);

  const routes = useMemo(() => {
    return _buildRoutes(loaded, !!user);
  }, [user, loaded]);

  return (
    <MantineProvider theme={theme}>
      <LoadingOverlay
        visible={axiosLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
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
