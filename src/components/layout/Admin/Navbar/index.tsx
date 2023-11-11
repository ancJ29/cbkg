import useTranslation from "@/hooks/useTranslation";
import { buildMenu } from "@/services/navbar";
import useAuthStore from "@/stores/auth.store";
import { Anchor, Box, Image, ScrollArea } from "@mantine/core";
import classes from "./navbar.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = ({
  display = false,
  onClick,
}: {
  display?: boolean;
  onClick?: () => void;
}) => {
  const t = useTranslation();
  const authStore = useAuthStore();
  const menu = buildMenu(authStore?.user?.role || "STAFF");
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  return (
    <Box pt="xl" className={classes.links} component={ScrollArea}>
      {menu &&
        menu.map((item, index) => (
          <Anchor
            onClick={() => {
              setActive(item.url);
              navigate(item.url);
              onClick && onClick();
            }}
            className={
              active === item.url ? classes.active : classes.item
            }
            key={index}
          >
            <Image
              radius="md"
              h={20}
              w={20}
              src={`/menu/${item.icon}.svg`}
            />
            <Box fz={14} display={display ? "none" : "flex"}>
              {t(item.label)}
            </Box>
          </Anchor>
        ))}
    </Box>
  );
};
export default Navbar;
