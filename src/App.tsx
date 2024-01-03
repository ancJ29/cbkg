import Loader from "@/components/common/Loader";
import { theme } from "@/configs/mantine-theme";
import authRoutes from "@/router/auth.route";
import guestRoutes from "@/router/guest.route";
import useAuthStore from "@/stores/auth.store";
import useBranchStore from "@/stores/branch.store";
import useCommonStore from "@/stores/common.store";
import useMetaDataStore from "@/stores/meta-data.store";
import useUserStore from "@/stores/user.store";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const { loadToken, user } = useAuthStore();
  const { loadUsers } = useUserStore();
  const { loadBranches } = useBranchStore();
  const { loadMetaData } = useMetaDataStore();
  const { axiosLoading } = useCommonStore.getState();

  useEffect(() => {
    // Note: Don't load twice
    if (loaded) {
      return;
    }
    // eslint-disable-next-line no-console
    setLoaded(true);
    loadToken();
    loadBranches(); // TODO: Remove this
    loadMetaData();
  }, [loadBranches, loadToken, loaded, loadMetaData, user?.id]);

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
