import useTranslation from "@/hooks/useTranslation";
import { Menu, buildMenu } from "@/services/navbar";
import useAuthStore from "@/stores/auth.store";
import { Box, Flex, Image, NavLink, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./navbar.module.scss";

const Navbar = ({
  display = false,
  onClick,
}: {
  display?: boolean;
  onClick?: () => void;
}) => {
  const t = useTranslation();
  const { user } = useAuthStore();
  const menu: Menu = buildMenu(user?.role || "STAFF");
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <Box className={classes.links}>
      {menu &&
        menu.map((item, index) => (
          <Flex
            className={
              active === item.url ? classes.active : classes.item
            }
            key={index}
            onClick={() => {
              setActive(item.url);
              navigate(item.url);
              onClick && onClick();
            }}
          >
            <Tooltip
              label={t(item.label)}
              color="#fff"
              c="black"
              classNames={{ tooltip: "bdr-f" }}
            >
              <Flex my={12}>
                <Image
                  radius="md"
                  h={20}
                  w={20}
                  src={`/menu/${item.icon}.svg`}
                />
              </Flex>
            </Tooltip>
            <Flex className="w-full p-0" direction="column">
              <NavLink
                bg="none"
                py={10}
                fz={14}
                display={display ? "none" : "flex"}
                label={t(item.label)}
                classNames={{
                  children: "p-0",
                }}
                defaultOpened
              >
                {item.subMenu &&
                  item.subMenu.map((sub, index) => {
                    return (
                      <NavLink
                        py={10}
                        className={
                          active === item.url
                            ? classes.active
                            : classes.item
                        }
                        px={0}
                        pl={10}
                        key={index}
                        label={t(sub.label)}
                        display={display ? "none" : "flex"}
                        onClick={() => {
                          navigate(sub.url);
                        }}
                      />
                    );
                  })}
              </NavLink>
            </Flex>
          </Flex>
        ))}
    </Box>
  );
};
export default Navbar;
