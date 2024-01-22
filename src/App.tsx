import Loader from "@/components/common/Loader";
import { theme } from "@/configs/mantine-theme";
import useAxiosLoading from "@/hooks/useAxiosLoading";
import authRoutes from "@/router/auth.route";
import guestRoutes from "@/router/guest.route";
import useAuthStore from "@/stores/auth.store";
import useMessageStore from "@/stores/message.store";
import useMetaDataStore from "@/stores/meta-data.store";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const { loadToken, user } = useAuthStore();
  const { loadMetaData } = useMetaDataStore();
  const { loadMessage } = useMessageStore();
  const loading = useAxiosLoading();

  useEffect(() => {
    // Note: Don't load twice
    if (loaded) {
      return;
    }
    setLoaded(true);
    loadToken();
  }, [loadToken, loaded, loadMetaData, user?.id]);

  useEffect(() => {
    // Note: Don't load users if user is not logged in
    if (!user?.id) {
      return;
    }
    if (user.role === "ADMIN") {
      loadMessage();
    }
    loadMetaData();
  }, [user, loadMessage, loadMetaData]);

  const routes = useMemo(() => {
    return _buildRoutes(loaded, !!user);
  }, [user, loaded]);

  return (
    <MantineProvider theme={theme}>
      <LoadingOverlay
        visible={loading}
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
