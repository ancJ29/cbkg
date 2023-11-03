import { Box } from "@mantine/core";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box h='100vh' bg='linear-gradient(to top, #dfe9f3 0%, white 100%)'>
      {children}
    </Box>
  );
};

export default Layout;
