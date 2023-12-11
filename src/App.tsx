import Loader from "@/components/common/Loader";
import { theme } from "@/configs/mantine-theme";
import useOnMounted from "@/hooks/useOnMounted";
import authRoutes from "@/router/auth.route";
import guestRoutes from "@/router/guest.route";
import useAuthStore from "@/stores/auth.store";
import { MantineProvider } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import useUserStore from "./stores/user.store";
import useChainStore from "./stores/chain.store";
import useBranchStore from "./stores/branch.store";

const App = () => {
  const { loadToken, user } = useAuthStore();
  const [loaded, setLoaded] = useState(false);
  const routes = useMemo(() => {
    return _buildRoutes(loaded, !!user);
  }, [user, loaded]);
  const { loadUsers } = useUserStore();
  const { loadChains } = useChainStore();
  const { loadBranches } = useBranchStore();

  useOnMounted(
    useCallback(() => {
      if (loaded) {
        return;
      }
      loadToken();
      setLoaded(true);
    }, [loadToken, loaded]),
  );

  const memoizedSetUsers = useCallback(
    () => loadUsers(),
    [loadUsers],
  );

  const memoizedSetChains = useCallback(
    () => loadChains(),
    [loadChains],
  );

  const memoizedSetBranches = useCallback(
    () => loadBranches(),
    [loadBranches],
  );

  useEffect(() => {
    if (user) {
      memoizedSetUsers();
    }
  }, [user, memoizedSetUsers]);

  useEffect(() => {
    memoizedSetBranches();
    memoizedSetChains();
  }, [memoizedSetBranches, memoizedSetChains]);

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
